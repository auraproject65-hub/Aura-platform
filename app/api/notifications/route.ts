import { NextResponse } from 'next/server';
import { addNotification, getAuthenticatedUser, getNotificationsForUser, markNotificationAsRead, seedNotifications } from '@/lib/store';

export async function GET(request: Request) {
  const user = getAuthenticatedUser(request);
  seedNotifications();
  const notifications = user ? getNotificationsForUser(user.email) : [];
  return NextResponse.json({ notifications });
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = getAuthenticatedUser(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (body?.id) {
    markNotificationAsRead(body.id, user.email);
    return NextResponse.json({ ok: true });
  }

  addNotification({ id: `notification-${Date.now()}`, userId: user.id, title: 'Insight alert', message: 'A new growth signal is ready for review.', read: false, createdAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
