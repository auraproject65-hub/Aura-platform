export default function OfficeHours() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Expert Office Hours</h2>
      <div className="glass-card">
        <p className="text-gray-400">Weekly live Q&A with our AI Expert Panel. Pro members get priority questions.</p>
        <div className="mt-4 p-4 bg-black/20 rounded">
          <p className="font-semibold">Next Session:</p>
          <p>Tuesday, 8:00 PM UTC – Revenue Growth Strategies with Dr. Amara Mensah</p>
          <button className="btn-primary mt-3">Reserve a Spot</button>
        </div>
      </div>
    </div>
  );
}
