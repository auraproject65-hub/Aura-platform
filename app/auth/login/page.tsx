"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        setLoading(false);
        return;
      }

      document.cookie = `auth-token=${data.token}; path=/; max-age=604800; samesite=lax;`;
      router.push('/dashboard');
    } catch (err) {
      setError('Network error. Please check your connection.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="glass-card max-w-md w-full space-y-4">
        <h2 className="text-2xl font-serif">Welcome back</h2>
        <input className="w-full bg-transparent border border-gray-600 rounded-lg p-3" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required />
        <input className="w-full bg-transparent border border-gray-600 rounded-lg p-3" placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} required />
        {error && <p className="text-red-400 text-sm bg-red-900/20 p-2 rounded">{error}</p>}
        <button className="btn-primary w-full" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-sm text-gray-400">Don't have an account? <Link href="/auth/register" className="text-aura-teal">Create one</Link></p>
      </form>
    </div>
  );
}
