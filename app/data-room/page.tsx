"use client";
import { useState } from 'react';
import { AI_DISCLAIMER } from '@/lib/legal';

export default function DataRoom() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/upload', { method: 'POST', body: formData });
    const analysisRes = await fetch('/api/analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name }),
    });
    const analysis = await analysisRes.json();
    setResult(analysis);
  };

  return (
    <div>
      <h2 className="text-2xl font-serif mb-4">Data Room</h2>
      <div className="glass-card">
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="mb-4" />
        <button onClick={handleUpload} className="btn-primary">Run AURA Analysis</button>
        <p className="text-xs text-gray-500 mt-3">{AI_DISCLAIMER}</p>
      </div>
      {result && (
        <div className="glass-card mt-6">
          <p className="text-aura-gold">Analysis Complete</p>
          <p>Yearly Projection: ${result.yearly_total_projection}</p>
          <button className="btn-primary mt-4">View Full Premium Report →</button>
          <p className="text-xs text-gray-500 mt-3">{AI_DISCLAIMER}</p>
        </div>
      )}
    </div>
  );
}
