"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BarChart3, Upload, Lightbulb, Settings, Users, CreditCard, Briefcase, GraduationCap, MessageCircle, Grid3X3, Megaphone, Heart, Shield, Search, FileSearch, Coins, Bot, PenLine, MessageSquare, UserCog, Sliders, Share2 } from 'lucide-react';
import CommandPalette from '@/components/CommandPalette/CommandPalette';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('aura_token') : null;
    if (!token) {
      window.location.href = '/auth/login';
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) {
    return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="flex h-screen">
      <CommandPalette />
      <aside className="w-64 bg-aura-navy border-r border-white/5 flex flex-col p-4">
        <div className="mb-8">
          <Image src="/images/aura-logo.png" alt="AURA" width={80} height={32} priority />
        </div>
        <nav className="flex flex-col gap-1 text-sm overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><BarChart3 size={16}/> Overview</Link>
          <Link href="/data-room" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Upload size={16}/> Data Room</Link>
          <Link href="/insights" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Lightbulb size={16}/> Insights</Link>
          <Link href="/what-if" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Sliders size={16}/> What‑If</Link>
          <div className="mt-4 mb-2 text-xs text-gray-500 uppercase tracking-wider">Growth</div>
          <Link href="/launchpad" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Megaphone size={16}/> Launchpad</Link>
          <Link href="/research/business" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Briefcase size={16}/> Business Research</Link>
          <Link href="/research/student" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><GraduationCap size={16}/> Student Research</Link>
          <Link href="/data-room?excel=true" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Grid3X3 size={16}/> Excel Workspace</Link>
          <Link href="/data-room?chat=true" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><MessageCircle size={16}/> Quick Chat</Link>
          <div className="mt-4 mb-2 text-xs text-gray-500 uppercase tracking-wider">Enterprise</div>
          <Link href="/enterprise/audit" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><FileSearch size={16}/> Audit Mode</Link>
          <Link href="/enterprise/competitor" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Search size={16}/> Competitor Intelligence</Link>
          <Link href="/enterprise/security" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Shield size={16}/> Security & Compliance</Link>
          <div className="mt-4 mb-2 text-xs text-gray-500 uppercase tracking-wider">Community</div>
          <Link href="/circle/idea-wall" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Heart size={16}/> Idea Wall</Link>
          <Link href="/circle/office-hours" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Lightbulb size={16}/> Office Hours</Link>
          <Link href="/circle/success-board" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><BarChart3 size={16}/> Success Board</Link>
          <div className="mt-4 mb-2 text-xs text-gray-500 uppercase tracking-wider">Account</div>
          <Link href="/dashboard/team" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Users size={16}/> Team</Link>
          <Link href="/dashboard/settings" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Settings size={16}/> Settings</Link>
          <Link href="/dashboard/referrals" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Share2 size={16}/> Referrals</Link>
          <Link href="/dashboard/subscription" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><CreditCard size={16}/> Subscription</Link>
          <div className="mt-4 mb-2 text-xs text-gray-500 uppercase tracking-wider">Admin</div>
          <Link href="/admin" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><UserCog size={16}/> Admin Panel</Link>
          <div className="mt-4 mb-2 text-xs text-gray-500 uppercase tracking-wider">Public</div>
          <Link href="/contact" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><MessageSquare size={16}/> Contact Founder</Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
