import { WARRANT_CANARY_TEXT, DATA_SOVEREIGNTY_TEXT } from '@/lib/legal';

export default function SecurityPage() {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif">Trust & Security</h1>
      
      <section className="glass-card space-y-4">
        <h2 className="text-xl font-semibold">Warrant Canary</h2>
        <p className="text-sm text-gray-400 italic">{WARRANT_CANARY_TEXT(today)}</p>
      </section>

      <section className="glass-card space-y-4">
        <h2 className="text-xl font-semibold">Data Sovereignty Promise</h2>
        <p className="text-sm text-gray-300">{DATA_SOVEREIGNTY_TEXT}</p>
      </section>

      <section className="glass-card space-y-4">
        <h2 className="text-xl font-semibold">Security Measures</h2>
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
          <li>All data encrypted in transit (TLS 1.3) and at rest (AES-256).</li>
          <li>Single Sign-On (Google, Microsoft, Azure AD).</li>
          <li>Two-factor authentication available for all accounts.</li>
          <li>Role-based access control (Admin, Analyst, Viewer).</li>
          <li>Client-facing audit log visible to Enterprise accounts.</li>
          <li>EU data residency option for GDPR compliance.</li>
          <li>Optional code escrow add-on for business continuity.</li>
        </ul>
      </section>
    </div>
  );
}
