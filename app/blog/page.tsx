import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const featured = {
  slug: 'ai-growth-strategy',
  title: 'AI growth strategy for modern finance teams',
  description: 'How AI helps leadership teams move from reporting to forecasting, without losing the human context that makes decisions durable.',
  author: 'Maya Chen',
  date: 'May 18, 2026',
};

const posts = [
  {
    slug: 'revenue-forecasting',
    title: 'Revenue forecasting that feels instant and dependable',
    description: 'A practical guide to building reliable models from mixed datasets and turning them into executive narratives.',
    author: 'Nora Patel',
    date: 'May 16, 2026',
  },
  {
    slug: 'executive-readiness',
    title: 'Executive readiness in the age of constant change',
    description: 'How modern operators prepare teams and systems for faster, more deliberate decisions.',
    author: 'Sam Rivera',
    date: 'May 12, 2026',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Editorial</p>
            <h1 className="mt-4 font-display text-4xl font-semibold">AURA insights for operators, founders, and analysts.</h1>
            <p className="mt-4 text-lg text-slate-200">A curated magazine of strategy, forecasting, and premium execution for teams that want the next level of clarity.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span>{featured.author}</span>
              <span>•</span>
              <span>{featured.date}</span>
            </div>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,229,255,0.16),rgba(201,169,110,0.18))] p-6">
              <div className="h-48 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent_20%),linear-gradient(135deg,#0F172A,#111827)]" />
              <h2 className="mt-5 font-display text-2xl font-semibold">{featured.title}</h2>
              <p className="mt-3 text-slate-100">{featured.description}</p>
              <Button asChild className="mt-4">
                <Link href={`/blog/${featured.slug}`}>Read featured article</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.slug} className="text-white">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="text-slate-200">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-3 text-sm text-slate-200">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <Button asChild className="mt-4">
                    <Link href={`/blog/${post.slug}`}>Read article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
