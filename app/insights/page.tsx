"use client";
import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Watermark from '@/components/Watermark/Watermark';

export default function InsightsPage() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAnalysis = async () => {
      const res = await fetch('/api/analytics/latest');
      const data = await res.json();
      setAnalysis(data);
    };
    fetchAnalysis();
  }, []);

  if (!analysis) return <div className="p-8">Loading insights...</div>;

  return (
    <div className="space-y-6 relative">
      <div className="flex gap-4 border-b border-white/10 pb-2">
        {['overview', 'revenue', 'expenses', 'benchmarks', 'risk'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg ${activeTab === tab ? 'bg-aura-teal text-white' : 'text-gray-400 hover:text-white'}`}
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
                <Line type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <Watermark />
          </div>
          <div className="glass-card">
            <h3 className="text-lg font-semibold">KPI Snapshot</h3>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {Object.entries(analysis.kpi_snapshot).map(([key, value]: any) => (
                <div key={key} className="p-2">
                  <p className="text-sm text-gray-400">{key}</p>
                  <p className="text-xl font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card col-span-2">
            <h3 className="text-lg font-semibold">Strengths & Loopholes</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <ul className="list-disc list-inside text-green-400">
                {analysis.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
              <ul className="list-disc list-inside text-red-400">
                {analysis.loopholes.map((l: string, i: number) => <li key={i}>{l}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="glass-card">
          <h3 className="text-lg font-semibold">Revenue Deep Dive</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analysis.monthly_revenue_forecast}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0D9488" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === 'risk' && (
        <div className="glass-card">
          <h3 className="text-lg font-semibold">Decision Matrix & Risk Factors</h3>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-2">Option</th>
                  <th className="p-2">Advantages</th>
                  <th className="p-2">Disadvantages</th>
                  <th className="p-2">Impact</th>
                  <th className="p-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {analysis.decision_matrix.map((opt: any, i: number) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="p-2">{opt.option}</td>
                    <td className="p-2 text-sm">{opt.advantages}</td>
                    <td className="p-2 text-sm">{opt.disadvantages}</td>
                    <td className="p-2 text-sm">{opt.financialImpact}</td>
                    <td className="p-2">{opt.score.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Additional tabs for expenses, benchmarks, etc. can be similarly built */}
    </div>
  );
}
