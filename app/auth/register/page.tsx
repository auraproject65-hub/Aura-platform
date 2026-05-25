'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || 'Unable to register');
      return;
    }

    router.push('/onboarding');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#060A13,#0B0F19)] px-4 py-12 text-foreground">
      <Card className="w-full max-w-md border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Create your AURA account</CardTitle>
          <CardDescription className="text-slate-200">Launch your premium AI growth intelligence workspace instantly.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} required />
            <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button>
          </form>
          <p className="mt-4 text-sm text-slate-200">Already have an account? <Link href="/auth/login" className="text-aura-cyan">Sign in</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
