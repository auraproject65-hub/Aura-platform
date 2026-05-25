import type { AnalysisResult, ChatMessage, Dataset, Notification, TeamMember, User, UserSettings } from './types';
import { decodeToken } from './auth';

type GlobalStore = typeof globalThis & { __AURA_USERS__?: User[] };

export const users: User[] = ((globalThis as GlobalStore).__AURA_USERS__ ??= []);
export const datasets: Dataset[] = [];
export const analyses: AnalysisResult[] = [];
export const notifications: Notification[] = [];
export const teamMembers: TeamMember[] = [];
export const chatLogs: ChatMessage[] = [];

const defaultSettings: UserSettings = {
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

function getOrCreateUser(email: string, payload?: Partial<User> & { name?: string }) {
  const existing = getUserByEmail(email);
  if (existing) {
    return existing;
  }

  const createdUser: User = {
    id: payload?.id || `user-${Date.now()}`,
    name: payload?.name || email,
    email,
    passwordHash: payload?.passwordHash || '',
    plan: payload?.plan === 'starter' || payload?.plan === 'pro' || payload?.plan === 'enterprise' ? payload.plan : 'starter',
    usage: typeof payload?.usage === 'number' ? payload.usage : 0,
    createdAt: payload?.createdAt || new Date().toISOString(),
    settings: normalizeUserSettings(payload?.settings),
  };

  users.push(createdUser);
  return createdUser;
}

export function getAuthenticatedUser(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/(?:^|; )auth-token=([^;]+)/);
  const fallbackCookie = (request as Request & { cookies?: { get?: (name: string) => { value?: string } | undefined } }).cookies?.get?.('auth-token')?.value;
  const rawToken = match?.[1] || fallbackCookie;

  if (!rawToken) {
    return null;
  }

  const decoded = decodeToken(decodeURIComponent(rawToken)) as { email?: string; name?: string; plan?: string; usage?: number; createdAt?: string; settings?: Partial<UserSettings> } | null;
  if (!decoded?.email) {
    return null;
  }

  const plan = decoded.plan === 'starter' || decoded.plan === 'pro' || decoded.plan === 'enterprise' ? decoded.plan : 'starter';

  return getOrCreateUser(String(decoded.email), {
    name: decoded.name,
    plan,
    usage: decoded.usage,
    createdAt: decoded.createdAt,
    settings: normalizeUserSettings(decoded.settings),
  });
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
  const user = getOrCreateUser(email);
  user.settings = normalizeUserSettings(settings);
}

export function updateOnboarding(email: string, payload: { companyName?: string; industry?: string; tagline?: string; onboardingComplete?: boolean }) {
  const user = getOrCreateUser(email);
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
