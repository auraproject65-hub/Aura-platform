import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth';
import { getDefaultSettings, getUserByEmail, users } from '@/lib/store';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existing = getUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: `user-${Date.now()}`,
    name,
    email,
    passwordHash,
    plan: 'starter' as const,
    usage: 0,
    createdAt: new Date().toISOString(),
    settings: getDefaultSettings(),
  };

  users.push(user);
  const token = createToken({ email, name });
  const response = NextResponse.json({ ok: true, user: { id: user.id, name, email, plan: user.plan } });
  response.cookies.set('auth-token', token, { httpOnly: true, path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 });
  return response;
}
