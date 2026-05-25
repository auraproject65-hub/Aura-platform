'use client';

export function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[-10%] h-64 w-64 rounded-full bg-aura-cyan/20 blur-3xl" />
      <div className="absolute bottom-[10%] right-[10%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute left-[20%] top-[40%] h-40 w-40 rounded-full bg-white/5 blur-2xl" />
    </div>
  );
}
