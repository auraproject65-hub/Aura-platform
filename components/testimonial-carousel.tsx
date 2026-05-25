'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  { quote: 'AURA gave our executive team confidence to act faster and speak to outcomes with precision.', name: 'Harper Lee', role: 'COO, NovaWorks' },
  { quote: 'The forecasting interface feels like a premium enterprise command center.', name: 'Mina Patel', role: 'VP Finance, Lumen Labs' },
  { quote: 'We finally have a single place to understand revenue health, risks, and the next moves.', name: 'Ethan Brooks', role: 'CEO, Pulse Retail' },
];

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-[auto_1fr] lg:items-center">
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setActive((active + 1) % testimonials.length)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div key={active}>
        <Card className="border-white/10 bg-white/5 text-white">
          <CardContent className="pt-6">
            <p className="text-lg">“{testimonials[active].quote}”</p>
            <p className="mt-4 text-sm text-aura-cyan">{testimonials[active].name}</p>
            <p className="text-sm text-slate-200">{testimonials[active].role}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
