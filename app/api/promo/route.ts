import { NextRequest, NextResponse } from 'next/server';
import { validatePromo } from '@/lib/monetization/promo';

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const promo = validatePromo(code);
  if (!promo) return NextResponse.json({ error: 'Invalid promo code' }, { status: 404 });
  return NextResponse.json({ valid: true, promo });
}
