import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Contact payload', body);
  return NextResponse.json({ ok: true, message: 'Message logged successfully' });
}
