'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || 'Unable to sign in');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#060A13,#0B0F19)] px-4 py-12 text-foreground">
      <Card className="w-full max-w-md border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Sign in to AURA</CardTitle>
          <CardDescription className="text-slate-200">Access forecasting, analysis, and premium collaboration.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</Button>
          </form>
          <p className="mt-4 text-sm text-slate-200">Need an account? <Link href="/auth/register" className="text-aura-cyan">Register</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
