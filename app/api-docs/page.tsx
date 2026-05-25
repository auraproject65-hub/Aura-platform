import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] px-6 py-12 text-foreground lg:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">API docs</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">Enterprise-grade API references, ready for review.</h1>
        <p className="mt-4 text-slate-200">This is a polished placeholder for your documentation surface, intended to look premium while your full API spec is prepared.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="text-white">
            <CardHeader>
              <CardTitle>REST endpoints</CardTitle>
              <CardDescription className="text-slate-200">Route access for insights, workflow orchestration, and reporting exports.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-200">Authentication, rate limits, and example payloads are documented here.</p>
            </CardContent>
          </Card>
          <Card className="text-white">
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription className="text-slate-200">Streaming updates for notifications, reports, and model-ready events.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-200">Use webhooks to coordinate automation and executive reporting pipelines.</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href="/contact">Contact sales for documentation access</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
