"use client";
import type { FormEvent } from 'react';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/ceo-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl">Message sent! Edward will respond shortly.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="glass-card max-w-md w-full space-y-4">
        <h2 className="text-2xl font-serif">Message the Founder</h2>
        <input
          className="w-full bg-transparent border border-gray-600 rounded-lg p-3"
          placeholder="Your Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="w-full bg-transparent border border-gray-600 rounded-lg p-3"
          placeholder="Your Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          className="w-full bg-transparent border border-gray-600 rounded-lg p-3 h-24"
          placeholder="Your message..."
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          required
        />
        <button className="btn-primary w-full" type="submit">Send Message</button>
      </form>
    </div>
  );
}
