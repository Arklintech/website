'use client';

import { auth } from './firebase';
import { signOut } from 'firebase/auth';

// In-memory client-side response cache for instant UI rendering
interface CacheEntry {
  data: any;
  timestamp: number;
}
const apiCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60 * 1000; // 1 minute fresh TTL

export function invalidateAdminCache(pattern?: string | RegExp): void {
  if (!pattern) {
    apiCache.clear();
    return;
  }
  const keys = Array.from(apiCache.keys());
  for (const key of keys) {
    if (typeof pattern === 'string' ? key.includes(pattern) : pattern.test(key)) {
      apiCache.delete(key);
    }
  }
}

/**
 * Get current Firebase user ID token if authenticated.
 * Automatically refreshes token if expired.
 */
export async function getFirebaseToken(): Promise<string> {
  if (typeof window === 'undefined') return '';
  const user = auth.currentUser;
  if (!user) return '';
  try {
    return await user.getIdToken();
  } catch (err) {
    console.error('Failed to get Firebase ID token:', err);
    return '';
  }
}

/**
 * Authenticated fetch wrapper for COMMAND admin API calls.
 * Automatically injects `Authorization: Bearer <Firebase ID Token>`.
 * Handles cache invalidation for mutating methods (POST, PATCH, PUT, DELETE).
 */
export async function fetchAdmin(url: string, init?: RequestInit): Promise<Response> {
  const method = (init?.method || 'GET').toUpperCase();
  const token = await getFirebaseToken();
  const headers = new Headers(init?.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Mutating requests invalidate related cache
  if (method !== 'GET') {
    const res = await fetch(url, { ...init, headers });
    if (res.ok) {
      if (url.includes('/api/admin/invoices')) invalidateAdminCache('/api/admin/invoices');
      if (url.includes('/api/admin/leads')) invalidateAdminCache('/api/admin/leads');
      if (url.includes('/api/admin/projects')) invalidateAdminCache('/api/admin/projects');
      if (url.includes('/api/admin/stats')) invalidateAdminCache('/api/admin/stats');
      if (url.includes('/api/admin/settings')) invalidateAdminCache('/api/admin/settings');
    }
    return res;
  }

  return fetch(url, {
    ...init,
    headers,
  });
}

/**
 * Cached JSON fetcher with Stale-While-Revalidate pattern for ultra-responsive UI.
 * Returns cached data immediately if available, while refreshing in background.
 */
export async function fetchAdminJSON<T = any>(
  url: string,
  onBackgroundUpdate?: (freshData: T) => void
): Promise<{ data: T; fromCache: boolean }> {
  const cached = apiCache.get(url);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    // Return cached immediately and refresh in background
    if (onBackgroundUpdate) {
      fetchAdmin(url)
        .then((res) => (res.ok ? res.json() : null))
        .then((fresh) => {
          if (fresh) {
            apiCache.set(url, { data: fresh, timestamp: Date.now() });
            onBackgroundUpdate(fresh);
          }
        })
        .catch(() => {});
    }
    return { data: cached.data as T, fromCache: true };
  }

  const res = await fetchAdmin(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
  const data = await res.json();
  apiCache.set(url, { data, timestamp: Date.now() });
  return { data, fromCache: false };
}

/**
 * Terminate the Firebase authenticated admin session.
 */
export async function logoutAdmin(): Promise<void> {
  invalidateAdminCache();
  try {
    await signOut(auth);
  } catch (err) {
    console.error('Firebase signOut error:', err);
  }
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('ark_auth_token');
    sessionStorage.removeItem('ark_admin_pass');
    localStorage.removeItem('ark_admin_pass');
  }
}

// Deprecated stubs preserved for smooth import compatibility
export function getStoredAdminKey(): string {
  return '';
}

export function storeAdminKey(_key: string): void {}

export function clearAdminSession(): void {
  logoutAdmin();
}

