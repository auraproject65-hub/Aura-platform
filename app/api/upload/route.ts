import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { addAnalysis, addDataset } from '@/lib/store';
import { runMockAI } from '@/lib/mockAI';

function buildPreviewFor(type: string, filename: string) {
  if (type === 'pdf') {
    return `PDF preview for ${filename}: executive summary, revenue highlights, retention opportunities.`;
  }

  if (type === 'image') {
    return `Image preview for ${filename}: visual summary of campaign performance and asset markers.`;
  }

  return `Document preview for ${filename}: AI-ready text content extracted from the upload.`;
}

export async function GET() {
  const { datasets } = await import('@/lib/store');
  return NextResponse.json({ datasets });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const industry = String(formData.get('industry') || 'SaaS');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name;
  const mimeType = file.type || 'application/octet-stream';
  const lowerName = filename.toLowerCase();

  let rows: Array<Record<string, string>> = [];
  let previewType: 'table' | 'text' | 'image' | 'pdf' = 'text';
  let contentPreview = buildPreviewFor('text', filename);

  if (lowerName.endsWith('.csv') || mimeType.includes('csv')) {
    const text = buffer.toString('utf8');
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true }) as {
      data: Array<Record<string, string>>;
      errors: Array<{ message: string }>;
    };

    if (parsed.errors.length) {
      return NextResponse.json({ error: parsed.errors[0].message }, { status: 400 });
    }

    rows = parsed.data;
    previewType = 'table';
    contentPreview = `CSV preview for ${filename} with ${rows.length} rows.`;
  } else if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls') || mimeType.includes('sheet')) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    rows = (XLSX.utils.sheet_to_json(worksheet, { defval: '' }) as Array<Record<string, string>>);
    previewType = 'table';
    contentPreview = `XLSX preview for ${filename} with ${rows.length} rows.`;
  } else if (lowerName.endsWith('.pdf') || mimeType.includes('pdf')) {
    previewType = 'pdf';
    contentPreview = buildPreviewFor('pdf', filename);
  } else if (lowerName.match(/\.(jpg|jpeg|png)$/) || mimeType.startsWith('image/')) {
    previewType = 'image';
    contentPreview = buildPreviewFor('image', filename);
  } else {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  }

  const dataset = {
    id: `dataset-${Date.now()}`,
    filename,
    industry,
    mimeType,
    rows,
    uploadedAt: new Date().toISOString(),
    contentPreview,
    previewType,
  };

  addDataset(dataset);
  const analysis = runMockAI(dataset, industry);
  addAnalysis(analysis);

  return NextResponse.json({ ok: true, filename, rows: rows.slice(0, 6), dataset, analysis });
}
