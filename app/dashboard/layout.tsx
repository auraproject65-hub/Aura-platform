import Link from 'next/link';
import { BarChart3, Upload, Lightbulb, Settings, Users, CreditCard } from 'lucide-react';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-aura-navy border-r border-white/5 flex flex-col p-4">
        <h1 className="text-2xl font-serif text-aura-teal mb-8">AURA</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><BarChart3 size={18}/> Overview</Link>
          <Link href="/data-room" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Upload size={18}/> Data Room</Link>
          <Link href="/insights" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Lightbulb size={18}/> Insights</Link>
          <Link href="/dashboard/team" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Users size={18}/> Team</Link>
          <Link href="/dashboard/settings" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><Settings size={18}/> Settings</Link>
          <Link href="/dashboard/subscription" className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg"><CreditCard size={18}/> Subscription</Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
