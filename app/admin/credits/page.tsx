"use client";
import { useState } from 'react';

export default function CreditsAdmin() {
  const [balance, setBalance] = useState(18.40); // demo balance
  const [usageToday, setUsageToday] = useState(12);
  const [threshold, setThreshold] = useState(5);
  const [autoTopUp, setAutoTopUp] = useState(false);

  const simulateTopUp = () => {
    setBalance(balance + 20);
    alert('Simulated top‑up: +$20');
  };

  const daysLeft = (balance / (usageToday || 1) * 30).toFixed(1);

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-serif">Credits & Billing</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card text-center">
          <p className="text-sm text-gray-400">OpenAI Balance</p>
          <p className="text-3xl font-bold text-aura-teal">${balance.toFixed(2)}</p>
        </div>
        <div className="glass-card text-center">
          <p className="text-sm text-gray-400">Est. Days Remaining</p>
          <p className="text-3xl font-bold">{daysLeft}</p>
        </div>
      </div>
      <div className="glass-card space-y-4">
        <h3 className="text-lg font-semibold">Auto‑Top‑Up</h3>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={autoTopUp} onChange={() => setAutoTopUp(!autoTopUp)} className="accent-aura-teal" />
          Enable automatic top‑up when balance falls below threshold
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm">Threshold:</span>
          <input
            type="number"
            value={threshold}
            onChange={e => setThreshold(Number(e.target.value))}
            className="w-20 bg-transparent border border-gray-600 rounded p-1"
          />
          <span className="text-sm">USD</span>
        </div>
        <button onClick={simulateTopUp} className="btn-primary">Simulate Manual Top‑Up ($20)</button>
      </div>
      <div className="glass-card">
        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
        <div className="text-sm space-y-1 text-gray-400">
          <p>Jun 01 14:23 – Analysis run (Pro user) – $0.03</p>
          <p>Jun 01 10:05 – Auto‑top‑up triggered – +$20.00</p>
          <p>May 31 22:10 – Analysis run (Lite user) – $0.0006</p>
        </div>
      </div>
    </div>
  );
}
