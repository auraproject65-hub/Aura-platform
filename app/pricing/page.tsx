"use client";
import { useState } from 'react';
import { plans } from '@/lib/monetization/plans';

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const handleSubscribe = (planId: string) => {
    if (planId === 'starter') {
      window.location.href = '/auth/register';
    } else if (planId === 'pro') {
      alert('Stripe Checkout (simulated). You will be upgraded to Pro.');
    } else {
      alert('Contact sales for Enterprise plans.');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-serif text-center mb-4">Plans for every stage</h1>
      <p className="text-center text-gray-400 mb-8">Choose the plan that fits your business</p>
      
      <div className="flex justify-center mb-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <span className={`${annual ? 'text-gray-400' : 'text-white font-semibold'}`}>Monthly</span>
          <div className={`w-10 h-5 flex items-center rounded-full p-1 ${annual ? 'bg-aura-teal' : 'bg-gray-600'}`} onClick={() => setAnnual(!annual)}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform ${annual ? 'translate-x-5' : ''}`} />
          </div>
          <span className={`${annual ? 'text-white font-semibold' : 'text-gray-400'}`}>Annual (2 months free)</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {plans.map(plan => (
          <div key={plan.id} className={`glass-card flex flex-col ${plan.popular ? 'ring-2 ring-aura-teal' : ''}`}>
            {plan.popular && <span className="text-xs text-aura-teal font-semibold mb-2">Most Popular</span>}
            <h3 className="text-xl font-serif">{plan.name}</h3>
            <p className="text-3xl font-bold mt-2">
              {plan.price === 0 ? 'Free' : `$${annual ? Math.round(plan.price * 10 / 12) : plan.price}`}
              <span className="text-sm font-normal text-gray-400">/{plan.period}</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">{plan.analyses}</p>
            <ul className="mt-4 space-y-2 flex-1 text-sm">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-aura-teal mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => handleSubscribe(plan.id)} className="mt-6 btn-primary w-full">
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
