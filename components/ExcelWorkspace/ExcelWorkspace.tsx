"use client";
import { useState } from 'react';

export default function ExcelWorkspace() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const handleCommand = async () => {
    // Simulate AI Excel processing
    const res = await fetch('/api/analytics/excel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
    });
    const data = await res.json();
    setOutput(data.result);
  };

  return (
    <div className="glass-card space-y-4">
      <h3 className="text-lg font-semibold">AI Excel Assistant</h3>
      <p className="text-sm text-gray-400">Type a command like "Show me a bar chart of monthly revenue"</p>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-transparent border border-gray-600 rounded-lg p-2"
          value={command}
          onChange={e => setCommand(e.target.value)}
          placeholder="e.g., Pivot table of expenses by category"
        />
        <button onClick={handleCommand} className="btn-primary">Run</button>
      </div>
      {output && <div className="p-4 bg-black/20 rounded-lg">{output}</div>}
    </div>
  );
}
