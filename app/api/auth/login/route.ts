import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth';
import { getUserByEmail } from '@/lib/store';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const user = getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = createToken({ email: user.email, name: user.name });
  const response = NextResponse.json({ ok: true, user: { id: user.id, name: user.name, email: user.email, plan: user.plan } });
  response.cookies.set('auth-token', token, { httpOnly: true, path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 });
  return response;
}
