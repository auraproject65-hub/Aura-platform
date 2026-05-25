import type { Dataset } from './types';

function getNumericValue(row: Record<string, string>, keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (value) {
      const parsed = Number(value.replace(/[^0-9.-]/g, ''));
      if (!Number.isNaN(parsed)) return parsed;
    }
  }
  return 0;
}

function estimateBase(dataset: Dataset) {
  const totalRevenue = dataset.rows.reduce((sum, row) => sum + getNumericValue(row, ['revenue', 'sales', 'income', 'total', 'arr']), 0);
  return totalRevenue > 0 ? totalRevenue : dataset.rows.length * 25000;
}

const industryProfiles: Record<string, { strengths: string[]; loopholes: string[]; solutions: string[]; motivationHook: string }> = {
  Retail: {
    strengths: ['Strong basket size', 'High repeat purchase cadence', 'Campaign responsiveness'],
    loopholes: ['Cart abandonment', 'Margin compression', 'Inventory waste'],
    solutions: ['Improve checkout segmentation', 'Refine pricing bundles', 'Use demand forecasting'],
    motivationHook: 'The market is rewarding precision. Your team can convert momentum into durable growth.',
  },
  SaaS: {
    strengths: ['Healthy expansion revenue', 'Predictable renewal base', 'High product stickiness'],
    loopholes: ['Churn hotspots', 'Sales cycle drag', 'Pricing misalignment'],
    solutions: ['Target retention automation', 'Simplify onboarding', 'Refresh pricing experiments'],
    motivationHook: 'Every retained customer is a compounding revenue engine. Build confidence with tight execution.',
  },
  Healthcare: {
    strengths: ['Strong process control', 'High retention value', 'Compliance-ready operations'],
    loopholes: ['Referral bottlenecks', 'Patient throughput inefficiency', 'Care cost variability'],
    solutions: ['Streamline referral routing', 'Optimize scheduling', 'Standardize care pathways'],
    motivationHook: 'Operational clarity in healthcare creates both better outcomes and stronger margin resilience.',
  },
};

export function runMockAI(dataset: Dataset, industry: string) {
  const profile = industryProfiles[industry] || industryProfiles.SaaS;
  const base = estimateBase(dataset);
  const annualForecast = Math.round(base * 1.16);
  const forecast = Array.from({ length: 12 }, (_, index) => Math.round(annualForecast / 12 * (1 + index * 0.02)));

  const strengths = profile.strengths;
  const loopholes = profile.loopholes;
  const solutions = profile.solutions;
  const motivation = profile.motivationHook;

  return {
    id: `analysis-${Date.now()}`,
    datasetId: dataset.id,
    industry,
    annualForecast,
    forecast,
    strengths,
    loopholes,
    solutions,
    motivation,
    decisionMatrix: [
      { option: 'Scale acquisition', impact: 'High growth potential', risk: 'Medium' },
      { option: 'Invest in retention', impact: 'Stable margin lift', risk: 'Low' },
    ],
    generatedAt: new Date().toISOString(),
  };
}
