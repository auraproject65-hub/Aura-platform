export default function DashboardOverview() {
  return (
    <div>
      <h2 className="text-3xl font-serif mb-6">Welcome back, [Company Name]</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card">Health Score: 84</div>
        <div className="glass-card">Streak: 5 days</div>
        <div className="glass-card">Analyses run: 12</div>
      </div>
    </div>
  );
}
