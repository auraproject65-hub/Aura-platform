import { NextResponse } from 'next/server';
import { addTeamMember, getAuthenticatedUser, getTeamMembers, removeTeamMember } from '@/lib/store';

export async function GET() {
  return NextResponse.json({ members: getTeamMembers() });
}

export async function POST(request: Request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const member = addTeamMember({ email: body.email, role: body.role || 'Contributor' });

  return NextResponse.json({ ok: true, member, message: `Invitation sent to ${member.email}.` });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  removeTeamMember(body.id);
  return NextResponse.json({ ok: true });
}
