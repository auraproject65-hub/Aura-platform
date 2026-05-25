'use client';

import { CircleUserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UserNav() {
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
        <p className="text-sm font-medium text-white">Executive user</p>
        <p className="text-xs text-slate-200">Premium workspace</p>
      </div>
      <Button variant="outline" size="sm" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
