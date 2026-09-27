import React, { useState } from 'react'
import {
  ShieldCheck,
  Smartphone,
  Users,
  Key,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Save,
  Check
} from 'lucide-react'
import { whatsappApi } from '../api/index.js'

export default function SettingsView({ subTab = 'settings-channels' }) {
  const [activeSub, setActiveSub] = useState(subTab)
  const [copiedToken, setCopiedToken] = useState(false)
  const [saved, setSaved] = useState(false)

  // Account details state
  const [businessName, setBusinessName] = useState('AIONEX Solutions')
  const [contactEmail, setContactEmail] = useState('contact.sanesofficial@gmail.com')
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST +5:30)')

  const handleCopyToken = () => {
    navigator.clipboard.writeText('EAAGNO4...META_PERMANENT_SYSTEM_USER_TOKEN')
    setCopiedToken(true)
    setTimeout(() => setCopiedToken(false), 2000)
  }

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 font-sans">
      <div className="mb-6 pb-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Settings & Workspace</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your Meta WhatsApp Cloud API credentials, team roles, and account preferences.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'settings-channels', label: 'Channels (WhatsApp)' },
            { id: 'settings-users', label: 'User Management' },
            { id: 'settings-account', label: 'Account Details' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSub(tab.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeSub === tab.id
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeSub === 'settings-channels' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Official WhatsApp Channel Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">+91 98765 43210</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-brand-primary" />
                      Meta Verified Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Display Name: <strong>AIONEX Solutions</strong> (Green Tick Tier)
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Quality Rating: High 🟢
                </span>
                <p className="text-[11px] text-slate-400 mt-1">Tier 1: 1,000 conversations/24h</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] text-slate-400 font-medium">WhatsApp Business Account ID</p>
                <p className="text-xs font-mono font-bold text-slate-800 mt-0.5">WABA_8941092840192</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] text-slate-400 font-medium">Phone Number ID</p>
                <p className="text-xs font-mono font-bold text-slate-800 mt-0.5">PHONE_104928109</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[11px] text-slate-400 font-medium">Cloud Webhook Gateway</p>
                <p className="text-xs font-mono font-bold text-emerald-700 mt-0.5">Connected (200 OK)</p>
              </div>
            </div>
          </div>

          {/* Permanent Access Token */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-brand-primary" />
              Meta Cloud API System User Token
            </h4>
            <p className="text-xs text-slate-500">
              This permanent token authenticates your server webhooks with WhatsApp servers.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="password"
                readOnly
                value="EAAGNO491024801928410928419208419024810928419"
                className="flex-1 font-mono text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600"
              />
              <button
                onClick={handleCopyToken}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5 text-brand-primary" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedToken ? 'Copied' : 'Copy Token'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSub === 'settings-users' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs animate-fadeIn">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Team Members & Role Access</h3>
              <p className="text-xs text-slate-500">Manage agent seats and conversation routing permissions.</p>
            </div>
            <button className="px-3.5 py-1.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition">
              + Add Member
            </button>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] uppercase text-slate-400 border-b border-slate-100">
              <tr>
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Assigned Chats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4">
                  <p className="font-bold text-slate-900">Shivam</p>
                  <p className="text-[11px] text-slate-400">shivam@aionex.ai</p>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-700">Owner & Admin</td>
                <td className="py-3.5 px-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">14 Active</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4">
                  <p className="font-bold text-slate-900">Aakash Verma</p>
                  <p className="text-[11px] text-slate-400">aakash@aionex.ai</p>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-700">Support Agent</td>
                <td className="py-3.5 px-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">8 Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeSub === 'settings-account' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 animate-fadeIn">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Company Display Name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Support Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Timezone</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-primary"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            {saved ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-brand-primary" />
                Settings saved successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Account Details
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
