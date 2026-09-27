import React, { useState, useEffect } from 'react'
import {
  Layers,
  MessageSquare,
  Bot,
  GitMerge,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react'
import RulesListView from './RulesListView.jsx'
import RuleNodeBuilder from './RuleNodeBuilder.jsx'
import ChatbotsView from './ChatbotsView.jsx'
import ReplyMaterialView from './ReplyMaterialView.jsx'
import RoutingView from './RoutingView.jsx'
import { automationsApi } from '../../api/index.js'

export default function AutomationsView() {
  // activeSubTab: 'rules' | 'chatbots' | 'routing' | 'reply-material'
  const [activeSubTab, setActiveSubTab] = useState('rules')
  const [triggersOpen, setTriggersOpen] = useState(true)
  const [actionsLibraryOpen, setActionsLibraryOpen] = useState(true)

  // Rules list state
  const [rules, setRules] = useState([])
  const [editingRule, setEditingRule] = useState(null) // null = list view, object = node flow builder
  const [loading, setLoading] = useState(false)

  const loadRules = async () => {
    setLoading(true)
    const res = await automationsApi.getRules()
    if (res.success) {
      setRules(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadRules()
  }, [])

  const handleToggleRuleStatus = async (ruleId) => {
    const res = await automationsApi.toggleRuleStatus(ruleId)
    if (res.success) {
      setRules((prev) =>
        prev.map((r) => (r.id === ruleId ? { ...r, status: res.data.status } : r))
      )
    }
  }

  const handleDuplicateRule = async (ruleId) => {
    const res = await automationsApi.duplicateRule(ruleId)
    if (res.success) {
      loadRules()
    }
  }

  const handleDeleteRule = async (ruleId) => {
    await automationsApi.deleteRule(ruleId)
    loadRules()
  }

  const handleCreateNewRule = () => {
    const newRule = {
      id: `rule-${Date.now()}`,
      name: 'Custom WhatsApp Keyword Automation',
      isBuiltIn: false,
      status: true,
      triggerType: 'New WhatsApp message is received',
      triggerChannel: 'Default (+)',
      actionSummary: 'Send message',
      executedCount: 0,
      lastUpdated: new Date().toLocaleDateString('en-GB'),
      nodes: [
        {
          id: 'node-1',
          type: 'trigger',
          badge: 'When',
          title: 'New WhatsApp message is received',
          subtitle: 'Channel: Default (+)',
          iconType: 'whatsapp',
          config: { channel: 'Default (+)', event: 'message_received' }
        },
        {
          id: 'node-2',
          type: 'filter',
          badge: 'Filter',
          title: 'Continue rule only if',
          subtitle: 'Matches keyword filter',
          tags: ['Incoming message', 'Fuzzy matches', '3 keywords'],
          keywords: ['demo', 'trial', 'info'],
          iconType: 'filter',
          config: { condition: 'keyword_match', keywords: ['demo', 'trial', 'info'], matchType: 'fuzzy' }
        },
        {
          id: 'node-3',
          type: 'action',
          badge: 'Then',
          title: 'Send message',
          subtitle: 'Send automated WhatsApp message',
          previewText: 'Hi there! Thanks for your interest in AIONEX. Our team will get back to you shortly with full demo details.',
          tags: ['Custom response text'],
          iconType: 'message',
          config: { actionType: 'send_text' }
        }
      ]
    }
    setEditingRule(newRule)
  }

  return (
    <div className="h-full flex font-sans bg-white overflow-hidden">
      {/* Automations Left Sub-Sidebar matching Screenshots 1, 2, 3, 4 */}
      <aside className="w-56 border-r border-slate-200/90 flex flex-col justify-between shrink-0 bg-[#fbfcfd] select-none">
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Header Title matching Screenshot 1 */}
          <h2 className="text-base font-bold text-slate-900 tracking-tight px-2">
            Automations
          </h2>

          {/* Group 1: Triggers (Screenshot 1) */}
          <div className="space-y-1">
            <button
              onClick={() => setTriggersOpen(!triggersOpen)}
              className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-700 hover:text-slate-950 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Triggers</span>
              </div>
              {triggersOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {triggersOpen && (
              <div className="pl-3 space-y-0.5 pt-0.5">
                <button
                  onClick={() => {
                    setActiveSubTab('rules')
                    setEditingRule(null)
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeSubTab === 'rules'
                      ? 'bg-slate-200/70 text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>Rules</span>
                  {/* Pink/Coral Recommended Pill (Screenshot 1) */}
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-[#ffe8e7] text-[#e8534b]">
                    Recommended
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Group 2: Actions Library (Screenshot 1) */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => setActionsLibraryOpen(!actionsLibraryOpen)}
              className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-700 hover:text-slate-950 transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span>Actions Library</span>
              </div>
              {actionsLibraryOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>

            {actionsLibraryOpen && (
              <div className="pl-3 space-y-0.5 pt-0.5">
                {/* Chatbots (Screenshot 4) */}
                <button
                  onClick={() => {
                    setActiveSubTab('chatbots')
                    setEditingRule(null)
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeSubTab === 'chatbots'
                      ? 'bg-slate-200/70 text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Chatbots
                </button>

                {/* Routing */}
                <button
                  onClick={() => {
                    setActiveSubTab('routing')
                    setEditingRule(null)
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeSubTab === 'routing'
                      ? 'bg-slate-200/70 text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Routing
                </button>

                {/* Reply Material (Screenshot 3) */}
                <button
                  onClick={() => {
                    setActiveSubTab('reply-material')
                    setEditingRule(null)
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    activeSubTab === 'reply-material'
                      ? 'bg-slate-200/70 text-slate-950 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Reply Material
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Helper Badge */}
        <div className="p-3 border-t border-slate-200/70 bg-white">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
            <span className="font-bold block flex items-center gap-1 text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              DaVinci Node Flow
            </span>
            <span className="text-[10px] text-slate-600">
              Connect When, Filter, and Action steps visually.
            </span>
          </div>
        </div>
      </aside>

      {/* Main Work Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {activeSubTab === 'rules' && (
          editingRule ? (
            /* DaVinci Style Node Flow Graph Builder (Screenshots 2 & 5) */
            <RuleNodeBuilder
              rule={editingRule}
              onBack={() => setEditingRule(null)}
              onSaveRule={(saved) => {
                setRules((prev) => {
                  const idx = prev.findIndex((r) => r.id === saved.id)
                  if (idx !== -1) {
                    const copy = [...prev]
                    copy[idx] = saved
                    return copy
                  }
                  return [saved, ...prev]
                })
              }}
            />
          ) : (
            /* Rules Table View (Screenshot 1) */
            <RulesListView
              rules={rules}
              onToggleRuleStatus={handleToggleRuleStatus}
              onEditRule={(rule) => setEditingRule(rule)}
              onCreateRule={handleCreateNewRule}
              onDuplicateRule={handleDuplicateRule}
              onDeleteRule={handleDeleteRule}
            />
          )
        )}

        {/* Chatbots Library & Active Bots (Screenshot 4) */}
        {activeSubTab === 'chatbots' && (
          <ChatbotsView
            onUseChatbotInFlow={(template) => {
              setActiveSubTab('rules')
              setEditingRule({
                id: `rule-bot-${Date.now()}`,
                name: `${template.name} Automation`,
                status: true,
                nodes: [
                  {
                    id: 'node-1',
                    type: 'trigger',
                    badge: 'When',
                    title: 'New WhatsApp message is received',
                    subtitle: 'Channel: Default (+)',
                    iconType: 'whatsapp',
                    config: { channel: 'Default (+)', event: 'message_received' }
                  },
                  {
                    id: 'node-2',
                    type: 'filter',
                    badge: 'Filter',
                    title: 'Continue rule only if',
                    subtitle: 'First time user or greeting',
                    tags: ['Incoming message', 'New session'],
                    iconType: 'filter'
                  },
                  {
                    id: 'node-3',
                    type: 'action',
                    badge: 'Then (Bot)',
                    title: `Handover to ${template.name}`,
                    subtitle: 'Automated conversational bot flow takes over',
                    previewText: `Welcome to our WhatsApp assistance! How can we help you with ${template.name}?`,
                    tags: [template.name],
                    iconType: 'bot'
                  }
                ]
              })
            }}
          />
        )}

        {/* Conversation Routing */}
        {activeSubTab === 'routing' && <RoutingView />}

        {/* Reply Material (Screenshot 3) */}
        {activeSubTab === 'reply-material' && <ReplyMaterialView />}
      </main>
    </div>
  )
}
