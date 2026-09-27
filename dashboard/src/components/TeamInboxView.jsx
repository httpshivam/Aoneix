import React, { useState } from 'react'
import {
  Settings,
  MessageSquare,
  Search,
  Filter,
  Plus,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Smartphone,
  QrCode,
  Globe,
  Monitor,
  X,
  Sparkles
} from 'lucide-react'
import { WhatsAppIcon } from './ChannelIcons.jsx'
import ConnectWhatsAppModal from './ConnectWhatsAppModal.jsx'

export default function TeamInboxView() {
  const [selectedChannel, setSelectedChannel] = useState('whatsapp')
  const [selectedFolder, setSelectedFolder] = useState('active')
  const [chatTab, setChatTab] = useState('chats') // 'chats' or 'groups'
  const [filterPill, setFilterPill] = useState('all')
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false)
  const [showCxToast, setShowCxToast] = useState(true)

  return (
    <div className="h-[calc(100vh-3.5rem)] flex bg-white font-sans overflow-hidden">
      {/* 1. Left Secondary Folder/Channel Sidebar (Screenshot 4) */}
      <div className="w-56 border-r border-slate-200/90 bg-[#f8fafc] flex flex-col justify-between p-3 shrink-0 select-none">
        <div className="space-y-4">
          {/* Header with Gear */}
          <div className="flex items-center justify-between px-2 pt-1">
            <h2 className="text-sm font-black text-slate-900">Team Inbox</h2>
            <button className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Channels Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
              <span>Channels</span>
              <ChevronDown className="w-3 h-3" />
            </div>

            {[
              { id: 'all', label: 'All Channels', icon: Globe },
              { id: 'whatsapp', label: 'WhatsApp', icon: WhatsAppIcon, isWhatsApp: true, active: true },
              { id: 'calls', label: 'WhatsApp Calls', icon: Smartphone, hasArrow: true },
            ].map((ch) => {
              const Icon = ch.icon
              const isSelected = selectedChannel === ch.id
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{ch.label}</span>
                  </div>
                  {ch.hasArrow && <ChevronRight className="w-3 h-3 text-slate-400" />}
                </button>
              )
            })}
          </div>

          {/* Folder Views */}
          <div className="space-y-1 pt-2 border-t border-slate-200/60">
            {[
              { id: 'all-chats', label: 'All chats' },
              { id: 'active', label: 'Active chats', isPrimary: true },
              { id: 'assigned', label: 'Assigned to me' },
              { id: 'unassigned', label: 'Unassigned' },
              { id: 'mentions', label: 'Mentions' },
              { id: 'more', label: 'More', hasArrow: true },
            ].map((folder) => {
              const isSelected = selectedFolder === folder.id
              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <span>{folder.label}</span>
                  {folder.hasArrow && <ChevronRight className="w-3 h-3 text-slate-400" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Bottom Left Toast: CX Score (Screenshot 4) */}
        {showCxToast && (
          <div className="p-3 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-2 relative">
            <button
              onClick={() => setShowCxToast(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-[11px] font-bold leading-tight">
              Introducing CX Scores for conversations
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              Track your Customer Experience today
            </p>
            <button
              onClick={() => alert('CX Score analysis active!')}
              className="w-full py-1 text-[11px] font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition"
            >
              Check your score
            </button>
          </div>
        )}
      </div>

      {/* 2. Middle Column: Chats List Header (Screenshot 4) */}
      <div className="w-72 border-r border-slate-200 flex flex-col bg-white shrink-0">
        {/* Chats / Groups New Tabs */}
        <div className="p-3 border-b border-slate-200 flex items-center gap-4 text-xs font-bold">
          <button
            onClick={() => setChatTab('chats')}
            className={`pb-1 border-b-2 transition ${
              chatTab === 'chats'
                ? 'border-brand-primary text-slate-950 font-extrabold'
                : 'border-transparent text-slate-400'
            }`}
          >
            Chats
          </button>
          <button
            onClick={() => setChatTab('groups')}
            className={`pb-1 border-b-2 flex items-center gap-1 transition ${
              chatTab === 'groups'
                ? 'border-brand-primary text-slate-950 font-extrabold'
                : 'border-transparent text-slate-400'
            }`}
          >
            <span>Groups</span>
            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-bold">
              New
            </span>
          </button>
        </div>

        {/* Active chats Header & Toolbar */}
        <div className="p-3 border-b border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <button className="flex items-center gap-1 text-xs font-bold text-slate-900">
                Active chats <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
              <p className="text-[10px] text-slate-400 mt-0.5">0 Chats • 0 Unread</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                <Search className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                <Filter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsConnectModalOpen(true)}
                className="w-6 h-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center font-bold"
                title="New chat"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1">
            {['All', 'Open', 'Unread', 'Pending'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPill(p.toLowerCase())}
                className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition ${
                  filterPill === p.toLowerCase()
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Empty List Content */}
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <p className="text-xs text-slate-400 font-medium">No chats found</p>
        </div>
      </div>

      {/* 3. Main Connect WhatsApp Hero Screen (Screenshot 4) */}
      <div className="flex-1 overflow-y-auto p-10 flex flex-col justify-between bg-white">
        <div className="max-w-4xl mx-auto w-full space-y-10">
          {/* Top Hero: Heading & Omnichannel Circular Graphic (Screenshot 4) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
            <div className="space-y-4 max-w-md">
              <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Connect WhatsApp to unlock 2B+ users
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                WhatsApp is the most used messaging app globally. Connect your account to start messaging.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsConnectModalOpen(true)}
                  className="px-6 py-3 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  Connect number
                </button>
              </div>
            </div>

            {/* Circular Omnichannel Orbit Visual (Screenshot 4) */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Outer orbit circle */}
              <div className="absolute inset-0 rounded-full border border-emerald-200/60 animate-spin" style={{ animationDuration: '30s' }}></div>

              {/* Orbiting Icons */}
              <div className="absolute -top-1 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                <span className="font-bold text-xs">M</span>
              </div>
              <div className="absolute top-10 -right-2 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-md">
                <MessengerIcon className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-6 -right-1 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                <InstagramIcon className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                <span className="font-bold text-xs">RCS</span>
              </div>
              <div className="absolute top-14 -left-2 w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-md">
                <span className="font-bold text-xs">f</span>
              </div>

              {/* Center Green Pulse Circle with WhatsApp */}
              <div className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner">
                <div className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                  <WhatsAppIcon className="w-11 h-11 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Test Message & Scan QR Code (Screenshot 4) */}
          <div className="border-t border-slate-100 pt-8">
            <p className="text-xs font-bold text-slate-800 mb-4">
              Or, try sending a test message via our shared number
            </p>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              {/* Left Column: Send a message (3 cols) */}
              <div className="md:col-span-3 space-y-3">
                <p className="text-xs font-bold text-slate-700">Send a message</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  - Use the buttons below to send a pre-filled WhatsApp message.
                  <br />
                  - You can also save <strong className="text-slate-900 font-bold">14798024855</strong> to your contacts and send a message starting with <strong className="text-slate-900 font-bold font-mono">#EME13C</strong>.
                </p>

                <div className="space-y-2 pt-2 max-w-xs">
                  <a
                    href="https://wa.me/14798024855?text=%23EME13C%20Test%20from%20AIONEX"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl border border-emerald-400 bg-white hover:bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Web</span>
                  </a>
                  <a
                    href="whatsapp://send?phone=14798024855&text=%23EME13C%20Test%20from%20AIONEX"
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <Monitor className="w-4 h-4 text-slate-600" />
                    <span>WhatsApp desktop app</span>
                  </a>
                </div>
              </div>

              {/* Center Divider: or */}
              <div className="hidden md:flex justify-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center">
                  or
                </div>
              </div>

              {/* Right Column: Scan QR Code (Screenshot 4) */}
              <div className="md:col-span-1 space-y-2 text-center md:text-left">
                <p className="text-xs font-bold text-slate-700">Scan QR code</p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Scan and hit 'Send' to see the message appear in the Team Inbox.
                </p>
                <div className="inline-block p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https%3A%2F%2Fwa.me%2F14798024855%3Ftext%3D%2523EME13C"
                    alt="WhatsApp QR Code"
                    className="w-24 h-24 mx-auto rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connect WhatsApp Modal */}
      <ConnectWhatsAppModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </div>
  )
}
