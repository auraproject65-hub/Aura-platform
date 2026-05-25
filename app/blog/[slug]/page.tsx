import { notFound } from 'next/navigation';

const posts = {
  'ai-growth-strategy': {
    title: 'AI growth strategy for modern finance teams',
    content: 'AURA helps leaders focus on the right plays by combining revenue signals, actions, and decisions in a single, trustworthy workspace.',
  },
  'revenue-forecasting': {
    title: 'Revenue forecasting that feels instant and dependable',
    content: 'By blending historical trends and live data patterns, AURA creates actionable forecasts with clear decision support.',
  },
  'executive-readiness': {
    title: 'Executive readiness in the age of constant change',
    content: 'The next generation of executive teams depends on a blend of speed, insight, and clarity. AURA is built for that.',
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts];
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] px-6 py-12 text-white lg:px-12">
      <div className="mx-auto max-w-4xl rounded-[24px] border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Blog</p>
        <h1 className="mt-4 text-4xl font-semibold">{post.title}</h1>
        <p className="mt-6 text-lg text-slate-200">{post.content}</p>
      </div>
    </main>
  );
}
