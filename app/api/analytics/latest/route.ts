import { NextResponse } from 'next/server';
import { generateAnalysis } from '@/lib/mockAI';

export async function GET() {
  const result = generateAnalysis({ industry: 'retail', companyName: 'Demo Company' });
  return NextResponse.json(result);
}
