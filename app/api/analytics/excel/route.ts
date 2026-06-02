import { NextRequest, NextResponse } from 'next/server';
import { generateAnalysis } from '@/lib/mockAI';

export async function POST(req: NextRequest) {
  const { command } = await req.json();
  const analysis = generateAnalysis({ industry: 'retail', companyName: 'Demo Company' });
  const result = `Simulated Excel command result for "${command}". Top-line revenue estimate: ${analysis.yearly_total_projection}.`;
  return NextResponse.json({ result });
}
