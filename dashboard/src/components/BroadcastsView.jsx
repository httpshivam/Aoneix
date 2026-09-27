import React, { useState } from 'react'
import { Send, Users, Sparkles, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export default function BroadcastsView() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 'camp-1',
      name: 'Diwali Festive VIP Early Access',
      template: 'festive_offer_v2 (Meta Approved)',
      sentCount: 3420,
      deliveredRate: '98.4%',
      readRate: '86.2%',
      status: 'Completed',
      date: 'Sep 25, 2026',
    },
    {
      id: 'camp-2',
      name: 'Abandoned Cart Recovery Flow',
      template: 'cart_reminder_discount',
      sentCount: 890,
      deliveredRate: '99.1%',
      readRate: '91.0%',
      status: 'Active (Automated)',
      date: 'Ongoing',
    },
  ])

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 font-sans">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Send className="w-6 h-6 text-brand-primary" />
            WhatsApp Broadcasts & Campaigns
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Send bulk marketing and transactional messages using Meta-approved WhatsApp templates.
          </p>
        </div>

        <button className="px-4 py-2.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase">Total Messages Sent</p>
          <p className="text-2xl font-black text-slate-900 mt-1">42,850</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">+14% this month</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase">Avg WhatsApp Open Rate</p>
          <p className="text-2xl font-black text-slate-900 mt-1">89.4%</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">High Meta Quality Tier</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase">Available Free Tier Quota</p>
          <p className="text-2xl font-black text-slate-900 mt-1">1,000 / 1,000</p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">Monthly Meta Allowance</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Recent Broadcasts</h2>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[11px] uppercase text-slate-400 border-b border-slate-100">
            <tr>
              <th className="py-3 px-4 font-semibold">Campaign Name</th>
              <th className="py-3 px-4 font-semibold">Template</th>
              <th className="py-3 px-4 font-semibold">Recipients</th>
              <th className="py-3 px-4 font-semibold">Delivered</th>
              <th className="py-3 px-4 font-semibold">Read Rate</th>
              <th className="py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-bold text-slate-900">{c.name}</td>
                <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{c.template}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">{c.sentCount.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-emerald-600 font-bold">{c.deliveredRate}</td>
                <td className="py-3.5 px-4 text-slate-700 font-bold">{c.readRate}</td>
                <td className="py-3.5 px-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
