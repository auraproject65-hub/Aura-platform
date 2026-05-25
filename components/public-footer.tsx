import Link from 'next/link';

const links = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
];

export function PublicFooter() {
  return (
    <footer className="mt-12 border-t border-white/10 px-6 py-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">AURA</p>
          <p className="text-sm text-slate-200">Premium business intelligence intelligence for modern operators.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-200">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-aura-cyan">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
