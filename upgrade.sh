#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

mkdir -p app/api/auth app/api/chat app/api/notifications app/api/onboarding app/api/settings app/api/team app/api/upload app/dashboard/data-room app/dashboard/insights app/dashboard/settings app/dashboard/team app/help app/help/[slug] app/case-studies components

if [ ! -f package.json ]; then
  cat <<'PKG' > package.json
{
  "name": "aura-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.1",
    "bcryptjs": "^2.4.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "framer-motion": "^11.11.11",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.456.0",
    "next": "14.2.15",
    "next-themes": "^0.4.3",
    "papaparse": "^5.4.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.15.4",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.4",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@types/node": "^20.16.11",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.3"
  }
}
PKG
fi

npm install --no-audit --no-fund

cat <<'EOF' > lib/store.ts
import type { AnalysisResult, ChatMessage, Dataset, Notification, TeamMember, User, UserSettings } from './types';
import { decodeToken } from './auth';

export const users: User[] = [];
export const datasets: Dataset[] = [];
export const analyses: AnalysisResult[] = [];
export const notifications: Notification[] = [];
export const teamMembers: TeamMember[] = [];
export const chatLogs: ChatMessage[] = [];

export const defaultSettings: UserSettings = {
  general: { workspaceName: 'AURA HQ', brandColor: '#00E5FF', timezone: 'UTC', language: 'English', customDomain: 'yourbrand.aura.ai' },
  profile: { fullName: 'Executive User', role: 'Revenue Lead', phone: '+1 555 000 0000', bio: 'Leading growth and decision making.' },
  team: { defaultRole: 'Contributor', invitesAllowed: true },
  subscription: { billingCycle: 'annual', autoRenew: true },
  notifications: { productEmails: true, teamAlerts: true, weeklyDigest: true, securityAlerts: true },
  integrations: { slack: true, salesforce: true, hubspot: true, teams: true, googleSheets: true, zapier: true },
  security: { twoFactor: true, sessionTimeout: '30m', auditLog: true },
  apiKeys: { readKey: 'read_aurasandbox', writeKey: 'write_aurasandbox' },
};

export function getDefaultSettings(): UserSettings {
  return JSON.parse(JSON.stringify(defaultSettings));
}

export function normalizeUserSettings(settings?: Partial<UserSettings>): UserSettings {
  const base = getDefaultSettings();
  if (!settings) {
    return base;
  }

  return {
    general: { ...base.general, ...(settings.general || {}) },
    profile: { ...base.profile, ...(settings.profile || {}) },
    team: { ...base.team, ...(settings.team || {}) },
    subscription: { ...base.subscription, ...(settings.subscription || {}) },
    notifications: { ...base.notifications, ...(settings.notifications || {}) },
    integrations: { ...base.integrations, ...(settings.integrations || {}) },
    security: { ...base.security, ...(settings.security || {}) },
    apiKeys: { ...base.apiKeys, ...(settings.apiKeys || {}) },
  };
}

export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

export function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

export function getAuthenticatedUser(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|; )auth-token=([^;]+)/);
  if (!match) {
    return null;
  }

  const decoded = decodeToken(decodeURIComponent(match[1]));
  if (!decoded?.email) {
    return null;
  }

  return getUserByEmail(String(decoded.email));
}

export function setUsageForUser(email: string, usage: number) {
  const user = getUserByEmail(email);
  if (user) {
    user.usage = usage;
  }
}

export function addDataset(dataset: Dataset) {
  datasets.push(dataset);
}

export function addAnalysis(analysis: AnalysisResult) {
  analyses.push(analysis);
}

export function getLatestAnalysis() {
  return analyses[analyses.length - 1] || null;
}

export function getDatasetById(id: string) {
  return datasets.find((dataset) => dataset.id === id) || null;
}

export function getPlanForEmail(email: string) {
  return getUserByEmail(email)?.plan || 'starter';
}

export function getUsageForEmail(email: string) {
  return getUserByEmail(email)?.usage || 0;
}

export function seedNotifications() {
  if (notifications.length > 0) {
    return;
  }

  notifications.push(
    { id: 'notification-1', userId: 'system', title: 'Analysis complete', message: 'Your latest forecast is ready to review.', read: false, createdAt: new Date().toISOString() },
    { id: 'notification-2', userId: 'system', title: 'Pro plan activated', message: 'Your premium workspace now includes expanded analysis capacity.', read: false, createdAt: new Date().toISOString() },
    { id: 'notification-3', userId: 'system', title: 'Team sync', message: 'A new cohort update is available in the insights tab.', read: false, createdAt: new Date().toISOString() }
  );
}

export function getNotificationsForUser(email: string) {
  const user = getUserByEmail(email);
  if (!user) {
    return notifications.filter((notification) => notification.userId === 'system');
  }

  return notifications.filter((notification) => notification.userId === user.id || notification.userId === 'system');
}

export function addNotification(notification: Notification) {
  notifications.push(notification);
}

export function markNotificationAsRead(id: string, email: string) {
  const user = getUserByEmail(email);
  const target = notifications.find((notification) => notification.id === id);
  if (!target) {
    return;
  }
  if (user && target.userId !== 'system' && target.userId !== user.id) {
    return;
  }
  target.read = true;
}

