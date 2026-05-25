import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#060A13,#0B0F19)] px-6 py-12 text-foreground">
      <div className="max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-8 text-center text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">404</p>
        <h1 className="mt-4 text-4xl font-semibold">This page is taking a quick detour.</h1>
        <p className="mt-4 text-slate-200">The route you opened is not available in the demo yet, but the premium flows are still ready to explore. Return to the homepage or head to the dashboard.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/">Back to home</Link></Button>
          <Button asChild variant="outline"><Link href="/dashboard">Open dashboard</Link></Button>
        </div>
      </div>
    </main>
  );
}
