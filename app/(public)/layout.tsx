import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent/CookieConsent';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
      <CookieConsent />
    </>
  );
}
