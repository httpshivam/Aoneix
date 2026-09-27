import React from 'react'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  Settings,
  ShieldCheck,
  TrendingUp,
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients & Leads', icon: Users, badge: '12 New' },
    { id: 'projects', label: 'Active Projects', icon: Briefcase },
    { id: 'services', label: 'Services & AI', icon: Layers },
    { id: 'analytics', label: 'Performance', icon: TrendingUp },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 text-slate-300 select-none">
      {/* Brand logo */}
      <div>
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg shadow-emerald-500/20">
              A
            </div>
            <div>
              <div className="font-bold text-white text-base tracking-tight flex items-center gap-1.5">
                AIONEX
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">Control Center</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Main Menu
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-primary text-slate-950 shadow-md shadow-emerald-500/20 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-slate-950 text-brand-primary'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Footer / Switch to website */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors border border-slate-700/50"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-brand-primary" />
            Open Public Website
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <div className="flex items-center justify-between pt-2 px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-slate-200">
              SH
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-200 leading-tight">Shivam</p>
              <p className="text-[10px] text-slate-400 leading-tight">Super Admin</p>
            </div>
          </div>
          <button
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
