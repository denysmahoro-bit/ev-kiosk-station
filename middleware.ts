import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/admin/login';
  const hasSession = request.cookies.get('selavolt_admin_session')?.value === 'authenticated';

  if (isAdminRoute && !isLoginRoute && !hasSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginRoute && hasSession) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
