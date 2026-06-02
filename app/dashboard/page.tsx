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
      <h2 className="text-3xl font-serif">Welcome back, {user.email?.split('@')[0] || 'Founder'}</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="glass-card text-center">
          <p className="text-sm text-gray-400">Health Score</p>
          <p className="text-3xl font-bold text-aura-teal">{user.healthScore}</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-sm text-gray-400">Streak</p>
          <p className="text-3xl font-bold">{user.streak} days</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-sm text-gray-400">Badges</p>
          <div className="flex gap-1 justify-center">
            {user.badges.map((b: any) => (
              <span key={b.id} title={b.name} className="text-xl">🏅</span>
            ))}
            {user.badges.length === 0 && <span className="text-gray-500">None yet</span>}
          </div>
        </div>
        <div className="glass-card text-center">
          <p className="text-sm text-gray-400">Goal Progress</p>
          <p className="text-3xl font-bold">{user.goal ? `${user.goal.progress}%` : '—'}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={() => router.push('/data-room')} className="btn-primary">New Analysis</button>
        <button onClick={() => router.push('/launchpad')} className="btn-gold">Try Launchpad</button>
      </div>
    </div>
  );
}
