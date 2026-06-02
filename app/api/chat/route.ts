import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  // Simulate AI reply
  const reply = "I've analyzed your input. It looks like a typical business query. Would you like a full report?";
  return NextResponse.json({ reply });
}
