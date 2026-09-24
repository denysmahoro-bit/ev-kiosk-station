import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'selavolt_admin_session';

export function isAdminAuthenticated() {
  const cookieStore = cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === 'authenticated';
}

export function getAdminRole() {
  const cookieStore = cookies();
  return cookieStore.get('selavolt_admin_role')?.value ?? 'SUPER_ADMIN';
}
