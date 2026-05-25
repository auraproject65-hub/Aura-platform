'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const steps = [
  { selector: '[data-tour="hero"]', title: 'Launch your workspace', body: 'Begin with the hero section to review the premium promise and start your next move.' },
  { selector: '[data-tour="integrations"]', title: 'Connect your stack', body: 'Review the integrations panel and see how AURA fits into your current workflow.' },
  { selector: '[data-tour="roi"]', title: 'Model the impact', body: 'Use the ROI calculator to preview the business case before you commit to a plan.' },
];

export function ProductTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) {
      document.querySelectorAll('[data-tour-highlight]').forEach((element) => element.classList.remove('data-tour-highlight'));
      return;
    }

    const target = document.querySelector(steps[step].selector) as HTMLElement | null;
    document.querySelectorAll('[data-tour-highlight]').forEach((element) => element.classList.remove('data-tour-highlight'));

    if (target) {
      target.classList.add('data-tour-highlight');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      target?.classList.remove('data-tour-highlight');
    };
  }, [open, step]);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Take a tour</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B0F19] text-white">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <DialogHeader>
                <DialogTitle>{steps[step].title}</DialogTitle>
                <DialogDescription className="text-slate-200">{steps[step].body}</DialogDescription>
              </DialogHeader>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>Back</Button>
            <Button onClick={() => step === steps.length - 1 ? setOpen(false) : setStep(step + 1)}>{step === steps.length - 1 ? 'Close' : 'Next'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
