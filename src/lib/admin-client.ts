'use client';

import { auth } from './firebase';
import { signOut } from 'firebase/auth';

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
 */
export async function fetchAdmin(url: string, init?: RequestInit): Promise<Response> {
  const token = await getFirebaseToken();
  const headers = new Headers(init?.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(url, {
    ...init,
    headers,
  });
}

/**
 * Terminate the Firebase authenticated admin session.
 */
export async function logoutAdmin(): Promise<void> {
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
