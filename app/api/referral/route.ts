import { NextRequest, NextResponse } from 'next/server';
import { generateReferralCode, trackReferral } from '@/lib/monetization/referral';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  const code = generateReferralCode(userId);
  return NextResponse.json({ referralCode: code });
}

export async function PUT(req: NextRequest) {
  const { code } = await req.json();
  const count = trackReferral(code);
  return NextResponse.json({ signups: count });
}
