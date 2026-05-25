'use client';

import { useEffect, useMemo, useState } from 'react';
import { FileSpreadsheet, FileText, ImageIcon, Table2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SkeletonBlock } from '@/components/loading-skeleton';

interface DatasetRecord {
  id: string;
  filename: string;
  industry: string;
  mimeType: string;
  previewType: 'table' | 'text' | 'image' | 'pdf';
  contentPreview: string;
  rows: Array<Record<string, string>>;
  uploadedAt: string;
}

export default function DataRoomPage() {
  const [datasets, setDatasets] = useState<DatasetRecord[]>([]);
  const [industry, setIndustry] = useState('SaaS');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadDatasets = async () => {
    const response = await fetch('/api/upload');
    const data = await response.json();
    setDatasets(data.datasets || []);
    setInitialLoading(false);
  };

  useEffect(() => {
    loadDatasets();
  }, []);

  const uploadFile = async () => {
    if (!file) {
      setStatus('Select a file to upload.');
      return;
    }

    setLoading(true);
    setStatus('Uploading and extracting preview...');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('industry', industry);

    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus(data.error || 'Upload failed.');
      return;
    }

    setStatus(`Uploaded ${data.filename}.`);
    await loadDatasets();
  };

  const recentPreview = useMemo(() => datasets[0], [datasets]);

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/[0.03] text-white">
        <CardHeader>
          <CardTitle>Multi-format Data Room</CardTitle>
          <CardDescription className="text-slate-200">Accept CSV, XLSX, PDF, JPG, and PNG uploads with in-memory previews and AI-ready storage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Industry" value={industry} onChange={(event) => setIndustry(event.target.value)} />
            <Input type="file" accept=".csv,.xlsx,.xls,.pdf,.jpg,.jpeg,.png" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={uploadFile} disabled={loading}>
              <UploadCloud className="mr-2 h-4 w-4" />
              {loading ? 'Processing...' : 'Upload and analyse'}
            </Button>
            <span className="text-sm text-slate-200">{status}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <CardTitle>Recent uploads</CardTitle>
            <CardDescription className="text-slate-200">Stored in-memory for the current session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {initialLoading ? (
              <>
                <SkeletonBlock className="h-16" />
                <SkeletonBlock className="h-16" />
              </>
            ) : datasets.length === 0 ? (
              <p className="text-sm text-slate-200">No files uploaded yet.</p>
            ) : (
              datasets.slice(0, 4).map((dataset) => (
                <div key={dataset.id} className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{dataset.filename}</p>
                      <p className="text-sm text-slate-200">{dataset.industry} • {dataset.mimeType}</p>
                    </div>
                    {dataset.previewType === 'table' ? <Table2 className="h-5 w-5 text-aura-cyan" /> : dataset.previewType === 'image' ? <ImageIcon className="h-5 w-5 text-aura-cyan" /> : dataset.previewType === 'pdf' ? <FileText className="h-5 w-5 text-aura-cyan" /> : <FileSpreadsheet className="h-5 w-5 text-aura-cyan" />}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription className="text-slate-200">CSV and XLSX rows render as table previews; other files show a summary.</CardDescription>
          </CardHeader>
          <CardContent>
            {initialLoading ? (
              <SkeletonBlock className="h-56" />
            ) : recentPreview ? (
              recentPreview.previewType === 'table' ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-200">
                        {Object.keys(recentPreview.rows[0] || {}).map((header) => <th key={header} className="pb-2">{header}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {recentPreview.rows.slice(0, 5).map((row, index) => (
                        <tr key={`${row}-${index}`} className="border-t border-white/10">
                          {Object.values(row).map((value, innerIndex) => <td key={`${value}-${innerIndex}`} className="py-2">{value}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-200">{recentPreview.contentPreview}</p>
                  <p className="mt-3 text-sm font-semibold text-white">{recentPreview.filename}</p>
                </div>
              )
            ) : (
              <p className="text-sm text-slate-200">Upload a file to see the preview here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
