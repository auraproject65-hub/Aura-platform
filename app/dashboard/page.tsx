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
