'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface TeamMember {
  id: string;
  email: string;
  role: string;
  status: string;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Contributor');
  const [message, setMessage] = useState('');

  const loadMembers = async () => {
    const response = await fetch('/api/team');
    const data = await response.json();
    setMembers(data.members || []);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const invite = async () => {
    const response = await fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });

    const data = await response.json();
    setMessage(data.message || 'Invite created.');
    await loadMembers();
  };

  const remove = async (id: string) => {
    await fetch('/api/team', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await loadMembers();
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Invite teammates</CardTitle>
          <CardDescription className="text-slate-200">Simulate role-based invitations and manage workspace access.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input placeholder="Role" value={role} onChange={(event) => setRole(event.target.value)} />
          <Button className="w-full" onClick={invite}>Invite teammate</Button>
          <p className="text-sm text-slate-200">{message}</p>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Workspace members</CardTitle>
          <CardDescription className="text-slate-200">Monitor current access and respond to invitations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="font-semibold text-white">{member.email}</p>
                  <p className="text-sm text-slate-200">{member.role} • {member.status}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setMessage(`Resent invite to ${member.email}.`)}>Resend</Button>
                  <Button variant="outline" onClick={() => remove(member.id)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
