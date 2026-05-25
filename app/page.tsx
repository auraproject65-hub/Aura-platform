'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, BrainCircuit, ShieldCheck, Sparkles, Stars, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCounter } from '@/components/stats-counter';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { ParticleBackground } from '@/components/particle-background';
import { PublicFooter } from '@/components/public-footer';
import { ProductTour } from '@/components/ProductTour';
import { ROICalculator } from '@/components/roi-calculator';

const logos = ['Slack', 'Salesforce', 'HubSpot', 'Zapier', 'Teams', 'Sheets'];
const features = [
  { title: 'Prediction', description: 'Forecast revenue and growth scenarios from live business signals.', icon: BrainCircuit },
  { title: 'Analysis', description: 'Reveal sales efficiency, loopholes, and strategic opportunities instantly.', icon: BarChart3 },
  { title: 'Solutions', description: 'Turn insights into concrete action plans and executive-ready narratives.', icon: ShieldCheck },
  { title: 'Motivation', description: 'Keep stakeholders aligned with crisp AI-powered narratives and momentum.', icon: Sparkles },
];
const steps = ['Upload your revenue signals', 'AURA scores risk and opportunity', 'Deploy action plans across teams'];
const faqs = [
  { q: 'How quickly can teams launch?', a: 'Most teams connect a dataset and start generating insights in under 15 minutes.' },
  { q: 'Does AURA use external data?', a: 'AURA combines your uploaded data with built-in intelligence models for tailored recommendations.' },
  { q: 'Can I export reports?', a: 'Yes. Pro and Enterprise include export-ready reports and API access.' },
  { q: 'What file types are supported?', a: 'CSV, XLSX, PDF, JPG, and PNG are accepted in the data room.' },
  { q: 'What is the onboarding flow?', a: 'Users complete company details, upload a first file, and receive a personalised AI-generated tagline.' },
  { q: 'Is this premium only?', a: 'AURA is built for leadership teams that want a premium, private, in-memory experience with a strong visual edge.' },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.17),transparent_20%),linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <ParticleBackground />
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-24 pt-8 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-[0.2em] text-aura-cyan">AURA</div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost"><Link href="/pricing">Pricing</Link></Button>
            <Button asChild><Link href="/auth/login">Sign in</Link></Button>
          </div>
        </div>

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div data-tour="hero">
            <div className="inline-flex items-center gap-2 rounded-full border border-aura-cyan/30 bg-white/5 px-4 py-2 text-sm text-aura-cyan">
              <Stars className="h-4 w-4" /> Trusted executive intelligence for revenue teams
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">AI growth intelligence built for billion-dollar decisions.</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200">AURA turns your revenue, operations, and market signals into clear forecasts, strategic insights, and executive-ready actions.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="shadow-glow"><Link href="/auth/register">Start your free trial</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/contact">Talk to sales</Link></Button>
              <ProductTour />
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-200">
              <div><span className="text-aura-cyan">99.2%</span> forecast precision</div>
              <div><span className="text-aura-cyan">24/7</span> rapid analysis</div>
              <div><span className="text-aura-cyan">SOC 2</span> ready</div>
            </div>
          </div>

          <div className="glass-panel rounded-[28px] border border-white/10 p-6">
            <div className="rounded-2xl border border-aura-cyan/30 bg-gradient-to-br from-white/10 to-cyan-400/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-aura-cyan">Live signal</p>
                  <p className="mt-2 text-2xl font-semibold">Growth command center</p>
                </div>
                <Trophy className="h-8 w-8 text-aura-cyan" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <StatsCounter value={4000} suffix="+" label="companies" />
                <StatsCounter value={128} suffix="M" label="revenue predicted" />
                <StatsCounter value={12000} suffix="+" label="analyses run" />
              </div>
              <div className="mt-6 rounded-xl bg-slate-950/40 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Executive brief</p>
                <p className="mt-2">Market signals show strong expansion in SaaS and retail cohorts. AURA recommends retention-first execution in the next 90 days.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[24px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
          <p className="text-center text-sm uppercase tracking-[0.25em] text-slate-200">Trusted by 4,000+ companies</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center text-xl font-semibold text-white sm:grid-cols-6">
            {logos.map((logo) => (
              <div key={logo} className="rounded-full border border-white/10 bg-white/5 px-4 py-3">{logo}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12" data-tour="integrations">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Seamless integrations</p>
            <h2 className="mt-4 text-3xl font-semibold">Connect the tools your teams already use.</h2>
          </div>
          <Button asChild variant="outline"><Link href="/help">Explore help center</Link></Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {logos.map((logo) => (
            <Card key={logo} className="border-white/10 bg-white/5 text-white">
              <CardContent className="pt-6 text-center text-lg font-semibold">{logo}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12" data-tour="roi">
        <ROICalculator />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title}>
              <Card className="h-full border-white/10 bg-white/5 text-white">
                <CardHeader>
                  <feature.icon className="h-7 w-7 text-aura-cyan" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-slate-200">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">How it works</p>
            <h2 className="mt-4 text-3xl font-semibold">From raw data to decisive action in minutes.</h2>
            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aura-cyan/20 text-aura-cyan">{index + 1}</div>
                  <p className="text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>Case studies</CardTitle>
                <CardDescription className="text-slate-200">Fictional enterprise outcomes and executive-ready proof points.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Retail operator unlocked 18% margin recovery.</p>
                <p>• SaaS team cut churn forecasting noise by 42%.</p>
                <p>• Healthcare group standardized reporting across 12 units.</p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>What you get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-200">
                <p>• C-suite-ready narratives</p>
                <p>• Forecast modeling for planning cycles</p>
                <p>• Secure in-memory SaaS simulation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Testimonials</p>
            <h2 className="mt-4 text-3xl font-semibold">Customers move faster with clearer decisions.</h2>
          </div>
          <Button asChild variant="outline"><Link href="/case-studies">Explore case studies</Link></Button>
        </div>
        <div className="mt-8"><TestimonialCarousel /></div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <h2 className="text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <summary className="cursor-pointer font-semibold text-white">{faq.q}</summary>
                <p className="mt-3 text-slate-200">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
