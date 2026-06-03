export default function Changelog() {
  const updates = [
    { version: 'v1.6', date: '2026-06-01', changes: ['Enterprise Audit Mode released.', 'Multi‑entity consolidation.'] },
    { version: 'v1.5', date: '2026-05-15', changes: ['Improved anomaly detection.', 'Added industry benchmarks.'] },
    { version: 'v1.4', date: '2026-04-20', changes: ['What‑If Simulator launched.', 'Excel AI Assistant.'] },
  ];
  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif mb-6">What's New</h1>
      <div className="space-y-4">
        {updates.map((u, i) => (
          <div key={i} className="glass-card">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-aura-teal">{u.version}</h3>
              <span className="text-sm text-gray-400">{u.date}</span>
            </div>
            <ul className="list-disc list-inside mt-2 text-sm">
              {u.changes.map((c, j) => (
                <li key={j}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
