export const generateAnalysis = (data: any[], industry: string, companyName?: string) => {
  const monthly = Array.from({length: 12}, (_, i) => ({
    month: i+1,
    revenue: Math.floor(Math.random() * 50000 + 10000 * (i+1)),
    expenses: Math.floor(Math.random() * 30000 + 5000 * (i+1)),
  }));
  return {
    monthly_revenue_forecast: monthly,
    yearly_total_projection: monthly.reduce((acc, m) => acc + m.revenue, 0),
    strengths: ["Strong brand presence", "Healthy cash flow", "Loyal customer base"],
    loopholes: ["High marketing spend", "Inconsistent pricing strategy", "Supplier dependency"],
    solutions: ["Reduce marketing spend by 15%", "Standardize pricing tiers", "Diversify suppliers"],
    motivation: companyName ? `Keep pushing, ${companyName}! You're on the right track.` : "You're on the right track.",
    decision_matrix: {
      optionA: { name: "Invest in marketing", score: 7.8 },
      optionB: { name: "Cut operational costs", score: 6.2 },
    },
    expert_notes: [
      { name: "Dr. Amara Mensah", role: "Revenue Strategist", note: "Forecast looks stable. Review Q3 expenses." }
    ]
  };
};
