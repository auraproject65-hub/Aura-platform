"use client";
import { useState } from 'react';

export default function LaunchpadPage() {
  const [inputType, setInputType] = useState<'description' | 'url' | 'pitch'>('description');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<any>(null);

  const analyze = async () => {
    // Simulate different analysis based on input type
    let res;
    if (inputType === 'url') {
      res = {
        confidenceScore: Math.floor(Math.random() * 20 + 55),
        dimensions: { clarity: 65, marketAwareness: 60, operationalReadiness: 50, digitalPresence: 70, financialAwareness: 45 },
        strengths: ['Website is live and functional', 'Clear online presence'],
        gaps: ['No visible pricing', 'Missing testimonial section'],
        recommendations: ['Add a clear CTA above the fold', 'Include social proof'],
        expert_notes: [{ name: "Ms. Yuki Tanaka", role: "Startup Advisor", note: "Your website tells a story. Add a call to action to make it convert." }]
      };
    } else {
      // existing mock call
      const response = await fetch('/api/launchpad', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputType === 'url' ? { url: value } : { description: value }),
      });
      res = await response.json();
    }
    setResult(res);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-serif">Launchpad</h2>
      <p className="text-gray-400">Not sure if your business idea is ready? Let AURA's startup experts review it.</p>
      <div className="glass-card space-y-4">
        <div className="flex gap-4">
          {['description', 'url', 'pitch'].map(t => (
            <button key={t} onClick={() => setInputType(t as any)} className={`px-4 py-2 rounded ${inputType === t ? 'bg-aura-teal text-white' : 'bg-gray-700'}`}>
              {t === 'description' ? 'Describe Idea' : t === 'url' ? 'Website URL' : 'Pitch Deck'}
            </button>
          ))}
        </div>
        <textarea
          className="w-full bg-transparent border border-gray-600 rounded-lg p-3 h-32"
          placeholder={inputType === 'url' ? 'https://...' : 'Describe your business idea...'}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={analyze} className="btn-primary">Analyze My Idea</button>
      </div>

      {result && (
        <div className="glass-card space-y-4">
          <h3 className="text-xl font-semibold">Confidence Score: {result.confidenceScore}/100</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(result.dimensions).map(([k, v]: any) => (
              <div key={k} className="p-2 bg-black/20 rounded">
                <p className="text-sm text-gray-400 capitalize">{k}</p>
                <p className="text-lg font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div><h4 className="text-aura-gold">Strengths</h4><ul className="list-disc list-inside text-green-400">{result.strengths.map((s:string,i:number)=><li key={i}>{s}</li>)}</ul></div>
          <div><h4 className="text-aura-gold">Gaps</h4><ul className="list-disc list-inside text-red-400">{result.gaps.map((g:string,i:number)=><li key={i}>{g}</li>)}</ul></div>
          <div><h4 className="text-aura-gold">Recommendations</h4><ul className="list-disc list-inside">{result.recommendations.map((r:string,i:number)=><li key={i}>{r}</li>)}</ul></div>
          {result.expert_notes && (
            <div className="border-t border-white/10 pt-3">
              {result.expert_notes.map((n:any,i:number)=>(
                <div key={i} className="flex items-start gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-aura-teal flex items-center justify-center text-xs">{n.name[0]}</div>
                  <p className="text-sm italic">"{n.note}" – {n.name}, {n.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
