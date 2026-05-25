import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] px-6 py-12 text-foreground lg:px-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Security</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">Security that feels as premium as the platform itself.</h1>
        <p className="mt-4 text-slate-200">This page provides a refined trust center experience while your full compliance and security details are finalized.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['SOC 2 readiness', 'Controls, process maturity, and governance'],
            ['Encryption by default', 'Protecting data in transit and at rest'],
            ['Access governance', 'Role-based controls and secure collaboration'],
          ].map(([title, description]) => (
            <Card key={title} className="text-white">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="text-slate-200">{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link href="/contact">Discuss security requirements</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
