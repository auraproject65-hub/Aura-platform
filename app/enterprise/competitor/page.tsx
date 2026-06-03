"use client";
import { useState } from 'react';
import { generateCompetitorAnalysis } from '@/lib/mockAI_enterprise';

export default function CompetitorPage() {
  const [competitorName, setCompetitorName] = useState('');
  const [competitors, setCompetitors] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);

  const addCompetitor = () => {
    if (!competitorName.trim()) return;
    setCompetitors([...competitors, { name: competitorName, revenue: 'Unknown' }]);
    setCompetitorName('');
  };

  const runAnalysis = () => {
    const res = generateCompetitorAnalysis(competitors, {});
    setAnalysis(res);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Competitor Intelligence Suite</h2>
      <p className="text-gray-400">Enter publicly known information about your competitors. AURA will generate a strategic playbook.</p>
      <div className="glass-card flex gap-2">
        <input
          className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2"
          placeholder="Competitor name"
          value={competitorName}
          onChange={e => setCompetitorName(e.target.value)}
        />
        <button onClick={addCompetitor} className="btn-gold">Add</button>
      </div>
      {competitors.length > 0 && (
        <div className="glass-card">
          <h3 className="font-semibold mb-2">Competitors ({competitors.length})</h3>
          <ul className="list-disc list-inside">
            {competitors.map((c, i) => <li key={i}>{c.name}</li>)}
          </ul>
          <button onClick={runAnalysis} className="btn-primary mt-3">Generate Intelligence Report</button>
        </div>
      )}
      {analysis && (
        <div className="glass-card space-y-4">
          <h3 className="text-lg font-semibold">Strategic Intelligence Report</h3>
          {analysis.landscape.map((item: any, i: number) => (
            <div key={i} className="p-3 bg-black/20 rounded">
              <h4 className="font-medium text-aura-gold">{item.name}</h4>
              <p className="text-sm">Est. Revenue: {item.estimatedRevenue}</p>
              <p className="text-sm">Strengths: {item.strengths.join(', ')}</p>
              <p className="text-sm">Weaknesses: {item.weaknesses.join(', ')}</p>
              <p className="text-sm">Blind Spot: {item.blindSpot}</p>
              <p className="text-sm mt-1 text-green-400">Recommended: {item.recommendedResponse}</p>
            </div>
          ))}
          <div>
            <h4 className="font-semibold mt-4">Strategic Playbook</h4>
            <ul className="list-disc list-inside text-sm">
              {analysis.strategicPlaybook.map((a: any, i: number) => (
                <li key={i}>{a.action} — Impact: {a.impact}, Effort: {a.effort}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
