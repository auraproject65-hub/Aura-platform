import { NextRequest, NextResponse } from 'next/server';
import { generateAnalysis } from '@/lib/mockAI';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = generateAnalysis([], body.industry || 'retail', body.companyName);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
