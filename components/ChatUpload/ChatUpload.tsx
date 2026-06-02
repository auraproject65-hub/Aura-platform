"use client";
import { useState } from 'react';

export default function ChatUpload() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{role: string; content: string}[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setChat(prev => [...prev, { role: 'user', content: message }]);
    setMessage('');
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setChat(prev => [...prev, { role: 'assistant', content: data.reply }]);
  };

  return (
    <div className="glass-card space-y-4">
      <h3 className="text-lg font-semibold">Quick Chat</h3>
      <div className="h-64 overflow-y-auto space-y-2 p-2 bg-black/20 rounded-lg">
        {chat.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-aura-teal/20 ml-auto' : 'bg-gray-700'} max-w-[80%]`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type or paste numbers..."
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="btn-primary">Send</button>
      </div>
    </div>
  );
}
