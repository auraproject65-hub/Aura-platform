'use client';

import { useEffect, useState } from 'react';

interface StatsCounterProps {
  value: number;
  suffix: string;
  label: string;
}

export function StatsCounter({ value, suffix, label }: StatsCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(value * progress));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <div>
      <p className="text-3xl font-semibold text-white">{count}{suffix}</p>
      <p className="text-sm text-slate-200">{label}</p>
    </div>
  );
}
