#!/usr/bin/env bash
set -e

cd /workspaces/Aura-platform

mkdir -p app/api-docs app/security app/case-studies app/case-studies/[slug]

cat <<'EOF' > tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0E14',
        foreground: '#F5F6F8',
        ink: '#0B0E14',
        canvas: '#F5F6F8',
        'aura-cyan': '#00E5FF',
        'aura-muted': '#98A6C3',
        accentGold: '#C9A96E',
        accentBlue: '#1E3A8A',
        border: 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        premium: '0 30px 80px rgba(3, 7, 18, 0.45)',
        glow: '0 0 40px rgba(0,229,255,0.22)',
        gold: '0 30px 70px rgba(201, 169, 110, 0.18)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseSlow: 'pulse 5.5s ease-in-out infinite',
        drift: 'drift 16s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(12px, -18px, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
EOF

cat <<'EOF' > app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  --background: #0B0E14;
  --foreground: #F5F6F8;
}

* {
  @apply border-white/10;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(0, 229, 255, 0.1), transparent 18%),
    radial-gradient(circle at top right, rgba(201, 169, 110, 0.12), transparent 16%),
    linear-gradient(180deg, #0B0E14 0%, #111827 60%, #0B0E14 100%);
  color: var(--foreground);
  transition: background-color 500ms ease, color 500ms ease, border-color 500ms ease;
}

.dark {
  color-scheme: dark;
}

::selection {
  background: rgba(0, 229, 255, 0.24);
  color: #f5f6f8;
}

.glass-panel {
  background: linear-gradient(135deg, rgba(245, 246, 248, 0.12), rgba(255, 255, 255, 0.03));
  backdrop-filter: blur(18px);
  box-shadow: 0 22px 60px rgba(3, 7, 18, 0.4);
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[role='button']:focus-visible {
  outline: 2px solid rgba(0, 229, 255, 0.95);
  outline-offset: 2px;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(0, 229, 255, 0.75), rgba(201, 169, 110, 0.7));
  border-radius: 999px;
}
EOF

cat <<'EOF' > components/loading-skeleton.tsx
export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/10 ${className}`} />;
}
EOF

cat <<'EOF' > components/scroll-to-top.tsx
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          className="fixed bottom-5 right-5 z-[60]"
        >
          <Button size="icon" onClick={onClick} className="rounded-full shadow-[0_18px_45px_rgba(0,229,255,0.24)]">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
EOF

cat <<'EOF' > components/app-shell.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { LiveChat } from '@/components/LiveChat';
import { ScrollToTop } from '@/components/scroll-to-top';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-transparent text-foreground">
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
      <Toaster
        position="top-right"
        richColors
        expand
        toastOptions={{
          classNames: {
            toast: 'glass-panel border border-white/10 bg-slate-950/85 text-white shadow-[0_18px_55px_rgba(10,18,35,0.55)]',
          },
        }}
      />
      <LiveChat />
      <ScrollToTop />
    </ThemeProvider>
  );
}
EOF

cat <<'EOF' > app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { AppShell } from '@/components/app-shell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'AURA Platform',
  description: 'AI-powered business intelligence for modern operators.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-transparent`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
EOF

cat <<'EOF' > components/particle-background.tsx
'use client';

export function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,229,255,0.18),transparent_18%),radial-gradient(circle_at_85%_12%,rgba(201,169,110,0.14),transparent_18%),radial-gradient(circle_at_60%_90%,rgba(59,130,246,0.12),transparent_18%)]" />
      <div className="absolute left-[-12%] top-[-10%] h-72 w-72 animate-pulseSlow rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-[10%] right-[-8%] h-80 w-80 animate-drift rounded-full bg-accentGold/10 blur-3xl" />
      <div className="absolute left-[22%] top-[38%] h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
EOF

cat <<'EOF' > components/stats-counter.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useSpring, useMotionValueEvent } from 'framer-motion';

interface StatsCounterProps {
  value: number;
  suffix: string;
  label: string;
}

export function StatsCounter({ value, suffix, label }: StatsCounterProps) {
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { stiffness: 95, damping: 18 });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useMotionValueEvent(spring, 'change', (latest) => {
    setDisplay(Math.floor(latest));
  });

  const formatted = useMemo(() => `${display}${suffix}`, [display, suffix]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-3xl font-semibold text-white">{formatted}</p>
      <p className="text-sm text-slate-200">{label}</p>
    </motion.div>
  );
}
EOF

cat <<'EOF' > components/ui/button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aura-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-aura-cyan text-slate-950 hover:bg-cyan-300 hover:shadow-[0_16px_35px_rgba(0,229,255,0.22)]',
        destructive: 'bg-rose-500 text-white hover:bg-rose-400',
        outline: 'border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-aura-cyan/40',
        ghost: 'text-white hover:bg-white/5',
        secondary: 'bg-white/10 text-white hover:bg-white/15',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
EOF

