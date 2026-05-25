import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

const posts = {
  'ai-growth-strategy': {
    title: 'AI growth strategy for modern finance teams',
    author: 'Maya Chen',
    date: 'May 18, 2026',
    summary: 'AURA helps leaders focus on the right plays by combining revenue signals, executive priorities, and confident action in a single, trustworthy workspace.',
    content: [
      'Modern finance teams need more than static reporting. They need a system that translates signals into decisions and decisions into outcomes.',
      'AURA brings together forecasting, scenario planning, and narrative generation so leaders can move with confidence from early analysis through final presentation.',
      'The result is a calm, high-trust operating rhythm where teams stop chasing spreadsheets and start acting on clear priorities.',
    ],
    related: [
      { slug: 'revenue-forecasting', title: 'Revenue forecasting that feels instant and dependable' },
      { slug: 'executive-readiness', title: 'Executive readiness in the age of constant change' },
    ],
  },
  'revenue-forecasting': {
    title: 'Revenue forecasting that feels instant and dependable',
    author: 'Nora Patel',
    date: 'May 16, 2026',
    summary: 'By blending historical trends and live patterns, AURA creates actionable forecasts that feel fast, credible, and easy to communicate.',
    content: [
      'Reliable forecasting starts with data hygiene, but it becomes powerful when teams can interpret the story behind the numbers quickly.',
      'AURA surfaces the key assumptions, highlights risk, and turns the forecast into a flexible narrative for leadership planning.',
      'This allows operators to spend less time reconciling inputs and more time improving outcomes.',
    ],
    related: [
      { slug: 'ai-growth-strategy', title: 'AI growth strategy for modern finance teams' },
      { slug: 'executive-readiness', title: 'Executive readiness in the age of constant change' },
    ],
  },
  'executive-readiness': {
    title: 'Executive readiness in the age of constant change',
    author: 'Sam Rivera',
    date: 'May 12, 2026',
    summary: 'The next generation of executive teams depends on a blend of speed, insight, and clarity. AURA is built for that.',
    content: [
      'Executive readiness is not only about reporting cadence. It is about how quickly a team can turn new information into alignment.',
      'AURA helps leaders unify the central narrative, reduce manual preparation, and strengthen confidence in decision-making.',
      'That clarity enables faster decisions, sharper communication, and greater trust across the organization.',
    ],
    related: [
      { slug: 'ai-growth-strategy', title: 'AI growth strategy for modern finance teams' },
      { slug: 'revenue-forecasting', title: 'Revenue forecasting that feels instant and dependable' },
    ],
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] px-6 py-12 text-white lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,229,255,0.15),rgba(201,169,110,0.18))] p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Magazine feature</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-100">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <p className="mt-6 text-lg text-slate-100">{post.summary}</p>
          <div className="mt-6 h-56 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.45),transparent_18%),linear-gradient(135deg,#0F172A,#111827)]" />
        </div>

        <article className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-8 text-slate-100">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-display text-2xl font-semibold">Related articles</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {post.related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-[24px] border border-white/10 bg-slate-950/40 px-4 py-3 text-white hover:bg-white/5">
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Button asChild>
            <Link href="/blog">Back to all articles</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
