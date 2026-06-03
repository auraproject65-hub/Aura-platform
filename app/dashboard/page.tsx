"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateStreak } from '@/lib/user';

export default function DashboardOverview() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const email = 'demo@aura.ai';
    const u = updateStreak(email);
    setUser(u);
  }, []);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="glass-card flex items-center gap-4 p-6">
        <div className="w-12 h-12 rounded-full bg-aura-gold/20 flex items-center justify-center text-aura-gold font-bold text-xl">EO</div>
        <div>
          <h2 className="text-2xl font-serif">Welcome back, Edward</h2>
          <p className="text-sm text-aura-muted">Founder & CEO, AURA Inc.</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-aura-muted">Health Score</p>
          <p className="text-3xl font-bold text-aura-gold">{user.healthScore}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card text-center">
          <p className="text-sm text-aura-muted">Streak</p>
          <p className="text-2xl font-bold">{user.streak} days</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-sm text-aura-muted">Badges</p>
          <div className="flex justify-center gap-1 mt-1">
            {user.badges.length > 0 ? user.badges.map((b: any) => <span key={b.id} title={b.name} className="text-lg">🏅</span>) : <span className="text-aura-muted">—</span>}
          </div>
        </div>
        <div className="glass-card text-center">
          <p className="text-sm text-aura-muted">Analyses Run</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-sm text-aura-muted">Goal Progress</p>
          <p className="text-2xl font-bold">68%</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={() => router.push('/data-room')} className="btn-primary">New Analysis</button>
        <button onClick={() => router.push('/launchpad')} className="btn-secondary">Try Launchpad</button>
      </div>
    </div>
  );
}
