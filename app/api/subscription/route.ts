import { NextResponse } from 'next/server';
import { getEmailFromCookie } from '@/lib/auth';
import { getPlanForEmail, getUsageForEmail, getUserByEmail, setUsageForUser, users } from '@/lib/store';
import { PLAN_LIMITS } from '@/lib/config';

export async function GET(request: Request) {
  const userEmail = getEmailFromCookie(request.headers.get('cookie'));
  const user = userEmail ? getUserByEmail(userEmail) : null;

  if (!user) {
    return NextResponse.json({ plan: 'starter', usage: 0, limits: PLAN_LIMITS, billingHistory: [] });
  }

  return NextResponse.json({
    plan: user.plan,
    usage: user.usage,
    limits: PLAN_LIMITS,
    billingHistory: [
      { label: 'Starter plan', amount: '$0.00', date: user.createdAt },
      { label: 'Pro upgrade', amount: '$99.00', date: user.createdAt },
    ],
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const plan = body.plan;
  const userEmail = getEmailFromCookie(request.headers.get('cookie'));
  const user = userEmail ? getUserByEmail(userEmail) : null;

  if (!user) {
    return NextResponse.json({ error: 'Login required' }, { status: 401 });
  }

  if (plan === 'starter' || plan === 'pro' || plan === 'enterprise') {
    user.plan = plan;
    setUsageForUser(user.email, 0);
    return NextResponse.json({ ok: true, message: `Subscription updated to ${plan}` });
  }

  return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
}