export function updateUserSettings(email: string, settings: Partial<UserSettings>) {
  const user = getUserByEmail(email);
  if (!user) {
    return;
  }
  user.settings = normalizeUserSettings(settings);
}

export function updateOnboarding(email: string, payload: { companyName?: string; industry?: string; tagline?: string; onboardingComplete?: boolean }) {
  const user = getUserByEmail(email);
  if (!user) {
    return;
  }
  if (payload.companyName) {
    user.companyName = payload.companyName;
  }
  if (payload.industry) {
    user.industry = payload.industry;
  }
  if (payload.tagline) {
    user.tagline = payload.tagline;
  }
  if (payload.onboardingComplete !== undefined) {
    user.onboardingComplete = payload.onboardingComplete;
  }
}

export function addTeamMember(payload: { email: string; role: string }) {
  const member = {
    id: `team-${Date.now()}`,
    email: payload.email,
    role: payload.role,
    status: 'invited' as const,
    invitedAt: new Date().toISOString(),
  };
  teamMembers.push(member);
  return member;
}

export function getTeamMembers() {
  return teamMembers;
}

export function removeTeamMember(id: string) {
  const index = teamMembers.findIndex((member) => member.id === id);
  if (index >= 0) {
    teamMembers.splice(index, 1);
  }
}

export function addChatMessage(message: ChatMessage) {
  chatLogs.push(message);
}
EOF

cat <<'EOF' > app/api/upload/route.ts
import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { addAnalysis, addDataset } from '@/lib/store';
import { runMockAI } from '@/lib/mockAI';

function buildPreviewFor(type: string, filename: string) {
  if (type === 'pdf') {
    return `PDF preview for ${filename}: executive summary, revenue highlights, retention opportunities.`;
  }

  if (type === 'image') {
    return `Image preview for ${filename}: visual summary of campaign performance and asset markers.`;
  }

  return `Document preview for ${filename}: AI-ready text content extracted from the upload.`;
}

export async function GET() {
  const { datasets } = await import('@/lib/store');
  return NextResponse.json({ datasets });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const industry = String(formData.get('industry') || 'SaaS');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name;
  const mimeType = file.type || 'application/octet-stream';
  const lowerName = filename.toLowerCase();

  let rows: Array<Record<string, string>> = [];
  let previewType: 'table' | 'text' | 'image' | 'pdf' = 'text';
  let contentPreview = buildPreviewFor('text', filename);

  if (lowerName.endsWith('.csv') || mimeType.includes('csv')) {
    const text = buffer.toString('utf8');
    const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });

    if (parsed.errors.length) {
      return NextResponse.json({ error: parsed.errors[0].message }, { status: 400 });
    }

    rows = parsed.data as Array<Record<string, string>>;
    previewType = 'table';
    contentPreview = `CSV preview for ${filename} with ${rows.length} rows.`;
  } else if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls') || mimeType.includes('sheet')) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    rows = (XLSX.utils.sheet_to_json(worksheet, { defval: '' }) as Array<Record<string, string>>);
    previewType = 'table';
    contentPreview = `XLSX preview for ${filename} with ${rows.length} rows.`;
  } else if (lowerName.endsWith('.pdf') || mimeType.includes('pdf')) {
    previewType = 'pdf';
    contentPreview = buildPreviewFor('pdf', filename);
  } else if (lowerName.match(/\.(jpg|jpeg|png)$/) || mimeType.startsWith('image/')) {
    previewType = 'image';
    contentPreview = buildPreviewFor('image', filename);
  } else {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  }

  const dataset = {
    id: `dataset-${Date.now()}`,
    filename,
    industry,
    mimeType,
    rows,
    uploadedAt: new Date().toISOString(),
    contentPreview,
    previewType,
  };

  addDataset(dataset);
  const analysis = runMockAI(dataset, industry);
  addAnalysis(analysis);

  return NextResponse.json({ ok: true, filename, rows: rows.slice(0, 6), dataset, analysis });
}
EOF

cat <<'EOF' > app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createToken } from '@/lib/auth';
import { getDefaultSettings, getUserByEmail, users } from '@/lib/store';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existing = getUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: `user-${Date.now()}`,
    name,
    email,
    passwordHash,
    plan: 'starter' as const,
    usage: 0,
    createdAt: new Date().toISOString(),
    settings: getDefaultSettings(),
  };

  users.push(user);
  const token = createToken({ email, name });
  const response = NextResponse.json({ ok: true, user: { id: user.id, name, email, plan: user.plan } });
  response.cookies.set('auth-token', token, { httpOnly: true, path: '/', sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 });
  return response;
}
EOF

cat <<'EOF' > app/api/settings/route.ts
import { NextResponse } from 'next/server';
import { getAuthenticatedUser, getDefaultSettings, normalizeUserSettings, updateUserSettings } from '@/lib/store';

export async function GET(request: Request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ settings: getDefaultSettings() });
  }

  return NextResponse.json({ settings: normalizeUserSettings(user.settings) });
}

export async function PUT(request: Request) {
  const user = getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  updateUserSettings(user.email, body.settings);
  return NextResponse.json({ ok: true, settings: normalizeUserSettings(body.settings) });
}
EOF

