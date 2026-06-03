import { NextRequest, NextResponse } from 'next/server';
import { getPlan } from '@/lib/monetization/plans';

// In-memory subscription store (demo)
const subscriptions: any = {};

export async function POST(req: NextRequest) {
  const { planId, userId } = await req.json();
  const plan = getPlan(planId);
  if (!plan) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  
  subscriptions[userId] = { planId, startDate: new Date().toISOString(), status: 'active' };
  return NextResponse.json({ success: true, plan: plan.name });
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId') || 'demo';
  const sub = subscriptions[userId] || { planId: 'lite', status: 'active' };
  const plan = getPlan(sub.planId);
  return NextResponse.json({ subscription: sub, plan });
}
