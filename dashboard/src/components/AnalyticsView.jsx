import React, { useState, useEffect } from 'react'
import {
  Inbox,
  TrendingUp,
  PhoneCall,
  Bot,
  Sparkles,
  Calendar,
  ChevronDown,
  Info,
  RotateCw,
  MoreVertical,
  Plus,
  Minus,
  Maximize2,
  Hand,
  RotateCcw,
  FileBarChart2,
  Clock,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Timer,
  Download,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react'
import { WhatsAppIcon } from './ChannelIcons.jsx'
import { analyticsApi } from '../api/analytics/analytics.api.js'

export default function AnalyticsView() {
  const [activeTab, setActiveTab] = useState('inbox') // 'inbox' | 'sales' | 'calls' | 'chatbot' | 'cx-dashboard' | 'cx-topics' | 'cx-operators'
  const [samplePreview, setSamplePreview] = useState(false)
  const [period, setPeriod] = useState('Last 7 days')
  const [fromDate, setFromDate] = useState('20 September 2026')
  const [toDate, setToDate] = useState('27 September 2026')
  const [selectedBotFilter, setSelectedBotFilter] = useState('All Active Bots')
  const [timeRange, setTimeRange] = useState('1W') // 1D, 1W, 1M, 3M, Custom

  // Live state
  const [inboxData, setInboxData] = useState(null)
  const [salesData, setSalesData] = useState(null)
  const [callsData, setCallsData] = useState(null)
  const [chatbotData, setChatbotData] = useState(null)
  const [cxData, setCxData] = useState(null)

  useEffect(() => {
    analyticsApi.getInboxAnalytics(samplePreview).then(res => setInboxData(res.data))
    analyticsApi.getSalesAnalytics(samplePreview).then(res => setSalesData(res.data))
    analyticsApi.getCallsAnalytics(samplePreview).then(res => setCallsData(res.data))
    analyticsApi.getChatbotAnalytics(samplePreview).then(res => setChatbotData(res.data))
    analyticsApi.getCxAnalytics(samplePreview).then(res => setCxData(res.data))
  }, [samplePreview])

  return (
    <div className="h-[calc(100vh-3.5rem)] flex bg-[#f8fafc] font-sans overflow-hidden select-none text-slate-800">
      {/* 1. Left Secondary Navigation Sidebar (Screenshots 1-5) */}
      <div className="w-56 border-r border-slate-200/90 bg-white flex flex-col justify-between p-3 shrink-0">
        <div className="space-y-4">
          <div className="px-2 pt-1">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Dashboard
            </h2>
          </div>

          <div className="space-y-1">
            {/* Inbox Analytics */}
            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'inbox'
                  ? 'bg-slate-100 text-slate-950 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Inbox className="w-4 h-4 text-slate-500" />
              <span>Inbox Analytics</span>
            </button>

            {/* Sales */}
            <button
              onClick={() => setActiveTab('sales')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'sales'
                  ? 'bg-slate-100 text-slate-950 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-slate-500" />
              <span>Sales</span>
            </button>

            {/* WhatsApp Calls Analytics */}
            <button
              onClick={() => setActiveTab('calls')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'calls'
                  ? 'bg-slate-100 text-slate-950 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-slate-500" />
              <span className="truncate">WhatsApp Calls Analytics</span>
            </button>

            {/* Chatbot Analytics (Beta) */}
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'chatbot'
                  ? 'bg-slate-100 text-slate-950 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bot className="w-4 h-4 text-slate-500" />
                <span>Chatbot Analytics</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-rose-50 text-rose-600 border border-rose-200 rounded-md">
                Beta
              </span>
            </button>
          </div>

          {/* CX Intelligence Category */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>CX Intelligence</span>
            </div>

            <div className="pl-4 space-y-1">
              <button
                onClick={() => setActiveTab('cx-dashboard')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'cx-dashboard'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => setActiveTab('cx-topics')}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'cx-topics'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Topic Insights</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 bg-rose-50 text-rose-600 rounded">
                  New
                </span>
              </button>

              <button
                onClick={() => setActiveTab('cx-operators')}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === 'cx-operators'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>Operator Insights</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 bg-rose-50 text-rose-600 rounded">
                  New
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom channel label */}
        <div className="px-2 py-2 text-[11px] text-slate-400 border-t border-slate-100 flex items-center gap-1.5">
          <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>Meta Cloud API Verified</span>
        </div>
      </div>

      {/* 2. Main Analytics Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* Top Control Toolbar (Screenshots 1-5) */}
        <div className="bg-white border-b border-slate-200/90 px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                {activeTab === 'inbox' && 'Team Inbox Analytics'}
                {activeTab === 'sales' && 'Sales Analytics'}
                {activeTab === 'calls' && 'WhatsApp Calls Analytics'}
                {activeTab === 'chatbot' && (
                  <span className="flex items-center gap-2">
                    Chatbot Analytics{' '}
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-rose-50 text-rose-600 border border-rose-200 rounded-md">
                      Beta
                    </span>
                  </span>
                )}
                {activeTab.startsWith('cx') && (
                  <span className="flex items-center gap-2">
                    CX Insights{' '}
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md">
                      Beta
                    </span>
                  </span>
                )}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeTab === 'inbox' && 'Get an overview of all your important team, operator and ticket metrics here'}
              {activeTab === 'sales' && 'Track lead conversion pipelines, win rates and operator deal velocity'}
              {activeTab === 'calls' && 'Monitor outbound and inbound WhatsApp voice call performance across agents'}
              {activeTab === 'chatbot' && 'Session completion rates, drop-off dropouts and automated routing performance'}
              {activeTab.startsWith('cx') && 'Sentiment distribution and customer happiness trends across conversations'}
            </p>
          </div>

          {/* Right Action Tools */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Channel Selector */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold cursor-pointer transition">
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Default</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </div>

            {/* Toggle Preview with sample data */}
            <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Preview with sample data</span>
              <button
                type="button"
                onClick={() => setSamplePreview(!samplePreview)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  samplePreview ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    samplePreview ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Action buttons depending on tab */}
            {activeTab === 'sales' && (
              <button className="px-3.5 py-1.5 text-xs font-bold rounded-xl border border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50 transition cursor-pointer">
                Explain Metrics
              </button>
            )}

            {(activeTab === 'inbox' || activeTab === 'calls') && (
              <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition cursor-pointer">
                <span>Schedule Report</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            )}

            {activeTab === 'chatbot' && (
              <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl border border-emerald-400 bg-white text-emerald-700 hover:bg-emerald-50 transition cursor-pointer">
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Date Filter Bar */}
        <div className="bg-white border-b border-slate-200/70 px-6 py-2.5 flex flex-wrap items-center gap-4 text-xs font-medium shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Period</span>
            <div className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-1.5 font-bold text-slate-800 cursor-pointer">
              <span>{period}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">From</span>
            <div className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-1.5 font-bold text-slate-800 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{fromDate}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">To</span>
            <div className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-1.5 font-bold text-slate-800 cursor-pointer">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{toDate}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        </div>

        {/* TAB 1: TEAM INBOX ANALYTICS (Screenshot 1) */}
        {activeTab === 'inbox' && (
          <div className="p-6 space-y-6">
            {/* Overview Zero Cards Row */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-3">
                <span className="border-b-2 border-slate-900 pb-0.5">Overview</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { label: 'Open', val: inboxData?.metrics?.open ?? 0 },
                  { label: 'Pending', val: inboxData?.metrics?.pending ?? 0 },
                  { label: 'Solved', val: inboxData?.metrics?.solved ?? 0 },
                  { label: 'Solved by bot', val: inboxData?.metrics?.solvedByBot ?? 0 },
                  { label: 'Solved by operator', val: inboxData?.metrics?.solvedByOperator ?? 0 },
                  { label: 'Expired', val: inboxData?.metrics?.expired ?? 0 },
                  { label: 'Missed chats', val: inboxData?.metrics?.missed ?? 0 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div className="text-2xl font-black text-slate-900">{item.val}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts Row: Ticket status over time & Total ticket count by status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Ticket status over time */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <span className="border-b-2 border-slate-900 pb-0.5">Ticket status over time</span>
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  {/* Zoom Controls (Screenshot 1) */}
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-0.5 text-slate-600 text-xs">
                    <button className="p-1 hover:bg-slate-200 rounded"><Plus className="w-3 h-3" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded"><Minus className="w-3 h-3" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded"><Maximize2 className="w-3 h-3" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded"><Hand className="w-3 h-3" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded"><RotateCcw className="w-3 h-3" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded"><MoreVertical className="w-3 h-3" /></button>
                  </div>
                </div>

                {/* Line Chart Canvas */}
                <div className="h-60 relative w-full border-b border-l border-slate-300 flex flex-col justify-between py-2">
                  {/* Horizontal grid lines */}
                  <div className="w-full border-b border-dashed border-slate-200" />
                  <div className="w-full border-b border-dashed border-slate-200" />
                  <div className="w-full border-b border-dashed border-slate-200" />

                  {/* Vertical line indicator at Sep 24 (matching Screenshot 1) */}
                  <div className="absolute left-[65%] top-0 bottom-0 w-0.5 bg-blue-500/80" />

                  {/* Date labels */}
                  <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-[10px] text-slate-400 font-medium px-2">
                    <span>20 Sep</span>
                    <span>21 Sep</span>
                    <span>22 Sep</span>
                    <span>23 Sep</span>
                    <span>24 Sep</span>
                    <span>25 Sep</span>
                    <span>26 Sep</span>
                  </div>
                </div>

                {/* Legend Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5 mt-8 pt-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Opened</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Pending</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">Solved</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">Solved by operator</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">Solved by bot</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">Expired</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">Expired when pending on customer</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">Missed chats</span>
                </div>
              </div>

              {/* Right: Total ticket count by status */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <span className="border-b-2 border-slate-900 pb-0.5">Total ticket count by status</span>
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Empty State Chart Area (Screenshot 1: No data available) */}
                <div className="h-60 flex flex-col items-center justify-center border-b border-l border-slate-300 relative">
                  <div className="flex flex-col items-center text-slate-400">
                    <FileBarChart2 className="w-8 h-8 stroke-1 text-slate-300 mb-1" />
                    <span className="text-xs font-medium">No data available</span>
                  </div>
                  {/* Axis values on left */}
                  <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400">
                    <span>2.0</span>
                    <span>1.6</span>
                    <span>1.2</span>
                    <span>0.8</span>
                    <span>0.4</span>
                    <span>0.0</span>
                  </div>
                </div>

                {/* Legend Badges */}
                <div className="flex flex-wrap items-center gap-1.5 mt-8 pt-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Opened</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Pending</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">Solved</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">Solved by operator</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">Solved by bot</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">Expired</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">Expired when pending on customer</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">Missed chats</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SALES ANALYTICS (Screenshot 2) */}
        {activeTab === 'sales' && (
          <div className="p-6 space-y-6">
            {/* Section 1: Leads */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">Leads</h3>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer">
                    <span>All Operators</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <button className="p-1 text-slate-400 hover:text-slate-700">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 2 Empty Panels (Screenshot 2) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Left empty pie */}
                <div className="h-56 flex flex-col items-center justify-center border-r border-slate-100">
                  <FileBarChart2 className="w-8 h-8 stroke-1 text-slate-300 mb-2" />
                  <span className="text-xs text-slate-400 font-medium">No data available</span>
                  <div className="flex items-center gap-4 mt-6 text-xs font-semibold">
                    <span className="flex items-center gap-1 text-purple-700">● Won 0</span>
                    <span className="flex items-center gap-1 text-rose-600">● Lost 0</span>
                  </div>
                </div>

                {/* Right empty scatter/grid */}
                <div className="md:col-span-2 h-56 flex flex-col items-center justify-center border-b border-l border-slate-200 relative">
                  <FileBarChart2 className="w-8 h-8 stroke-1 text-slate-300 mb-2" />
                  <span className="text-xs text-slate-400 font-medium">No data available</span>
                  <div className="absolute left-1 top-2 text-[10px] text-slate-400 font-bold -rotate-90">
                    Leads
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Sales Pipeline */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-bold text-slate-900">Sales Pipeline</h3>
                  <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                    Win Rate: 0%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer">
                    <span>All Operators</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <button className="p-1 text-slate-400 hover:text-slate-700">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stage Headers (Screenshot 2) */}
              <div className="grid grid-cols-5 border-b border-slate-200 pb-2 text-center text-xs font-bold text-slate-700">
                <div>New Lead <span className="text-slate-400 font-normal">--</span></div>
                <div>Contacted <span className="text-slate-400 font-normal">--</span></div>
                <div>Qualified <span className="text-slate-400 font-normal">--</span></div>
                <div>Proposal Sent <span className="text-slate-400 font-normal">--</span></div>
                <div>Deal Won <span className="text-slate-400 font-normal">--</span></div>
              </div>

              {/* Grid Empty State */}
              <div className="h-60 flex flex-col items-center justify-center border-b border-l border-slate-200 relative">
                <FileBarChart2 className="w-8 h-8 stroke-1 text-slate-300 mb-2" />
                <span className="text-xs text-slate-400 font-medium">No data available</span>
                <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400">
                  <span>300</span>
                  <span>150</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WHATSAPP CALLS ANALYTICS (Screenshot 3) */}
        {activeTab === 'calls' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-900 mb-3 border-b-2 border-slate-900 inline-block pb-0.5">
                Overview
              </h3>

              {/* 6 Overview Cards with Icons (Screenshot 3) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Total Call Volume', val: callsData?.totalVolume ?? 0, icon: PhoneCall },
                  { label: 'Outbound Connected', val: callsData?.outboundConnected ?? 0, icon: PhoneOutgoing },
                  { label: 'Outbound Attempted', val: callsData?.outboundAttempted ?? 0, icon: PhoneMissed },
                  { label: 'Inbound Calls', val: callsData?.inboundCalls ?? 0, icon: Clock },
                  { label: 'Missed Calls', val: callsData?.missedCalls ?? 0, icon: PhoneIncoming },
                  { label: 'Avg. Call Duration', val: callsData?.avgDuration ?? '-', icon: Timer },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={idx}
                      className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between"
                    >
                      <div>
                        <div className="text-2xl font-black text-slate-900">{item.val}</div>
                        <div className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
                          <span>{item.label}</span>
                          <Info className="w-3 h-3 text-slate-300" />
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Agent Performance Table (Screenshot 3) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <span className="border-b-2 border-slate-900 pb-0.5">Agent performance</span>
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer">
                    <span>All users</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </div>
                  <button className="p-1 text-slate-400 hover:text-slate-700">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-700 font-bold">
                      <th className="py-2.5 px-3">Agent</th>
                      <th className="py-2.5 px-3">Avg. Call Duration</th>
                      <th className="py-2.5 px-3">Outbound Attempted</th>
                      <th className="py-2.5 px-3">Outbound Connected</th>
                      <th className="py-2.5 px-3">Inbound Calls</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(callsData?.agentPerformance || []).map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 font-semibold text-slate-800">
                        <td className="py-3 px-3">{row.agent}</td>
                        <td className="py-3 px-3">{row.avgDuration}</td>
                        <td className="py-3 px-3">{row.outboundAttempted}</td>
                        <td className="py-3 px-3">{row.outboundConnected}</td>
                        <td className="py-3 px-3">{row.inboundCalls}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHATBOT ANALYTICS (BETA) (Screenshot 4) */}
        {activeTab === 'chatbot' && (
          <div className="p-6 space-y-6">
            {/* Filter controls row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <span>Overview</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 cursor-pointer">
                  <span>{selectedBotFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                {/* 1D, 1W, 1M, 3M, Custom */}
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 text-xs font-bold text-slate-600">
                  {['1D', '1W', '1M', '3M', 'Custom date'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTimeRange(t)}
                      className={`px-3 py-1 rounded-lg transition ${
                        timeRange === t ? 'bg-slate-900 text-white' : 'hover:text-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Metric Strip (7 boxes) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { label: 'Sessions', val: chatbotData?.sessions ?? 0 },
                { label: 'Completed', val: chatbotData?.completed ?? 0 },
                { label: 'Dropped-off', val: chatbotData?.droppedOff ?? 0 },
                { label: 'Reassigned', val: chatbotData?.reassigned ?? 0 },
                { label: 'Completion Rate', val: chatbotData?.completionRate ?? '0.0%' },
                { label: 'Drop-off Rate', val: chatbotData?.dropOffRate ?? '0.0%' },
                { label: 'Reassignment Rate', val: chatbotData?.reassignmentRate ?? '0.0%' },
              ].map((m, idx) => (
                <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <span>{m.label}</span>
                    <Info className="w-3 h-3 text-slate-300" />
                  </div>
                  <div className="text-xl font-black text-slate-900 mt-2">{m.val}</div>
                </div>
              ))}
            </div>

            {/* Where to focus (2 cards: Dropped-off and Reassigned nodes) */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-3">
                <span className="border-b-2 border-slate-900 pb-0.5">Where to Focus</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-800 mb-4">Top Dropped-off nodes</h4>
                  <div className="h-44 flex flex-col items-center justify-center text-slate-400">
                    <FileBarChart2 className="w-8 h-8 stroke-1 text-slate-300 mb-2" />
                    <span className="text-xs font-medium">No data available</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                  <h4 className="text-xs font-bold text-slate-800 mb-4">Top Reassigned nodes</h4>
                  <div className="h-44 flex flex-col items-center justify-center text-slate-400">
                    <FileBarChart2 className="w-8 h-8 stroke-1 text-slate-300 mb-2" />
                    <span className="text-xs font-medium">No data available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How your Chatbots are performing */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-3">
                <span>How your Chatbots are performing</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="py-8 text-center text-xs text-slate-400 font-medium">
                No active chatbot flow executions registered in this date range.
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CX INTELLIGENCE (Screenshot 5) */}
        {activeTab.startsWith('cx') && (
          <div className="p-6 space-y-6">
            {samplePreview && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Data shown is for representation purpose only</span>
              </div>
            )}

            {/* Score & Distribution Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CX Score Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <h4 className="text-xs font-bold text-slate-800">CX Score</h4>
                <div className="my-8 text-center">
                  <div className="text-5xl font-black text-slate-900">
                    {cxData?.score ?? 0}%
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-2">
                    Based on {cxData?.totalConversations ?? 0} conversations
                  </p>
                  <button className="text-xs text-emerald-700 hover:text-emerald-900 font-bold mt-1 underline cursor-pointer">
                    How do we calculate
                  </button>
                </div>
                <div />
              </div>

              {/* Distribution Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <span>Distribution</span>
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </div>

                {/* Positive Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                    <span>Positive</span>
                    <span>{cxData?.positiveShare ?? 0}%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-lg transition-all duration-500"
                      style={{ width: `${cxData?.positiveShare ?? 0}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 mt-1 block">
                    {cxData?.positiveCount ?? 0} conversations
                  </span>
                </div>

                {/* Negative Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                    <span>Negative</span>
                    <span>{cxData?.negativeShare ?? 0}%</span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-lg transition-all duration-500"
                      style={{ width: `${cxData?.negativeShare ?? 0}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700 mt-1 block">
                    {cxData?.negativeCount ?? 0} conversations
                  </span>
                </div>
              </div>
            </div>

            {/* Pro Tip Box (Screenshot 5) */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-emerald-950">Pro Tip:</h5>
                  <p className="text-xs text-emerald-800/90 mt-0.5 leading-relaxed">
                    Filter by the <code className="bg-emerald-100 px-1 py-0.2 rounded font-mono text-[11px]">cx_score_latest</code> attribute in Campaign or Rules, to instantly segment your audience for personalised actions, like sending a discount or asking for a review.
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer">
                See how
              </button>
            </div>

            {/* CX Score Trend Curve */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 mb-4">CX Score Trend</h4>
              <div className="h-56 relative flex items-center justify-center border-b border-l border-slate-200">
                {samplePreview ? (
                  <svg className="w-full h-full p-4 overflow-visible" viewBox="0 0 500 150">
                    <path
                      d="M 20 120 Q 120 40, 200 110 T 380 90 T 480 100"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <div className="text-center text-slate-400">
                    <FileBarChart2 className="w-8 h-8 stroke-1 text-slate-300 mx-auto mb-1" />
                    <span className="text-xs font-medium">No CX sentiment timeline recorded</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
