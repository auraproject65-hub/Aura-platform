import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getPlanForEmail, getUsageForEmail } from '@/lib/store';
import { PLAN_LIMITS } from '@/lib/config';

function decodeToken(token: string) {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return decoded;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/dashboard') && !pathname.startsWith('/insights')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth-token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const payload = decodeToken(token);
  if (!payload || typeof payload.exp !== 'number' || payload.exp * 1000 < Date.now()) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const email = typeof payload.email === 'string' ? payload.email : null;
  if (!email) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const plan = getPlanForEmail(email);
  const usage = getUsageForEmail(email);
  const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS];

  if (usage >= limit && pathname.startsWith('/insights')) {
    return NextResponse.redirect(new URL('/dashboard/subscription', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/insights/:path*'],
};
