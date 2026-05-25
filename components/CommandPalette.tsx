'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';

const entries = [
  { title: 'Dashboard', href: '/dashboard', category: 'Workspace', keywords: 'dashboard overview analytics' },
  { title: 'Data Room', href: '/dashboard/data-room', category: 'Workspace', keywords: 'upload csv xlsx pdf image' },
  { title: 'Insights', href: '/dashboard/insights', category: 'Workspace', keywords: 'forecast cohort heatmap solutions' },
  { title: 'Settings', href: '/dashboard/settings', category: 'Workspace', keywords: 'general profile subscription notifications security api keys' },
  { title: 'Team', href: '/dashboard/team', category: 'Workspace', keywords: 'invite members roles' },
  { title: 'Help Center', href: '/help', category: 'Support', keywords: 'faq knowledge base help' },
  { title: 'AI growth strategy', href: '/blog/ai-growth-strategy', category: 'Blog', keywords: 'ai growth strategy' },
  { title: 'Revenue forecasting', href: '/blog/revenue-forecasting', category: 'Blog', keywords: 'forecast revenue planning' },
  { title: 'Executive readiness', href: '/blog/executive-readiness', category: 'Blog', keywords: 'executive readiness' },
  { title: 'Uploading data', href: '/help/uploading-data', category: 'Help', keywords: 'upload csv xlsx pdf jpg png' },
  { title: 'Custom domain', href: '/help/custom-domain', category: 'Help', keywords: 'enterprise domain yourbrand' },
  { title: 'Case studies', href: '/case-studies', category: 'Content', keywords: 'stories proof outcomes' },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Search">
      <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto mt-12 w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0F19]/95 shadow-2xl">
          <Command.Input placeholder="Search pages, help articles, and blog posts" className="w-full border-b border-white/10 bg-transparent px-4 py-4 text-white outline-none" />
          <Command.List className="max-h-[55vh] overflow-auto px-2 py-2">
            <Command.Empty className="px-4 py-6 text-sm text-slate-200">No matching results.</Command.Empty>
            {entries.map((entry) => (
              <Command.Item
                key={entry.href}
                value={`${entry.title} ${entry.category} ${entry.keywords}`}
                onSelect={() => {
                  setOpen(false);
                  router.push(entry.href);
                }}
                className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm text-white hover:bg-white/5"
              >
                <span>{entry.title}</span>
                <span className="text-slate-200">{entry.category}</span>
              </Command.Item>
            ))}
          </Command.List>
        </div>
      </div>
    </Command.Dialog>
  );
}
