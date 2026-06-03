"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';

const pages = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Data Room', path: '/data-room' },
  { name: 'Insights', path: '/insights' },
  { name: 'Launchpad', path: '/launchpad' },
  { name: 'Business Research', path: '/research/business' },
  { name: 'Student Research', path: '/research/student' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Audit Mode', path: '/enterprise/audit' },
  { name: 'Competitor Intelligence', path: '/enterprise/competitor' },
  { name: 'Security', path: '/enterprise/security' },
  { name: 'Idea Wall', path: '/circle/idea-wall' },
  { name: 'Office Hours', path: '/circle/office-hours' },
  { name: 'Success Board', path: '/circle/success-board' },
  { name: 'Admin Command Center', path: '/admin/command' },
  { name: 'Credits & Billing', path: '/admin/credits' },
  { name: 'Contact Founder', path: '/contact' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-[20vh]">
      <div className="bg-aura-navy border border-white/10 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <Command.Input placeholder="Search pages, help articles..." className="w-full bg-transparent border-b border-white/5 p-4 text-white outline-none" />
        <Command.List className="max-h-64 overflow-y-auto p-2">
          <Command.Empty className="p-4 text-sm text-gray-400">No results found.</Command.Empty>
          {pages.map((page) => (
            <Command.Item
              key={page.path}
              value={page.name}
              onSelect={() => {
                router.push(page.path);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-white/5 aria-selected:bg-white/5"
            >
              {page.name}
            </Command.Item>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
