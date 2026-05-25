'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

const starterMessages: ChatMessage[] = [
  { role: 'assistant', content: 'Hi! How can I help you with AI forecasting and workspace planning today?' },
  { role: 'assistant', content: 'Try asking about your forecast, team setup, or insights download.' },
];

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!open) {
      return;
    }
  }, [open]);

  const sendMessage = async () => {
    if (!draft.trim()) {
      return;
    }

    const userMessage = { role: 'user' as const, content: draft.trim() };
    setMessages((current) => [...current, userMessage]);
    setDraft('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage.content }),
    });

    const data = await response.json();
    setMessages((current) => [...current, { role: 'assistant', content: data?.reply || 'Thanks — your request has been captured.' }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[80]">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="mb-3 w-[340px]">
            <Card className="border-white/10 bg-[#0B0F19]/95 text-white shadow-2xl">
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">AURA Live Chat</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}><X className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="max-h-64 space-y-2 overflow-auto pr-2">
                  {messages.map((message, index) => (
                    <div key={`${message.content}-${index}`} className={`rounded-2xl px-3 py-2 text-sm ${message.role === 'assistant' ? 'bg-white/5 text-slate-100' : 'bg-aura-cyan/20 text-white'}`}>
                      {message.content}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask a question" className="flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none" />
                  <Button onClick={sendMessage} size="icon"><Send className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button onClick={() => setOpen(!open)} className="rounded-full shadow-glow">
        <MessageCircle className="h-4 w-4" />
      </Button>
    </div>
  );
}
