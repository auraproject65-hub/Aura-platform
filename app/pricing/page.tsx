import Link from 'next/link';
import { Check, ShieldCheck, Sparkles, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    description: 'For lean teams that want polished forecasting and workflow clarity.',
    included: ['Unlimited dashboards', '3 AI analyses per month', 'Basic data room', 'Email support'],
    accent: 'border-white/10',
  },
  {
    name: 'Pro',
    price: '$129',
    description: 'For growth leaders who need premium insights, collaboration, and reporting.',
    included: ['Unlimited analyses', 'Advanced visualizations', 'Notifications & alerts', 'Priority support'],
    accent: 'border-aura-cyan/30 bg-aura-cyan/10',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For board-grade operations with private migration and custom domain support.',
    included: ['Custom domain', 'Dedicated onboarding', 'Advanced security', 'SLA-backed support'],
    accent: 'border-white/10',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Pricing</p>
          <h1 className="mt-4 text-4xl font-semibold">Choose the plan that matches your growth ambition.</h1>
          <p className="mt-4 text-slate-200">AURA combines premium design, AI intelligence, and fast-moving workflows into one confidence-first workspace.</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`border-white/10 bg-white/5 text-white ${plan.accent}`}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription className="text-slate-200">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-3xl font-semibold">{plan.price}<span className="text-sm font-normal text-slate-200">{plan.price === 'Custom' ? '' : '/mo'}</span></p>
                <ul className="space-y-3 text-sm text-slate-100">
                  {plan.included.map((item) => (
                    <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-aura-cyan" />{item}</li>
                  ))}
                </ul>
                <Button asChild className="w-full"><Link href="/contact">Talk to sales</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="flex-row items-center gap-3">
              <Sparkles className="h-5 w-5 text-aura-cyan" />
              <CardTitle>Premium insights</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-200">Forecast, heatmaps, cohort analysis, and executive storytelling in one workspace.</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="flex-row items-center gap-3">
              <Users2 className="h-5 w-5 text-aura-cyan" />
              <CardTitle>Team collaboration</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-200">Manage invites, team roles, notifications, and secure reporting without context switching.</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="flex-row items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-aura-cyan" />
              <CardTitle>Enterprise-ready</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-200">Premium controls, custom domain simulation, and support designed for scaling decision-making.</CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
