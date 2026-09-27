import React, { useState } from 'react'
import {
  Search,
  Plus,
  PlayCircle,
  Copy,
  Edit,
  Trash2,
  Info,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Tag,
  CheckCircle,
  ExternalLink,
  Sliders
} from 'lucide-react'
import { WhatsAppIcon } from '../ChannelIcons.jsx'

export default function RulesListView({
  rules,
  onToggleRuleStatus,
  onEditRule,
  onCreateRule,
  onDuplicateRule,
  onDeleteRule
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false)

  const filteredRules = rules.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.actionSummary.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col bg-white font-sans overflow-hidden">
      {/* Top Header matching Screenshot 1 */}
      <div className="p-6 border-b border-slate-200/80 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Rules</h1>
            <p className="text-xs text-slate-500 mt-1">
              Create Rules to trigger automated messages, chat assignments, chatbots and more.
            </p>
          </div>

          {/* Controls: Search, How it works, Create Rules */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-3.5 pr-9 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* How it works Button with Play Icon (Screenshot 1) */}
            <button
              onClick={() => setIsTutorialModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 fill-blue-600 text-white" />
              <span>How it works</span>
            </button>

            {/* + Create Rules Button (Screenshot 1: Green Button) */}
            <button
              onClick={onCreateRule}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00c25a] hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Rules</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rules Table matching Screenshot 1 */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left text-xs text-slate-600 border-collapse">
          {/* Table Header */}
          <thead className="bg-slate-50/80 border-b border-slate-200/90 text-[11px] font-bold text-slate-700 uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="py-3 px-6 flex items-center gap-1">
                <span>Rule Name</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </th>
              <th className="py-3 px-4">Trigger Type</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Executed</th>
              <th className="py-3 px-4">Last Updated</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {filteredRules.map((rule, idx) => {
              const isGreenRow = rule.name.includes('Hello') || rule.name.includes('WA Out')
              return (
                <tr
                  key={rule.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    isGreenRow ? 'bg-[#f4fbf7]/40' : 'bg-white'
                  }`}
                >
                  {/* Rule Name */}
                  <td className="py-3.5 px-6">
                    <div>
                      <button
                        onClick={() => onEditRule(rule)}
                        className="text-blue-600 hover:text-blue-800 font-bold hover:underline text-xs text-left cursor-pointer"
                      >
                        {rule.name}
                      </button>
                      {rule.isBuiltIn && (
                        <div className="mt-0.5">
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                            Built-In
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Trigger Type */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#e8f7ee] border border-emerald-300 flex items-center justify-center shrink-0">
                        <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="truncate max-w-[200px] text-slate-800">
                        {rule.triggerType}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      {rule.actionSummary.includes('attribute') ? (
                        <div className="w-6 h-6 rounded bg-amber-500 text-white flex items-center justify-center shrink-0">
                          <Tag className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded bg-rose-500 text-white flex items-center justify-center shrink-0">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span className="text-slate-800 font-medium">{rule.actionSummary}</span>
                    </div>
                  </td>

                  {/* Status Toggle (Screenshot 1: red/coral when Off, green when On) */}
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => onToggleRuleStatus(rule.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition cursor-pointer inline-flex items-center gap-1.5 ${
                        rule.status
                          ? 'bg-[#00c25a] text-white hover:bg-emerald-600'
                          : 'bg-[#ef7069] text-white hover:bg-rose-500'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>{rule.status ? 'On' : 'Off'}</span>
                    </button>
                  </td>

                  {/* Executed count */}
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                    {rule.executedCount || 0}
                  </td>

                  {/* Last Updated */}
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                    {rule.lastUpdated}
                  </td>

                  {/* Actions (Delete, Duplicate, Edit) matching Screenshot 1 */}
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      {!rule.isBuiltIn && (
                        <button
                          onClick={() => onDeleteRule(rule.id)}
                          className="p-1 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                          title="Delete Rule"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => onDuplicateRule(rule.id)}
                        className="p-1 hover:text-slate-900 hover:bg-slate-100 rounded transition cursor-pointer"
                        title="Duplicate Rule"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onEditRule(rule)}
                        className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition cursor-pointer"
                        title="Edit Rule Node Flow"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching Screenshot 1 */}
      <div className="p-4 border-t border-slate-200/80 bg-slate-50/50 flex items-center justify-end gap-6 text-xs text-slate-500 shrink-0">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-700 outline-none">
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>

        <span>
          1-{filteredRules.length} of {filteredRules.length}
        </span>

        <div className="flex items-center gap-2 text-slate-600 font-medium">
          <button className="flex items-center gap-1 hover:text-slate-900 disabled:opacity-30 cursor-pointer" disabled>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
          <button className="flex items-center gap-1 hover:text-slate-900 disabled:opacity-30 cursor-pointer" disabled>
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tutorial & How it Works Modal (Based on video https://youtu.be/RvgbwSsUhCw) */}
      {isTutorialModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn font-sans">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2.5">
                <PlayCircle className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold">How to Set Up WhatsApp Automation Rules</h3>
                  <p className="text-[10px] text-slate-400">Complete video walkthrough & node concepts</p>
                </div>
              </div>
              <button
                onClick={() => setIsTutorialModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                <h4 className="font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Official Tutorial Video
                </h4>
                <p className="text-slate-600 mb-3">
                  Watch the official step-by-step masterclass on how WhatsApp Business Rules work:
                </p>
                <a
                  href="https://youtu.be/RvgbwSsUhCw?si=Br-NxcZOQMfWRXd2"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Video Tutorial (YouTube)</span>
                </a>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
                  The 3 Core Nodes Explained:
                </h5>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Trigger Node (When):</strong>
                    Fires whenever an incoming WhatsApp message arrives on your connected phone number.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Filter Node (Condition):</strong>
                    Checks whether the message fuzzy-matches keywords (e.g. "hello", "price"), matches customer attributes, or arrives outside business hours.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block">Action Node (Then):</strong>
                    Instantly replies with approved Reply Material text, assigns the chat to a live support queue, or triggers an automated auto-responder!
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={() => setIsTutorialModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
