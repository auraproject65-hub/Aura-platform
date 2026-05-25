import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicFooter } from '@/components/public-footer';

const faqs = [
  { slug: 'uploading-data', title: 'How do I upload a dataset?', summary: 'Use the data room to upload CSV, XLSX, PDF, JPG, or PNG and trigger an AI analysis.' },
  { slug: 'insights-workflow', title: 'How do insights work?', summary: 'AURA stores the latest analysis result and shows forecast, cohort, heatmap, and decision views inside insights.' },
  { slug: 'pricing-plans', title: 'What is included in each plan?', summary: 'Starter, Pro, and Enterprise unlock different analysis volumes, exports, and support.' },
  { slug: 'team-collab', title: 'How does team collaboration work?', summary: 'Invite teammates, manage roles, and use the workspace settings panel to adjust notifications.' },
  { slug: 'security', title: 'What security controls are available?', summary: 'Use the settings area to review two-factor, audit log, and session controls.' },
  { slug: 'custom-domain', title: 'How can I simulate a custom domain?', summary: 'Enterprise includes a placeholder custom domain like yourbrand.aura.ai in settings.' },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Knowledge base</p>
        <h1 className="mt-4 text-4xl font-semibold">Help Center</h1>
        <p className="mt-4 max-w-2xl text-slate-200">Browse support articles, review onboarding tips, and explore the premium workspace flows.</p>
        <div className="mt-8 space-y-3">
          {faqs.map((article) => (
            <details key={article.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
              <summary className="cursor-pointer text-lg font-semibold">{article.title}</summary>
              <p className="mt-3 text-slate-200">{article.summary}</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href={`/help/${article.slug}`}>Read article</Link>
              </Button>
            </details>
          ))}
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
