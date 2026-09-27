import React, { useState } from 'react'
import { X, Send, Users, Calendar, CheckCircle2, AlertCircle } from 'lucide-react'
import { WhatsAppIcon } from '../ChannelIcons.jsx'

export default function CreateCampaignModal({ isOpen, onClose, preselectedTemplate, onCampaignLaunched }) {
  const [campaignName, setCampaignName] = useState('Festive VIP Broadcast')
  const [targetAudience, setTargetAudience] = useState('all') // 'all', 'vip', 'leads'
  const [scheduleType, setScheduleType] = useState('now') // 'now', 'scheduled'
  const [scheduledDate, setScheduledDate] = useState('2026-09-28T10:00')
  const [launching, setLaunching] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleLaunch = () => {
    setLaunching(true)
    setTimeout(() => {
      setLaunching(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onCampaignLaunched?.()
        onClose()
      }, 1500)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn p-6 font-sans">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Create New WhatsApp Campaign</h2>
            <p className="text-xs text-slate-500">Send bulk personalized broadcasts using Meta Cloud API</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Select Template
            </label>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  {preselectedTemplate?.name || preselectedTemplate?.title || 'welcome (Approved)'}
                </span>
                <span className="text-[11px] text-emerald-700">Official Meta Approved WhatsApp Template</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px]">
                Approved
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Target Audience
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 outline-none"
            >
              <option value="all">All Contacts (1,248 Verified Numbers)</option>
              <option value="vip">VIP Customers Tagged (420 Contacts)</option>
              <option value="leads">New Inquiries & Leads (180 Contacts)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Delivery Schedule
            </label>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <button
                type="button"
                onClick={() => setScheduleType('now')}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition cursor-pointer ${
                  scheduleType === 'now'
                    ? 'border-brand-primary bg-emerald-50 text-slate-950'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                Send Instantly Now
              </button>
              <button
                type="button"
                onClick={() => setScheduleType('scheduled')}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition cursor-pointer ${
                  scheduleType === 'scheduled'
                    ? 'border-brand-primary bg-emerald-50 text-slate-950'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                Schedule for Later
              </button>
            </div>

            {scheduleType === 'scheduled' && (
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 outline-none"
              />
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={handleLaunch}
            disabled={launching}
            className="px-5 py-2.5 rounded-xl bg-[#00c25a] hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            {success ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Broadcast Scheduled!</span>
              </>
            ) : launching ? (
              <span>Broadcasting...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{scheduleType === 'now' ? 'Launch Broadcast Now' : 'Schedule Campaign'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
