'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useSpring, useMotionValueEvent } from 'framer-motion';

interface StatsCounterProps {
  value: number;
  suffix: string;
  label: string;
}

export function StatsCounter({ value, suffix, label }: StatsCounterProps) {
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { stiffness: 95, damping: 18 });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useMotionValueEvent(spring, 'change', (latest) => {
    setDisplay(Math.floor(latest));
  });

  const formatted = useMemo(() => `${display}${suffix}`, [display, suffix]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <p className="text-3xl font-semibold text-white">{formatted}</p>
      <p className="text-sm text-slate-200">{label}</p>
    </motion.div>
  );
}
