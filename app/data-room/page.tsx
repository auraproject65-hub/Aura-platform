"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DataRoomRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/data-room');
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0E14] text-white">
      <p>Redirecting to the dashboard data room...</p>
    </main>
  );
}
