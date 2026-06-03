"use client";
import { useState } from 'react';
import { COOKIE_CONSENT_TEXT } from '@/lib/legal';

export default function CookieConsent() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-aura-navy border-t border-white/10 p-4 flex items-center justify-between z-50">
      <p className="text-sm text-gray-300 mr-4">{COOKIE_CONSENT_TEXT}</p>
      <div className="flex gap-2">
        <button onClick={() => setVisible(false)} className="text-sm text-gray-400 hover:text-white px-3 py-1">Decline</button>
        <button onClick={() => setVisible(false)} className="btn-primary text-sm px-4 py-1">Accept</button>
      </div>
    </div>
  );
}
