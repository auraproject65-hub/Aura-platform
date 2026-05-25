import { NextResponse } from 'next/server';
import { getAuthenticatedUser, updateOnboarding } from '@/lib/store';

export async function GET(request: Request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user, tagline: user.tagline || '', onboardingComplete: user.onboardingComplete || false });
}

export async function POST(request: Request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  updateOnboarding(user.email, body);
  return NextResponse.json({ ok: true, user });
}
