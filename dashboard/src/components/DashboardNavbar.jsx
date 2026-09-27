import React from 'react'
import { Bell, User, Calendar, ExternalLink, RotateCcw } from 'lucide-react'
import logoImg from '../assets/aioneix.png'

export default function DashboardNavbar({
  completedStepsCount = 0,
  totalSteps = 4,
  onRestartOnboarding,
  onOpenProfileDrawer
}) {
  return (
    <header className="h-14 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 font-sans shrink-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <img src={logoImg} alt="AIONEX" className="h-8 w-auto object-contain cursor-pointer" />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3.5">
        {/* Onboarding Restart helper */}
        <button
          onClick={onRestartOnboarding}
          title="Switch to Onboarding Preview"
          className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>Onboarding View</span>
        </button>

        {/* Setup Progress */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
          <span>Setup</span>
          <span className="font-bold text-brand-dark bg-white px-1.5 py-0.5 rounded-full text-[11px] shadow-xs">
            {completedStepsCount}/{totalSteps}
          </span>
        </div>

        {/* Direct Link to Live Public Website */}
        <a
          href="http://localhost:3002"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-brand-dark border border-emerald-300 hover:bg-brand-primary hover:text-slate-950 transition shadow-xs"
          title="Open Public Marketing Website"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Live Website</span>
        </a>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-primary rounded-full"></span>
        </button>

        {/* User Profile Avatar (Screenshot 2: dark round avatar with bright green 'S') */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <button
            onClick={onOpenProfileDrawer}
            title="Open Profile & Settings Drawer"
            className="w-9 h-9 rounded-full bg-[#0f172a] hover:bg-slate-800 text-[#00c25a] font-bold text-sm flex items-center justify-center border-2 border-emerald-500/40 hover:border-brand-primary shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer relative group"
          >
            <span>S</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
