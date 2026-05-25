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
