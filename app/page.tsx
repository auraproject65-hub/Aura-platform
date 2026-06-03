"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getDemoAnalysis } from '@/lib/demo';

export default function LandingPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ companies: 0, revenue: 0, analyses: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        companies: Math.min(prev.companies + 47, 4120),
        revenue: Math.min(prev.revenue + 1.3, 128),
        analyses: Math.min(prev.analyses + 97, 89231),
      }));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleDemo = () => {
    const demoAnalysis = getDemoAnalysis();
    localStorage.setItem('aura_latest_analysis', JSON.stringify(demoAnalysis));
    localStorage.setItem('aura_token', 'demo-token');
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-aura-base text-white">
      <nav className="sticky-nav p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/aura-logo.png" alt="AURA" width={100} height={32} priority />
        </div>
        <div className="flex gap-6 items-center text-sm text-aura-muted">
          <Link href="/pricing" className="hover:text-aura-gold transition">Pricing</Link>
          <Link href="/plan-comparison" className="hover:text-aura-gold transition">Compare</Link>
          <Link href="/auth/login" className="hover:text-aura-gold transition">Sign In</Link>
          <Link href="/auth/register" className="btn-primary text-sm px-5 py-2.5">Get Started</Link>
        </div>
      </nav>

      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aura-teal/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aura-gold/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-7xl font-serif mb-6 max-w-4xl leading-tight">
          Your data has <span className="text-gold-grad">more to say.</span>
        </h1>
        <p className="text-lg md:text-xl text-aura-muted max-w-2xl mb-10">
          Every spreadsheet hides a growth story. AURA reads between the lines and tells you exactly what to do next — no data team required.
        </p>

        <div className="w-full max-w-xl mb-8">
          <div className="glass flex items-center gap-3 px-5 py-4 rounded-full">
            <span className="text-aura-gold">🔍</span>
            <input
              type="text"
              placeholder="Ask anything: 'How can I reduce churn?' or 'Forecast Q3 revenue'..."
              className="bg-transparent flex-1 text-sm text-aura-offwhite placeholder-aura-muted border-none focus:ring-0"
            />
            <button className="btn-primary text-sm px-4 py-1.5">Search</button>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">Start Free Trial</Link>
          <button onClick={handleDemo} className="btn-secondary text-lg px-8 py-4">See AURA in Action</button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 text-center max-w-3xl w-full">
          <div className="animate-fade-up">
            <p className="text-3xl font-bold text-aura-gold">{stats.companies.toLocaleString()}+</p>
            <p className="text-sm text-aura-muted">Companies Empowered</p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-3xl font-bold text-aura-gold">${stats.revenue}M+</p>
            <p className="text-sm text-aura-muted">Revenue Predicted</p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-3xl font-bold text-aura-gold">{stats.analyses.toLocaleString()}+</p>
            <p className="text-sm text-aura-muted">AI Analyses Run</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-serif mb-3">The Problem</h3>
          <p className="text-aura-muted">You have data, but no analyst. You're making decisions based on gut feeling, not facts.</p>
        </div>
        <div className="glass-card p-8 text-center">
          <h3 className="text-xl font-serif mb-3">The Agitation</h3>
          <p className="text-aura-muted">Every day you wait, you're leaving money on the table and missing hidden risks.</p>
        </div>
        <div className="glass-card p-8 text-center ring-1 ring-aura-gold/50">
          <h3 className="text-xl font-serif mb-3 text-aura-gold">The Solution</h3>
          <p className="text-aura-muted">AURA gives you an entire AI-powered strategic advisory team, for less than the cost of a single consultant.</p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12">Everything you need, built in</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "📊", title: "Revenue Forecast", desc: "12-month predictions with confidence intervals." },
            { icon: "🔍", title: "Audit Mode", desc: "One-click forensic scan of your finances." },
            { icon: "🧠", title: "Expert Panel", desc: "Named specialists review every analysis." },
            { icon: "⚡", title: "What‑If Simulator", desc: "Test decisions before you make them." },
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 text-center hover:shadow-aura-gold/20 transition">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-aura-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-12">Plans for every ambition</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Starter", price: "Free", desc: "7-day Pro trial, then Lite forever.", cta: "Start Free", popular: false },
            { name: "Pro", price: "$79/mo", desc: "Unlimited analyses, full AI, Expert Panel.", cta: "Go Pro", popular: true },
            { name: "Enterprise", price: "From $299", desc: "SSO, audit, white-label, dedicated support.", cta: "Contact Sales", popular: false },
          ].map((plan, i) => (
            <div key={i} className={`glass-card p-8 flex flex-col ${plan.popular ? 'ring-2 ring-aura-gold scale-105' : ''}`}>
              <h3 className="text-xl font-serif mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <p className="text-sm text-aura-muted mb-6 flex-1">{plan.desc}</p>
              <Link href={plan.name === "Enterprise" ? "/pricing" : "/auth/register"} className="btn-primary w-full text-center">{plan.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center text-xs text-aura-muted">
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-aura-gold">Privacy</Link>
            <Link href="/terms" className="hover:text-aura-gold">Terms</Link>
            <Link href="/security" className="hover:text-aura-gold">Security</Link>
            <Link href="/ethics" className="hover:text-aura-gold">AI Ethics</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} AURA. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