cat <<'EOF' > components/ui/card.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-[28px] border border-white/10 bg-white/[0.04] text-card-foreground shadow-[0_20px_55px_rgba(3,7,18,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_28px_70px_rgba(9,14,28,0.45)]',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-2 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight text-white font-display', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate-200', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
EOF

cat <<'EOF' > components/NotificationBell.tsx
'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const load = async () => {
    const response = await fetch('/api/notifications');
    const data = await response.json();
    setNotifications(data.notifications || []);
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string) => {
    await fetch('/api/notifications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await load();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {notifications.some((item) => !item.read) && (
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-aura-cyan" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-panel w-88 border border-white/10 bg-slate-950/85 p-2">
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>No notifications yet.</DropdownMenuItem>
        ) : (
          notifications.map((item) => (
            <DropdownMenuItem key={item.id} onClick={() => markRead(item.id)} className="flex flex-col items-start gap-1 rounded-2xl px-3 py-3">
              <span className="font-semibold text-white">{item.title}</span>
              <span className="text-xs text-slate-200">{item.message}</span>
              {!item.read && <span className="text-[10px] uppercase tracking-[0.2em] text-aura-cyan">Unread</span>}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
EOF

cat <<'EOF' > app/page.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3, BrainCircuit, ChevronDown, Globe2, ShieldCheck, Sparkles, Stars, Trophy, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCounter } from '@/components/stats-counter';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { ParticleBackground } from '@/components/particle-background';
import { PublicFooter } from '@/components/public-footer';
import { ProductTour } from '@/components/ProductTour';
import { ROICalculator } from '@/components/roi-calculator';

const logos = ['Slack', 'Salesforce', 'HubSpot', 'Zapier', 'Teams', 'Sheets'];
const features = [
  { title: 'Prediction', description: 'Forecast revenue and growth scenarios from live business signals.', icon: BrainCircuit },
  { title: 'Analysis', description: 'Reveal sales efficiency, loopholes, and strategic opportunities instantly.', icon: BarChart3 },
  { title: 'Solutions', description: 'Turn insights into concrete action plans and executive-ready narratives.', icon: ShieldCheck },
  { title: 'Motivation', description: 'Keep stakeholders aligned with crisp AI-powered narratives and momentum.', icon: Sparkles },
];
const steps = ['Upload your revenue signals', 'AURA scores risk and opportunity', 'Deploy action plans across teams'];
const faqs = [
  { q: 'How quickly can teams launch?', a: 'Most teams connect a dataset and begin generating insights in under 15 minutes.' },
  { q: 'Does AURA use external data?', a: 'AURA combines your uploaded data with built-in intelligence models for tailored recommendations.' },
  { q: 'Can I export reports?', a: 'Yes. Pro and Enterprise include export-ready reports, API access, and executive summaries.' },
  { q: 'What file types are supported?', a: 'CSV, XLSX, PDF, JPG, and PNG are accepted in the data room.' },
];

export default function Home() {
  const [enterpriseOpen, setEnterpriseOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -18]);
  const featureY = useTransform(scrollYProgress, [0, 0.55], [0, -8]);

  const stats = useMemo(() => [
    { value: 4000, suffix: '+', label: 'Companies empowered' },
    { value: 128, suffix: 'M', label: 'Revenue modelled' },
    { value: 12000, suffix: '+', label: 'Analyses run' },
  ], []);

  return (
    <main className="relative overflow-hidden bg-transparent text-foreground">
      <ParticleBackground />
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-24 pt-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-aura-cyan/30 bg-white/5 px-3 py-1 text-sm font-semibold tracking-[0.22em] text-aura-cyan">AURA</div>
            <p className="text-sm text-slate-200">Executive intelligence, reimagined.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="ghost">
              <Link href="/pricing">Pricing</Link>
            </Button>
            <div className="relative">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEnterpriseOpen((open) => !open)}
                className="gap-2"
              >
                Enterprise
                <ChevronDown className={`h-4 w-4 transition-transform ${enterpriseOpen ? 'rotate-180' : ''}`} />
              </Button>
              <AnimatePresence>
                {enterpriseOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="absolute right-0 top-14 z-20 w-[360px] rounded-[28px] border border-white/10 bg-slate-950/92 p-4 shadow-[0_28px_70px_rgba(9,14,28,0.5)]"
                  >
                    <div className="grid gap-3">
                      <Link href="/help" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
                        <div className="font-semibold">Help Center</div>
                        <div className="mt-1 text-xs text-slate-200">Guides, workflows, and onboarding support.</div>
                      </Link>
                      <Link href="/api-docs" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
                        <div className="font-semibold">API documentation</div>
                        <div className="mt-1 text-xs text-slate-200">Secure endpoints, schemas, and integration notes.</div>
                      </Link>
                      <Link href="/security" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
                        <div className="font-semibold">Security</div>
                        <div className="mt-1 text-xs text-slate-200">Compliance posture, controls, and trust center.</div>
                      </Link>
                      <Link href="/contact" className="rounded-2xl bg-gradient-to-r from-aura-cyan to-accentGold px-4 py-3 text-sm font-semibold text-slate-950">
                        Contact Sales
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div style={{ y: heroY }} data-tour="hero">
            <div className="inline-flex items-center gap-2 rounded-full border border-aura-cyan/30 bg-white/5 px-4 py-2 text-sm text-aura-cyan">
              <Stars className="h-4 w-4" /> Trusted executive intelligence for revenue teams
            </div>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              AI growth intelligence built for billion-dollar decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200">
              AURA turns revenue, operations, and market signals into crystal-clear forecasts, strategic insights, and executive-ready actions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/auth/register">Start your free trial</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to sales</Link>
              </Button>
              <ProductTour />
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-200">
              <div><span className="text-aura-cyan">99.2%</span> forecast precision</div>
              <div><span className="text-aura-cyan">24/7</span> rapid analysis</div>
              <div><span className="text-aura-cyan">SOC 2</span> ready</div>
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="glass-panel rounded-[28px] border border-white/10 p-6">
            <div className="rounded-[24px] border border-aura-cyan/30 bg-gradient-to-br from-white/10 to-cyan-400/10 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Live signal</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Growth command center</p>
                </div>
                <Trophy className="h-8 w-8 text-accentGold" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <StatsCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Executive brief</p>
                <p className="mt-2">Market signals show strong expansion in SaaS and retail cohorts. AURA recommends retention-first execution in the next 90 days.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: featureY }}
          className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur"
        >
          <p className="text-center text-sm uppercase tracking-[0.28em] text-slate-200">Trusted by elite operators</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center sm:grid-cols-6">
            {logos.map((logo) => (
              <div key={logo} className="glass-panel rounded-[24px] border border-white/10 px-4 py-4 text-lg font-semibold text-white">
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12" data-tour="integrations">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Seamless integrations</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Connect the tools your teams already use.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/help">Explore help center</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {logos.map((logo) => (
            <Card key={logo} className="text-center text-white">
              <CardContent className="pt-6 text-lg font-semibold">{logo}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12" data-tour="roi">
        <ROICalculator />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <motion.div style={{ y: featureY }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full text-white">
              <CardHeader>
                <feature.icon className="h-7 w-7 text-aura-cyan" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-slate-200">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">How it works</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">From raw data to decisive action in minutes.</h2>
            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aura-cyan/20 text-aura-cyan">{index + 1}</div>
                  <p className="text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <Card className="text-white">
              <CardHeader>
                <CardTitle>Case studies</CardTitle>
                <CardDescription className="text-slate-200">Fictional enterprise outcomes and executive-ready proof points.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Retail operator unlocked 18% margin recovery.</p>
                <p>• SaaS team cut churn forecasting noise by 42%.</p>
                <p>• Healthcare group standardized reporting across 12 units.</p>
              </CardContent>
            </Card>
            <Card className="text-white">
              <CardHeader>
                <CardTitle>What you get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-200">
                <p>• C-suite-ready narratives</p>
                <p>• Forecast modeling for planning cycles</p>
                <p>• Secure in-memory SaaS simulation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Testimonials</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">Customers move faster with clearer decisions.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/case-studies">Explore case studies</Link>
          </Button>
        </div>
        <div className="mt-8"><TestimonialCarousel /></div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <h2 className="font-display text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
                <summary className="cursor-pointer font-semibold text-white">{faq.q}</summary>
                <p className="mt-3 text-slate-200">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-12">
        <Card className="overflow-hidden text-white">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 lg:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Enterprise assurance</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">Premium operations, engineered for trust.</h2>
              <p className="mt-4 text-slate-200">From forecasting to security, AURA blends high-touch design with meticulous controls for teams that expect more.</p>
              <div className="mt-6 space-y-3 text-sm text-slate-100">
                <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-aura-cyan" /> Data controls and role-based access</div>
                <div className="flex items-center gap-3"><Globe2 className="h-4 w-4 text-aura-cyan" /> Global-ready workflows</div>
                <div className="flex items-center gap-3"><Users2 className="h-4 w-4 text-aura-cyan" /> Executive collaboration that scales</div>
              </div>
              <Button asChild className="mt-6">
                <Link href="/contact">Book a strategy call <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="border-t border-white/10 bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(201,169,110,0.12))] p-6 lg:border-l lg:border-t-0">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-sm text-slate-200">Executive briefings</p>
                  <p className="mt-2 text-2xl font-semibold text-white">72 hrs</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-sm text-slate-200">Security readiness</p>
                  <p className="mt-2 text-2xl font-semibold text-white">SOC 2-aligned</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-slate-950/35 p-4 sm:col-span-2">
                  <p className="text-sm text-slate-200">Premium commitment</p>
                  <p className="mt-2 text-sm text-slate-100">AURA is designed for leadership teams that want a cinematic digital experience without sacrificing operational control.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <PublicFooter />
    </main>
  );
}
EOF

cat <<'EOF' > app/auth/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck, Sparkles, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const valueProps = [
  { icon: Sparkles, title: 'Executive clarity', description: 'Board-ready intelligence, distilled into confident action.' },
  { icon: ShieldCheck, title: 'Enterprise trust', description: 'Secure workflows designed for premium adoption and governance.' },
  { icon: BarChart3, title: 'Operational speed', description: 'Move from upload to insight in a single guided experience.' },
  { icon: Users2, title: 'Team alignment', description: 'Share momentum with the teams that need visibility and context.' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || 'Unable to register');
      return;
    }

    router.push('/onboarding');
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] px-4 py-12 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Register</p>
            <CardTitle className="font-display text-3xl">Create your premium AURA workspace.</CardTitle>
            <CardDescription className="text-slate-200">
              Launch your executive intelligence environment with a guided onboarding flow and a premium experience from day one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} required />
              <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              {error && <p className="text-sm text-rose-300">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
            <p className="mt-4 text-sm text-slate-200">
              Already have an account? <Link href="/auth/login" className="text-aura-cyan">Sign in</Link>
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-white/[0.1] to-slate-950/80 text-white">
            <CardHeader>
              <p className="text-sm uppercase tracking-[0.3em] text-accentGold">Trusted by operators</p>
              <CardTitle className="font-display text-2xl">“AURA gave our leadership team the confidence to move faster without reducing rigor.”</CardTitle>
              <CardDescription className="text-slate-200">
                A senior revenue executive at a multi-unit growth brand describes the shift after adopting AURA.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm text-slate-200">Highlights</p>
                <ul className="mt-3 space-y-2 text-sm text-white">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-aura-cyan" /> Clearer executive narratives</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-aura-cyan" /> Better visibility into retention risk</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-aura-cyan" /> A premium workflow your teams actually want to use</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            {valueProps.map((item) => (
              <Card key={item.title} className="border-white/10 bg-white/[0.03] text-white">
                <CardContent className="pt-6">
                  <item.icon className="h-5 w-5 text-aura-cyan" />
                  <p className="mt-3 font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-200">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardContent className="flex items-center justify-between gap-4 pt-6">
              <div>
                <p className="font-semibold">Ready for the next milestone?</p>
                <p className="text-sm text-slate-200">Move from sign-up to activation with a guided experience.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-aura-cyan" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
EOF

cat <<'EOF' > app/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const steps = [
  { title: 'Company details', description: 'Set the frame for your executive workspace.' },
  { title: 'Upload first file', description: 'Create your first high-confidence growth snapshot.' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('SaaS');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const uploadFirstFile = async () => {
    if (!file) {
      setStatus('Please select a CSV, XLSX, PDF, JPG, or PNG file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('industry', industry);

    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    if (!response.ok) {
      setStatus('Upload failed. Please retry with a supported file type.');
      return;
    }

    setStatus('Upload complete. Finalizing your workspace...');

    const onboardingResponse = await fetch('/api/onboarding', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, industry, onboardingComplete: true }),
    });

    if (!onboardingResponse.ok) {
      setStatus('We could not save your onboarding details. Please refresh and try again.');
      return;
    }

    if (typeof window !== 'undefined') {
      window.location.assign('/dashboard');
      return;
    }

    router.push('/dashboard');
  };

  const progress = (step / steps.length) * 100;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] px-4 py-12 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Onboarding</p>
            <CardTitle className="font-display text-3xl">Welcome to your AURA launch sequence.</CardTitle>
            <CardDescription className="text-slate-200">A premium setup experience for teams that want momentum from the very first interaction.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm text-slate-200">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-aura-cyan to-accentGold"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((item, index) => (
                <div key={item.title} className={`rounded-[24px] border px-4 py-3 ${index + 1 === step ? 'border-aura-cyan/40 bg-white/10' : 'border-white/10 bg-white/5'}`}>
                  <p className="text-sm uppercase tracking-[0.2em] text-aura-cyan">Step {index + 1}</p>
                  <p className="mt-2 font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-200">{item.description}</p>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <Input placeholder="Company name" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
                <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/75 px-3 py-2 text-white">
                  <option value="SaaS">SaaS</option>
                  <option value="Retail">Retail</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                </select>
                <Button className="w-full" onClick={() => setStep(2)}>Continue</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-slate-200">Upload your first dataset to create a high-confidence forecast and trigger your AI workspace.</p>
                <Input type="file" accept=".csv,.xlsx,.xls,.pdf,.jpg,.jpeg,.png" onChange={(event) => setFile(event.target.files?.[0] || null)} />
                <p className="text-sm text-slate-200">{status}</p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={uploadFirstFile}>Finish onboarding</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-gradient-to-br from-white/[0.1] to-slate-950/80 text-white">
          <CardHeader>
            <p className="text-sm uppercase tracking-[0.3em] text-accentGold">Why teams stay</p>
            <CardTitle className="font-display text-2xl">A launch experience that feels as premium as the product itself.</CardTitle>
            <CardDescription className="text-slate-200">
              The onboarding flow blends clear guidance with a confident visual system, helping operators feel ready from the first click.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-100">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">• Tailored setup for revenue, operations, and analytics teams.</div>
            <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">• Rapid activation with fewer decisions and better executive readiness.</div>
            <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">• Premium visuals, strong hierarchy, and a calm sense of control.</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
EOF

cat <<'EOF' > app/case-studies/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const stories = [
  {
    slug: 'retail-growth-recovery',
    title: 'Retail growth recovery',
    summary: 'A luxury retail operator used AURA to identify margin leakage, model recovery actions, and align leadership on a 90-day plan.',
    outcome: '18% margin recovery in one quarter',
  },
  {
    slug: 'saas-renewal-acceleration',
    title: 'SaaS renewal acceleration',
    summary: 'A sales-led organisation combined customer signal analysis with cohort insights to sharpen retention messaging and protect renewal volume.',
    outcome: '42% faster churn interpretation',
  },
  {
    slug: 'healthcare-reporting-orchestration',
    title: 'Healthcare reporting orchestration',
    summary: 'A multi-unit operator deployed a unified reporting workflow and used confidence-first dashboards to standardize executive narratives.',
    outcome: '12-unit reporting alignment',
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Case studies</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">Executive outcomes built for momentum.</h1>
          <p className="mt-4 text-slate-200">
            See how modern operators use AURA to turn signals into stronger decisions, faster launches, and clearer execution plans.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {stories.map((story) => (
            <Card key={story.slug} className="text-white">
              <CardHeader>
                <CardTitle>{story.title}</CardTitle>
                <CardDescription className="text-slate-200">{story.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="rounded-[24px] border border-aura-cyan/20 bg-aura-cyan/10 px-4 py-3 text-sm text-slate-100">Outcome: {story.outcome}</p>
                <Button asChild className="mt-4">
                  <Link href={`/case-studies/${story.slug}`}>View case study</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Need a tailored story?</p>
          <h2 className="mt-3 font-display text-2xl font-semibold">Build a plan for your next growth milestone.</h2>
          <p className="mt-3 max-w-2xl text-slate-200">
            If you want a more tailored walkthrough, the contact team can map AURA to your data, operations, and executive reporting needs.
          </p>
          <Button asChild className="mt-4">
            <Link href="/contact">Talk to sales</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
EOF

cat <<'EOF' > app/case-studies/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const stories: Record<string, {
  title: string;
  eyebrow: string;
  summary: string;
  quote: string;
  challenge: string[];
  solution: string[];
  results: string[];
  metrics: Array<{ label: string; value: string; hint: string }>;
  progress: Array<{ label: string; value: number }>;
}> = {
  'retail-growth-recovery': {
    title: 'Retail growth recovery',
    eyebrow: 'Retail',
    summary: 'A premium retail operator used AURA to expose margin leakage, model recovery actions, and align leadership around a 90-day action plan.',
    quote: 'AURA gave us calm confidence. We could finally move from fragmented reporting to a single, executive-grade growth narrative.',
    challenge: [
      'Regional discounting was draining margin without clear attribution.',
      'Leadership teams were debating priorities without a shared evidence base.',
      'Forecasts relied on manual spreadsheets and felt too slow to trust.',
    ],
    solution: [
      'AURA aggregated sales, promotion, and inventory signals into a live growth narrative.',
      'Dynamic scenario modeling exposed the most resilient recovery actions and timing.',
      'Executive summaries were generated automatically for every leadership review.',
    ],
    results: [
      '18% margin recovery in one quarter.',
      'Forecast confidence improved by 21% across retail planning cycles.',
      'Leadership decision cycles shortened from weeks to days.',
    ],
    metrics: [
      { label: 'Recovered margin', value: '$4.8M', hint: 'Quarterly impact' },
      { label: 'Forecast confidence', value: '91%', hint: 'Confidence uplift' },
      { label: 'Operating efficiency', value: '32%', hint: 'Fewer manual reviews' },
    ],
    progress: [
      { label: 'Revenue recovery', value: 82 },
      { label: 'Execution readiness', value: 76 },
      { label: 'Leadership alignment', value: 88 },
    ],
  },
  'saas-renewal-acceleration': {
    title: 'SaaS renewal acceleration',
    eyebrow: 'SaaS',
    summary: 'A fast-growing software company used AURA to connect retention signals, refresh renewal strategy, and turn noisy churn data into proactive action.',
    quote: 'We stopped guessing and started leading. The new narrative helped our customer team prioritize the right accounts with confidence.',
    challenge: [
      'Renewal risk signals were scattered across sales, support, and product data.',
      'Executive updates were inconsistent and often lagged behind the real signal.',
      'Customer success leaders needed a faster, clearer decision path.',
    ],
    solution: [
      'AURA unified product usage, support interactions, and sales signals into one retention model.',
      'An executive-ready view surfaced at-risk accounts and the most effective interventions.',
      'Alerts and summaries were embedded into the weekly leadership operating rhythm.',
    ],
    results: [
      '42% faster churn interpretation across the sales and CS teams.',
      'Renewal planning cycles reduced from 10 days to 3 days.',
      'Executive confidence improved with a clear path from signal to action.',
    ],
    metrics: [
      { label: 'Renewal lift', value: '+11%', hint: 'Quarterly uplift' },
      { label: 'Alert precision', value: '94%', hint: 'Target match rate' },
      { label: 'People coordination', value: '3.2x', hint: 'Faster decision cadence' },
    ],
    progress: [
      { label: 'Signal clarity', value: 87 },
      { label: 'Retention readiness', value: 79 },
      { label: 'Executive momentum', value: 91 },
    ],
  },
  'healthcare-reporting-orchestration': {
    title: 'Healthcare reporting orchestration',
    eyebrow: 'Healthcare',
    summary: 'A multi-unit healthcare operator adopted AURA to unify reporting, make executive briefings more consistent, and turn siloed performance data into a shared view.',
    quote: 'The platform gave us a consistent operating language across units. That alone transformed how leadership reviewed performance.',
    challenge: [
      'Regional teams were managing reporting in disconnected tools and formats.',
      'Leadership meetings had to reconcile conflicting numbers before any action could be taken.',
      'The organization needed a clearer view of which units were accelerating or lagging.',
    ],
    solution: [
      'AURA standardized revenue, utilization, and operational signals across units.',
      'A premium reporting layer produced executive-ready summaries for each review cycle.',
      'Cross-unit comparisons surfaced the most critical changes without manual consolidation.',
    ],
    results: [
      '12-unit reporting alignment across leadership and operations teams.',
      'Executive report preparation time dropped by 58%.',
      'Coverage gaps across performance reviews were reduced dramatically.',
    ],
    metrics: [
      { label: 'Reporting alignment', value: '12 units', hint: 'Unified dashboards' },
      { label: 'Time saved', value: '58%', hint: 'Weekly report prep' },
      { label: 'Consistency score', value: '96%', hint: 'Cross-unit standardization' },
    ],
    progress: [
      { label: 'Data unification', value: 84 },
      { label: 'Executive readiness', value: 90 },
      { label: 'Operational adoption', value: 81 },
    ],
  },
};

function RadialRing({ value, label }: { value: number; label: string }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
      <svg width="90" height="90" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#00E5FF"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="text-center">
        <p className="text-lg font-semibold text-white">{value}%</p>
        <p className="text-sm text-slate-200">{label}</p>
      </div>
    </div>
  );
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const story = stories[params.slug];

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">{story.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">{story.title}</h1>
          <p className="mt-4 max-w-3xl text-slate-200">{story.summary}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {story.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[24px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-sm text-slate-200">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-slate-200">{metric.hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[24px] border border-white/10 bg-slate-950/40 p-6">
              <h2 className="font-display text-2xl font-semibold">Executive quote</h2>
              <blockquote className="mt-4 border-l-2 border-aura-cyan/60 pl-4 text-lg text-slate-100">{story.quote}</blockquote>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-display text-2xl font-semibold">Performance pulse</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {story.progress.map((item) => (
                  <RadialRing key={item.label} value={item.value} label={item.label} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-3">
          <Card className="text-white">
            <CardHeader>
              <CardTitle>Challenge</CardTitle>
              <CardDescription className="text-slate-200">The operational problem before AURA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {story.challenge.map((item) => (
                <p key={item} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">{item}</p>
              ))}
            </CardContent>
          </Card>
          <Card className="text-white">
            <CardHeader>
              <CardTitle>Solution</CardTitle>
              <CardDescription className="text-slate-200">How AURA translated signals into action.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {story.solution.map((item) => (
                <p key={item} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">{item}</p>
              ))}
            </CardContent>
          </Card>
          <Card className="text-white">
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription className="text-slate-200">Measured outcomes and material improvements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {story.results.map((item) => (
                <p key={item} className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">{item}</p>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-display text-2xl font-semibold">Want to explore a similar rollout?</h2>
          <p className="mt-3 max-w-2xl text-slate-200">Talk to AURA about building a premium operating rhythm for your own team.</p>
          <Button asChild className="mt-4">
            <Link href="/contact">Contact sales</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
EOF

cat <<'EOF' > app/blog/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const featured = {
  slug: 'ai-growth-strategy',
  title: 'AI growth strategy for modern finance teams',
  description: 'How AI helps leadership teams move from reporting to forecasting, without losing the human context that makes decisions durable.',
  author: 'Maya Chen',
  date: 'May 18, 2026',
};

const posts = [
  {
    slug: 'revenue-forecasting',
    title: 'Revenue forecasting that feels instant and dependable',
    description: 'A practical guide to building reliable models from mixed datasets and turning them into executive narratives.',
    author: 'Nora Patel',
    date: 'May 16, 2026',
  },
  {
    slug: 'executive-readiness',
    title: 'Executive readiness in the age of constant change',
    description: 'How modern operators prepare teams and systems for faster, more deliberate decisions.',
    author: 'Sam Rivera',
    date: 'May 12, 2026',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Editorial</p>
            <h1 className="mt-4 font-display text-4xl font-semibold">AURA insights for operators, founders, and analysts.</h1>
            <p className="mt-4 text-lg text-slate-200">A curated magazine of strategy, forecasting, and premium execution for teams that want the next level of clarity.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span>{featured.author}</span>
              <span>•</span>
              <span>{featured.date}</span>
            </div>
            <div className="mt-6 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,229,255,0.16),rgba(201,169,110,0.18))] p-6">
              <div className="h-48 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent_20%),linear-gradient(135deg,#0F172A,#111827)]" />
              <h2 className="mt-5 font-display text-2xl font-semibold">{featured.title}</h2>
              <p className="mt-3 text-slate-100">{featured.description}</p>
              <Button asChild className="mt-4">
                <Link href={`/blog/${featured.slug}`}>Read featured article</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.slug} className="text-white">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="text-slate-200">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between gap-3 text-sm text-slate-200">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <Button asChild className="mt-4">
                    <Link href={`/blog/${post.slug}`}>Read article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
EOF

cat <<'EOF' > app/blog/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

const posts = {
  'ai-growth-strategy': {
    title: 'AI growth strategy for modern finance teams',
    author: 'Maya Chen',
    date: 'May 18, 2026',
    summary: 'AURA helps leaders focus on the right plays by combining revenue signals, executive priorities, and confident action in a single, trustworthy workspace.',
    content: [
      'Modern finance teams need more than static reporting. They need a system that translates signals into decisions and decisions into outcomes.',
      'AURA brings together forecasting, scenario planning, and narrative generation so leaders can move with confidence from early analysis through final presentation.',
      'The result is a calm, high-trust operating rhythm where teams stop chasing spreadsheets and start acting on clear priorities.',
    ],
    related: [
      { slug: 'revenue-forecasting', title: 'Revenue forecasting that feels instant and dependable' },
      { slug: 'executive-readiness', title: 'Executive readiness in the age of constant change' },
    ],
  },
  'revenue-forecasting': {
    title: 'Revenue forecasting that feels instant and dependable',
    author: 'Nora Patel',
    date: 'May 16, 2026',
    summary: 'By blending historical trends and live patterns, AURA creates actionable forecasts that feel fast, credible, and easy to communicate.',
    content: [
      'Reliable forecasting starts with data hygiene, but it becomes powerful when teams can interpret the story behind the numbers quickly.',
      'AURA surfaces the key assumptions, highlights risk, and turns the forecast into a flexible narrative for leadership planning.',
      'This allows operators to spend less time reconciling inputs and more time improving outcomes.',
    ],
    related: [
      { slug: 'ai-growth-strategy', title: 'AI growth strategy for modern finance teams' },
      { slug: 'executive-readiness', title: 'Executive readiness in the age of constant change' },
    ],
  },
  'executive-readiness': {
    title: 'Executive readiness in the age of constant change',
    author: 'Sam Rivera',
    date: 'May 12, 2026',
    summary: 'The next generation of executive teams depends on a blend of speed, insight, and clarity. AURA is built for that.',
    content: [
      'Executive readiness is not only about reporting cadence. It is about how quickly a team can turn new information into alignment.',
      'AURA helps leaders unify the central narrative, reduce manual preparation, and strengthen confidence in decision-making.',
      'That clarity enables faster decisions, sharper communication, and greater trust across the organization.',
    ],
    related: [
      { slug: 'ai-growth-strategy', title: 'AI growth strategy for modern finance teams' },
      { slug: 'revenue-forecasting', title: 'Revenue forecasting that feels instant and dependable' },
    ],
  },
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0B0E14,#111827)] px-6 py-12 text-white lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(0,229,255,0.15),rgba(201,169,110,0.18))] p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-aura-cyan">Magazine feature</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-100">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <p className="mt-6 text-lg text-slate-100">{post.summary}</p>
          <div className="mt-6 h-56 rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.45),transparent_18%),linear-gradient(135deg,#0F172A,#111827)]" />
        </div>

        <article className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-8 text-slate-100">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-display text-2xl font-semibold">Related articles</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {post.related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-[24px] border border-white/10 bg-slate-950/40 px-4 py-3 text-white hover:bg-white/5">
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Button asChild>
            <Link href="/blog">Back to all articles</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
EOF

cat <<'EOF' > app/dashboard/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, FolderOpen, Sparkles, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SkeletonBlock } from '@/components/loading-skeleton';

interface AnalysisItem {
  id: string;
  industry: string;
  generatedAt: string;
  annualForecast: number;
}

interface DashboardStats {
  analyses: number;
  team: number;
  plan: string;
}

const activityFeed = [
  'A new analysis is ready for executive review.',
  'Your team invites are synced and live.',
  'AURA surfaced a new retention opportunity in the latest dataset.',
  'A premium insights export was prepared for your leadership review.',
];

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({ analyses: 0, team: 0, plan: 'starter' });
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [analysisRes, subscriptionRes, teamRes] = await Promise.all([
        fetch('/api/analysis'),
        fetch('/api/subscription'),
        fetch('/api/team'),
      ]);

      const analysisData = await analysisRes.json();
      const subscriptionData = await subscriptionRes.json();
      const teamData = await teamRes.json();

      const currentAnalyses = Array.isArray(analysisData.analysis)
        ? analysisData.analysis
        : analysisData.analysis
          ? [analysisData.analysis]
          : [];

      setStats({
        analyses: currentAnalyses.length,
        team: Array.isArray(teamData.members) ? teamData.members.length : 0,
        plan: subscriptionData.plan || 'starter',
      });
      setAnalyses(currentAnalyses.map((analysis: AnalysisItem) => ({
        id: analysis.id,
        industry: analysis.industry || 'SaaS',
        generatedAt: analysis.generatedAt,
        annualForecast: analysis.annualForecast,
      })));
      setLoading(false);
    }

    load();
  }, []);

  const recent = useMemo(() => analyses.slice(0, 4), [analyses]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-white/10 bg-[linear-gradient(135deg,rgba(11,15,25,0.98),rgba(0,229,255,0.14))] text-white">
          <CardHeader>
            <CardTitle>Welcome back to AURA</CardTitle>
            <CardDescription className="text-slate-200">The premium command center for forecasting, collaboration, and board-ready decisions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-100">
            <div className="rounded-[24px] border border-aura-cyan/20 bg-aura-cyan/10 px-4 py-4">
              <div className="flex items-center gap-2 text-aura-cyan"><Sparkles className="h-4 w-4" /> AI tagline</div>
              <p className="mt-3 text-lg font-semibold text-white">Turn every signal into a measurable growth story.</p>
            </div>
            <p>Move from upload to insight in one flow: review datasets, run analysis, and share premium narratives with your team.</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild><Link href="/dashboard/data-room">Open data room</Link></Button>
              <Button asChild variant="outline"><Link href="/dashboard/insights">Open insights</Link></Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <CardTitle>Workspace snapshot</CardTitle>
            <CardDescription className="text-slate-200">A premium place to act on the latest market signals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {loading ? (
                <>
                  <SkeletonBlock className="h-20" />
                  <SkeletonBlock className="h-20" />
                  <SkeletonBlock className="h-20" />
                </>
              ) : (
                <>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-200">Plan</p>
                    <p className="mt-2 text-xl font-semibold text-white uppercase">{stats.plan}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-200">Analyses</p>
                    <p className="mt-2 text-xl font-semibold text-white">{stats.analyses}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-200">Team</p>
                    <p className="mt-2 text-xl font-semibold text-white">{stats.team}</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {loading ? (
          [1, 2, 3].map((item) => <SkeletonBlock key={item} className="h-28" />)
        ) : (
          <>
            <Card className="border-white/10 bg-white/[0.03] text-white">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Analyses</CardTitle>
                <BarChart3 className="h-5 w-5 text-aura-cyan" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stats.analyses}</p>
                <p className="mt-2 text-sm text-slate-200">Live snapshots for leadership and growth reviews.</p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/[0.03] text-white">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Team</CardTitle>
                <Users2 className="h-5 w-5 text-aura-cyan" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stats.team}</p>
                <p className="mt-2 text-sm text-slate-200">Collaborators connected to the workspace.</p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/[0.03] text-white">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Plan</CardTitle>
                <FolderOpen className="h-5 w-5 text-aura-cyan" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold capitalize">{stats.plan}</p>
                <p className="mt-2 text-sm text-slate-200">Upgrade to unlock deeper executive intelligence.</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <CardTitle>Recent analyses</CardTitle>
            <CardDescription className="text-slate-200">A premium history of executive decisions and forecast outcomes.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <SkeletonBlock className="h-16" />
                <SkeletonBlock className="h-16" />
              </div>
            ) : (
              <div className="space-y-3">
                {recent.length === 0 ? (
                  <p className="text-sm text-slate-200">Upload a dataset to generate your first analysis.</p>
                ) : (
                  recent.map((analysis) => (
                    <div key={analysis.id} className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-3">
                      <div>
                        <p className="font-semibold text-white">{analysis.industry}</p>
                        <p className="text-sm text-slate-200">{new Date(analysis.generatedAt).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">${analysis.annualForecast.toLocaleString()}</p>
                        <p className="text-sm text-slate-200">forecast</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription className="text-slate-200">Jump directly into the next best move.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/data-room"><Button className="w-full justify-between"><span>Upload dataset</span><ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/dashboard/insights"><Button variant="outline" className="w-full justify-between"><span>Review insights</span><ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/dashboard/settings"><Button variant="outline" className="w-full justify-between"><span>Open settings</span><ArrowRight className="h-4 w-4" /></Button></Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardHeader>
              <CardTitle>Activity feed</CardTitle>
              <CardDescription className="text-slate-200">A curated pulse of moves across your workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activityFeed.map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">{item}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
EOF

cat <<'EOF' > app/dashboard/data-room/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { FileSpreadsheet, FileText, ImageIcon, Table2, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SkeletonBlock } from '@/components/loading-skeleton';

interface DatasetRecord {
  id: string;
  filename: string;
  industry: string;
  mimeType: string;
  previewType: 'table' | 'text' | 'image' | 'pdf';
  contentPreview: string;
  rows: Array<Record<string, string>>;
  uploadedAt: string;
}

export default function DataRoomPage() {
  const [datasets, setDatasets] = useState<DatasetRecord[]>([]);
  const [industry, setIndustry] = useState('SaaS');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadDatasets = async () => {
    const response = await fetch('/api/upload');
    const data = await response.json();
    setDatasets(data.datasets || []);
    setInitialLoading(false);
  };

  useEffect(() => {
    loadDatasets();
  }, []);

  const uploadFile = async () => {
    if (!file) {
      setStatus('Select a file to upload.');
      return;
    }

    setLoading(true);
    setStatus('Uploading and extracting preview...');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('industry', industry);

    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus(data.error || 'Upload failed.');
      return;
    }

    setStatus(`Uploaded ${data.filename}.`);
    await loadDatasets();
  };

  const recentPreview = useMemo(() => datasets[0], [datasets]);

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/[0.03] text-white">
        <CardHeader>
          <CardTitle>Multi-format Data Room</CardTitle>
          <CardDescription className="text-slate-200">Accept CSV, XLSX, PDF, JPG, and PNG uploads with in-memory previews and AI-ready storage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Industry" value={industry} onChange={(event) => setIndustry(event.target.value)} />
            <Input type="file" accept=".csv,.xlsx,.xls,.pdf,.jpg,.jpeg,.png" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={uploadFile} disabled={loading}>
              <UploadCloud className="mr-2 h-4 w-4" />
              {loading ? 'Processing...' : 'Upload and analyse'}
            </Button>
            <span className="text-sm text-slate-200">{status}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <CardTitle>Recent uploads</CardTitle>
            <CardDescription className="text-slate-200">Stored in-memory for the current session.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {initialLoading ? (
              <>
                <SkeletonBlock className="h-16" />
                <SkeletonBlock className="h-16" />
              </>
            ) : datasets.length === 0 ? (
              <p className="text-sm text-slate-200">No files uploaded yet.</p>
            ) : (
              datasets.slice(0, 4).map((dataset) => (
                <div key={dataset.id} className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{dataset.filename}</p>
                      <p className="text-sm text-slate-200">{dataset.industry} • {dataset.mimeType}</p>
                    </div>
                    {dataset.previewType === 'table' ? <Table2 className="h-5 w-5 text-aura-cyan" /> : dataset.previewType === 'image' ? <ImageIcon className="h-5 w-5 text-aura-cyan" /> : dataset.previewType === 'pdf' ? <FileText className="h-5 w-5 text-aura-cyan" /> : <FileSpreadsheet className="h-5 w-5 text-aura-cyan" />}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription className="text-slate-200">CSV and XLSX rows render as table previews; other files show a summary.</CardDescription>
          </CardHeader>
          <CardContent>
            {initialLoading ? (
              <SkeletonBlock className="h-56" />
            ) : recentPreview ? (
              recentPreview.previewType === 'table' ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-slate-200">
                        {Object.keys(recentPreview.rows[0] || {}).map((header) => <th key={header} className="pb-2">{header}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {recentPreview.rows.slice(0, 5).map((row, index) => (
                        <tr key={`${row}-${index}`} className="border-t border-white/10">
                          {Object.values(row).map((value, innerIndex) => <td key={`${value}-${innerIndex}`} className="py-2">{value}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-200">{recentPreview.contentPreview}</p>
                  <p className="mt-3 text-sm font-semibold text-white">{recentPreview.filename}</p>
                </div>
              )
            ) : (
              <p className="text-sm text-slate-200">Upload a file to see the preview here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
EOF

cat <<'EOF' > app/dashboard/insights/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SkeletonBlock } from '@/components/loading-skeleton';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AnalysisResult {
  id: string;
  industry: string;
  annualForecast: number;
  forecast: number[];
  strengths: string[];
  loopholes: string[];
  solutions: string[];
  motivation: string;
  decisionMatrix: Array<{ option: string; impact: string; risk: string }>;
  generatedAt: string;
}

const heatmap = [
  [58, 72, 64, 81],
  [66, 74, 79, 88],
  [52, 69, 75, 83],
  [47, 61, 70, 86],
];

const cohortRows = [
  { cohort: 'New', retention: 78, expansion: 42 },
  { cohort: 'Growth', retention: 86, expansion: 58 },
  { cohort: 'Enterprise', retention: 91, expansion: 67 },
];

const stacked = [
  { month: 'Jan', forecast: 42, actual: 38 },
  { month: 'Feb', forecast: 44, actual: 41 },
  { month: 'Mar', forecast: 47, actual: 43 },
  { month: 'Apr', forecast: 51, actual: 46 },
  { month: 'May', forecast: 55, actual: 49 },
  { month: 'Jun', forecast: 58, actual: 52 },
];

export default function InsightsPage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [tab, setTab] = useState<'Forecast' | 'Cohort Analysis' | 'Heatmap' | 'Solutions'>('Forecast');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analysis')
      .then((response) => response.json())
      .then((data) => {
        setAnalysis(data.analysis || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const forecastData = useMemo(() => (analysis?.forecast || [25, 30, 38, 44, 48, 52]).map((value, index) => ({ month: `M${index + 1}`, value })), [analysis]);
  const strengthData = useMemo(() => [
    { name: 'Strengths', value: analysis?.strengths.length ? analysis.strengths.length * 12 : 28 },
    { name: 'Loopholes', value: analysis?.loopholes.length ? analysis.loopholes.length * 10 : 18 },
  ], [analysis]);

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonBlock className="h-20" />
        <div className="grid gap-4 xl:grid-cols-2">
          <SkeletonBlock className="h-72" />
          <SkeletonBlock className="h-72" />
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <SkeletonBlock className="h-64" />
          <SkeletonBlock className="h-64" />
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <Card className="border-white/10 bg-white/[0.03] text-white">
        <CardHeader>
          <CardTitle>No analysis yet</CardTitle>
          <CardDescription className="text-slate-200">Upload a file and run an analysis to unlock the dashboard insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild><a href="/dashboard/data-room">Go to Data Room</a></Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Insights</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Live intelligence for {analysis.industry}</h1>
        </div>
        <Button variant="outline" onClick={() => window.print()}><Download className="mr-2 h-4 w-4" />Download Report</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {['Forecast', 'Cohort Analysis', 'Heatmap', 'Solutions'].map((item) => (
          <Button key={item} variant={tab === item ? 'default' : 'outline'} onClick={() => setTab(item as typeof tab)}>{item}</Button>
        ))}
      </div>

      {tab === 'Forecast' && (
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardHeader>
              <CardTitle>Forecast line chart</CardTitle>
              <CardDescription className="text-slate-200">Projected trajectory based on the latest stored analysis.</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="#8AA3C7" />
                  <YAxis stroke="#8AA3C7" />
                  <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderRadius: 12, borderColor: 'rgba(0,229,255,0.2)' }} />
                  <Line type="monotone" dataKey="value" stroke="#00E5FF" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="border-white/10 bg-white/[0.03] text-white">
              <CardHeader>
                <CardTitle>Strengths vs loopholes</CardTitle>
                <CardDescription className="text-slate-200">A quick conversion of opportunities and risks.</CardDescription>
              </CardHeader>
              <CardContent className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={strengthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="#8AA3C7" />
                    <YAxis stroke="#8AA3C7" />
                    <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderRadius: 12, borderColor: 'rgba(0,229,255,0.2)' }} />
                    <Bar dataKey="value" fill="#00E5FF" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.03] text-white">
              <CardHeader>
                <CardTitle>Motivation card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-[24px] border border-aura-cyan/20 bg-aura-cyan/10 p-4">
                  <div className="flex items-center gap-2 text-aura-cyan"><Sparkles className="h-4 w-4" /> Executive insight</div>
                  <p className="mt-3 text-slate-100">{analysis.motivation}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {tab === 'Cohort Analysis' && (
        <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardHeader>
              <CardTitle>Stacked area chart</CardTitle>
              <CardDescription className="text-slate-200">Premium view of forecast vs actual momentum.</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stacked}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="#8AA3C7" />
                  <YAxis stroke="#8AA3C7" />
                  <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderRadius: 12, borderColor: 'rgba(0,229,255,0.2)' }} />
                  <Area type="monotone" dataKey="forecast" stackId="1" stroke="#00E5FF" fill="#00E5FF" fillOpacity={0.35} />
                  <Area type="monotone" dataKey="actual" stackId="2" stroke="#8AA3C7" fill="#8AA3C7" fillOpacity={0.25} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardHeader>
              <CardTitle>Cohort table</CardTitle>
              <CardDescription className="text-slate-200">Snapshot of retention and expansion cohorts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-200">
                      <th className="pb-2">Cohort</th>
                      <th className="pb-2">Retention</th>
                      <th className="pb-2">Expansion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohortRows.map((row) => (
                      <tr key={row.cohort} className="border-t border-white/10">
                        <td className="py-2">{row.cohort}</td>
                        <td className="py-2">{row.retention}%</td>
                        <td className="py-2">{row.expansion}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === 'Heatmap' && (
        <Card className="border-white/10 bg-white/[0.03] text-white">
          <CardHeader>
            <CardTitle>Heatmap grid</CardTitle>
            <CardDescription className="text-slate-200">A simple premium view of performance intensity.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {heatmap.flat().map((value, index) => (
                <div key={`${value}-${index}`} className="rounded-[24px] border border-white/10 px-4 py-6 text-center" style={{ backgroundColor: `rgba(0, 229, 255, ${Math.max(0.2, value / 100)})`, color: '#08111F' }}>
                  {value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === 'Solutions' && (
        <div className="grid gap-4 xl:grid-cols-[0.8fr_1.1fr]">
          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardHeader>
              <CardTitle>Solutions list</CardTitle>
              <CardDescription className="text-slate-200">Actionable recommendations generated from the latest analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.solutions.map((solution) => (
                <div key={solution} className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-3">{solution}</div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03] text-white">
            <CardHeader>
              <CardTitle>Decision matrix</CardTitle>
              <CardDescription className="text-slate-200">Prioritised actions and associated impact/risk.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-200">
                      <th className="pb-2">Option</th>
                      <th className="pb-2">Impact</th>
                      <th className="pb-2">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.decisionMatrix.map((row) => (
                      <tr key={row.option} className="border-t border-white/10">
                        <td className="py-2">{row.option}</td>
                        <td className="py-2">{row.impact}</td>
                        <td className="py-2">{row.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
EOF

cat <<'EOF' > app/api-docs/page.tsx
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
EOF

cat <<'EOF' > app/security/page.tsx
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
EOF

npm install --no-fund --no-audit

pkill -f "next dev" || true
nohup npm run dev -- --hostname 0.0.0.0 --port 3000 > /tmp/aura-platform-dev.log 2>&1 &

for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:3000 >/dev/null 2>&1; then
    echo "Dev server restarted on http://127.0.0.1:3000"
    tail -n 20 /tmp/aura-platform-dev.log
    exit 0
  fi
  sleep 2
done

echo "Dev server failed to start"
cat /tmp/aura-platform-dev.log
exit 1
