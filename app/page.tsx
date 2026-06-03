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
    // Save demo analysis in localStorage so Insights shows data
    const demoAnalysis = getDemoAnalysis();
    localStorage.setItem('aura_latest_analysis', JSON.stringify(demoAnalysis));
    // Set a demo token
    localStorage.setItem('aura_token', 'demo-token');
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-aura-navy text-white overflow-hidden">
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/aura-banner.jpg" alt="AURA Banner" fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="mb-8">
          <Image src="/images/aura-logo.png" alt="AURA" width={120} height={48} priority />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif mb-6 max-w-4xl">Your data has more to say.</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          AURA is the AI business partner that reads your company numbers and reveals exactly what to do next.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">Start Free Trial</Link>
          <button onClick={handleDemo} className="btn-gold text-lg px-8 py-4">See AURA in Action</button>
        </div>
        <div className="mt-20 grid grid-cols-3 gap-8 text-center max-w-3xl w-full">
          <div>
            <p className="text-3xl font-bold text-aura-teal">{stats.companies.toLocaleString()}+</p>
            <p className="text-sm text-gray-400">Companies Empowered</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-aura-teal">${stats.revenue}M+</p>
            <p className="text-sm text-gray-400">Revenue Predicted</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-aura-teal">{stats.analyses.toLocaleString()}+</p>
            <p className="text-sm text-gray-400">AI Analyses Run</p>
          </div>
        </div>
      </section>
    </main>
  );
}
