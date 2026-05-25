import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const stories = [
  {
    title: 'Retail growth recovery',
    summary: 'A premium retail operator used AURA to identify margin leakage, model recovery actions, and align leadership on a 90-day plan.',
    outcome: '18% margin recovery in one quarter',
  },
  {
    title: 'SaaS renewal acceleration',
    summary: 'A sales-led organisation combined customer signal analysis with cohort insights to sharpen retention messaging and protect renewal volume.',
    outcome: '42% faster churn interpretation',
  },
  {
    title: 'Healthcare reporting orchestration',
    summary: 'A multi-unit operator deployed a unified reporting workflow and used confidence-first dashboards to standardize executive narratives.',
    outcome: '12-unit reporting alignment',
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Case studies</p>
          <h1 className="mt-4 text-4xl font-semibold">Executive outcomes built for momentum.</h1>
          <p className="mt-4 text-slate-200">See how modern operators use AURA to turn signals into stronger decisions, faster launches, and clearer execution plans.</p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.title} className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
                <CardDescription className="text-slate-200">{story.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="rounded-2xl border border-aura-cyan/20 bg-aura-cyan/10 px-4 py-3 text-sm text-slate-100">Outcome: {story.outcome}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-6 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Need a tailored story?</p>
          <h2 className="mt-3 text-2xl font-semibold">Build a plan for your next growth milestone.</h2>
          <p className="mt-3 max-w-2xl text-slate-200">If you want a more tailored walkthrough, the contact team can map AURA to your data, operations, and executive reporting needs.</p>
          <Button asChild className="mt-4"><Link href="/contact">Talk to sales</Link></Button>
        </div>
      </section>
    </main>
  );
}
