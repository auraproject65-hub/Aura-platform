"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BarChart3, Upload, Lightbulb, Settings, Users, CreditCard, Briefcase, GraduationCap, MessageCircle, Grid3X3, Megaphone, Heart, Shield, Search, FileSearch, Coins, Sliders, Share2, UserCog } from 'lucide-react';
import CommandPalette from '@/components/CommandPalette/CommandPalette';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('aura_token');
    if (!token) window.location.href = '/auth/login';
    else setAuthorized(true);
  }, []);

  if (!authorized) return <div className="flex h-screen items-center justify-center bg-aura-base"><p className="text-aura-muted">Loading...</p></div>;

  return (
    <div className="flex h-screen bg-aura-base">
      <CommandPalette />
      <aside className="w-64 bg-aura-surface/50 backdrop-blur-md border-r border-white/5 flex flex-col p-4">
        <div className="mb-8">
          <Image src="/images/aura-logo.png" alt="AURA" width={80} height={32} priority />
        </div>
        <nav className="flex flex-col gap-1 text-sm overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><BarChart3 size={16}/> Overview</Link>
          <Link href="/data-room" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Upload size={16}/> Data Room</Link>
          <Link href="/insights" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Lightbulb size={16}/> Insights</Link>
          <Link href="/what-if" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Sliders size={16}/> What‑If</Link>
          <div className="mt-4 mb-2 text-xs text-aura-gold/70 uppercase tracking-widest">Growth</div>
          <Link href="/launchpad" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Megaphone size={16}/> Launchpad</Link>
          <Link href="/research/business" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Briefcase size={16}/> Business Research</Link>
          <Link href="/research/student" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><GraduationCap size={16}/> Student Research</Link>
          <Link href="/data-room?excel=true" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Grid3X3 size={16}/> Excel Workspace</Link>
          <Link href="/data-room?chat=true" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><MessageCircle size={16}/> Quick Chat</Link>
          <div className="mt-4 mb-2 text-xs text-aura-gold/70 uppercase tracking-widest">Enterprise</div>
          <Link href="/enterprise/audit" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><FileSearch size={16}/> Audit Mode</Link>
          <Link href="/enterprise/competitor" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Search size={16}/> Competitor Intel</Link>
          <Link href="/enterprise/security" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Shield size={16}/> Security</Link>
          <div className="mt-4 mb-2 text-xs text-aura-gold/70 uppercase tracking-widest">Community</div>
          <Link href="/circle/idea-wall" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Heart size={16}/> Idea Wall</Link>
          <Link href="/circle/office-hours" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Lightbulb size={16}/> Office Hours</Link>
          <Link href="/circle/success-board" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><BarChart3 size={16}/> Success Board</Link>
          <div className="mt-4 mb-2 text-xs text-aura-gold/70 uppercase tracking-widest">Account</div>
          <Link href="/dashboard/team" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Users size={16}/> Team</Link>
          <Link href="/dashboard/settings" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Settings size={16}/> Settings</Link>
          <Link href="/dashboard/referrals" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><Share2 size={16}/> Referrals</Link>
          <Link href="/dashboard/subscription" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><CreditCard size={16}/> Subscription</Link>
          <div className="mt-4 mb-2 text-xs text-aura-gold/70 uppercase tracking-widest">Admin</div>
          <Link href="/admin" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><UserCog size={16}/> Admin Panel</Link>
          <div className="mt-4 mb-2 text-xs text-aura-gold/70 uppercase tracking-widest">Public</div>
          <Link href="/contact" className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 text-aura-muted hover:text-white transition"><MessageCircle size={16}/> Contact</Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 bg-aura-base">
        {children}
      </main>
    </div>
  );
}
