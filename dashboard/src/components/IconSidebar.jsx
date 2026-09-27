import React from 'react'
import {
  Compass,
  MessageSquare,
  Send,
  Users,
  Bot,
  ShoppingBag,
  BarChart3,
  Plug,
  Settings,
  ExternalLink,
  HelpCircle
} from 'lucide-react'

export default function IconSidebar({ currentView, setCurrentView, unreadInboxCount = 2 }) {
  const navItems = [
    { id: 'setup', label: 'Setup Guide', icon: Compass },
    { id: 'inbox', label: 'Team Inbox', icon: MessageSquare, badge: unreadInboxCount },
    { id: 'broadcasts', label: 'Broadcasts & Campaigns', icon: Send },
    { id: 'contacts', label: 'Contacts CRM', icon: Users },
    { id: 'automation', label: 'AI Bots & Automation', icon: Bot },
    { id: 'commerce', label: 'Catalog & Commerce', icon: ShoppingBag },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'integrations', label: 'API & Webhooks', icon: Plug },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="w-16 bg-white border-r border-slate-200 flex flex-col justify-between items-center py-4 h-[calc(100vh-3.5rem)] sticky top-14 z-20 font-sans select-none shrink-0">
      {/* Main navigation icons */}
      <div className="flex flex-col items-center gap-1.5 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              title={item.label}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all group ${
                isActive
                  ? 'bg-emerald-50 text-brand-dark font-bold shadow-xs border border-emerald-200'
                  : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-primary' : 'text-slate-500'}`} />

              {/* Badge for unread chats */}
              {item.badge && item.badge > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400"></span>
              )}

              {/* Floating Tooltip on hover */}
              <div className="absolute left-14 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">
                {item.label}
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom controls */}
      <div className="flex flex-col items-center gap-2 px-2 w-full pt-4 border-t border-slate-100">
        <a
          href="http://localhost:3002"
          target="_blank"
          rel="noreferrer"
          title="Open Public Website"
          className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </aside>
  )
}
