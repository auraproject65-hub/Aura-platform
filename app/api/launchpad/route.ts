import { NextRequest, NextResponse } from 'next/server';
import { generateLaunchpadAnalysis } from '@/lib/mockAI';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = generateLaunchpadAnalysis(body);
  return NextResponse.json(result);
}
