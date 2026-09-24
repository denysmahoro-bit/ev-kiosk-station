'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!email || !password) {
    redirect('/admin/login?error=missing-credentials');
  }

  const isAdminEmail = email.includes('@selavolt.rw') || email === 'admin@selavolt.rw';
  const isDemoPassword = password === 'password123' || password === 'admin123';

  if (!isAdminEmail || !isDemoPassword) {
    redirect('/admin/login?error=invalid-credentials');
  }

  cookies().set('selavolt_admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8
  });

  cookies().set('selavolt_admin_role', 'SUPER_ADMIN', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8
  });

  redirect('/admin');
}

export async function logoutAction() {
  cookies().delete('selavolt_admin_session');
  cookies().delete('selavolt_admin_role');
  redirect('/admin/login');
}
