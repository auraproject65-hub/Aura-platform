'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, FolderOpen, Home, HelpCircle, Settings, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/data-room', label: 'Data Room', icon: FolderOpen },
  { href: '/dashboard/insights', label: 'Insights', icon: BarChart3 },
  { href: '/dashboard/team', label: 'Team', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full min-h-screen w-72 flex-col border-r border-white/10 bg-slate-950/70 p-6">
      <div>
        <p className="text-lg font-semibold text-white">AURA</p>
        <p className="mt-1 text-sm text-slate-200">Executive growth intelligence</p>
      </div>
      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 rounded-xl px-3 py-3 text-sm', active ? 'bg-aura-cyan/20 text-white' : 'text-slate-200 hover:bg-white/5')}>
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-white">Upgrade prompt</p>
        <p className="mt-2 text-sm text-slate-200">Pro unlocks expanded analysis and export-ready reporting.</p>
        <div className="mt-3 flex items-center justify-between">
          <Sparkles className="h-4 w-4 text-aura-cyan" />
          <ModeToggle />
        </div>
      </div>
    </aside>
  );
}
