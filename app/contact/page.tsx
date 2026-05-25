'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12 lg:px-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold">Talk to sales</h1>
            <p className="mt-4 max-w-2xl text-slate-200">Book a private walkthrough, review enterprise requirements, or ask for a tailored implementation plan.</p>
          </div>
          <Button asChild variant="outline"><Link href="/pricing">View pricing</Link></Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle>What you can expect</CardTitle>
              <CardDescription className="text-slate-200">A premium, high-touch conversation for operators who want to move quickly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-100">
              <p>• Strategic discovery for revenue, operations, and GTM teams</p>
              <p>• Implementation guidance for dashboards, data room workflows, and reporting</p>
              <p>• Enterprise onboarding paths and security review support</p>
              <p>• Fast response times for high-priority opportunities</p>
              <p>• Direct email support: <a href="mailto:auraproject65@gmail.com" className="text-aura-cyan underline">auraproject65@gmail.com</a></p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle>{submitted ? 'Request received' : 'Send a sales inquiry'}</CardTitle>
              <CardDescription className="text-slate-200">{submitted ? 'Our team will reach out within one business day.' : 'Send your details and we will route you to the right specialist.'}</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="rounded-2xl border border-aura-cyan/20 bg-aura-cyan/10 p-4 text-slate-100">
                  <p className="font-semibold text-white">Thanks, {name || 'there'}.</p>
                  <p className="mt-2">Your request is queued for the AURA sales team. We will follow up with a tailored recommendation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} required />
                  <Input type="email" placeholder="Work email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What are you looking to achieve?" className="min-h-[140px] w-full rounded-md border border-white/10 bg-slate-950/70 px-3 py-2 text-white outline-none" required />
                  <Button type="submit" className="w-full justify-between"><span>Send inquiry</span><ArrowRight className="h-4 w-4" /></Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
