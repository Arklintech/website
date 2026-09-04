// ARKLINTECH COMMAND — Auth Abstraction Layer
// V1: Passcode-based auth via ADMIN_PASSCODE env var
// Ready for Firebase Auth swap — just replace verifyToken()

export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'arklintech2026';

/**
 * Verify an admin request. Checks x-admin-key header or `key` query param.
 * Returns { valid: true } or { valid: false, status: 401 }
 */
export function verifyAdminRequest(req: Request): { valid: boolean; status?: number } {
  const url = new URL(req.url);
  const headerKey = req.headers.get('x-admin-key');
  const queryKey = url.searchParams.get('key');
  const rawKey = (headerKey || queryKey || '').trim();
  const targetKey = (process.env.ADMIN_PASSCODE || 'arklintech2026').trim();

  if (!rawKey || (rawKey !== targetKey && rawKey.toLowerCase() !== targetKey.toLowerCase())) {
    return { valid: false, status: 401 };
  }
  return { valid: true };
}

/**
 * Client-side: get stored admin key from sessionStorage (browser only) with safe fallback.
 */
export function getStoredAdminKey(): string {
  if (typeof window === 'undefined') return 'arklintech2026';
  return sessionStorage.getItem('ark_admin_pass') || 'arklintech2026';
}

/**
 * Client-side: store admin key in sessionStorage.
 */
export function storeAdminKey(key: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('ark_admin_pass', key);
}

/**
 * Client-side: clear admin session.
 */
export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('ark_admin_pass');
}

/**
 * Client-side: Fetch wrapper with automatic admin authentication headers and key param.
 */
export async function fetchAdmin(url: string, init?: RequestInit): Promise<Response> {
  const key = getStoredAdminKey();
  const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:7000');
  if (!urlObj.searchParams.has('key') && key) {
    urlObj.searchParams.set('key', key);
  }

  const headers = new Headers(init?.headers || {});
  if (key && !headers.has('x-admin-key')) {
    headers.set('x-admin-key', key);
  }

  return fetch(urlObj.toString(), {
    ...init,
    headers,
  });
}

