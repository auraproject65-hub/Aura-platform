export type SubscriptionPlanName = 'starter' | 'pro' | 'enterprise';

export interface UserSettings {
  general: { workspaceName: string; brandColor: string; timezone: string; language: string; customDomain: string };
  profile: { fullName: string; role: string; phone: string; bio: string };
  team: { defaultRole: string; invitesAllowed: boolean };
  subscription: { billingCycle: 'monthly' | 'annual'; autoRenew: boolean };
  notifications: { productEmails: boolean; teamAlerts: boolean; weeklyDigest: boolean; securityAlerts: boolean };
  integrations: { slack: boolean; salesforce: boolean; hubspot: boolean; teams: boolean; googleSheets: boolean; zapier: boolean };
  security: { twoFactor: boolean; sessionTimeout: string; auditLog: boolean };
  apiKeys: { readKey: string; writeKey: string };
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  plan: SubscriptionPlanName;
  usage: number;
  createdAt: string;
  industry?: string;
  companyName?: string;
  tagline?: string;
  onboardingComplete?: boolean;
  settings: UserSettings;
}

export interface Dataset {
  id: string;
  filename: string;
  industry: string;
  mimeType: string;
  rows: Array<Record<string, string>>;
  uploadedAt: string;
  contentPreview: string;
  previewType: 'table' | 'text' | 'image' | 'pdf';
}

export interface AnalysisResult {
  id: string;
  datasetId: string;
  industry: string;
  annualForecast: number;
  forecast: number[];
  strengths: string[];
  loopholes: string[];
  solutions: string[];
  motivation: string;
  decisionMatrix: Array<{ option: string; impact: string; risk: string }>;
  generatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  email: string;
  role: string;
  status: 'invited' | 'active';
  invitedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}
