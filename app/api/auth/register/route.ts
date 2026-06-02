import { NextRequest, NextResponse } from 'next/server';
import { createUser, findUserByEmail, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, companyName } = await req.json();
    if (!email || !password || !name || !companyName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }
    const user = await createUser(email, password, name, companyName);
    const token = generateToken(user.id);
    return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, companyName: user.companyName } });
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
