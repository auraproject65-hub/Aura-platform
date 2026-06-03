"use client";
import { useState } from 'react';

export default function SecurityDashboard() {
  const [auditLog, setAuditLog] = useState([
    { id: 1, event: 'User login', user: 'edward@aura.ai', timestamp: new Date().toISOString(), ip: '192.168.1.1' },
    { id: 2, event: 'Dataset uploaded', user: 'amara@company.com', timestamp: new Date().toISOString(), ip: '10.0.0.2' },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Security & Compliance</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card">
          <h3 className="text-lg font-semibold">SSO Configuration</h3>
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="accent-aura-teal" /> Google Workspace
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-aura-teal" /> Microsoft Azure AD
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-aura-teal" /> AWS IAM Identity Center
            </label>
          </div>
        </div>
        <div className="glass-card">
          <h3 className="text-lg font-semibold">Two‑Factor Auth</h3>
          <p className="text-sm text-gray-400 mt-2">Require 2FA for all users</p>
          <label className="inline-flex items-center mt-2 cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-aura-teal after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>
        <div className="glass-card">
          <h3 className="text-lg font-semibold">Data Residency</h3>
          <select className="mt-2 w-full bg-transparent border border-gray-600 rounded p-2">
            <option>Global (US)</option>
            <option>EU (Frankfurt)</option>
          </select>
        </div>
      </div>
      {/* Audit Log */}
      <div className="glass-card">
        <h3 className="text-lg font-semibold mb-3">Audit Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-2">Event</th>
                <th className="p-2">User</th>
                <th className="p-2">Timestamp</th>
                <th className="p-2">IP</th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map(entry => (
                <tr key={entry.id} className="border-b border-white/5">
                  <td className="p-2">{entry.event}</td>
                  <td className="p-2">{entry.user}</td>
                  <td className="p-2 text-xs">{entry.timestamp}</td>
                  <td className="p-2">{entry.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Escrow Status */}
      <div className="glass-card">
        <h3 className="text-lg font-semibold">Code Escrow Protection</h3>
        <p className="text-sm text-gray-400">Optional add‑on ($49/month). If AURA ceases operations, your company receives the source code.</p>
        <div className="mt-3 flex gap-4">
          <button className="btn-primary">Enable Escrow</button>
          <button className="btn-gold">View Agreement</button>
        </div>
      </div>
    </div>
  );
}
