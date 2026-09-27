import React, { useState, useEffect } from 'react'
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Phone,
  Mail,
  Building,
  Sparkles
} from 'lucide-react'
import { analyticsApi, leadsApi } from '../api/index.js'

export default function Overview() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState([])
  const [leads, setLeads] = useState([])
  const [updatingId, setUpdatingId] = useState(null)

  // Dynamic fetch on mount / refresh
  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const [statsRes, leadsRes] = await Promise.all([
        analyticsApi.getOverviewStats(),
        leadsApi.getLeads(),
      ])
      if (statsRes.success) setStats(statsRes.data.kpis)
      if (leadsRes.success) setLeads(leadsRes.data)
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingId(leadId)
    try {
      await leadsApi.updateStatus(leadId, newStatus)
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const getKpiIcon = (id) => {
    switch (id) {
      case 'inquiries': return Users
      case 'revenue': return DollarSign
      case 'projects': return Activity
      default: return TrendingUp
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner with AIONEX website styling */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062419] via-[#083c27] to-[#041a12] p-8 text-white border border-emerald-500/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-badge border border-brand-primary/40 text-brand-primary text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              AIONEX Central Hub • Live Sync Active
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Welcome back, <span className="text-brand-primary">Shivam</span> 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-xl leading-relaxed">
              Real-time workspace for inquiries, leads, and operational workflows. All data operates dynamically with strict zero-cache policy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition flex items-center gap-2 backdrop-blur-sm"
              title="Fetch fresh dynamic data"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-brand-primary ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/25 flex items-center gap-1.5"
            >
              View Live Website
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = getKpiIcon(stat.id)
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-glass hover:border-brand-primary/40 hover:shadow-premium transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                <div className="w-9 h-9 rounded-xl bg-brand-surface text-brand-dark flex items-center justify-center group-hover:bg-brand-primary group-hover:text-slate-950 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                <div
                  className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
                    stat.isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  )}
                  {stat.change}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-1 font-medium">{stat.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Main Grid: Leads Management & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Leads Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-glass">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Website Inquiries & Leads</h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-mint text-brand-dark">
                  {leads.length} Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Direct capture from website contact modal & consultation CTAs</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                <tr>
                  <th className="py-2.5 px-3 font-semibold rounded-l-lg">Client & Contact</th>
                  <th className="py-2.5 px-3 font-semibold">Requirement</th>
                  <th className="py-2.5 px-3 font-semibold">Budget</th>
                  <th className="py-2.5 px-3 font-semibold">Dynamic Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right rounded-r-lg">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-900 text-sm">{lead.name}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1 font-medium text-slate-600">
                          <Building className="w-3 h-3" />
                          {lead.company}
                        </span>
                        <span>•</span>
                        <span>{lead.email}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-semibold text-slate-700 block">{lead.service}</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1">{lead.notes}</span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-md text-[11px]">
                        {lead.budget}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none transition cursor-pointer ${
                          lead.status === 'Qualified'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : lead.status === 'Proposal Sent'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                        }`}
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Won">Deal Closed / Won</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {lead.source}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">{lead.createdAt}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="space-y-6">
          {/* Architecture Guidelines Badge */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-glass">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-primary" />
              Dynamic API & Cache Policy
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              ISR write policy is locked at <strong>0 (no-store)</strong>. All state, tables, and actions interact via the isolated <code className="text-emerald-700 font-mono text-[11px] bg-emerald-50 px-1 py-0.5 rounded">/src/api</code> layer.
            </p>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Cache Header</span>
                <span className="font-mono text-[11px] font-bold text-slate-900">no-store, max-age=0</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Theme Alignment</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" />
                  AIONEX Emerald Sync
                </span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Git Push Safety</span>
                <span className="font-bold text-rose-600">Manual Approval Only</span>
              </div>
            </div>
          </div>

          {/* Service Endpoints Status */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-900 to-[#072418] text-white border border-emerald-500/20 shadow-md">
            <h4 className="font-bold text-sm text-white">System Architecture</h4>
            <p className="text-xs text-slate-300 mt-1">
              Organized domain separation across modules:
            </p>
            <div className="mt-3 font-mono text-[11px] bg-black/40 p-3 rounded-xl space-y-1.5 text-emerald-300 border border-emerald-500/20">
              <div>📁 src/api/client.js (cache: no-store)</div>
              <div>📁 src/api/analytics/</div>
              <div>📁 src/api/leads/</div>
              <div>📁 src/api/projects/</div>
              <div>📁 src/components/</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
