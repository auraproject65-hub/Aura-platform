'use client';

import { useEffect, useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

function decodeJwtPayload(token: string | null) {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return decoded as { email?: string; name?: string; role?: string } | null;
  } catch {
    return null;
  }
}

export function UserNav() {
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )auth-token=([^;]+)/);
    const raw = match ? decodeURIComponent(match[1]) : null;
    const payload = decodeJwtPayload(raw);
    setUser({ name: payload?.name || 'Executive user', role: payload?.role || 'user' });
  }, []);

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'same-origin',
    });

    window.location.assign('/auth/login');
  };

  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-aura-cyan/20 text-aura-cyan">
        <CircleUserRound className="h-5 w-5" />
      </div>
      <div className="pr-1">
        <p className="text-sm font-medium text-white">{user?.name || 'Executive user'}</p>
        <p className="text-xs text-slate-200">{user?.role === 'admin' ? 'Administrator' : 'Premium workspace'}</p>
      </div>
      {user?.role === 'admin' && (
        <div className="px-2 py-1 bg-aura-gold text-black rounded-md text-xs font-semibold">ADMIN</div>
      )}
      <Button variant="outline" size="sm" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
