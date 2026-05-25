import { NextResponse } from 'next/server';
import { getAuthenticatedUser, getDefaultSettings, normalizeUserSettings, updateUserSettings } from '@/lib/store';

export async function GET(request: Request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ settings: getDefaultSettings() });
  }

  return NextResponse.json({ settings: normalizeUserSettings(user.settings as Partial<Parameters<typeof normalizeUserSettings>[0]> | undefined) });
}

export async function PUT(request: Request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  updateUserSettings(user.email, body.settings);
  return NextResponse.json({ ok: true, settings: normalizeUserSettings(body.settings) });
}
