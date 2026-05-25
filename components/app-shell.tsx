'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { LiveChat } from '@/components/LiveChat';
import { ScrollToTop } from '@/components/scroll-to-top';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-transparent text-foreground">
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
      <Toaster
        position="top-right"
        richColors
        expand
        toastOptions={{
          classNames: {
            toast: 'glass-panel border border-white/10 bg-slate-950/85 text-white shadow-[0_18px_55px_rgba(10,18,35,0.55)]',
          },
        }}
      />
      <LiveChat />
      <ScrollToTop />
    </ThemeProvider>
  );
}
