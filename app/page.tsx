'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, BrainCircuit, ChevronDown, Globe2, ShieldCheck, Sparkles, Stars, Trophy, Users2 } from 'lucide-react';
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
  { q: 'How quickly can teams launch?', a: 'Most teams connect a dataset and begin generating insights in under 15 minutes.' },
  { q: 'Does AURA use external data?', a: 'AURA combines your uploaded data with built-in intelligence models for tailored recommendations.' },
  { q: 'Can I export reports?', a: 'Yes. Pro and Enterprise include export-ready reports, API access, and executive summaries.' },
  { q: 'What file types are supported?', a: 'CSV, XLSX, PDF, JPG, and PNG are accepted in the data room.' },
];

export default function Home() {
  const [enterpriseOpen, setEnterpriseOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -18]);
  const featureY = useTransform(scrollYProgress, [0, 0.55], [0, -8]);

  const stats = useMemo(() => [
    { value: 4000, suffix: '+', label: 'Companies empowered' },
    { value: 128, suffix: 'M', label: 'Revenue modelled' },
    { value: 12000, suffix: '+', label: 'Analyses run' },
  ], []);

  return (
    <main className="relative overflow-hidden bg-transparent text-foreground">
      <ParticleBackground />
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-24 pt-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-aura-cyan/30 bg-white/5 px-3 py-1 text-sm font-semibold tracking-[0.22em] text-aura-cyan">AURA</div>
            <p className="text-sm text-slate-200">Executive intelligence, reimagined.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="ghost">
              <Link href="/pricing">Pricing</Link>
            </Button>
            <div className="relative">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEnterpriseOpen((open) => !open)}
                className="gap-2"
              >
                Enterprise
                <ChevronDown className={`h-4 w-4 transition-transform ${enterpriseOpen ? 'rotate-180' : ''}`} />
              </Button>
              <AnimatePresence>
                {enterpriseOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="absolute right-0 top-14 z-20 w-[360px] rounded-[28px] border border-white/10 bg-slate-950/92 p-4 shadow-[0_28px_70px_rgba(9,14,28,0.5)]"
                  >
                    <div className="grid gap-3">
                      <Link href="/help" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
                        <div className="font-semibold">Help Center</div>
                        <div className="mt-1 text-xs text-slate-200">Guides, workflows, and onboarding support.</div>
                      </Link>
                      <Link href="/api-docs" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
                        <div className="font-semibold">API documentation</div>
                        <div className="mt-1 text-xs text-slate-200">Secure endpoints, schemas, and integration notes.</div>
                      </Link>
                      <Link href="/security" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
                        <div className="font-semibold">Security</div>
                        <div className="mt-1 text-xs text-slate-200">Compliance posture, controls, and trust center.</div>
                      </Link>
                      <Link href="/contact" className="rounded-2xl bg-gradient-to-r from-aura-cyan to-accentGold px-4 py-3 text-sm font-semibold text-slate-950">
                        Contact Sales
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div style={{ y: heroY }} data-tour="hero">
            <div className="inline-flex items-center gap-2 rounded-full border border-aura-cyan/30 bg-white/5 px-4 py-2 text-sm text-aura-cyan">
              <Stars className="h-4 w-4" /> Trusted executive intelligence for revenue teams
            </div>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              AI growth intelligence built for billion-dollar decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200">
              AURA turns revenue, operations, and market signals into crystal-clear forecasts, strategic insights, and executive-ready actions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/auth/register">Start your free trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to sales</Link>
              </Button>
              <ProductTour />
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-200">
              <div><span className="text-aura-cyan">99.2%</span> forecast precision</div>
              <div><span className="text-aura-cyan">24/7</span> rapid analysis</div>
              <div><span className="text-aura-cyan">SOC 2</span> ready</div>
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="glass-panel rounded-[28px] border border-white/10 p-6">
            <div className="rounded-[24px] border border-aura-cyan/30 bg-gradient-to-br from-white/10 to-cyan-400/10 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Live signal</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Growth command center</p>
                </div>
                <Trophy className="h-8 w-8 text-accentGold" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <StatsCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Executive brief</p>
                <p className="mt-2">Market signals show strong expansion in SaaS and retail cohorts. AURA recommends retention-first execution in the next 90 days.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: featureY }}
          className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur"
        >
          <p className="text-center text-sm uppercase tracking-[0.28em] text-slate-200">Trusted by elite operators</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center sm:grid-cols-6">
            {logos.map((logo) => (
              <div key={logo} className="glass-panel rounded-[24px] border border-white/10 px-4 py-4 text-lg font-semibold text-white">
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12" data-tour="integrations">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Seamless integrations</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Connect the tools your teams already use.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/help">Explore help center</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {logos.map((logo) => (
            <Card key={logo} className="text-center text-white">
              <CardContent className="pt-6 text-lg font-semibold">{logo}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12" data-tour="roi">
        <ROICalculator />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <motion.div style={{ y: featureY }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full text-white">
              <CardHeader>
                <feature.icon className="h-7 w-7 text-aura-cyan" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-slate-200">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">How it works</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">From raw data to decisive action in minutes.</h2>
            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aura-cyan/20 text-aura-cyan">{index + 1}</div>
                  <p className="text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <Card className="text-white">
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
            <Card className="text-white">
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
            <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Testimonials</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Customers move faster with clearer decisions.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/case-studies">Explore case studies</Link>
          </Button>
        </div>
        <div className="mt-8"><TestimonialCarousel /></div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <h2 className="font-display text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
                <summary className="cursor-pointer font-semibold text-white">{faq.q}</summary>
                <p className="mt-3 text-slate-200">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-12">
        <Card className="overflow-hidden text-white">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 lg:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Enterprise assurance</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">Premium operations, engineered for trust.</h2>
              <p className="mt-4 text-slate-200">From forecasting to security, AURA blends high-touch design with meticulous controls for teams that expect more.</p>
              <div className="mt-6 space-y-3 text-sm text-slate-100">
                <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-aura-cyan" /> Data controls and role-based access</div>
                <div className="flex items-center gap-3"><Globe2 className="h-4 w-4 text-aura-cyan" /> Global-ready workflows</div>
                <div className="flex items-center gap-3"><Users2 className="h-4 w-4 text-aura-cyan" /> Executive collaboration that scales</div>
              </div>
              <Button asChild className="mt-6">
                <Link href="/contact">Book a strategy call <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="border-t border-white/10 bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(201,169,110,0.12))] p-6 lg:border-l lg:border-t-0">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-sm text-slate-200">Executive briefings</p>
                  <p className="mt-2 text-2xl font-semibold text-white">72 hrs</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-sm text-slate-200">Security readiness</p>
                  <p className="mt-2 text-2xl font-semibold text-white">SOC 2-aligned</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-4 sm:col-span-2">
                  <p className="text-sm text-slate-200">Premium commitment</p>
                  <p className="mt-2 text-sm text-slate-100">AURA is designed for leadership teams that want a cinematic digital experience without sacrificing operational control.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <PublicFooter />
    </main>
  );
}
