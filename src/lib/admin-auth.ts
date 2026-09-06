// ARKLINTECH COMMAND — Server-Side Firebase Auth & UID-Based Authorization
//
// Authorization flow:
//   1. Extract Bearer token from Authorization header.
//   2. Verify Firebase ID token cryptographic signature, expiry, and project ID.
//   3. Check the authenticated user's UID against ADMIN_UID_ALLOWLIST (primary gate).
//   4. If allowlist is populated: UID must match exactly → 200. Mismatch → 403.
//   5. If allowlist is empty (env not set): fall back to email allowlist check.
//   6. Missing / invalid / expired token → 401 Unauthorized.
//
// Environment variables (ALL server-side only, never NEXT_PUBLIC_):
//   ADMIN_UID_ALLOWLIST   Comma-separated Firebase UIDs authorized for COMMAND.
//                         Example: ADMIN_UID_ALLOWLIST="D7eBQUH1z6SmtULUjHwu0WLW78Z2"
//   ADMIN_AUTH_EMAIL      Fallback admin email (only used when UID allowlist is empty).
//   ADMIN_EMAILS          Comma-separated fallback admin emails.

import { adminAuth } from './firebase-admin';

export interface AdminTokenPayload {
  uid: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/** Parse the ADMIN_UID_ALLOWLIST env variable into a Set of trimmed UID strings. */
function getAuthorizedUids(): Set<string> {
  const raw = process.env.ADMIN_UID_ALLOWLIST || '';
  return new Set<string>(
    raw.split(',').map(u => u.trim()).filter(Boolean)
  );
}

/** Parse all configured admin emails into a Set of lowercased strings. */
function getAuthorizedEmails(): Set<string> {
  const fixed = ['ahmedkhananas57@gmail.com'];
  const fromEnv = [
    process.env.ADMIN_AUTH_EMAIL || '',
    process.env.ADMIN_EMAIL || '',
    ...(process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',') : []),
  ];
  return new Set<string>(
    [...fixed, ...fromEnv].map(e => e.trim().toLowerCase()).filter(Boolean)
  );
}

/**
 * Verify a Firebase ID token and authorize the COMMAND Admin.
 *
 * Returns:
 *   { valid: true,  status: 200, payload } — authorized admin
 *   { valid: false, status: 403 }          — valid Firebase user, NOT an authorized COMMAND admin
 *   { valid: false, status: 401 }          — missing / invalid / expired token
 */
export async function verifyAdminToken(
  token: string
): Promise<{ valid: boolean; status: number; payload?: AdminTokenPayload }> {
  if (!token || typeof token !== 'string' || !token.trim()) {
    return { valid: false, status: 401 };
  }

  let decoded: Awaited<ReturnType<typeof adminAuth.verifyIdToken>>;
  try {
    decoded = await adminAuth.verifyIdToken(token.trim());
  } catch {
    // Expired, malformed, revoked, or wrong-project token
    return { valid: false, status: 401 };
  }

  // ── PRIMARY GATE: UID allowlist ─────────────────────────────────────────────
  const authorizedUids = getAuthorizedUids();

  if (authorizedUids.size > 0) {
    // UID allowlist is configured — it is the sole authority.
    if (!authorizedUids.has(decoded.uid)) {
      // Authenticated Firebase user, but UID is NOT on the COMMAND allowlist.
      return { valid: false, status: 403 };
    }
    // UID matched — COMMAND access granted.
    return {
      valid: true,
      status: 200,
      payload: {
        uid: decoded.uid,
        email: decoded.email || '',
        role: 'SUPER_ADMIN',
        iat: decoded.iat,
        exp: decoded.exp,
      },
    };
  }

  // ── SECONDARY GATE: email allowlist (fallback when UID allowlist not set) ───
  // This path exists only for backward compatibility during initial environment
  // setup where ADMIN_UID_ALLOWLIST has not yet been configured.
  const userEmail = (decoded.email || '').trim().toLowerCase();
  const hasAdminClaim = decoded.admin === true || decoded.role === 'admin' || decoded.role === 'SUPER_ADMIN';
  const isEmailAuthorized = Boolean(userEmail && getAuthorizedEmails().has(userEmail));

  if (!hasAdminClaim && !isEmailAuthorized) {
    return { valid: false, status: 403 };
  }

  return {
    valid: true,
    status: 200,
    payload: {
      uid: decoded.uid,
      email: decoded.email || '',
      role: 'SUPER_ADMIN',
      iat: decoded.iat,
      exp: decoded.exp,
    },
  };
}

/**
 * Verify an incoming protected COMMAND API request.
 * Accepts ONLY `Authorization: Bearer <Firebase ID Token>`.
 * Query-string keys, x-admin-key headers, and session cookies are NOT accepted.
 */
export async function verifyAdminRequest(
  req: Request
): Promise<{ valid: boolean; status: number; payload?: AdminTokenPayload }> {
  const authHeader = req.headers.get('authorization') || '';

  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    return { valid: false, status: 401 };
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    return { valid: false, status: 401 };
  }

  return verifyAdminToken(token);
}

// ── Deprecated stubs — kept to satisfy any remaining import references ────────
export function getStoredAdminKey(): string { return ''; }
export function storeAdminKey(_key: string): void {}
export function clearAdminSession(): void {}
