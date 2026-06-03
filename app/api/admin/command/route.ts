import { NextRequest, NextResponse } from 'next/server';
import { runHealthScan, checkCreditBalance, generateDailyBriefing, generateWeeklyAdminSummary } from '@/lib/autopilot';

export async function POST(req: NextRequest) {
  const { message } = (await req.json()) as { message: string };
  const lower = message.toLowerCase();
  let reply = 'Command not recognized. Try: status, briefing, credits, health, weekly.';

  if (lower.includes('status') || lower.includes('briefing')) {
    const briefing = generateDailyBriefing();
    reply = `📊 Daily Briefing:\nHealth Score: ${briefing.healthScore}\nNew Signups: ${briefing.newSignups}\nAnalyses: ${briefing.analysesRun}\nCredits: $${briefing.creditBalance}\nAlerts: ${briefing.alerts.join(', ')}`;
  } else if (lower.includes('credits')) {
    reply = `💰 Current OpenAI balance: $${checkCreditBalance()}.`;
  } else if (lower.includes('health')) {
    const health = runHealthScan();
    reply = `✅ All systems healthy. Last scan: ${health.lastScan}.`;
  } else if (lower.includes('weekly')) {
    reply = generateWeeklyAdminSummary();
  } else if (lower.includes('pause trials')) {
    reply = '⏸️ Trials paused (simulated). You can re-enable them anytime.';
  } else if (lower.includes('resume trials')) {
    reply = '▶️ Trials resumed.';
  }

  return NextResponse.json({ reply, timestamp: new Date().toISOString() });
}
