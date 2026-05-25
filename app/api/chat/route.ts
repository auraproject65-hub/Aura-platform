import { NextResponse } from 'next/server';
import { addChatMessage } from '@/lib/store';

const replies = [
  'Thanks — your message has been logged and routed to the premium workspace assistant.',
  'I have captured your request and I am preparing a focused response for your team.',
  'Your message is queued for review in the AURA intelligence workspace.',
];

export async function POST(request: Request) {
  const body = await request.json();
  const message = String(body?.message || '').trim();

  if (!message) {
    return NextResponse.json({ error: 'Missing message' }, { status: 400 });
  }

  addChatMessage({ id: `chat-${Date.now()}`, role: 'user', content: message, createdAt: new Date().toISOString() });
  const reply = replies[Math.floor(Math.random() * replies.length)];
  addChatMessage({ id: `chat-${Date.now() + 1}`, role: 'assistant', content: reply, createdAt: new Date().toISOString() });

  return NextResponse.json({ ok: true, reply });
}
