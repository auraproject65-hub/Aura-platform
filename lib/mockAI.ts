export interface AnalysisParams {
  data?: any[];
  industry?: string;
  companyName?: string;
  historicalData?: any[];
}

export const generateAnalysis = (params: AnalysisParams) => {
  const { industry = 'retail', companyName, historicalData } = params;
  const monthly = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    revenue: Math.floor(Math.random() * 50000 + 10000 * (i + 1)),
    expenses: Math.floor(Math.random() * 30000 + 5000 * (i + 1)),
  }));

  const totalRevenue = monthly.reduce((acc, m) => acc + m.revenue, 0);
  const totalExpenses = monthly.reduce((acc, m) => acc + m.expenses, 0);
  const grossMargin = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue * 100).toFixed(1) : '0';
  const netProfitMargin = totalRevenue > 0 ? ((totalRevenue - totalExpenses - totalRevenue * 0.15) / totalRevenue * 100).toFixed(1) : '0';

  const anomalies = [];
  if (monthly.some(m => m.expenses > m.revenue * 0.8)) {
    anomalies.push({ risk: 'High expense ratio', severity: 'medium', probability: 0.4, mitigation: 'Review supplier contracts and operational costs.' });
  }

  const benchmarks = {
    grossMargin: industry === 'saas' ? 75 : 40,
    netProfitMargin: industry === 'saas' ? 20 : 10,
    churnRate: industry === 'saas' ? 0.05 : 0.15,
  };

  const options = [
    { name: 'Aggressive Marketing Push', advantages: 'Rapid brand growth', disadvantages: 'High short‑term cost', financialImpact: '+15% revenue, -10% profit', timeframe: '3-6 months' },
    { name: 'Cost Efficiency Drive', advantages: 'Immediate margin improvement', disadvantages: 'Potential quality impact', financialImpact: '+8% profit', timeframe: '1-3 months' },
    { name: 'Product Premiumisation', advantages: 'Higher margins', disadvantages: 'Slower sales cycle', financialImpact: '+12% revenue, +18% profit long‑term', timeframe: '6-12 months' },
    { name: 'Market Expansion', advantages: 'New revenue streams', disadvantages: 'High upfront investment', financialImpact: '+25% revenue potential', timeframe: '12+ months' },
    { name: 'Status Quo & Consolidation', advantages: 'Stability', disadvantages: 'Missed growth opportunities', financialImpact: '0% change', timeframe: 'Ongoing' },
  ];

  return {
    monthly_revenue_forecast: monthly,
    yearly_total_projection: totalRevenue,
    kpi_snapshot: {
      grossMargin: `${grossMargin}%`,
      netProfitMargin: `${netProfitMargin}%`,
      customerAcquisitionCost: 120,
      lifetimeValue: 2400,
      churnRate: '2.1%',
      avgOrderValue: 380,
    },
    strengths: ['Strong brand presence', 'Healthy cash flow', 'Loyal customer base'],
    loopholes: ['High marketing spend', 'Inconsistent pricing', 'Supplier dependency'],
    solutions: ['Reduce marketing spend by 15%', 'Standardize pricing tiers', 'Diversify suppliers'],
    motivation: companyName ? `Keep pushing, ${companyName}! Your numbers show real potential.` : "You're on the right track.",
    decision_matrix: options.map(o => ({
      option: o.name,
      advantages: o.advantages,
      disadvantages: o.disadvantages,
      financialImpact: o.financialImpact,
      timeframe: o.timeframe,
      score: Math.random() * 5 + 5,
    })),
    expert_notes: [
      { name: 'Dr. Amara Mensah', role: 'Revenue Strategist', note: 'Forecast looks stable. Review Q3 expenses.' },
      { name: 'Mr. David Chen', role: 'Risk & Compliance Lead', note: 'No major risks flagged.' },
    ],
    anomalies,
    benchmarks,
    historical_trend: historicalData || [],
  };
};

export const generateLaunchpadAnalysis = (input: { description?: string; url?: string; pitchDeck?: string }) => {
  const clarity = Math.floor(Math.random() * 30 + 50);
  const marketAwareness = Math.floor(Math.random() * 25 + 45);
  const operationalReadiness = Math.floor(Math.random() * 20 + 40);
  const digitalPresence = Math.floor(Math.random() * 30 + 35);
  const financialAwareness = Math.floor(Math.random() * 25 + 30);

  const confidenceScore = Math.round(
    (clarity + marketAwareness + operationalReadiness + digitalPresence + financialAwareness) / 5
  );

  return {
    confidenceScore,
    dimensions: {
      clarity,
      marketAwareness,
      operationalReadiness,
      digitalPresence,
      financialAwareness,
    },
    strengths: ['Strong initial concept', 'Clear target market identified'],
    gaps: ['Revenue model not yet validated', 'Limited online presence'],
    recommendations: ['Create a landing page to test messaging', 'Interview 10 potential customers'],
    expert_notes: [
      { name: 'Ms. Yuki Tanaka', role: 'Startup Advisor', note: 'Focus on validating the problem before building more features.' },
    ],
  };
};

export const generateResearch = (query: string, mode: 'business' | 'student') => {
  const sections = mode === 'business' ? [
    { title: 'Executive Summary', content: `Key findings on "${query}" indicate a growing market with significant opportunities for early movers.` },
    { title: 'Key Findings', content: `1. Market size estimated at $12B.\n2. Top competitors include X, Y, Z.\n3. Regulatory landscape evolving.` },
    { title: 'Strategic Recommendations', content: 'Consider differentiation through AI integration and strategic partnerships.' },
  ] : [
    { title: 'Abstract', content: `This review explores "${query}", synthesizing recent academic literature.` },
    { title: 'Literature Review', content: 'Several studies (Smith, 2023; Lee, 2024) indicate a positive correlation between AI adoption and productivity.' },
    { title: 'Methodology', content: 'A systematic review of peer-reviewed articles from 2020–2026 was conducted.' },
    { title: 'Conclusion', content: 'The evidence supports further integration of AI in supply chain management.' },
  ];

  return {
    query,
    mode,
    sections,
    sources: mode === 'student' ? ['Smith, J. (2023). AI in SCM. Journal of Tech.', 'Lee, A. (2024). Productivity gains. AI Review.'] : [],
  };
};
