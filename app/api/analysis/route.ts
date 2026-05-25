import { NextResponse } from 'next/server';
import { addAnalysis, getDatasetById, getLatestAnalysis } from '@/lib/store';
import { runMockAI } from '@/lib/mockAI';

export async function GET() {
  const analysis = getLatestAnalysis();
  return NextResponse.json({ analysis });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { datasetId, industry } = body;

  const dataset = getDatasetById(datasetId);
  if (!dataset) {
    return NextResponse.json({ error: 'Dataset not found' }, { status: 404 });
  }

  const analysis = runMockAI(dataset, industry || dataset.industry);
  addAnalysis(analysis);

  return NextResponse.json({ ok: true, analysis });
}
