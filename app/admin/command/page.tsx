"use client";
import AdminGuard from '@/components/Admin/AdminGuard';
import { useState } from 'react';

function CommandCenterInner() {
  const [chat, setChat] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: '👋 Good morning, Edwin. All systems operational. OpenAI balance: $18.40.' },
  ]);
  const [input, setInput] = useState('');

  const sendCommand = async () => {
    if (!input.trim()) return;
    setChat(prev => [...prev, { role: 'user', content: input }]);
    try {
      const res = await fetch('/api/admin/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setChat(prev => [...prev, { role: 'assistant', content: data.reply || 'No response' }]);
    } catch (e) {
      setChat(prev => [...prev, { role: 'assistant', content: 'Error contacting command API.' }]);
    }
    setInput('');
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-serif">Command Center</h2>
      <p className="text-sm text-gray-400">Type commands like "status", "credits", "weekly".</p>
      <div className="glass-card h-96 overflow-y-auto space-y-2 p-4">
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded-lg ${msg.role === 'user' ? 'bg-aura-teal/30' : 'bg-gray-700'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendCommand()}
          placeholder="e.g., briefing"
        />
        <button onClick={sendCommand} className="btn-primary">Send</button>
      </div>
    </div>
  );
}

export default function CommandCenter() {
  return (
    <AdminGuard>
      <CommandCenterInner />
    </AdminGuard>
  );
}
"use client";
import { useState } from 'react';

export default function CommandCenter() {
  const [chat, setChat] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: '👋 Good morning, Edwin. All systems operational. OpenAI balance: $18.40.' },
  ]);
  const [input, setInput] = useState('');

  const sendCommand = async () => {
    if (!input.trim()) return;

    setChat(prev => [...prev, { role: 'user', content: input }]);
    const res = await fetch('/api/admin/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setChat(prev => [...prev, { role: 'assistant', content: data.reply }]);
    setInput('');
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-serif">Command Center</h2>
      <p className="text-sm text-gray-400">Type commands like "status", "credits", "weekly".</p>
      <div className="glass-card h-96 overflow-y-auto space-y-2 p-4">
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-2 rounded-lg ${msg.role === 'user' ? 'bg-aura-teal/30' : 'bg-gray-700'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendCommand()}
          placeholder="e.g., briefing"
        />
        <button onClick={sendCommand} className="btn-primary">Send</button>
      </div>
    </div>
  );
}
