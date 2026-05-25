'use client';

import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const industryMultipliers: Record<string, number> = {
  SaaS: 0.12,
  Retail: 0.09,
  Healthcare: 0.08,
  Finance: 0.11,
};

export function ROICalculator() {
  const [employees, setEmployees] = useState(50);
  const [revenue, setRevenue] = useState(8000000);
  const [industry, setIndustry] = useState('SaaS');
  const [open, setOpen] = useState(false);

  const metrics = useMemo(() => {
    const multiplier = industryMultipliers[industry] || 0.1;
    const costSavings = Math.round(employees * 325 + (revenue / 1000) * 84);
    const timeSaved = Math.round(employees * 5 + revenue / 1000000 * 16);
    const revenueUplift = Math.round(revenue * multiplier);

    return { costSavings, timeSaved, revenueUplift };
  }, [employees, revenue, industry]);

  return (
    <div className="mt-8 rounded-[28px] border border-aura-cyan/30 bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(255,255,255,0.03))] p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">ROI calculator</p>
          <h2 className="mt-4 text-3xl font-semibold">Estimate savings in seconds.</h2>
          <p className="mt-3 max-w-2xl text-slate-200">Tune the inputs below and preview premium impact with live mock math that feels board-ready.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100">AURA models speed, retention, and revenue lift in one view.</div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-slate-950/45 text-white">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription className="text-slate-200">{employees}</CardDescription>
          </CardHeader>
          <CardContent>
            <input type="range" min={10} max={500} step={5} value={employees} onChange={(event) => setEmployees(Number(event.target.value))} className="w-full accent-aura-cyan" />
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-950/45 text-white">
          <CardHeader>
            <CardTitle>Annual revenue</CardTitle>
            <CardDescription className="text-slate-200">${revenue.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <input type="range" min={1000000} max={50000000} step={100000} value={revenue} onChange={(event) => setRevenue(Number(event.target.value))} className="w-full accent-aura-cyan" />
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-950/45 text-white">
          <CardHeader>
            <CardTitle>Industry</CardTitle>
            <CardDescription className="text-slate-200">{industry}</CardDescription>
          </CardHeader>
          <CardContent>
            <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-white">
              {Object.keys(industryMultipliers).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={() => setOpen(true)} className="gap-2">Calculate savings</Button>
        <Button asChild variant="outline">
          <a href="/pricing">See premium plans</a>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B0F19] text-white">
          <DialogHeader>
            <DialogTitle>Projected premium impact</DialogTitle>
            <DialogDescription className="text-slate-200">AURA estimates the lift from your current operating model using premium forecasting logic.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-200">Estimated cost savings</p>
              <p className="mt-2 text-2xl font-semibold text-white">${metrics.costSavings.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-200">Hours saved</p>
              <p className="mt-2 text-2xl font-semibold text-white">{metrics.timeSaved} hrs</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-200">Revenue uplift</p>
              <p className="mt-2 text-2xl font-semibold text-white">${metrics.revenueUplift.toLocaleString()}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
