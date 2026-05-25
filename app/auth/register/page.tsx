'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck, Sparkles, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const valueProps = [
  { icon: Sparkles, title: 'Executive clarity', description: 'Board-ready intelligence, distilled into confident action.' },
  { icon: ShieldCheck, title: 'Enterprise trust', description: 'Secure workflows designed for premium adoption and governance.' },
  { icon: BarChart3, title: 'Operational speed', description: 'Move from upload to insight in a single guided experience.' },
  { icon: Users2, title: 'Team alignment', description: 'Share momentum with the teams that need visibility and context.' },
];

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
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] px-4 py-12 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Register</p>
            <CardTitle className="font-display text-3xl">Create your premium AURA workspace.</CardTitle>
            <CardDescription className="text-slate-200">
              Launch your executive intelligence environment with a guided onboarding flow and a premium experience from day one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} required />
              <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              {error && <p className="text-sm text-rose-300">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
            <p className="mt-4 text-sm text-slate-200">
              Already have an account? <Link href="/auth/login" className="text-aura-cyan">Sign in</Link>
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-white/[0.1] to-slate-950/80 text-white">
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.3em] text-accentGold">Trusted by operators</p>
              <CardTitle className="font-display text-2xl">“AURA gave our leadership team the confidence to move faster without reducing rigor.”</CardTitle>
              <CardDescription className="text-slate-200">
                A senior revenue executive at a multi-unit growth brand describes the shift after adopting AURA.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm text-slate-200">Highlights</p>
                <ul className="mt-3 space-y-2 text-sm text-white">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-aura-cyan" /> Clearer executive narratives</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-aura-cyan" /> Better visibility into retention risk</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-aura-cyan" /> A premium workflow your teams actually want to use</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            {valueProps.map((item) => (
              <Card key={item.title} className="border-white/10 bg-white/[0.03] text-white">
                <CardContent className="pt-6">
                  <item.icon className="h-5 w-5 text-aura-cyan" />
                  <p className="mt-3 font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-200">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardContent className="flex items-center justify-between gap-4 pt-6">
              <div>
                <p className="font-semibold">Ready for the next milestone?</p>
                <p className="text-sm text-slate-200">Move from sign-up to activation with a guided experience.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-aura-cyan" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
