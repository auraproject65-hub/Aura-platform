import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message } = (await req.json()) as { name: string; email: string; message: string };
  const draftReply = `Hi ${name},\n\nThanks for reaching out. Your message about "${message.slice(0, 50)}..." has been received. I'll personally review it and get back to you within 24 hours.\n\nBest,\nEdward Owusu Boadi\nFounder, AURA`;

  console.log(`[CEO Message] From: ${email}, Message: ${message}`);
  console.log(`[Draft Reply] ${draftReply}`);

  return NextResponse.json({ success: true, draftReply, note: 'CEO will review.' });
}
