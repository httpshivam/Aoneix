import React, { useState, useEffect } from 'react'
import {
  CheckCircle,
  Sparkles,
  Users,
  Send,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Check,
  ExternalLink
} from 'lucide-react'
import { whatsappApi, teamApi } from '../api/index.js'
import ConnectWhatsAppModal from './ConnectWhatsAppModal.jsx'
import { WhatsAppIcon } from './ChannelIcons.jsx'

export default function SetupGuideView({ onNavigateToInbox, onStepsUpdated }) {
  // activeStep: 1 (Connect WhatsApp), 2 (Team Inbox), 3 (Invite Team)
  const [activeStep, setActiveStep] = useState(1)
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
  const [exploreExpanded, setExploreExpanded] = useState(false)

  // Live state
  const [whatsAppConnected, setWhatsAppConnected] = useState(false)
  const [whatsAppData, setWhatsAppData] = useState(null)
  const [inboxConfigured, setInboxConfigured] = useState(false)
  const [teamInvited, setTeamInvited] = useState(false)

  // Invite state
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Support Agent')
  const [inviteSuccess, setInviteSuccess] = useState(false)

  useEffect(() => {
    whatsappApi.getConnectionStatus().then((res) => {
      if (res.success && res.data.isConnected) {
        setWhatsAppConnected(true)
        setWhatsAppData(res.data)
        setActiveStep(2)
      }
    })
  }, [])

  const completedCount = [whatsAppConnected, inboxConfigured, teamInvited].filter(Boolean).length

  useEffect(() => {
    onStepsUpdated?.(completedCount)
  }, [completedCount, onStepsUpdated])

  const handleWhatsAppConnected = (data) => {
    setWhatsAppConnected(true)
    setWhatsAppData(data)
    setActiveStep(2)
  }

  const handleInviteTeam = async (e) => {
    e.preventDefault()
    if (!inviteEmail) return
    const res = await teamApi.inviteMember({ email: inviteEmail, role: inviteRole })
    if (res.success) {
      setInviteSuccess(true)
      setTeamInvited(true)
      setInviteEmail('')
      setTimeout(() => setInviteSuccess(false), 3000)
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-6 sm:px-8 font-sans">
      {/* Header Block matching Screenshots 1 & 2 */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-2">
            Hello, <span className="text-brand-primary">Sanes!</span>
          </h1>
          <h2 className="text-2xl font-black text-slate-950 mt-1">Let's get you set up</h2>

          <div className="mt-2.5">
            <p className="text-xs font-bold text-slate-800">Personalised for Support on WhatsApp</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Just follow these steps and AIONEX handles the rest
            </p>
          </div>
        </div>

        {/* Social Proof & WhatsApp Channel Badge */}
        <div className="flex flex-col items-start md:items-end gap-2.5">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
              Join <strong className="text-slate-900 font-bold">16,000+</strong> businesses
            </span>
            <span>•</span>
            <span className="font-semibold text-slate-800">⭐ 4.6/5 rating</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200/90 shadow-xs">
            <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-slate-800">WhatsApp</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>
      </div>

      {/* SETUP STEPS */}
      <div className="space-y-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Setup Steps
        </div>

        {/* STEP 1: Connect WhatsApp */}
        {activeStep === 1 ? (
          <div className="rounded-2xl border-2 border-emerald-400/80 bg-emerald-50/20 p-5 sm:p-6 shadow-sm transition-all animate-fadeIn">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-4 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-emerald-400 bg-white flex items-center justify-center font-bold text-xs text-emerald-700 shadow-xs">
                    {whatsAppConnected ? <Check className="w-4 h-4 text-emerald-600" /> : '1'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Connect WhatsApp</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Start receiving and resolving customer issues on WhatsApp
                    </p>
                  </div>
                </div>

                <div className="pt-2 pl-11">
                  <button
                    onClick={() => setIsConnectModalOpen(true)}
                    className="px-6 py-2.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition cursor-pointer"
                  >
                    {whatsAppConnected ? 'Manage WhatsApp Connection' : 'Connect WhatsApp'}
                  </button>
                </div>
              </div>

              {/* Graphic on right matching Screenshot 2 */}
              <div className="w-72 flex items-center justify-center gap-3 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
                <div className="w-36 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[10px] space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-1 font-bold text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span>AIONEX</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded w-16"></div>
                  <div className="h-2 bg-emerald-200 rounded w-full"></div>
                </div>

                <div className="w-12 h-0.5 bg-emerald-300"></div>

                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <WhatsAppIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setActiveStep(1)}
            className="rounded-2xl border border-slate-200 bg-white p-4 px-6 flex items-center justify-between hover:border-slate-300 transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-600">
                {whatsAppConnected ? <Check className="w-4 h-4 text-emerald-600" /> : '1'}
              </div>
              <span className="text-sm font-bold text-slate-900">Connect WhatsApp</span>
            </div>
            {whatsAppConnected && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                Connected
              </span>
            )}
          </div>
        )}

        {/* STEP 2: Manage all customer conversations in one inbox */}
        {activeStep === 2 ? (
          <div className="rounded-2xl border-2 border-emerald-400/80 bg-emerald-50/20 p-5 sm:p-6 shadow-sm transition-all animate-fadeIn">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-4 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-emerald-400 bg-white flex items-center justify-center font-bold text-xs text-emerald-700 shadow-xs">
                    {inboxConfigured ? <Check className="w-4 h-4 text-emerald-600" /> : '2'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Manage all customer conversations in one inbox
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Multi-agent shared team inbox with live WhatsApp messaging
                    </p>
                  </div>
                </div>

                <div className="pt-2 pl-11">
                  <button
                    onClick={() => {
                      setInboxConfigured(true)
                      onNavigateToInbox?.()
                    }}
                    className="px-6 py-2.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition cursor-pointer"
                  >
                    Open Live Team Inbox
                  </button>
                </div>
              </div>

              {/* Graphic on right matching inbox preview */}
              <div className="w-72 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center">
                      WA
                    </div>
                    <span className="text-xs font-bold text-slate-800">Team Inbox</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                    "Hi! Can you share the latest catalog?"
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 font-medium self-end ml-4">
                    "Certainly! Here is our product catalog."
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setActiveStep(2)}
            className="rounded-2xl border border-slate-200 bg-white p-4 px-6 flex items-center justify-between hover:border-slate-300 transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-600">
                {inboxConfigured ? <Check className="w-4 h-4 text-emerald-600" /> : '2'}
              </div>
              <span className="text-sm font-bold text-slate-900">
                Manage all customer conversations in one inbox
              </span>
            </div>
            {inboxConfigured && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                Configured
              </span>
            )}
          </div>
        )}

        {/* STEP 3: Invite your support team */}
        {activeStep === 3 ? (
          <div className="rounded-2xl border-2 border-emerald-400/80 bg-emerald-50/20 p-5 sm:p-6 shadow-sm transition-all animate-fadeIn">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-emerald-400 bg-white flex items-center justify-center font-bold text-xs text-emerald-700 shadow-xs">
                  {teamInvited ? <Check className="w-4 h-4 text-emerald-600" /> : '3'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Invite your support team</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assign agent seats and conversation routing roles
                  </p>
                </div>
              </div>

              <form onSubmit={handleInviteTeam} className="flex gap-2 pl-11">
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="agent@company.com"
                  className="flex-1 px-4 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-brand-primary"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Send Invite
                </button>
              </form>
              {inviteSuccess && (
                <p className="text-xs font-semibold text-emerald-700 pl-11">
                  ✓ Agent invitation sent!
                </p>
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={() => setActiveStep(3)}
            className="rounded-2xl border border-slate-200 bg-white p-4 px-6 flex items-center justify-between hover:border-slate-300 transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-600">
                {teamInvited ? <Check className="w-4 h-4 text-emerald-600" /> : '3'}
              </div>
              <span className="text-sm font-bold text-slate-900">Invite your support team</span>
            </div>
            {teamInvited && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                Invited
              </span>
            )}
          </div>
        )}
      </div>

      {/* EXPLORE MORE OF AIONEX */}
      <div className="mt-8 pt-4 border-t border-slate-200/80">
        <button
          onClick={() => setExploreExpanded(!exploreExpanded)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition uppercase tracking-wider"
        >
          <span>Explore more of AIONEX</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${exploreExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        {exploreExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 animate-fadeIn">
            {[
              { title: 'Meta Template Library', desc: 'Pre-approved WhatsApp marketing templates' },
              { title: 'Automation Workflow Builder', desc: 'No-code visual drag-and-drop triggers' },
              { title: 'Shopify / Webhook Sync', desc: 'Automatic order status and cart updates' },
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <p className="text-xs font-bold text-slate-900">{f.title}</p>
                <p className="text-[11px] text-slate-500 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* WhatsApp Modal */}
      <ConnectWhatsAppModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnected={handleWhatsAppConnected}
      />
    </div>
  )
}
