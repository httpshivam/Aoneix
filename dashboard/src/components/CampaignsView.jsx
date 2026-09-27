import React, { useState } from 'react'
import {
  Send,
  Plus,
  PlayCircle,
  HelpCircle,
  Calendar as CalendarIcon,
  List,
  RotateCw,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  CheckCheck,
  Eye,
  CornerUpLeft,
  Clock,
  Layers,
  XCircle,
  Activity,
  Zap,
  Crown,
  MessageSquare,
  Building2,
  BarChart3
} from 'lucide-react'
import TemplateLibraryView from './campaigns/TemplateLibraryView.jsx'
import YourTemplatesView from './campaigns/YourTemplatesView.jsx'
import SmsFallbackView from './campaigns/SmsFallbackView.jsx'
import NewTemplateModal from './campaigns/NewTemplateModal.jsx'
import CreateCampaignModal from './campaigns/CreateCampaignModal.jsx'

export default function CampaignsView() {
  // subView: 'library' (Screenshots 1, 2, 3), 'whatsapp' (Screenshot 4), 'sms' (Screenshot 5), 'overview', 'scheduled'
  const [subView, setSubView] = useState('library')
  const [templateAccordionOpen, setTemplateAccordionOpen] = useState(true)

  // Modals state
  const [isCreateCampaignOpen, setIsCreateCampaignOpen] = useState(false)
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false)
  const [selectedTemplateForBroadcast, setSelectedTemplateForBroadcast] = useState(null)
  const [templateEditingData, setTemplateEditingData] = useState(null)

  // Overview states
  const [previewSample, setPreviewSample] = useState(true)
  const [plannerMode, setPlannerMode] = useState('calendar')
  const [selectedRange, setSelectedRange] = useState('Last 7 days')

  const kpis = [
    { label: 'Sent', value: previewSample ? '600' : '0', icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'Delivered', value: previewSample ? '590' : '0', icon: CheckCheck, color: 'text-emerald-600' },
    { label: 'Read', value: previewSample ? '582' : '0', icon: Eye, color: 'text-emerald-600' },
    { label: 'Replied', value: previewSample ? '227' : '0', icon: CornerUpLeft, color: 'text-emerald-600' },
    { label: 'Sending', value: '0', icon: Send, color: 'text-emerald-500' },
    { label: 'Failed', value: previewSample ? '59' : '0', icon: XCircle, color: 'text-emerald-500' },
    { label: 'Processing', value: previewSample ? '1' : '0', icon: RotateCw, color: 'text-emerald-500' },
    { label: 'Queued', value: previewSample ? '2' : '0', icon: Layers, color: 'text-emerald-500' },
  ]

  const calendarDays = [
    { day: 31, isPrev: true },
    { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
    { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 },
    { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
    { day: 21, campaigns: [{ title: 'Weekly Deals Push', type: 'sent' }] },
    { day: 22 }, { day: 23 }, { day: 24 },
    { day: 25, campaigns: [{ title: 'VIP Festive Blast', type: 'sent' }] },
    { day: 26 },
    { day: 27, isToday: true, campaigns: [{ title: 'Live Broadcast (Today)', type: 'scheduled' }] },
    { day: 28 }, { day: 29 }, { day: 30 },
    { day: 1, isNext: true }, { day: 2, isNext: true }, { day: 3, isNext: true }, { day: 4, isNext: true },
  ]

  const handleUseTemplateSample = (tpl) => {
    setTemplateEditingData(tpl)
    setIsNewTemplateOpen(true)
  }

  const handleSendCampaign = (tpl) => {
    setSelectedTemplateForBroadcast(tpl)
    setIsCreateCampaignOpen(true)
  }

  return (
    <div className="flex h-full bg-[#f8fafc] font-sans overflow-hidden">
      {/* 1. Left Secondary Sub-sidebar matching Screenshots 1 to 5 */}
      <div className="w-56 bg-white border-r border-slate-200/90 p-3 space-y-4 shrink-0 select-none flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-900 px-2 pt-1">Campaigns</h2>

          {/* + Create New Campaign Button matching Screenshots */}
          <button
            onClick={() => {
              setSelectedTemplateForBroadcast(null)
              setIsCreateCampaignOpen(true)
            }}
            className="w-full py-2.5 px-3 bg-[#00c25a] hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Campaign</span>
          </button>

          {/* Navigation Links matching Screenshots */}
          <nav className="space-y-1 pt-1">
            {/* Campaign Overview */}
            <button
              onClick={() => setSubView('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                subView === 'overview'
                  ? 'bg-slate-100 text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <RotateCw className="w-4 h-4 text-slate-500" />
              <span>Campaign Overview</span>
            </button>

            {/* Template Messages (Accordion) */}
            <div className="space-y-0.5">
              <button
                onClick={() => setTemplateAccordionOpen(!templateAccordionOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>Template Messages</span>
                </div>
                {templateAccordionOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {templateAccordionOpen && (
                <div className="pl-6 space-y-0.5 pt-0.5">
                  {/* Template Library (Screenshots 1, 2, 3) */}
                  <button
                    onClick={() => setSubView('library')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      subView === 'library'
                        ? 'bg-slate-100 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Template Library
                  </button>

                  {/* WhatsApp (Your Templates) (Screenshot 4) */}
                  <button
                    onClick={() => setSubView('whatsapp')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      subView === 'whatsapp'
                        ? 'bg-slate-100 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    WhatsApp
                  </button>

                  {/* SMS [Beta] (Screenshot 5) */}
                  <button
                    onClick={() => setSubView('sms')}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      subView === 'sms'
                        ? 'bg-slate-100 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span>SMS</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Beta
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Scheduled Campaigns */}
            <button
              onClick={() => setSubView('scheduled')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                subView === 'scheduled'
                  ? 'bg-slate-100 text-slate-950 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Scheduled Campaigns</span>
            </button>
          </nav>
        </div>

        {/* Bottom Helper Info */}
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
          <span className="font-bold block text-emerald-800">Verified WhatsApp API</span>
          <span className="text-[10px] text-slate-600 mt-0.5 block">
            Approved templates deliver with high priority.
          </span>
        </div>
      </div>

      {/* 2. Main Campaigns Content View */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Template Library View (Screenshots 1, 2, 3) */}
        {subView === 'library' && (
          <TemplateLibraryView
            onUseTemplate={handleUseTemplateSample}
            onOpenNewTemplateModal={() => {
              setTemplateEditingData(null)
              setIsNewTemplateOpen(true)
            }}
          />
        )}

        {/* Your Templates WhatsApp Table View (Screenshot 4) */}
        {subView === 'whatsapp' && (
          <YourTemplatesView
            onSendCampaign={handleSendCampaign}
            onOpenNewTemplateModal={() => {
              setTemplateEditingData(null)
              setIsNewTemplateOpen(true)
            }}
          />
        )}

        {/* SMS Fallback View (Screenshot 5) */}
        {subView === 'sms' && <SmsFallbackView />}

        {/* Campaigns Overview View */}
        {(subView === 'overview' || subView === 'scheduled') && (
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {/* Header Block */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {subView === 'overview' ? 'Campaigns Overview' : 'Scheduled Campaigns Planner'}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Get an overview of all your campaign related analytics, deliveries, and scheduled broadcasts
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-[#00c25a]" />
                  <span>Default (+)</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <a
                  href="https://youtu.be/RvgbwSsUhCw?si=Br-NxcZOQMfWRXd2"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 px-2 py-1.5 hover:underline"
                >
                  <PlayCircle className="w-4 h-4 fill-blue-600 text-white" />
                  Watch Tutorial
                </a>

                <button
                  onClick={() => setIsCreateCampaignOpen(true)}
                  className="px-4 py-2 bg-[#00c25a] hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                >
                  New Campaign
                </button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {kpis.map((kpi, idx) => {
                const Icon = kpi.icon
                return (
                  <div key={idx} className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-3.5 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold text-slate-600">{kpi.label}</span>
                      <Icon className={`w-3.5 h-3.5 ${kpi.color}`} />
                    </div>
                    <p className="text-xl font-black text-slate-900">{kpi.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Calendar & Planner */}
            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-sm text-slate-900">September 2026 Planner</h3>
                </div>
                <span className="text-xs font-semibold text-slate-500">Scheduled broadcasts</span>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d} className="text-center font-bold text-[11px] text-slate-400 py-1">
                    {d}
                  </div>
                ))}
                {calendarDays.map((cd, i) => (
                  <div
                    key={i}
                    className={`min-h-[64px] p-1.5 rounded-xl border text-xs flex flex-col justify-between ${
                      cd.isToday
                        ? 'border-brand-primary bg-emerald-50/50 font-bold'
                        : cd.isPrev || cd.isNext
                        ? 'border-slate-100 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-[10px]">{cd.day}</span>
                    {cd.campaigns?.map((camp, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[9px] font-bold p-1 rounded bg-emerald-100 text-emerald-800 truncate"
                      >
                        {camp.title}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <NewTemplateModal
        isOpen={isNewTemplateOpen}
        onClose={() => setIsNewTemplateOpen(false)}
        initialData={templateEditingData}
        onCreated={() => setSubView('whatsapp')}
      />

      <CreateCampaignModal
        isOpen={isCreateCampaignOpen}
        onClose={() => setIsCreateCampaignOpen(false)}
        preselectedTemplate={selectedTemplateForBroadcast}
        onCampaignLaunched={() => setSubView('overview')}
      />
    </div>
  )
}
