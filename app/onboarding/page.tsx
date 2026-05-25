'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#060A13,#0B0F19)] px-4 py-12 text-foreground">
      <Card className="w-full max-w-2xl border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Welcome to your AURA onboarding</CardTitle>
          <CardDescription className="text-slate-200">Complete the setup in two guided steps and unlock your premium workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
            <span>Step {step} of 2</span>
            <span>{step === 1 ? 'Company details' : 'Upload first file'}</span>
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
                <Button onClick={uploadFirstFile}>Finish onboarding</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
