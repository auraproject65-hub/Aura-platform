import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Terms</p>
        <h1 className="mt-4 text-4xl font-semibold">Terms of service</h1>
        <p className="mt-4 text-slate-200">This is a demo environment for AURA. The content below mirrors a premium SaaS policy style and is intended for product presentation purposes.</p>

        <div className="mt-8 space-y-4">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader><CardTitle>Use of service</CardTitle></CardHeader>
            <CardContent className="text-slate-100">AURA is presented as a premium demo environment for executive intelligence, forecasting, and workspace collaboration. Access is for evaluating the product experience, exploring premium flows, and reviewing simulated outcomes.</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader><CardTitle>Data handling</CardTitle></CardHeader>
            <CardContent className="text-slate-100">Uploads, insights, team data, and onboarding details are stored in memory for the demo experience. They are not intended to represent full production persistence, regulatory compliance, or enterprise-grade data residency controls.</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader><CardTitle>Support and updates</CardTitle></CardHeader>
            <CardContent className="text-slate-100">Premium support, implementation guidance, and roadmap updates are available through the contact and sales channels. For the demo, the product experience mirrors the style and flow of a full SaaS platform while keeping the backend lightweight and fast to iterate on.</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader><CardTitle>Limitations</CardTitle></CardHeader>
            <CardContent className="text-slate-100">The demo does not process real financial transactions, issue live DNS records, or connect to live third-party systems unless explicitly implemented in a production branch. For questions, reach out to <a href="mailto:auraproject65@gmail.com" className="text-aura-cyan underline">auraproject65@gmail.com</a>.</CardContent>
          </Card>
        </div>

        <Button asChild className="mt-8"><Link href="/privacy">Review privacy</Link></Button>
      </section>
    </main>
  );
}
