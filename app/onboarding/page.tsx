'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const steps = [
  { title: 'Company details', description: 'Set the frame for your executive workspace.' },
  { title: 'Upload first file', description: 'Create your first high-confidence growth snapshot.' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('SaaS');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const uploadFirstFile = async () => {
    if (!file) {
      setStatus('Please select a CSV, XLSX, PDF, JPG, or PNG file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('industry', industry);

    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    if (!response.ok) {
      setStatus('Upload failed. Please retry with a supported file type.');
      return;
    }

    setStatus('Upload complete. Finalizing your workspace...');

    const onboardingResponse = await fetch('/api/onboarding', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, industry, onboardingComplete: true }),
    });

    if (!onboardingResponse.ok) {
      setStatus('We could not save your onboarding details. Please refresh and try again.');
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.assign('/dashboard');
      return;
    }

    router.push('/dashboard');
  };

  const progress = (step / steps.length) * 100;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] px-4 py-12 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Onboarding</p>
            <CardTitle className="font-display text-3xl">Welcome to your AURA launch sequence.</CardTitle>
            <CardDescription className="text-slate-200">A premium setup experience for teams that want momentum from the very first interaction.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-aura-cyan to-accentGold"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((item, index) => (
                <div key={item.title} className={`rounded-[24px] border px-4 py-3 ${index + 1 === step ? 'border-aura-cyan/40 bg-white/10' : 'border-white/10 bg-white/5'}`}>
                  <p className="text-sm uppercase tracking-[0.2em] text-aura-cyan">Step {index + 1}</p>
                  <p className="mt-2 font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-200">{item.description}</p>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <Input placeholder="Company name" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
                <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3 py-2 text-white">
                  <option value="SaaS">SaaS</option>
                  <option value="Retail">Retail</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                </select>
                <Button className="w-full" onClick={() => setStep(2)}>Continue</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-slate-200">Upload your first dataset to create a high-confidence forecast and trigger your AI workspace.</p>
                <Input type="file" accept=".csv,.xlsx,.xls,.pdf,.jpg,.jpeg,.png" onChange={(event) => setFile(event.target.files?.[0] || null)} />
                <p className="text-sm text-slate-200">{status}</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={uploadFirstFile}>Finish onboarding</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-gradient-to-br from-white/[0.1] to-slate-950/80 text-white">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-accentGold">Why teams stay</p>
            <CardTitle className="font-display text-2xl">A launch experience that feels as premium as the product itself.</CardTitle>
            <CardDescription className="text-slate-200">
              The onboarding flow blends clear guidance with a confident visual system, helping operators feel ready from the first click.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-100">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">• Tailored setup for revenue, operations, and analytics teams.</div>
            <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">• Rapid activation with fewer decisions and better executive readiness.</div>
            <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">• Premium visuals, strong hierarchy, and a calm sense of control.</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
