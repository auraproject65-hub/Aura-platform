import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicFooter } from '@/components/public-footer';

const posts = [
  { slug: 'ai-growth-strategy', title: 'AI growth strategy for modern finance teams', description: 'How AI is helping leadership teams move from reporting to forecasting.' },
  { slug: 'revenue-forecasting', title: 'Revenue forecasting that feels instant and dependable', description: 'A practical guide to building reliable models from mixed datasets.' },
  { slug: 'executive-readiness', title: 'Executive readiness in the age of constant change', description: 'How to prepare your organization for faster decisions.' },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Blog</p>
        <h1 className="mt-4 text-4xl font-semibold">AURA insights for operators, founders, and analysts.</h1>
        <div className="mt-8 grid gap-4">
          {posts.map((post) => (
            <div key={post.slug} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="mt-3 text-slate-200">{post.description}</p>
              <Button asChild className="mt-4">
                <Link href={`/blog/${post.slug}`}>Read article</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