cat <<'EOF' > app/api/notifications/route.ts
import { NextResponse } from 'next/server';
import { addNotification, getAuthenticatedUser, getNotificationsForUser, markNotificationAsRead, seedNotifications } from '@/lib/store';

export async function GET(request: Request) {
  const user = getAuthenticatedUser(request);
  seedNotifications();
  const notifications = user ? getNotificationsForUser(user.email) : [];
  return NextResponse.json({ notifications });
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = getAuthenticatedUser(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (body?.id) {
    markNotificationAsRead(body.id, user.email);
    return NextResponse.json({ ok: true });
  }

  addNotification({ id: `notification-${Date.now()}`, userId: user.id, title: 'Insight alert', message: 'A new growth signal is ready for review.', read: false, createdAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
EOF

cat <<'EOF' > app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { addChatMessage } from '@/lib/store';

const replies = [
  'Thanks — your message has been logged and routed to the premium workspace assistant.',
  'I have captured your request and I am preparing a focused response for your team.',
  'Your message is queued for review in the AURA intelligence workspace.',
];

export async function POST(request: Request) {
  const body = await request.json();
  const message = String(body?.message || '').trim();

  if (!message) {
    return NextResponse.json({ error: 'Missing message' }, { status: 400 });
  }

  addChatMessage({ id: `chat-${Date.now()}`, role: 'user', content: message, createdAt: new Date().toISOString() });
  const reply = replies[Math.floor(Math.random() * replies.length)];
  addChatMessage({ id: `chat-${Date.now() + 1}`, role: 'assistant', content: reply, createdAt: new Date().toISOString() });

  return NextResponse.json({ ok: true, reply });
}
EOF

cat <<'EOF' > app/help/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicFooter } from '@/components/public-footer';

const faqs = [
  { slug: 'uploading-data', title: 'How do I upload a dataset?', summary: 'Use the data room to upload CSV, XLSX, PDF, JPG, or PNG and trigger an AI analysis.' },
  { slug: 'insights-workflow', title: 'How do insights work?', summary: 'AURA stores the latest analysis result and shows forecast, cohort, heatmap, and decision views inside insights.' },
  { slug: 'pricing-plans', title: 'What is included in each plan?', summary: 'Starter, Pro, and Enterprise unlock different analysis volumes, exports, and support.' },
  { slug: 'team-collab', title: 'How does team collaboration work?', summary: 'Invite teammates, manage roles, and use the workspace settings panel to adjust notifications.' },
  { slug: 'security', title: 'What security controls are available?', summary: 'Use the settings area to review two-factor, audit log, and session controls.' },
  { slug: 'custom-domain', title: 'How can I simulate a custom domain?', summary: 'Enterprise includes a placeholder custom domain like yourbrand.aura.ai in settings.' },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Knowledge base</p>
        <h1 className="mt-4 text-4xl font-semibold">Help Center</h1>
        <p className="mt-4 max-w-2xl text-slate-200">Browse support articles, review onboarding tips, and explore the premium workspace flows.</p>
        <div className="mt-8 space-y-3">
          {faqs.map((article) => (
            <details key={article.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white">
              <summary className="cursor-pointer text-lg font-semibold">{article.title}</summary>
              <p className="mt-3 text-slate-200">{article.summary}</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href={`/help/${article.slug}`}>Read article</Link>
              </Button>
            </details>
          ))}
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
EOF

cat <<'EOF' > app/case-studies/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicFooter } from '@/components/public-footer';

const studies = [
  { title: 'Retail growth revamp', outcome: 'Reduced cart abandonment and lifted forecast confidence by 18%.' },
  { title: 'SaaS expansion engine', outcome: 'Aligned forecasting and retention workflows across 12 regional teams.' },
  { title: 'Healthcare operations clarity', outcome: 'Standardized reporting, reduced planning time, and improved executive visibility.' },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Case studies</p>
        <h1 className="mt-4 text-4xl font-semibold">Proof points built for accelerated decision making.</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {studies.map((study) => (
            <Card key={study.title} className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
                <CardDescription className="text-slate-200">Executive-ready outcomes that mirror a billion-dollar operating model.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-100">{study.outcome}</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/pricing">See plans</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
EOF

cat <<'EOF' > components/roi-calculator.tsx
'use client';

import { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const industryMultipliers: Record<string, number> = {
  SaaS: 0.12,
  Retail: 0.09,
  Healthcare: 0.08,
  Finance: 0.11,
};

export function ROICalculator() {
  const [employees, setEmployees] = useState(50);
  const [revenue, setRevenue] = useState(8000000);
  const [industry, setIndustry] = useState('SaaS');
  const [open, setOpen] = useState(false);

  const metrics = useMemo(() => {
    const multiplier = industryMultipliers[industry] || 0.1;
    const costSavings = Math.round(employees * 325 + (revenue / 1000) * 84);
    const timeSaved = Math.round(employees * 5 + revenue / 1000000 * 16);
    const revenueUplift = Math.round(revenue * multiplier);

    return { costSavings, timeSaved, revenueUplift };
  }, [employees, revenue, industry]);

  return (
    <div className="mt-8 rounded-[28px] border border-aura-cyan/30 bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(255,255,255,0.03))] p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">ROI calculator</p>
          <h2 className="mt-4 text-3xl font-semibold">Estimate savings in seconds.</h2>
          <p className="mt-3 max-w-2xl text-slate-200">Tune the inputs below and preview premium impact with live mock math that feels board-ready.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-100">AURA models speed, retention, and revenue lift in one view.</div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-slate-950/45 text-white">
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription className="text-slate-200">{employees}</CardDescription>
          </CardHeader>
          <CardContent>
            <input type="range" min={10} max={500} step={5} value={employees} onChange={(event) => setEmployees(Number(event.target.value))} className="w-full accent-aura-cyan" />
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-950/45 text-white">
          <CardHeader>
            <CardTitle>Annual revenue</CardTitle>
            <CardDescription className="text-slate-200">${revenue.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <input type="range" min={1000000} max={50000000} step={100000} value={revenue} onChange={(event) => setRevenue(Number(event.target.value))} className="w-full accent-aura-cyan" />
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-slate-950/45 text-white">
          <CardHeader>
            <CardTitle>Industry</CardTitle>
            <CardDescription className="text-slate-200">{industry}</CardDescription>
          </CardHeader>
          <CardContent>
            <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-white">
              {Object.keys(industryMultipliers).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={() => setOpen(true)} className="gap-2">Calculate savings</Button>
        <Button asChild variant="outline">
          <a href="/pricing">See premium plans</a>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B0F19] text-white">
          <DialogHeader>
            <DialogTitle>Projected premium impact</DialogTitle>
            <DialogDescription className="text-slate-200">AURA estimates the lift from your current operating model using premium forecasting logic.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-200">Estimated cost savings</p>
              <p className="mt-2 text-2xl font-semibold text-white">${metrics.costSavings.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-200">Hours saved</p>
              <p className="mt-2 text-2xl font-semibold text-white">{metrics.timeSaved} hrs</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-200">Revenue uplift</p>
              <p className="mt-2 text-2xl font-semibold text-white">${metrics.revenueUplift.toLocaleString()}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
EOF

cat <<'EOF' > components/CommandPalette.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';

const entries = [
  { title: 'Dashboard', href: '/dashboard', category: 'Workspace', keywords: 'dashboard overview analytics' },
  { title: 'Data Room', href: '/dashboard/data-room', category: 'Workspace', keywords: 'upload csv xlsx pdf image' },
  { title: 'Insights', href: '/dashboard/insights', category: 'Workspace', keywords: 'forecast cohort heatmap solutions' },
  { title: 'Settings', href: '/dashboard/settings', category: 'Workspace', keywords: 'general profile subscription notifications security api keys' },
  { title: 'Team', href: '/dashboard/team', category: 'Workspace', keywords: 'invite members roles' },
  { title: 'Help Center', href: '/help', category: 'Support', keywords: 'faq knowledge base help' },
  { title: 'AI growth strategy', href: '/blog/ai-growth-strategy', category: 'Blog', keywords: 'ai growth strategy' },
  { title: 'Revenue forecasting', href: '/blog/revenue-forecasting', category: 'Blog', keywords: 'forecast revenue planning' },
  { title: 'Executive readiness', href: '/blog/executive-readiness', category: 'Blog', keywords: 'executive readiness' },
  { title: 'Uploading data', href: '/help/uploading-data', category: 'Help', keywords: 'upload csv xlsx pdf jpg png' },
  { title: 'Custom domain', href: '/help/custom-domain', category: 'Help', keywords: 'enterprise domain yourbrand' },
  { title: 'Case studies', href: '/case-studies', category: 'Content', keywords: 'stories proof outcomes' },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Search">
      <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto mt-12 w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0F19]/95 shadow-2xl">
          <Command.Input placeholder="Search pages, help articles, and blog posts" className="w-full border-b border-white/10 bg-transparent px-4 py-4 text-white outline-none" />
          <Command.List className="max-h-[55vh] overflow-auto px-2 py-2">
            <Command.Empty className="px-4 py-6 text-sm text-slate-200">No matching results.</Command.Empty>
            {entries.map((entry) => (
              <Command.Item
                key={entry.href}
                value={`${entry.title} ${entry.category} ${entry.keywords}`}
                onSelect={() => {
                  setOpen(false);
                  router.push(entry.href);
                }}
                className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm text-white hover:bg-white/5"
              >
                <span>{entry.title}</span>
                <span className="text-slate-200">{entry.category}</span>
              </Command.Item>
            ))}
          </Command.List>
        </div>
      </div>
    </Command.Dialog>
  );
}
EOF

cat <<'EOF' > components/ProductTour.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const steps = [
  { selector: '[data-tour="hero"]', title: 'Launch your workspace', body: 'Begin with the hero section to review the premium promise and start your next move.' },
  { selector: '[data-tour="integrations"]', title: 'Connect your stack', body: 'Review the integrations panel and see how AURA fits into your current workflow.' },
  { selector: '[data-tour="roi"]', title: 'Model the impact', body: 'Use the ROI calculator to preview the business case before you commit to a plan.' },
];

export function ProductTour() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) {
      document.querySelectorAll('[data-tour-highlight]').forEach((element) => element.classList.remove('data-tour-highlight'));
      return;
    }

    const target = document.querySelector(steps[step].selector) as HTMLElement | null;
    document.querySelectorAll('[data-tour-highlight]').forEach((element) => element.classList.remove('data-tour-highlight'));

    if (target) {
      target.classList.add('data-tour-highlight');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return () => {
      target?.classList.remove('data-tour-highlight');
    };
  }, [open, step]);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Take a tour</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0B0F19] text-white">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <DialogHeader>
                <DialogTitle>{steps[step].title}</DialogTitle>
                <DialogDescription className="text-slate-200">{steps[step].body}</DialogDescription>
              </DialogHeader>
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex justify-between gap-3">
            <Button variant="outline" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>Back</Button>
            <Button onClick={() => step === steps.length - 1 ? setOpen(false) : setStep(step + 1)}>{step === steps.length - 1 ? 'Close' : 'Next'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
EOF

cat <<'EOF' > app/dashboard/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const sections = ['General', 'Profile', 'Team', 'Subscription', 'Notifications', 'Integrations', 'Security', 'API Keys'] as const;

type SectionKey = (typeof sections)[number];

const defaultSettings = {
  general: { workspaceName: 'AURA HQ', brandColor: '#00E5FF', timezone: 'UTC', language: 'English', customDomain: 'yourbrand.aura.ai' },
  profile: { fullName: 'Executive User', role: 'Revenue Lead', phone: '+1 555 000 0000', bio: 'Leading growth and decision making.' },
  team: { defaultRole: 'Contributor', invitesAllowed: true },
  subscription: { billingCycle: 'annual', autoRenew: true },
  notifications: { productEmails: true, teamAlerts: true, weeklyDigest: true, securityAlerts: true },
  integrations: { slack: true, salesforce: true, hubspot: true, teams: true, googleSheets: true, zapier: true },
  security: { twoFactor: true, sessionTimeout: '30m', auditLog: true },
  apiKeys: { readKey: 'read_aurasandbox', writeKey: 'write_aurasandbox' },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [currentSection, setCurrentSection] = useState<SectionKey>('General');
  const [status, setStatus] = useState('Loading workspace preferences...');

  useEffect(() => {
    fetch('/api/settings')
      .then((response) => response.json())
      .then((data) => {
        if (data?.settings) {
          setSettings(data.settings);
          setStatus('Workspace preferences loaded.');
        }
      })
      .catch(() => setStatus('Unable to load settings, using defaults.'));
  }, []);

  const updateSettings = (key: keyof typeof settings, value: unknown) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const saveSettings = async () => {
    setStatus('Saving workspace settings...');
    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settings }),
    });

    if (response.ok) {
      setStatus('Settings saved successfully.');
    } else {
      setStatus('Unable to save settings right now.');
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>Workspace settings</CardTitle>
          <CardDescription className="text-slate-200">Review and refine the premium workflow from one place.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => setCurrentSection(section)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm ${currentSection === section ? 'bg-aura-cyan/20 text-white' : 'bg-white/5 text-slate-200 hover:bg-white/10'}`}
            >
              {section}
            </button>
          ))}
          <div className="rounded-2xl border border-aura-cyan/20 bg-aura-cyan/10 p-4 text-sm text-slate-100">
            Enterprise users can simulate a custom domain like <span className="font-semibold text-white">yourbrand.aura.ai</span> without real DNS changes.
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader>
          <CardTitle>{currentSection}</CardTitle>
          <CardDescription className="text-slate-200">All values are stored in-memory and are ready for your premium workspace simulation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentSection === 'General' && (
            <div className="grid gap-3 md:grid-cols-2">
              <Input value={settings.general.workspaceName} onChange={(event) => updateSettings('general', { ...settings.general, workspaceName: event.target.value })} placeholder="Workspace name" />
              <Input value={settings.general.brandColor} onChange={(event) => updateSettings('general', { ...settings.general, brandColor: event.target.value })} placeholder="Brand color" />
              <Input value={settings.general.timezone} onChange={(event) => updateSettings('general', { ...settings.general, timezone: event.target.value })} placeholder="Timezone" />
              <Input value={settings.general.language} onChange={(event) => updateSettings('general', { ...settings.general, language: event.target.value })} placeholder="Language" />
              <div className="md:col-span-2">
                <Input value={settings.general.customDomain} onChange={(event) => updateSettings('general', { ...settings.general, customDomain: event.target.value })} placeholder="Custom domain" />
              </div>
            </div>
          )}

          {currentSection === 'Profile' && (
            <div className="grid gap-3 md:grid-cols-2">
              <Input value={settings.profile.fullName} onChange={(event) => updateSettings('profile', { ...settings.profile, fullName: event.target.value })} placeholder="Full name" />
              <Input value={settings.profile.role} onChange={(event) => updateSettings('profile', { ...settings.profile, role: event.target.value })} placeholder="Role" />
              <Input value={settings.profile.phone} onChange={(event) => updateSettings('profile', { ...settings.profile, phone: event.target.value })} placeholder="Phone" />
              <textarea value={settings.profile.bio} onChange={(event) => updateSettings('profile', { ...settings.profile, bio: event.target.value })} className="md:col-span-2 h-28 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-white" placeholder="Bio" />
            </div>
          )}

          {currentSection === 'Team' && (
            <div className="grid gap-3 md:grid-cols-2">
              <Input value={settings.team.defaultRole} onChange={(event) => updateSettings('team', { ...settings.team, defaultRole: event.target.value })} placeholder="Default role" />
              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-sm text-slate-100">Allow invites</span>
                <input type="checkbox" checked={settings.team.invitesAllowed} onChange={(event) => updateSettings('team', { ...settings.team, invitesAllowed: event.target.checked })} />
              </label>
            </div>
          )}

          {currentSection === 'Subscription' && (
            <div className="grid gap-3 md:grid-cols-2">
              <select value={settings.subscription.billingCycle} onChange={(event) => updateSettings('subscription', { ...settings.subscription, billingCycle: event.target.value as 'monthly' | 'annual' })} className="rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-white">
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </select>
              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-sm text-slate-100">Auto renew</span>
                <input type="checkbox" checked={settings.subscription.autoRenew} onChange={(event) => updateSettings('subscription', { ...settings.subscription, autoRenew: event.target.checked })} />
              </label>
            </div>
          )}

          {currentSection === 'Notifications' && (
            <div className="space-y-3">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span className="text-sm text-slate-100">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (text) => text.toUpperCase())}</span>
                  <input type="checkbox" checked={value} onChange={(event) => updateSettings('notifications', { ...settings.notifications, [key]: event.target.checked })} />
                </label>
              ))}
            </div>
          )}

          {currentSection === 'Integrations' && (
            <div className="space-y-3">
              {Object.entries(settings.integrations).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span className="text-sm text-slate-100">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (text) => text.toUpperCase())}</span>
                  <input type="checkbox" checked={value} onChange={(event) => updateSettings('integrations', { ...settings.integrations, [key]: event.target.checked })} />
                </label>
              ))}
            </div>
          )}

          {currentSection === 'Security' && (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-sm text-slate-100">Two factor</span>
                <input type="checkbox" checked={settings.security.twoFactor} onChange={(event) => updateSettings('security', { ...settings.security, twoFactor: event.target.checked })} />
              </label>
              <Input value={settings.security.sessionTimeout} onChange={(event) => updateSettings('security', { ...settings.security, sessionTimeout: event.target.value })} placeholder="Session timeout" />
              <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 md:col-span-2">
                <span className="text-sm text-slate-100">Audit log</span>
                <input type="checkbox" checked={settings.security.auditLog} onChange={(event) => updateSettings('security', { ...settings.security, auditLog: event.target.checked })} />
              </label>
            </div>
          )}

          {currentSection === 'API Keys' && (
            <div className="grid gap-3 md:grid-cols-2">
              <Input value={settings.apiKeys.readKey} onChange={(event) => updateSettings('apiKeys', { ...settings.apiKeys, readKey: event.target.value })} placeholder="Read key" />
              <Input value={settings.apiKeys.writeKey} onChange={(event) => updateSettings('apiKeys', { ...settings.apiKeys, writeKey: event.target.value })} placeholder="Write key" />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p className="text-sm text-slate-200">{status}</p>
            <Button onClick={saveSettings}><Save className="mr-2 h-4 w-4" />Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
EOF

cat <<'EOF' > app/dashboard/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, FolderOpen, Sparkles, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalysisItem {
  id: string;
  industry: string;
  generatedAt: string;
  annualForecast: number;
}

interface DashboardStats {
  analyses: number;
  team: number;
  plan: string;
}

const activityFeed = [
  'A new analysis is ready for executive review.',
  'Your team invites are synced and live.',
  'AURA surfaced a new retention opportunity in the latest dataset.',
  'A premium insights export was prepared for your leadership review.',
];

export default function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats>({ analyses: 0, team: 0, plan: 'starter' });
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [analysisRes, subscriptionRes, teamRes] = await Promise.all([
        fetch('/api/analysis'),
        fetch('/api/subscription'),
        fetch('/api/team'),
      ]);

      const analysisData = await analysisRes.json();
      const subscriptionData = await subscriptionRes.json();
      const teamData = await teamRes.json();

      const currentAnalyses = Array.isArray(analysisData.analysis)
        ? analysisData.analysis
        : analysisData.analysis
          ? [analysisData.analysis]
          : [];

      setStats({
        analyses: currentAnalyses.length,
        team: Array.isArray(teamData.members) ? teamData.members.length : 0,
        plan: subscriptionData.plan || 'starter',
      });
      setAnalyses(currentAnalyses.map((analysis: AnalysisItem) => ({
        id: analysis.id,
        industry: analysis.industry || 'SaaS',
        generatedAt: analysis.generatedAt,
        annualForecast: analysis.annualForecast,
      })));
      setLoading(false);
    }

    load();
  }, []);

  const recent = useMemo(() => analyses.slice(0, 4), [analyses]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-white/10 bg-[linear-gradient(135deg,rgba(11,15,25,0.98),rgba(0,229,255,0.12))] text-white">
          <CardHeader>
            <CardTitle>Welcome back to AURA</CardTitle>
            <CardDescription className="text-slate-200">The premium command center for forecasting, collaboration, and board-ready decisions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-100">
            <div className="rounded-2xl border border-aura-cyan/20 bg-aura-cyan/10 px-4 py-4">
              <div className="flex items-center gap-2 text-aura-cyan"><Sparkles className="h-4 w-4" /> AI tagline</div>
              <p className="mt-3 text-lg font-semibold text-white">Turn every signal into a measurable growth story.</p>
            </div>
            <p>Move from upload to insight in one flow: review datasets, run analysis, and share premium narratives with your team.</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild><Link href="/dashboard/data-room">Open data room</Link></Button>
              <Button asChild variant="outline"><Link href="/dashboard/insights">Open insights</Link></Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader>
            <CardTitle>Workspace snapshot</CardTitle>
            <CardDescription className="text-slate-200">A premium place to act on the latest market signals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-200">Plan</p>
                <p className="mt-2 text-xl font-semibold text-white uppercase">{stats.plan}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-200">Analyses</p>
                <p className="mt-2 text-xl font-semibold text-white">{loading ? '…' : stats.analyses}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-200">Team</p>
                <p className="mt-2 text-xl font-semibold text-white">{loading ? '…' : stats.team}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Analyses</CardTitle>
            <BarChart3 className="h-5 w-5 text-aura-cyan" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{loading ? '…' : stats.analyses}</p>
            <p className="mt-2 text-sm text-slate-200">Live snapshots for leadership and growth reviews.</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Team</CardTitle>
            <Users2 className="h-5 w-5 text-aura-cyan" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{loading ? '…' : stats.team}</p>
            <p className="mt-2 text-sm text-slate-200">Collaborators connected to the workspace.</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Plan</CardTitle>
            <FolderOpen className="h-5 w-5 text-aura-cyan" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold capitalize">{stats.plan}</p>
            <p className="mt-2 text-sm text-slate-200">Upgrade to unlock deeper executive intelligence.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader>
            <CardTitle>Recent analyses</CardTitle>
            <CardDescription className="text-slate-200">A premium history of executive decisions and forecast outcomes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recent.length === 0 ? (
                <p className="text-sm text-slate-200">Upload a dataset to generate your first analysis.</p>
              ) : (
                recent.map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div>
                      <p className="font-semibold text-white">{analysis.industry}</p>
                      <p className="text-sm text-slate-200">{new Date(analysis.generatedAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${analysis.annualForecast.toLocaleString()}</p>
                      <p className="text-sm text-slate-200">forecast</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription className="text-slate-200">Jump directly into the next best move.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/data-room"><Button className="w-full justify-between"><span>Upload dataset</span><ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/dashboard/insights"><Button variant="outline" className="w-full justify-between"><span>Review insights</span><ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/dashboard/settings"><Button variant="outline" className="w-full justify-between"><span>Open settings</span><ArrowRight className="h-4 w-4" /></Button></Link>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle>Activity feed</CardTitle>
              <CardDescription className="text-slate-200">A curated pulse of moves across your workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activityFeed.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">{item}</div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
EOF

cat <<'EOF' > app/page.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BrainCircuit, ShieldCheck, Sparkles, Stars, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCounter } from '@/components/stats-counter';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { ParticleBackground } from '@/components/particle-background';
import { PublicFooter } from '@/components/public-footer';
import { ProductTour } from '@/components/ProductTour';
import { ROICalculator } from '@/components/roi-calculator';

const logos = ['Slack', 'Salesforce', 'HubSpot', 'Zapier', 'Teams', 'Sheets'];
const features = [
  { title: 'Prediction', description: 'Forecast revenue and growth scenarios from live business signals.', icon: BrainCircuit },
  { title: 'Analysis', description: 'Reveal sales efficiency, loopholes, and strategic opportunities instantly.', icon: BarChart3 },
  { title: 'Solutions', description: 'Turn insights into concrete action plans and executive-ready narratives.', icon: ShieldCheck },
  { title: 'Motivation', description: 'Keep stakeholders aligned with crisp AI-powered narratives and momentum.', icon: Sparkles },
];
const steps = ['Upload your revenue signals', 'AURA scores risk and opportunity', 'Deploy action plans across teams'];
const faqs = [
  { q: 'How quickly can teams launch?', a: 'Most teams connect a dataset and start generating insights in under 15 minutes.' },
  { q: 'Does AURA use external data?', a: 'AURA combines your uploaded data with built-in intelligence models for tailored recommendations.' },
  { q: 'Can I export reports?', a: 'Yes. Pro and Enterprise include export-ready reports and API access.' },
  { q: 'What file types are supported?', a: 'CSV, XLSX, PDF, JPG, and PNG are accepted in the data room.' },
  { q: 'What is the onboarding flow?', a: 'Users complete company details, upload a first file, and receive a personalised AI-generated tagline.' },
  { q: 'Is this premium only?', a: 'AURA is built for leadership teams that want a premium, private, in-memory experience with a strong visual edge.' },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.17),transparent_20%),linear-gradient(180deg,#060A13,#0B0F19)] text-foreground">
      <ParticleBackground />
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-24 pt-8 lg:px-12">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-[0.2em] text-aura-cyan">AURA</div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost"><Link href="/pricing">Pricing</Link></Button>
            <Button asChild><Link href="/auth/login">Sign in</Link></Button>
          </div>
        </div>

        <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} data-tour="hero">
            <div className="inline-flex items-center gap-2 rounded-full border border-aura-cyan/30 bg-white/5 px-4 py-2 text-sm text-aura-cyan">
              <Stars className="h-4 w-4" /> Trusted executive intelligence for revenue teams
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">AI growth intelligence built for billion-dollar decisions.</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200">AURA turns your revenue, operations, and market signals into clear forecasts, strategic insights, and executive-ready actions.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="shadow-glow"><Link href="/auth/register">Start your free trial</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/contact">Talk to sales</Link></Button>
              <ProductTour />
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-200">
              <div><span className="text-aura-cyan">99.2%</span> forecast precision</div>
              <div><span className="text-aura-cyan">24/7</span> rapid analysis</div>
              <div><span className="text-aura-cyan">SOC 2</span> ready</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="glass-panel rounded-[28px] border border-white/10 p-6">
            <div className="rounded-2xl border border-aura-cyan/30 bg-gradient-to-br from-white/10 to-cyan-400/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-aura-cyan">Live signal</p>
                  <p className="mt-2 text-2xl font-semibold">Growth command center</p>
                </div>
                <Trophy className="h-8 w-8 text-aura-cyan" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <StatsCounter value={4000} suffix="+" label="companies" />
                <StatsCounter value={128} suffix="M" label="revenue predicted" />
                <StatsCounter value={12000} suffix="+" label="analyses run" />
              </div>
              <div className="mt-6 rounded-xl bg-slate-950/40 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Executive brief</p>
                <p className="mt-2">Market signals show strong expansion in SaaS and retail cohorts. AURA recommends retention-first execution in the next 90 days.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 rounded-[24px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur">
          <p className="text-center text-sm uppercase tracking-[0.25em] text-slate-200">Trusted by 4,000+ companies</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-center text-xl font-semibold text-white sm:grid-cols-6">
            {logos.map((logo) => (
              <div key={logo} className="rounded-full border border-white/10 bg-white/5 px-4 py-3">{logo}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12" data-tour="integrations">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Seamless integrations</p>
            <h2 className="mt-4 text-3xl font-semibold">Connect the tools your teams already use.</h2>
          </div>
          <Button asChild variant="outline"><Link href="/help">Explore help center</Link></Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {logos.map((logo) => (
            <Card key={logo} className="border-white/10 bg-white/5 text-white">
              <CardContent className="pt-6 text-center text-lg font-semibold">{logo}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12" data-tour="roi">
        <ROICalculator />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }}>
              <Card className="h-full border-white/10 bg-white/5 text-white">
                <CardHeader>
                  <feature.icon className="h-7 w-7 text-aura-cyan" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="text-slate-200">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">How it works</p>
            <h2 className="mt-4 text-3xl font-semibold">From raw data to decisive action in minutes.</h2>
            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aura-cyan/20 text-aura-cyan">{index + 1}</div>
                  <p className="text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>Case studies</CardTitle>
                <CardDescription className="text-slate-200">Fictional enterprise outcomes and executive-ready proof points.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>• Retail operator unlocked 18% margin recovery.</p>
                <p>• SaaS team cut churn forecasting noise by 42%.</p>
                <p>• Healthcare group standardized reporting across 12 units.</p>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle>What you get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-slate-200">
                <p>• C-suite-ready narratives</p>
                <p>• Forecast modeling for planning cycles</p>
                <p>• Secure in-memory SaaS simulation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aura-cyan">Testimonials</p>
            <h2 className="mt-4 text-3xl font-semibold">Customers move faster with clearer decisions.</h2>
          </div>
          <Button asChild variant="outline"><Link href="/case-studies">Explore case studies</Link></Button>
        </div>
        <div className="mt-8"><TestimonialCarousel /></div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <h2 className="text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <summary className="cursor-pointer font-semibold text-white">{faq.q}</summary>
                <p className="mt-3 text-slate-200">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
EOF

cat <<'EOF' > app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  --background: #0B0F19;
  --foreground: #F8FBFF;
}

body {
  background: radial-gradient(circle at top, rgba(0,229,255,0.12), transparent 18%), #0B0F19;
  color: var(--foreground);
}

.dark {
  color-scheme: dark;
}

.glass-panel {
  background: linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02));
  backdrop-filter: blur(18px);
}

.data-tour-highlight {
  outline: 2px solid rgba(0, 229, 255, 0.95);
  box-shadow: 0 0 0 8px rgba(0, 229, 255, 0.14), 0 22px 60px rgba(0, 229, 255, 0.18);
  border-radius: 28px;
  transition: all 180ms ease;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0,229,255,0.35);
  border-radius: 999px;
}
EOF

chmod +x upgrade.sh

pkill -f "next dev" || true
nohup npm run dev -- --hostname 0.0.0.0 --port 3000 > /tmp/aura-platform-dev.log 2>&1 &

echo "Upgrade script saved and dev server restarted. Logs: /tmp/aura-platform-dev.log"
