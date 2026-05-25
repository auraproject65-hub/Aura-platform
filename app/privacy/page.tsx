import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Privacy</p>
        <h1 className="mt-4 text-4xl font-semibold">Privacy policy</h1>
        <p className="mt-4 text-slate-200">This demo reflects a premium privacy posture with strong transparency, auditability, and user control principles.</p>

        <div className="mt-8 space-y-4">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader><CardTitle>Collection</CardTitle></CardHeader>
            <CardContent className="text-slate-100">AURA collects the limited information required to create accounts, personalize onboarding, and simulate workspace intelligence. This includes name, email, company information, selected industry, and demo upload metadata.</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader><CardTitle>Use</CardTitle></CardHeader>
            <CardContent className="text-slate-100">Data is used to personalize the onboarding journey, generate AI-based recommendations, and improve the simulated dashboard experience. It is not used to train external models or to sell user data.</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader><CardTitle>Controls</CardTitle></CardHeader>
            <CardContent className="text-slate-100">The dashboard settings area provides simulated controls for notifications, security preferences, and workspace preferences. Visitors can also sign out at any time from the account area to clear the active session.</CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader><CardTitle>Questions</CardTitle></CardHeader>
            <CardContent className="text-slate-100">If you need clarification on how the demo handles data, contact <a href="mailto:auraproject65@gmail.com" className="text-aura-cyan underline">auraproject65@gmail.com</a>.</CardContent>
          </Card>
        </div>

        <Button asChild className="mt-8"><Link href="/terms">Review terms</Link></Button>
      </section>
    </main>
  );
}
