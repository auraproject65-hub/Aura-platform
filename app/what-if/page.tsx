"use client";
import { useState } from 'react';

export default function WhatIfSimulator() {
  const [slider, setSlider] = useState(0);
  const baseRevenue = 50000;
  const newRevenue = Math.round(baseRevenue * (1 + slider / 100));
  const profitImpact = Math.round(newRevenue * 0.25);
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-serif">What‑If Simulator</h2>
      <p className="text-aura-muted">Adjust one variable and see how it changes your forecast.</p>
      <div className="glass-card space-y-4">
        <label className="block text-sm">Increase Marketing Spend</label>
        <input type="range" min="-50" max="50" value={slider} onChange={e => setSlider(Number(e.target.value))} className="w-full" />
        <div className="flex justify-between text-sm text-aura-muted">
          <span>-50%</span><span>{slider}%</span><span>+50%</span>
        </div>
        <button onClick={() => setShowResult(true)} className="btn-primary w-full">Simulate Impact</button>
      </div>
      {showResult && (
        <div className="glass-card space-y-2 animate-fadeUp">
          <h3 className="font-semibold text-aura-gold">Projected Change</h3>
          <p>New monthly revenue: <span className="font-bold">${newRevenue.toLocaleString()}</span></p>
          <p>Net profit impact: <span className="font-bold">+${profitImpact.toLocaleString()}</span></p>
          <p className="text-sm text-aura-muted">Based on a 25% net margin assumption.</p>
        </div>
      )}
    </div>
  );
}
