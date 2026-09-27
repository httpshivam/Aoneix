import React from 'react'
import { Search, Bell, Sparkles, Moon, Sun } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search leads, projects, analytics..."
          className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-brand-primary focus:outline-none transition-all shadow-sm"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Quick status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          AIONEX AI Engine Live
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* Action Button */}
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
          New Campaign
        </button>
      </div>
    </header>
  )
}
