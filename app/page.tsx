import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-7xl font-serif text-aura-offwhite mb-6">
        Your data has more to say.
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10">
        AURA is the AI business partner that reads your company numbers and reveals exactly what to do next.
      </p>
      <div className="flex gap-4">
        <Link href="/auth/register" className="btn-primary">
          Start Free Trial
        </Link>
        <Link href="/auth/login" className="btn-gold">
          Sign In
        </Link>
      </div>
    </main>
  )
}
