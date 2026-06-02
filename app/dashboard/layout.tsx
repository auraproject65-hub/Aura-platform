"use client";
import Link from 'next/link';
import { BarChart3, Upload, Lightbulb, Settings, Users, CreditCard, Briefcase, GraduationCap, MessageCircle, Grid3X3 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-aura-navy border-r border-white/5 flex flex-col p-4">
        <h1 className="text-2xl font-serif text-aura-teal mb-8">AURA</h1>
        <nav className="flex flex-col gap-1 text-sm">
          <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><BarChart3 size={16}/> Overview</Link>
          <Link href="/data-room" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Upload size={16}/> Data Room</Link>
          <Link href="/insights" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Lightbulb size={16}/> Insights</Link>
          <div className="mt-4 mb-2 text-xs text-gray-500 uppercase tracking-wider">Workspaces</div>
          <Link href="/research/business" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Briefcase size={16}/> Business Research</Link>
          <Link href="/research/student" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><GraduationCap size={16}/> Student Research</Link>
          <Link href="/data-room?excel=true" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Grid3X3 size={16}/> Excel Workspace</Link>
          <Link href="/data-room?chat=true" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><MessageCircle size={16}/> Quick Chat</Link>
          <div className="mt-4 mb-2 text-xs text-gray-500 uppercase tracking-wider">Account</div>
          <Link href="/dashboard/team" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Users size={16}/> Team</Link>
          <Link href="/dashboard/settings" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Settings size={16}/> Settings</Link>
          <Link href="/dashboard/subscription" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><CreditCard size={16}/> Subscription</Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
