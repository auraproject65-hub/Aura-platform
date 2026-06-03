"use client";
import { generateDailyBriefing } from '@/lib/autopilot';

export default function DailyBriefingPage() {
  const briefing = generateDailyBriefing();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Daily Briefing – {briefing.date}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card">
          <p className="text-sm text-gray-400">Health Score</p>
          <p className="text-2xl font-bold">{briefing.healthScore}</p>
        </div>
        <div className="glass-card">
          <p className="text-sm text-gray-400">New Signups</p>
          <p className="text-2xl font-bold">{briefing.newSignups}</p>
        </div>
        <div className="glass-card">
          <p className="text-sm text-gray-400">Analyses Run</p>
          <p className="text-2xl font-bold">{briefing.analysesRun}</p>
        </div>
        <div className="glass-card">
          <p className="text-sm text-gray-400">Credits</p>
          <p className="text-2xl font-bold">${briefing.creditBalance}</p>
        </div>
      </div>
      <div className="glass-card">
        <h3 className="font-semibold">Alerts</h3>
        <ul className="list-disc list-inside text-sm">
          {briefing.alerts.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
      <div className="glass-card">
        <h3 className="font-semibold">Top Metric</h3>
        <p>{briefing.topMetric}</p>
      </div>
    </div>
  );
}
