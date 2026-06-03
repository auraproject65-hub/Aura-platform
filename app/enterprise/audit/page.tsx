"use client";
import { useState } from 'react';
import { generateAuditReport } from '@/lib/mockAI_enterprise';

export default function AuditPage() {
  const [report, setReport] = useState<any>(null);

  const runAudit = () => {
    const res = generateAuditReport([], 'Demo Company');
    setReport(res);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Enterprise Audit Mode</h2>
      <p className="text-gray-400">Run a one‑click forensic financial scan. Results are confidential and downloadable.</p>
      <button onClick={runAudit} className="btn-primary">Run Audit Now</button>
      {report && (
        <div className="glass-card space-y-4 mt-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Audit Report – {report.companyName}</h3>
            <span className="text-sm text-gray-400">{new Date(report.reportDate).toLocaleDateString()}</span>
          </div>
          <p className="italic">{report.summary}</p>
          <div className="space-y-3">
            {report.findings.map((f: any, i: number) => (
              <div className={`p-3 rounded bg-${f.severity === 'high' ? 'red-900' : 'yellow-900'}/20 border-l-4 border-${f.severity === 'high' ? 'red' : 'yellow'}-500`}>
                <p className="font-medium">{f.description}</p>
                <p className="text-sm text-gray-400 mt-1">Severity: {f.severity} | Recommendation: {f.recommendation}</p>
              </div>
            ))}
          </div>
          <p className="font-semibold">{report.overallAssessment}</p>
          <button className="btn-primary">Download Full Report (PDF)</button>
        </div>
      )}
    </div>
  );
}
