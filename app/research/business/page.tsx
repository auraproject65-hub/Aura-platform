"use client";
import { useState } from 'react';

export default function BusinessResearch() {
  const [query, setQuery] = useState('');
  const [report, setReport] = useState<any>(null);

  const runResearch = async () => {
    const res = await fetch('/api/research/business', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setReport(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Business Research Workspace</h2>
      <div className="glass-card flex gap-2">
        <input
          className="flex-1 bg-transparent border border-gray-600 rounded-lg p-3"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="e.g., Analyze the competitive landscape for electric vehicles in Europe"
        />
        <button onClick={runResearch} className="btn-primary">Research</button>
      </div>
      {report && (
        <div className="glass-card space-y-4">
          {report.sections.map((sec: any, i: number) => (
            <div key={i}>
              <h3 className="text-lg font-semibold text-aura-gold">{sec.title}</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{sec.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
