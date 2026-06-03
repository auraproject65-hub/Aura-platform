"use client";
import AdminGuard from '@/components/Admin/AdminGuard';
import Link from 'next/link';
import { Bot, BarChart3, PenLine, Coins } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="glass-card flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-aura-teal flex items-center justify-center text-xl font-bold">EO</div>
        <div>
          <h2 className="text-2xl font-serif">AURA Admin — Welcome, Edward Owusu Boadi</h2>
          <p className="text-sm text-gray-400">Founder & CEO</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/command" className="glass-card hover:shadow-aura-teal/20 transition">
          <Bot size={24} className="text-aura-teal mb-2" />
          <h3 className="text-lg font-semibold">Command Center</h3>
          <p className="text-sm text-gray-400">WhatsApp‑style console. Control the entire platform with messages.</p>
        </Link>
        <Link href="/admin/briefing" className="glass-card hover:shadow-aura-teal/20 transition">
          <BarChart3 size={24} className="text-aura-teal mb-2" />
          <h3 className="text-lg font-semibold">Daily Briefing</h3>
          <p className="text-sm text-gray-400">Today's stats, signups, alerts, and top metrics.</p>
        </Link>
        <Link href="/admin/social" className="glass-card hover:shadow-aura-teal/20 transition">
          <PenLine size={24} className="text-aura-teal mb-2" />
          <h3 className="text-lg font-semibold">Social Media</h3>
          <p className="text-sm text-gray-400">AI‑generated weekly content plan. Approve posts here.</p>
        </Link>
        <Link href="/admin/credits" className="glass-card hover:shadow-aura-teal/20 transition">
          <Coins size={24} className="text-aura-teal mb-2" />
          <h3 className="text-lg font-semibold">Credits & Billing</h3>
          <p className="text-sm text-gray-400">OpenAI balance, auto‑top‑up, transaction history.</p>
        </Link>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
}
