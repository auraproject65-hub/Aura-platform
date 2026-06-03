"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  const handleDemo = async () => {
    const demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJ1c2VySWQiOiJkZW1vLXVzZXIiLCJlbWFpbCI6ImRlbW9AYXVyYS5pZSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxOTk5OTk5OTk5fQ.' +
      'demo-signature';
    document.cookie = `auth-token=${demoToken}; path=/; max-age=3600; samesite=lax`;
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen bg-aura-navy text-white overflow-hidden">
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aura-teal/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aura-gold/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="mb-8">
          <Image src="/images/aura-logo.svg" alt="AURA" width={140} height={48} priority />
        </div>

        <h1 className="text-5xl md:text-7xl font-serif mb-6 max-w-4xl">Your data has more to say.</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
          AURA is the AI business partner that reads your company numbers and reveals exactly what to do next.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">Start Free Trial</Link>
          <button onClick={handleDemo} className="btn-gold text-lg px-8 py-4">See AURA in Action</button>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-3xl w-full">
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
