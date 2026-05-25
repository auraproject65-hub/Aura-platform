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
