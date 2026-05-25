import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicFooter } from '@/components/public-footer';

const articles: Record<string, { title: string; content: string[] }> = {
  'uploading-data': {
    title: 'Uploading data',
    content: ['Upload CSV, XLSX, PDF, JPG, or PNG in the Data Room.', 'AURA stores the file preview in-memory and runs a simulated analysis on the latest dataset.']
  },
  'insights-workflow': {
    title: 'Insights workflow',
    content: ['Open the Insights page to review forecast, cohort analysis, heatmap, and solutions.', 'The latest stored analysis result powers each tab and the Download Report action uses window.print().']
  },
  'pricing-plans': {
    title: 'Pricing plans',
    content: ['Starter is a quick intro plan, Pro unlocks unlimited analyses, and Enterprise includes custom domain simulations.']
  },
  'team-collab': {
    title: 'Team collaboration',
    content: ['Invite teammates, adjust default roles, and manage workspace access from the Team page.']
  },
  'security': {
    title: 'Security controls',
    content: ['Review two-factor authentication, session timeout, and audit logging from the security settings panel.']
  },
  'custom-domain': {
    title: 'Custom domain simulation',
    content: ['Enterprise plans include a simulated custom domain entry in the general settings page, such as yourbrand.aura.ai.']
  },
};

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground px-6 py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Help Center</p>
        <h1 className="mt-4 text-3xl font-semibold">Article not found</h1>
        <Button asChild className="mt-6"><Link href="/help">Back to help center</Link></Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Help Center</p>
        <h1 className="mt-4 text-4xl font-semibold">{article.title}</h1>
        <div className="mt-6 space-y-4 text-slate-200">
          {article.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Button asChild className="mt-8"><Link href="/help">Back to help center</Link></Button>
      </section>
      <PublicFooter />
    </main>
  );
}
