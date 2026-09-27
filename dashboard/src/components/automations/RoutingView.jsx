import React, { useState, useEffect } from 'react'
import {
  GitMerge,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle,
  Save,
  Plus,
  Trash2,
  Sliders
} from 'lucide-react'
import { automationsApi } from '../../api/index.js'

export default function RoutingView() {
  const [config, setConfig] = useState({
    strategy: 'round_robin',
    fallbackAgent: 'Sanes (Admin)',
    businessHoursOnly: true,
    autoAssignNewChats: true,
    idleTimeoutMinutes: 15,
    queues: [
      { id: 'q-sales', name: 'Sales & Onboarding', agentsCount: 2, isDefault: true },
      { id: 'q-support', name: 'Technical Support', agentsCount: 3, isDefault: false },
      { id: 'q-billing', name: 'Billing & Subscriptions', agentsCount: 1, isDefault: false }
    ]
  })
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    automationsApi.getRoutingConfig().then((res) => {
      if (res.success) setConfig(res.data)
    })
  }, [])

  const handleSave = async () => {
    await automationsApi.saveRoutingConfig(config)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="h-full flex flex-col bg-white font-sans overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-200/80 shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Conversation Routing</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure how incoming WhatsApp conversations are automatically assigned to team agents and queues.
          </p>
        </div>

        <button
          onClick={handleSave}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer ${
            savedSuccess
              ? 'bg-emerald-600 text-white'
              : 'bg-brand-primary hover:bg-emerald-400 text-slate-950'
          }`}
        >
          <Save className="w-3.5 h-3.5" />
          <span>{savedSuccess ? 'Saved!' : 'Save Routing Rules'}</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl space-y-6">
        {/* Strategy Selector */}
        <div className="rounded-2xl border border-slate-200/90 p-5 bg-white shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-brand-dark" />
            <span>Assignment Strategy</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Select the algorithmic distribution model for newly incoming chats.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'round_robin',
                title: 'Round Robin',
                desc: 'Equally distributes incoming conversations in order to all active agents.'
              },
              {
                id: 'workload',
                title: 'Workload Balanced',
                desc: 'Assigns chat to the agent currently having the fewest active conversations.'
              },
              {
                id: 'skill_based',
                title: 'Skill-Based Routing',
                desc: 'Routes to specialized agent queues based on customer query tags and intent.'
              }
            ].map((strategy) => (
              <label
                key={strategy.id}
                className={`p-4 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                  config.strategy === strategy.id
                    ? 'border-brand-primary bg-emerald-50/40 text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">{strategy.title}</span>
                    <input
                      type="radio"
                      name="strategy"
                      checked={config.strategy === strategy.id}
                      onChange={() => setConfig({ ...config, strategy: strategy.id })}
                      className="accent-[#00c25a]"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{strategy.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Support Queues */}
        <div className="rounded-2xl border border-slate-200/90 p-5 bg-white shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Department Queues</span>
              </h3>
              <p className="text-xs text-slate-500">
                Queues linked with your automation rule action steps.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {config.queues.map((q) => (
              <div key={q.id} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-slate-800">{q.name}</span>
                  {q.isDefault && (
                    <span className="ml-2 px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                      Default Queue
                    </span>
                  )}
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {q.agentsCount} agents assigned
                  </p>
                </div>

                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fallback Agent & Inactivity */}
        <div className="rounded-2xl border border-slate-200/90 p-5 bg-white shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fallback & Business Hours</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Default Fallback Agent
              </label>
              <select
                value={config.fallbackAgent}
                onChange={(e) => setConfig({ ...config, fallbackAgent: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 outline-none"
              >
                <option>Sanes (Admin)</option>
                <option>Rahul Verma (Support Lead)</option>
                <option>Automated Responder (Auto-Resolve)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Auto-reassign if agent inactive for
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={config.idleTimeoutMinutes}
                  onChange={(e) =>
                    setConfig({ ...config, idleTimeoutMinutes: Number(e.target.value) })
                  }
                  className="w-24 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 outline-none"
                />
                <span className="text-xs text-slate-500">minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
