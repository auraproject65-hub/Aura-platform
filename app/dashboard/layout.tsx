'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Sidebar } from '@/components/sidebar';
import { UserNav } from '@/components/user-nav';
import { NotificationBell } from '@/components/NotificationBell';
import { CommandPalette } from '@/components/CommandPalette';

const socialProof = [
  'A company in Retail just upgraded to Pro.',
  'A high-growth SaaS team unlocked a new forecast scenario.',
  'A Finance leader just completed a strategic retention report.',
  'A healthcare operator simplified their reporting workflow.',
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [tagline, setTagline] = useState('Turn every signal into a decision.');

  useEffect(() => {
    const hasAuth = typeof document !== 'undefined' && document.cookie.includes('auth-token=');
    if (!hasAuth) {
      return;
    }

    fetch('/api/onboarding', { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((data) => {
        if (data?.tagline) {
          setTagline(data.tagline);
        }
      })
      .catch(() => undefined);

    const interval = setInterval(() => {
      const message = socialProof[Math.floor(Math.random() * socialProof.length)];
      toast.info(message, { duration: 5000 });
    }, 40000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <CommandPalette />
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">AURA command center</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-200">{tagline}</p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <UserNav />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
