'use client';

export function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,229,255,0.18),transparent_18%),radial-gradient(circle_at_85%_12%,rgba(201,169,110,0.14),transparent_18%),radial-gradient(circle_at_60%_90%,rgba(59,130,246,0.12),transparent_18%)]" />
      <div className="absolute left-[-12%] top-[-10%] h-72 w-72 animate-pulseSlow rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-[10%] right-[-8%] h-80 w-80 animate-drift rounded-full bg-accentGold/10 blur-3xl" />
      <div className="absolute left-[22%] top-[38%] h-40 w-40 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
