// lib/auth.js
const SESSION_KEY = 'cf365_session';
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

export function createSession() {
  if (typeof window === 'undefined') return;
  const session = {
    authenticated: true,
    expiresAt: Date.now() + SESSION_TTL_MS
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function hasValidSession() {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return false;

    const session = JSON.parse(raw);
    const isValid =
      session &&
      session.authenticated === true &&
      typeof session.expiresAt === 'number' &&
      Date.now() < session.expiresAt;

    if (!isValid) {
      window.localStorage.removeItem(SESSION_KEY);
      return false;
    }

    return true;
  } catch (err) {
    window.localStorage.removeItem(SESSION_KEY);
    return false;
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SESSION_KEY);
}
