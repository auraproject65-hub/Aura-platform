import { NextRequest, NextResponse } from 'next/server';
import { generateResearch } from '@/lib/mockAI';

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  const result = generateResearch(query, 'business');
  return NextResponse.json(result);
}
