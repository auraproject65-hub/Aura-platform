import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, companyName } = await req.json();
    if (!email || !password || !name || !companyName) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }
    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }
    const user = await createUser(email, password, name, companyName);
    const token = generateToken(user.id, user.email);
    return NextResponse.json({ success: true, token, user: { id: user.id, email: user.email, name: user.name, companyName: user.companyName } });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}
