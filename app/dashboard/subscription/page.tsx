'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SubscriptionData {
  plan: string;
  usage: number;
  limits: { starter: number; pro: number; enterprise: number };
  billingHistory: Array<{ label: string; amount: string; date: string }>;
}

export default function SubscriptionPage() {
  const [state, setState] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    fetch('/api/subscription')
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch(() => undefined);
  }, []);

  if (!state) {
    return <div className="text-white">Loading subscription...</div>;
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-200">
          <p>Plan: <span className="font-semibold text-white">{state.plan}</span></p>
          <p>Usage: <span className="font-semibold text-white">{state.usage}</span> / {state.limits[state.plan as keyof typeof state.limits]}</p>
          <Button>Upgrade</Button>
        </CardContent>
      </Card>
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Billing history</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-200">
          {state.billingHistory.map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2">
              <div>
                <p className="font-semibold text-white">{item.label}</p>
                <p className="text-sm">{item.date}</p>
              </div>
              <div>{item.amount}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
