import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const stories: Record<string, {
  title: string;
  eyebrow: string;
  summary: string;
  quote: string;
  challenge: string[];
  solution: string[];
  results: string[];
  metrics: Array<{ label: string; value: string; hint: string }>;
  progress: Array<{ label: string; value: number }>;
}> = {
  'retail-growth-recovery': {
    title: 'Retail growth recovery',
    eyebrow: 'Retail',
    summary: 'A premium retail operator used AURA to expose margin leakage, model recovery actions, and align leadership around a 90-day action plan.',
    quote: 'AURA gave us calm confidence. We could finally move from fragmented reporting to a single, executive-grade growth narrative.',
    challenge: [
      'Regional discounting was draining margin without clear attribution.',
      'Leadership teams were debating priorities without a shared evidence base.',
      'Forecasts relied on manual spreadsheets and felt too slow to trust.',
    ],
    solution: [
      'AURA aggregated sales, promotion, and inventory signals into a live growth narrative.',
      'Dynamic scenario modeling exposed the most resilient recovery actions and timing.',
      'Executive summaries were generated automatically for every leadership review.',
    ],
    results: [
      '18% margin recovery in one quarter.',
      'Forecast confidence improved by 21% across retail planning cycles.',
      'Leadership decision cycles shortened from weeks to days.',
    ],
    metrics: [
      { label: 'Recovered margin', value: '$4.8M', hint: 'Quarterly impact' },
      { label: 'Forecast confidence', value: '91%', hint: 'Confidence uplift' },
      { label: 'Operating efficiency', value: '32%', hint: 'Fewer manual reviews' },
    ],
    progress: [
      { label: 'Revenue recovery', value: 82 },
      { label: 'Execution readiness', value: 76 },
      { label: 'Leadership alignment', value: 88 },
    ],
  },
  'saas-renewal-acceleration': {
    title: 'SaaS renewal acceleration',
    eyebrow: 'SaaS',
    summary: 'A fast-growing software company used AURA to connect retention signals, refresh renewal strategy, and turn noisy churn data into proactive action.',
    quote: 'We stopped guessing and started leading. The new narrative helped our customer team prioritize the right accounts with confidence.',
    challenge: [
      'Renewal risk signals were scattered across sales, support, and product data.',
      'Executive updates were inconsistent and often lagged behind the real signal.',
      'Customer success leaders needed a faster, clearer decision path.',
    ],
    solution: [
      'AURA unified product usage, support interactions, and sales signals into one retention model.',
      'An executive-ready view surfaced at-risk accounts and the most effective interventions.',
      'Alerts and summaries were embedded into the weekly leadership operating rhythm.',
    ],
    results: [
      '42% faster churn interpretation across the sales and CS teams.',
      'Renewal planning cycles reduced from 10 days to 3 days.',
      'Executive confidence improved with a clear path from signal to action.',
    ],
    metrics: [
      { label: 'Renewal lift', value: '+11%', hint: 'Quarterly uplift' },
      { label: 'Alert precision', value: '94%', hint: 'Target match rate' },
      { label: 'People coordination', value: '3.2x', hint: 'Faster decision cadence' },
    ],
    progress: [
      { label: 'Signal clarity', value: 87 },
      { label: 'Retention readiness', value: 79 },
      { label: 'Executive momentum', value: 91 },
    ],
  },
  'healthcare-reporting-orchestration': {
    title: 'Healthcare reporting orchestration',
    eyebrow: 'Healthcare',
    summary: 'A multi-unit healthcare operator adopted AURA to unify reporting, make executive briefings more consistent, and turn siloed performance data into a shared view.',
    quote: 'The platform gave us a consistent operating language across units. That alone transformed how leadership reviewed performance.',
    challenge: [
      'Regional teams were managing reporting in disconnected tools and formats.',
      'Leadership meetings had to reconcile conflicting numbers before any action could be taken.',
      'The organization needed a clearer view of which units were accelerating or lagging.',
    ],
    solution: [
      'AURA standardized revenue, utilization, and operational signals across units.',
      'A premium reporting layer produced executive-ready summaries for each review cycle.',
      'Cross-unit comparisons surfaced the most critical changes without manual consolidation.',
    ],
    results: [
      '12-unit reporting alignment across leadership and operations teams.',
      'Executive report preparation time dropped by 58%.',
      'Coverage gaps across performance reviews were reduced dramatically.',
    ],
    metrics: [
      { label: 'Reporting alignment', value: '12 units', hint: 'Unified dashboards' },
      { label: 'Time saved', value: '58%', hint: 'Weekly report prep' },
      { label: 'Consistency score', value: '96%', hint: 'Cross-unit standardization' },
    ],
    progress: [
      { label: 'Data unification', value: 84 },
      { label: 'Executive readiness', value: 90 },
      { label: 'Operational adoption', value: 81 },
    ],
  },
};

function RadialRing({ value, label }: { value: number; label: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
      <svg width="90" height="90" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#00E5FF"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="text-center">
        <p className="text-lg font-semibold text-white">{value}%</p>
        <p className="text-sm text-slate-200">{label}</p>
      </div>
    </div>
  );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const story = stories[params.slug];

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">{story.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">{story.title}</h1>
          <p className="mt-4 max-w-3xl text-slate-200">{story.summary}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {story.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm text-slate-200">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-slate-200">{metric.hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-6">
              <h2 className="font-display text-2xl font-semibold">Executive quote</h2>
              <blockquote className="mt-4 border-l-2 border-aura-cyan/60 pl-4 text-lg text-slate-100">{story.quote}</blockquote>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-display text-2xl font-semibold">Performance pulse</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {story.progress.map((item) => (
                  <RadialRing key={item.label} value={item.value} label={item.label} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-3">
          <Card className="text-white">
            <CardHeader>
              <CardTitle>Challenge</CardTitle>
              <CardDescription className="text-slate-200">The operational problem before AURA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {story.challenge.map((item) => (
                <p key={item} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">{item}</p>
              ))}
            </CardContent>
          </Card>
          <Card className="text-white">
            <CardHeader>
              <CardTitle>Solution</CardTitle>
              <CardDescription className="text-slate-200">How AURA translated signals into action.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {story.solution.map((item) => (
                <p key={item} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">{item}</p>
              ))}
            </CardContent>
          </Card>
          <Card className="text-white">
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription className="text-slate-200">Measured outcomes and material improvements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {story.results.map((item) => (
                <p key={item} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">{item}</p>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-display text-2xl font-semibold">Want to explore a similar rollout?</h2>
          <p className="mt-3 max-w-2xl text-slate-200">Talk to AURA about building a premium operating rhythm for your own team.</p>
          <Button asChild className="mt-4">
            <Link href="/contact">Contact sales</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
