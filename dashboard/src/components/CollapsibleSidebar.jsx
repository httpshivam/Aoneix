import React, { useState } from 'react'
import {
  Send,
  MessageSquare,
  Users,
  GitBranch,
  ShoppingBag,
  Target,
  BarChart3,
  Plug,
  Settings as SettingsIcon,
  BookOpen,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  ChevronUp,
  Compass,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react'

export default function CollapsibleSidebar({
  currentView,
  setCurrentView,
  unreadInboxCount = 2,
  isCollapsed,
  setIsCollapsed
}) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [connectorsOpen, setConnectorsOpen] = useState(false)

  const primaryItems = [
    { id: 'setup', label: 'Setup Guide', icon: Compass },
    { id: 'campaigns', label: 'Campaigns', icon: Send },
    { id: 'inbox', label: 'Team Inbox', icon: MessageSquare, badge: unreadInboxCount },
    { id: 'contacts', label: 'Contacts', icon: Users },
  ]

  const toolItems = [
    { id: 'automations', label: 'Automations', icon: GitBranch },
    { id: 'commerce', label: 'Commerce', icon: ShoppingBag },
    { id: 'ads', label: 'Ads', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const settingsSubItems = [
    { id: 'settings-users', label: 'User Management...' },
    { id: 'settings-account', label: 'Account Details' },
    { id: 'settings-channels', label: 'Channels (WhatsApp & Meta)' },
  ]

  const handleSelectNav = (id) => {
    setCurrentView(id)
  }

  const renderNavItem = (item) => {
    const Icon = item.icon
    const isActive = currentView === item.id
    return (
      <button
        key={item.id}
        onClick={() => handleSelectNav(item.id)}
        title={isCollapsed ? item.label : undefined}
        className={`w-full flex items-center rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
          isActive
            ? 'bg-slate-900 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        } ${isCollapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-3 py-2.5'}`}
      >
        <div className="shrink-0 flex items-center justify-center">
          <Icon
            className={`w-4 h-4 transition ${
              isActive
                ? 'text-brand-primary'
                : 'text-slate-500 group-hover:text-slate-800'
            }`}
          />
        </div>

        {!isCollapsed && (
          <span className="truncate flex-1 text-left">{item.label}</span>
        )}

        {/* Unread badge */}
        {item.badge && item.badge > 0 && (
          <span
            className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isActive
                ? 'bg-brand-primary text-slate-950'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            } ${isCollapsed ? 'absolute top-1.5 right-1.5' : ''}`}
          >
            {item.badge}
          </span>
        )}

        {/* Tooltip on collapsed */}
        {isCollapsed && (
          <div className="absolute left-16 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">
            {item.label}
          </div>
        )}
      </button>
    )
  }

  return (
    <aside
      className={`bg-[#f8fafc] border-r border-slate-200/90 flex flex-col h-full z-20 font-sans transition-all duration-300 select-none shrink-0 overflow-hidden ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Top Nav List with min-h-0 to prevent layout blow-up */}
      <div className="flex-1 overflow-y-auto min-h-0 py-3 px-2.5 space-y-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Main Primary Items */}
          <div className="space-y-1">
            {primaryItems.map(renderNavItem)}
          </div>

          {/* Section Divider / Label: Automations & Tools */}
          {!isCollapsed ? (
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
              Automations & Tools
            </div>
          ) : (
            <div className="my-2 border-t border-slate-200/60 mx-1"></div>
          )}

          <div className="space-y-1">
            {toolItems.map(renderNavItem)}
          </div>

          {/* Section Divider / Label: Platform & Config */}
          {!isCollapsed ? (
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1">
              Configuration
            </div>
          ) : (
            <div className="my-2 border-t border-slate-200/60 mx-1"></div>
          )}

          {/* Connectors (with dropdown toggle in expanded state) */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) {
                  setIsCollapsed(false)
                  setConnectorsOpen(true)
                } else {
                  setConnectorsOpen(!connectorsOpen)
                }
              }}
              title={isCollapsed ? 'Connectors' : undefined}
              className={`w-full flex items-center justify-between rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition group relative cursor-pointer ${
                currentView === 'connectors' ? 'bg-slate-200/60 text-slate-900' : ''
              } ${isCollapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-3 py-2.5'}`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <Plug className="w-4 h-4 text-slate-500 group-hover:text-slate-800 shrink-0" />
                {!isCollapsed && <span className="truncate">Connectors</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                    connectorsOpen ? 'rotate-180' : ''
                  }`}
                />
              )}
              {isCollapsed && (
                <div className="absolute left-16 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">
                  Connectors
                </div>
              )}
            </button>

            {!isCollapsed && connectorsOpen && (
              <div className="pl-8 pr-2 py-1 space-y-0.5 animate-fadeIn">
                <button
                  onClick={() => setCurrentView('integrations')}
                  className="w-full text-left text-[11px] font-medium text-slate-500 hover:text-slate-900 py-1 px-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  Meta Webhooks
                </button>
                <button
                  onClick={() => setCurrentView('integrations')}
                  className="w-full text-left text-[11px] font-medium text-slate-500 hover:text-slate-900 py-1 px-2 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  Shopify / CRM Sync
                </button>
              </div>
            )}
          </div>

          {/* Settings with Collapsible Accordion */}
          <div>
            <button
              onClick={() => {
                if (isCollapsed) {
                  setIsCollapsed(false)
                  setSettingsOpen(true)
                } else {
                  setSettingsOpen(!settingsOpen)
                }
              }}
              title={isCollapsed ? 'Settings' : undefined}
              className={`w-full flex items-center justify-between rounded-xl text-xs font-semibold transition group relative cursor-pointer ${
                settingsOpen || currentView.startsWith('settings')
                  ? 'bg-slate-200/80 text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              } ${isCollapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-3 py-2.5'}`}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <SettingsIcon className="w-4 h-4 text-slate-500 group-hover:text-slate-800 shrink-0" />
                {!isCollapsed && <span className="truncate">Settings</span>}
              </div>
              {!isCollapsed && (
                <ChevronUp
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                    settingsOpen ? '' : 'rotate-180'
                  }`}
                />
              )}
              {isCollapsed && (
                <div className="absolute left-16 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">
                  Settings
                </div>
              )}
            </button>

            {/* Settings Sub-menu */}
            {!isCollapsed && settingsOpen && (
              <div className="pl-6 pr-2 py-1.5 space-y-1 border-l-2 border-slate-300 ml-4 my-1 animate-fadeIn">
                {settingsSubItems.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setCurrentView(sub.id)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg font-medium transition ${
                      currentView === sub.id
                        ? 'bg-slate-200 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Cloud API Live Status Card (Fills bottom empty space with meaningful utility) */}
        {!isCollapsed && (
          <div className="mt-4 mx-1 p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                WhatsApp Cloud
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Official Meta Business API connection verified.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Fixed Footer: Academy + Collapse Button */}
      <div className="p-2.5 border-t border-slate-200/80 space-y-1 shrink-0 bg-[#f8fafc]">
        {/* AIONEX Academy */}
        <button
          onClick={() => window.open('http://localhost:3002/#tutorials', '_blank')}
          title={isCollapsed ? 'AIONEX Academy' : undefined}
          className={`w-full flex items-center rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition group relative cursor-pointer ${
            isCollapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-3 py-2.5'
          }`}
        >
          <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-slate-800 shrink-0" />
          {!isCollapsed && <span className="truncate">AIONEX Academy</span>}
          {isCollapsed && (
            <div className="absolute left-16 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">
              AIONEX Academy
            </div>
          )}
        </button>

        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Menu' : 'Collapse Menu'}
          className={`w-full flex items-center rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-200/60 transition group relative cursor-pointer ${
            isCollapsed ? 'justify-center py-2.5 px-0' : 'gap-3 px-3 py-2.5'
          }`}
        >
          {isCollapsed ? (
            <PanelLeft className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-slate-500 shrink-0" />
          )}

          {!isCollapsed && (
            <span className="truncate flex-1 text-left">Collapse</span>
          )}

          {isCollapsed && (
            <div className="absolute left-16 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">
              Expand Menu
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}
