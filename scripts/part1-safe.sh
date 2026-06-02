#!/bin/bash
set -e

echo "============================================"
echo " AURA Core Platform Builder – Safe Part 1"
echo "============================================"

echo "Creating directory structure..."
mkdir -p app/auth/login app/auth/register app/dashboard app/data-room app/insights app/api/auth/register app/api/auth/login app/api/upload app/api/analysis lib components/ui public scripts

echo "Checking existing project files before writing..."

if [ ! -f app/data-room/page.tsx ]; then
  echo "Creating top-level app/data-room/page.tsx redirect to /dashboard/data-room..."
  cat << 'PAGE' > app/data-room/page.tsx
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
PAGE
else
  echo "app/data-room/page.tsx already exists; leaving it intact."
fi

if [ ! -f scripts/part1-safe.sh ]; then
  echo "Creating this safe builder script file."
fi

if [ -f package-lock.json ]; then
  echo "Dependencies are already installed; skipping npm install."
else
  echo "Installing dependencies..."
  npm install
fi

echo "============================================"
echo " Safe builder finished. Existing project files were preserved."
echo "============================================"
