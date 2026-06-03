"use client";
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Watermark from '@/components/Watermark/Watermark';

export default function InsightsPage() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const stored = localStorage.getItem('aura_latest_analysis');
    if (stored) {
      try {
        setAnalysis(JSON.parse(stored));
      } catch {}
    }
    if (!stored) {
      const fetchAnalysis = async () => {
        try {
          const res = await fetch('/api/analytics/latest');
          const data = await res.json();
          setAnalysis(data);
        } catch {}
      };
      fetchAnalysis();
    }
  }, []);

  if (!analysis) return <div className="p-8">No analysis yet. Run one from the Data Room.</div>;

  return (
    <div className="space-y-6 relative">
      <div className="flex gap-4 border-b border-white/10 pb-2 overflow-x-auto">
        {['overview', 'revenue', 'expenses', 'benchmarks', 'risk', 'cohort', 'heatmap'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-4 py-2 rounded-t-lg whitespace-nowrap ${activeTab === tab ? 'bg-aura-gold text-aura-base' : 'text-aura-muted hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card relative">
            <h3 className="text-lg font-semibold">12‑Month Forecast</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analysis.monthly_revenue_forecast}>
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <Watermark />
          </div>
          <div className="glass-card">
            <h3 className="text-lg font-semibold">KPI Snapshot</h3>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {analysis.kpi_snapshot && Object.entries(analysis.kpi_snapshot).map(([key, value]: any) => (
                <div key={key} className="p-2">
                  <p className="text-sm text-aura-muted">{key}</p>
                  <p className="text-xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
          {analysis.expert_notes && (
            <div className="glass-card col-span-2">
              <h3 className="text-lg font-semibold text-aura-gold">Expert Panel Review</h3>
              {analysis.expert_notes.map((note: any, i: number) => (
                <div key={i} className="flex items-start gap-3 mt-2">
                  <div className="w-8 h-8 rounded-full bg-aura-gold/20 flex items-center justify-center text-xs font-bold">{note.name[0]}</div>
                  <div>
                    <p className="text-sm font-medium">{note.name}, {note.role}</p>
                    <p className="text-sm text-aura-muted italic">"{note.note}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'cohort' && (
        <div className="glass-card">
          <h3 className="text-lg font-semibold">Cohort Analysis (Demo)</h3>
          <p className="text-aura-muted mt-2">Shows user retention by cohort. Upgrade to Pro for full interactive charts.</p>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, i) => (
              <div key={week} className="p-3 bg-black/20 rounded text-center">
                <p className="text-xs text-aura-muted">{week}</p>
                <p className="text-lg font-bold">{100 - i * 12}%</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'heatmap' && (
        <div className="glass-card">
          <h3 className="text-lg font-semibold">Revenue Heatmap (Demo)</h3>
          <p className="text-aura-muted mt-2">Monthly revenue intensity by product category. Upgrade to Pro for full view.</p>
          <div className="grid grid-cols-4 gap-1 mt-4">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="h-8 rounded-sm" style={{ backgroundColor: `rgba(212,175,55,${0.2 + Math.random() * 0.6})` }} />
            ))}
          </div>
          <p className="text-xs text-aura-muted mt-2">Jan – Dec intensity</p>
        </div>
      )}
    </div>
  );
}
