import Link from 'next/link';
import { plans } from '@/lib/monetization/plans';

const useCases = [
  { plan: 'Lite', example: 'A small bakery used AURA Lite to track seasonal sales and upgraded to Pro when they expanded to two locations.' },
  { plan: 'Pro', example: 'A fintech startup with 30 employees chose Pro to manage multi‑department budgets and investor reporting.' },
  { plan: 'Enterprise', example: 'A franchise chain with 50 locations uses Enterprise to consolidate reports and run weekly audits.' },
];

export default function PlanComparison() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-serif text-center mb-8">Which plan is right for you?</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.filter(p => p.id !== 'starter').map(plan => {
          const useCase = useCases.find(u => u.plan === plan.name);
          return (
            <div key={plan.id} className={`glass-card flex flex-col ${plan.popular ? 'ring-2 ring-aura-teal' : ''}`}>
              <h3 className="text-xl font-serif">{plan.name}</h3>
              <p className="text-3xl font-bold mt-2">{plan.price === 0 ? 'Free' : `$${plan.price}/mo`}</p>
              <ul className="mt-4 space-y-2 flex-1 text-sm">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2"><span className="text-aura-teal">✓</span> {f}</li>
                ))}
              </ul>
              {useCase && (
                <div className="mt-4 p-3 bg-black/20 rounded text-xs italic text-gray-400">
                  💡 {useCase.example}
                </div>
              )}
              <Link href="/pricing" className="btn-primary mt-4 w-full text-center">Choose {plan.name}</Link>
            </div>
          );
        })}
      </div>
      <p className="text-center mt-8 text-sm text-gray-500">
        <Link href="/pricing" className="text-aura-teal">See full pricing details</Link>
      </p>
    </div>
  );
}
