"use client";
import { useEffect, useState } from 'react';

export default function SuccessBoard() {
  const [wins, setWins] = useState([
    { user: 'Anon', achievement: 'Hit 90 Health Score', date: '2 hours ago' },
    { user: 'Anon', achievement: '30-day streak', date: '1 day ago' },
  ]);

  useEffect(() => {
    // Check if user earned a new badge and add it
    const badgeAdded = typeof window !== 'undefined' ? localStorage.getItem('aura_last_badge') : null;
    if (badgeAdded) {
      try {
        const badge = JSON.parse(badgeAdded);
        setWins(prev => [{ user: 'You', achievement: `Earned "${badge.name}" badge`, date: 'just now' }, ...prev]);
      } catch {}
      localStorage.removeItem('aura_last_badge');
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Success Board</h2>
      <p className="text-gray-400">Celebrate wins from the AURA community.</p>
      <div className="space-y-2">
        {wins.map((w, i) => (
          <div key={i} className="glass-card flex justify-between">
            <span className="font-medium">{w.achievement}</span>
            <span className="text-sm text-gray-500">{w.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
