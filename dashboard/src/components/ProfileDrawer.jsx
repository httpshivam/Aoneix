import React, { useState } from 'react'
import {
  X,
  User,
  LogOut,
  Settings as SettingsIcon,
  Copy,
  Info,
  Bell,
  Activity,
  MessageCircle,
  HelpCircle,
  Keyboard,
  Users,
  Video,
  Mail,
  Check,
  Smartphone,
  ExternalLink,
  ChevronDown
} from 'lucide-react'

export default function ProfileDrawer({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenChannelStatus,
  onOpenEmbedModal
}) {
  const [copiedLink, setCopiedLink] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('Default (English)')
  const [showShortcuts, setShowShortcuts] = useState(false)

  if (!isOpen) return null

  const handleCopyChatLink = () => {
    navigator.clipboard.writeText('https://wa.me/919876543210?text=Hi%20AIONEX%20Support')
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleSignOut = () => {
    // Redirect back to website
    window.location.href = 'http://localhost:3002/'
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-over Drawer (Right Side) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Top Close Button & User Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-brand-primary font-bold text-base flex items-center justify-center border-2 border-emerald-500/30 shadow-md">
                  S
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">Shivam (Owner)</h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-[170px]">shivam@aionex.ai</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Client ID: AO-10259615</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleSignOut}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition"
                  title="Sign out to website"
                >
                  Sign out
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions (Settings & Copy Chat Link) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose()
                  onOpenSettings?.()
                }}
                className="flex-1 py-1.5 px-3 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition"
              >
                <SettingsIcon className="w-3.5 h-3.5 text-slate-500" />
                Settings
              </button>
              <button
                onClick={handleCopyChatLink}
                className="flex-1 py-1.5 px-3 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-brand-primary" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy chat link</span>
                  </>
                )}
              </button>
            </div>

            {/* Change Info & Manage Notifications */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1 border-t border-slate-100">
              <button
                onClick={() => {
                  onClose()
                  onOpenSettings?.('account')
                }}
                className="flex items-center gap-1.5 hover:text-slate-900 transition"
              >
                <Info className="w-3.5 h-3.5 text-emerald-600" />
                Change Info
              </button>
              <button
                onClick={() => {
                  onClose()
                  onOpenSettings?.('notifications')
                }}
                className="flex items-center gap-1.5 hover:text-slate-900 transition"
              >
                <Bell className="w-3.5 h-3.5 text-emerald-600" />
                Manage Notifications
              </button>
            </div>

            {/* Primary Action Buttons (Screenshot 3) */}
            <div className="space-y-2.5 pt-2">
              {/* Channel Status Button */}
              <button
                onClick={() => {
                  onClose()
                  onOpenChannelStatus?.()
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00c25a] to-[#075e37] hover:from-[#00b050] hover:to-[#054c2c] text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition"
              >
                <Activity className="w-4 h-4" />
                <span>Channel Status (WhatsApp Active)</span>
              </button>

              {/* Add WhatsApp Chat Button to your Website */}
              <button
                onClick={() => {
                  onClose()
                  onOpenEmbedModal?.()
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Add WhatsApp Chat Button to your Website</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-bold text-slate-800">Language</label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-primary pr-8"
                >
                  <option value="Default (English)">Default (English)</option>
                  <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                  <option value="Spanish (Español)">Spanish (Español)</option>
                  <option value="Portuguese (Português)">Portuguese (Português)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Resource Grid (Screenshot 3) */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {[
                { label: 'Help center', icon: HelpCircle, action: () => window.open('http://localhost:3002/#help', '_blank') },
                { label: 'Keyboard shortcuts', icon: Keyboard, action: () => setShowShortcuts(!showShortcuts) },
                { label: 'Join community', icon: Users, action: () => window.open('https://discord.gg', '_blank') },
                { label: 'Watch tutorials', icon: Video, action: () => window.open('https://youtube.com', '_blank') },
                { label: 'Submit a ticket', icon: Mail, action: () => window.open('http://localhost:3002/#contact', '_blank') },
              ].map((res, i) => {
                const Icon = res.icon
                return (
                  <button
                    key={i}
                    onClick={res.action}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center gap-2 text-left text-xs font-semibold text-slate-700 transition"
                  >
                    <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{res.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Mobile App Downloads (Screenshot 3) */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-around">
              <button
                onClick={() => alert('AIONEX iOS App link will be sent to your registered phone number!')}
                className="flex flex-col items-center gap-1 text-slate-600 hover:text-slate-950 transition"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                  
                </div>
                <span className="text-[11px] font-bold">iOS</span>
              </button>
              <button
                onClick={() => alert('AIONEX Android APK link will be sent to your registered phone number!')}
                className="flex flex-col items-center gap-1 text-slate-600 hover:text-slate-950 transition"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  🤖
                </div>
                <span className="text-[11px] font-bold">Android</span>
              </button>
            </div>
          </div>

          {/* Drawer Footer (Screenshot 3) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/70 text-center text-[10px] text-slate-400 space-y-0.5 shrink-0">
            <p className="font-semibold text-slate-500">Copyright AIONEX.io © 2026</p>
            <p className="font-mono text-[9px]">AIONEX: release/sprint-47-2026-v8.3</p>
          </div>
        </div>
      </div>
    </div>
  )
}
