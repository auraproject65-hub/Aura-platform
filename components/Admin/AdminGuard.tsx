"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('aura_token') : null;
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const adminEmails = ['owusueddie1@gmail.com', 'edwin@aura.ai', 'admin@aura.ai'];
      if (payload && adminEmails.includes(payload.email)) {
        setIsAdmin(true);
      } else {
        router.push('/dashboard');
      }
    } catch (e) {
      router.push('/auth/login');
    }
    setLoading(false);
  }, [router]);

  if (loading) return <div className="flex h-screen items-center justify-center"><p>Verifying...</p></div>;
  if (!isAdmin) return null;

  return <>{children}</>;
}
