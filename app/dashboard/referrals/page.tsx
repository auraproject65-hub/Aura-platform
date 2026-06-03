"use client";
import { useEffect, useState } from 'react';

export default function ReferralPage() {
  const [code, setCode] = useState('');
  const [signups, setSignups] = useState(0);

  useEffect(() => {
    // Simulate fetch referral code
    const token = typeof window !== 'undefined' ? (localStorage.getItem('aura_token') || 'demo') : 'demo';
    const dummyCode = `AURA-${(token || '').slice(0,6).toUpperCase()}`;
    setCode(dummyCode);
    setSignups(Math.floor(Math.random() * 5));
  }, []);

  const copyLink = () => {
    if (!code) return;
    navigator.clipboard.writeText(`https://aura.ai?ref=${code}`);
    alert('Referral link copied!');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-serif">Referrals</h2>
      <div className="glass-card space-y-4">
        <p className="text-sm text-gray-400">Share AURA with other businesses and earn rewards.</p>
        <div className="flex items-center gap-2">
          <input className="flex-1 bg-transparent border border-gray-600 rounded p-2 text-sm" readOnly value={`https://aura.ai?ref=${code}`} />
          <button onClick={copyLink} className="btn-primary text-sm">Copy</button>
        </div>
        <p className="text-sm">Sign‑ups from your link: <span className="text-aura-teal font-bold">{signups}</span></p>
      </div>
    </div>
  );
}
