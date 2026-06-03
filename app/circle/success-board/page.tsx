"use client";
import { useEffect, useState } from 'react';

export default function SuccessBoard() {
  const [wins, setWins] = useState([
    { user: 'Anon', achievement: 'Hit 90 Health Score', date: '2 hours ago' },
    { user: 'Anon', achievement: '30-day streak', date: '1 day ago' },
  ]);

  useEffect(() => {
    const badgeAdded = localStorage.getItem('aura_last_badge');
    if (badgeAdded) {
      const badge = JSON.parse(badgeAdded);
      setWins(prev => [{ user: 'You', achievement: `Earned "${badge.name}" badge`, date: 'just now' }, ...prev]);
      localStorage.removeItem('aura_last_badge');
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Success Board</h2>
      <p className="text-aura-muted">Celebrate wins from the AURA community.</p>
      <div className="space-y-2">
        {wins.map((w, i) => (
          <div key={i} className="glass-card flex justify-between">
            <span className="font-medium">{w.achievement}</span>
            <span className="text-sm text-aura-muted">{w.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
