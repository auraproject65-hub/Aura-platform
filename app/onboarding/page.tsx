'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const taglines: Record<string, string> = {
  SaaS: 'Turn retention signals into measurable expansion.',
  Retail: 'Convert every checkout into a growth opportunity.',
  Healthcare: 'Bring clarity, speed, and confidence to every care decision.',
  Finance: 'Make margin, risk, and forecasting feel instantly clear.',
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('SaaS');
  const [tagline, setTagline] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const generatedTagline = useMemo(() => taglines[industry] || taglines.SaaS, [industry]);

  useEffect(() => {
    if (step !== 3) {
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      setTagline(generatedTagline);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [generatedTagline, step]);

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

    setStatus('Upload complete. Moving to final setup.');
    setStep(3);
  };

  const completeOnboarding = async () => {
    setStatus('Finishing onboarding...');

    const response = await fetch('/api/onboarding', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, industry, tagline, onboardingComplete: true }),
    });

    if (!response.ok) {
      setStatus('We could not save your onboarding details. Please refresh and try again.');
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.assign('/dashboard');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#060A13,#0B0F19)] px-4 py-12 text-foreground">
      <Card className="w-full max-w-2xl border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Welcome to your AURA onboarding</CardTitle>
          <CardDescription className="text-slate-200">Complete the setup in three guided steps and unlock your premium workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
            <span>Step {step} of 3</span>
            <span>{step === 1 ? 'Company details' : step === 2 ? 'Upload first file' : 'AI tagline'}</span>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <Input placeholder="Company name" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
              <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="w-full rounded-md border border-white/10 bg-slate-950/70 px-3 py-2 text-white">
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
                <Button onClick={uploadFirstFile}>Upload and continue</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-aura-cyan/20 bg-aura-cyan/10 p-4">
                {loading ? (
                  <p className="text-sm text-slate-100">Generating your personalised tagline...</p>
                ) : (
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-aura-cyan">AI-generated tagline</p>
                    <p className="mt-3 text-xl font-semibold text-white">{tagline || generatedTagline}</p>
                  </div>
                )}
              </div>
              <Button className="w-full" onClick={completeOnboarding}>Finish onboarding</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
