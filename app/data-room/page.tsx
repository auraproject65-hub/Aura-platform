"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DataRoom() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/upload', { method: 'POST', body: formData });

    const res = await fetch('/api/analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, industry: 'retail', companyName: 'Demo' }),
    });
    const analysis = await res.json();
    localStorage.setItem('aura_latest_analysis', JSON.stringify(analysis));
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Data Room</h2>
      <p className="text-aura-muted">Drop any spreadsheet, CSV, or PDF. AURA will automatically extract insights.</p>
      <div className="glass-card space-y-4">
        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-aura-gold/50 transition-colors">
          <input type="file" accept=".csv,.xlsx,.pdf,.jpg,.png" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer block">
            <div className="text-4xl mb-2">📁</div>
            <p className="text-sm text-aura-muted">{file ? file.name : 'Drag & drop or click to browse'}</p>
          </label>
        </div>
        <button onClick={handleUpload} disabled={!file || loading} className="btn-primary w-full">
          {loading ? 'Analyzing...' : 'Run AURA Analysis'}
        </button>
      </div>

      {result && (
        <div className="glass-card space-y-4 animate-fadeUp">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-aura-gold">Analysis Complete</h3>
            <span className="text-sm bg-aura-gold/20 px-3 py-1 rounded-full text-aura-gold">Pro</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-aura-muted">Yearly Projection</p>
              <p className="text-2xl font-bold">${result.yearly_total_projection?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-aura-muted">Gross Margin</p>
              <p className="text-2xl font-bold">{result.kpi_snapshot?.grossMargin || '—'}</p>
            </div>
            <div>
              <p className="text-sm text-aura-muted">Top Risk</p>
              <p className="text-2xl font-bold">{result.loopholes?.[0] || 'None'}</p>
            </div>
          </div>
          {result.expert_notes && (
            <div className="border-t border-white/10 pt-3">
              {result.expert_notes.map((note: any, i: number) => (
                <div key={i} className="flex items-start gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-aura-gold/20 flex items-center justify-center text-xs">{note.name[0]}</div>
                  <p className="text-sm italic">"{note.note}" – {note.name}, {note.role}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => router.push('/insights')} className="btn-primary w-full mt-4">
            View Full Premium Report →
          </button>
          <p className="text-xs text-aura-muted text-center">This insight is AI‑generated and for informational purposes only.</p>
        </div>
      )}
    </div>
  );
}
