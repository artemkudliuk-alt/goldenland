import { cookies } from "next/headers";

export const ADMIN_COOKIE = "gl_admin_session";

/**
 * Server-side admin auth gate.
 *
 * The httpOnly session cookie stores ADMIN_SESSION_SECRET, which never leaves
 * the server except as an httpOnly cookie set only after a correct password.
 * A client cannot read or forge it, so every protected route must call this.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  return timingSafeEqual(token, secret);
}

/** Constant-time string comparison to avoid leaking length/match via timing. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}
