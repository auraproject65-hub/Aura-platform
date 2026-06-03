import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 px-4 text-center text-sm text-gray-500">
      <div className="flex justify-center gap-6 mb-2 flex-wrap">
        <Link href="/legal/privacy" className="hover:text-gray-300">Privacy</Link>
        <Link href="/legal/terms" className="hover:text-gray-300">Terms</Link>
        <Link href="/legal/ethics" className="hover:text-gray-300">AI Ethics</Link>
        <Link href="/security" className="hover:text-gray-300">Security</Link>
        <Link href="/pricing" className="hover:text-gray-300">Pricing</Link>
        <Link href="/contact" className="hover:text-gray-300">Contact</Link>
      </div>
      <p>© {new Date().getFullYear()} AURA. All rights reserved. Built by Edward Owusu Boadi.</p>
    </footer>
  );
}
