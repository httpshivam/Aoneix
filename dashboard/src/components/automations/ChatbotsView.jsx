import React, { useState, useEffect } from 'react'
import {
  PlayCircle,
  Plus,
  Upload,
  Search,
  Building2,
  BarChart2,
  Bot,
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Send
} from 'lucide-react'
import { automationsApi } from '../../api/index.js'

export default function ChatbotsView({ onUseChatbotInFlow }) {
  const [activeTab, setActiveTab] = useState('library') // 'library' | 'your-bots'
  const [industryFilter, setIndustryFilter] = useState('All')
  const [languageFilter, setLanguageFilter] = useState('English')
  const [searchQuery, setSearchQuery] = useState('')
  const [templates, setTemplates] = useState([])
  const [userBots, setUserBots] = useState([])
  const [loading, setLoading] = useState(false)

  // Preview Modal state
  const [previewingBot, setPreviewingBot] = useState(null)
  const [simulatedChat, setSimulatedChat] = useState([])
  const [userInput, setUserInput] = useState('')

  // Fallback Message Modal
  const [isFallbackModalOpen, setIsFallbackModalOpen] = useState(false)
  const [fallbackMessage, setFallbackMessage] = useState(
    "Sorry, I couldn't understand that! Let me connect you with one of our human team members. Please wait a moment."
  )

  // Chatbot Timer Modal
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false)
  const [timeoutMinutes, setTimeoutMinutes] = useState(15)

  useEffect(() => {
    loadChatbots()
  }, [])

  const loadChatbots = async () => {
    setLoading(true)
    const res = await automationsApi.getChatbots()
    if (res.success) {
      setTemplates(res.data.templates)
      setUserBots(res.data.userBots)
    }
    setLoading(false)
  }

  const handleOpenPreview = (bot) => {
    setPreviewingBot(bot)
    setSimulatedChat([
      { sender: 'bot', text: `Hello! 👋 Welcome to AIONEX. I am the ${bot.name}. How can I assist you today?` },
      { sender: 'bot', text: 'Please choose an option or type your question below:' }
    ])
    setUserInput('')
  }

  const handleSendSimulatorMessage = (e) => {
    e.preventDefault()
    if (!userInput.trim()) return
    const text = userInput
    setUserInput('')
    setSimulatedChat((prev) => [...prev, { sender: 'user', text }])

    setTimeout(() => {
      let botResponse = `Thank you! I have recorded your response "${text}". Next step: Proceeding with verified WhatsApp workflow.`
      if (text.toLowerCase().includes('demo') || text.toLowerCase().includes('book')) {
        botResponse = 'Great! Please pick a preferred slot: 1️⃣ Today at 4 PM  2️⃣ Tomorrow at 11 AM'
      } else if (text.toLowerCase().includes('price') || text.toLowerCase().includes('pricing')) {
        botResponse = 'Our WhatsApp Cloud API plans start from ₹999/mo with zero Meta markup. Shall I send the full brochure PDF?'
      }
      setSimulatedChat((prev) => [...prev, { sender: 'bot', text: botResponse }])
    }, 450)
  }

  const handleUseBot = async (template) => {
    const res = await automationsApi.createBotFromTemplate(template.id, `${template.name} Flow`)
    if (res.success) {
      onUseChatbotInFlow?.(template)
    }
  }

  const filteredTemplates = templates.filter((t) => {
    const matchesIndustry =
      industryFilter === 'All' ||
      t.industry.toLowerCase().includes(industryFilter.toLowerCase())
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesIndustry && matchesSearch
  })

  return (
    <div className="h-full flex flex-col bg-white font-sans overflow-hidden">
      {/* Top Header matching Screenshot 4 */}
      <div className="p-6 border-b border-slate-200/80 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Chatbots</h1>
            <p className="text-xs text-slate-500 mt-1">
              Select a chatbot below and make it your own by customising it.
            </p>
          </div>

          {/* Right Action Controls matching Screenshot 4 */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Watch Tutorial Button */}
            <a
              href="https://youtu.be/RvgbwSsUhCw?si=Br-NxcZOQMfWRXd2"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 fill-blue-600 text-white" />
              <span>Watch Tutorial</span>
            </a>

            {/* Fallback Message Button */}
            <button
              onClick={() => setIsFallbackModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition cursor-pointer"
            >
              Fallback Message
            </button>

            {/* Chatbot Timer Button */}
            <button
              onClick={() => setIsTimerModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition cursor-pointer"
            >
              Chatbot Timer
            </button>

            {/* Import / Export */}
            <button
              title="Import Chatbot JSON"
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
            >
              <Upload className="w-4 h-4" />
            </button>

            {/* Add Chatbot Button */}
            <button
              onClick={() => {
                if (templates.length > 0) handleUseBot(templates[0])
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00c25a] hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Chatbot</span>
            </button>
          </div>
        </div>

        {/* Tabs: Library (9) vs Your bots (1) */}
        <div className="flex items-center gap-6 mt-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('library')}
            className={`pb-2.5 text-xs font-bold transition relative cursor-pointer ${
              activeTab === 'library'
                ? 'text-[#00c25a]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Library</span>
            <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
              {templates.length}
            </span>
            {activeTab === 'library' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c25a]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('your-bots')}
            className={`pb-2.5 text-xs font-bold transition relative cursor-pointer ${
              activeTab === 'your-bots'
                ? 'text-[#00c25a]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Your bots</span>
            <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 text-[10px]">
              {userBots.length}
            </span>
            {activeTab === 'your-bots' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c25a]" />
            )}
          </button>
        </div>

        {/* Filter Bar matching Screenshot 4 */}
        {activeTab === 'library' && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
            <div className="flex items-center gap-3">
              {/* Industry Dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Industry</span>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold outline-none"
                >
                  <option>All</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>eCommerce</option>
                  <option>Retail</option>
                  <option>Services</option>
                </select>
              </div>

              {/* Language Dropdown */}
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold outline-none"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search samples..."
                className="w-full pl-3 pr-9 py-1 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Main Grid View */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        {activeTab === 'library' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    {template.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    {/* Industry */}
                    <div className="flex items-start gap-2 text-slate-600">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 block text-[11px]">Industry</span>
                        <span className="text-[11px] text-slate-500">{template.industry}</span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-start gap-2 text-slate-600">
                      <BarChart2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 block text-[11px]">Metrics</span>
                        <span className="text-[11px] text-slate-500">{template.metricsLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons matching Screenshot 4 */}
                <div className="mt-5 space-y-2 pt-2">
                  <button
                    onClick={() => handleOpenPreview(template)}
                    className="w-full py-2 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition cursor-pointer"
                  >
                    Preview Chatbot
                  </button>
                  <button
                    onClick={() => handleUseBot(template)}
                    className="w-full py-2 rounded-xl bg-[#00c25a] hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Use Chatbot
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Your Bots Tab */
          <div className="space-y-4 max-w-4xl">
            {userBots.map((bot) => (
              <div
                key={bot.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{bot.name}</h4>
                    <p className="text-xs text-slate-500">Based on template: {bot.template}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    ● {bot.status}
                  </span>
                  <span className="text-slate-500 font-medium">
                    Triggered: {bot.triggerCount} times
                  </span>
                  <button
                    onClick={() => onUseChatbotInFlow?.({ name: bot.name })}
                    className="px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold shadow-xs cursor-pointer"
                  >
                    Open in Flow Canvas
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Chatbot Preview Modal */}
      {previewingBot && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn flex flex-col h-[560px]">
            {/* WhatsApp Phone Header */}
            <div className="bg-[#075e54] p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">{previewingBot.name}</h4>
                  <p className="text-[10px] text-emerald-200">Online • WhatsApp Bot Preview</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewingBot(null)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Chat Thread */}
            <div className="flex-1 bg-[#efeae2] p-4 overflow-y-auto space-y-2.5 text-xs">
              {simulatedChat.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                        : 'bg-white text-slate-900 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                    <div className="text-[9px] text-slate-400 text-right mt-1">
                      Just now ✓✓
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendSimulatorMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type response to test bot..."
                className="flex-1 px-3.5 py-2 text-xs bg-slate-100 rounded-full border border-slate-200 focus:outline-none focus:border-brand-primary"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-[#00c25a] hover:bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">Ready to deploy?</span>
              <button
                onClick={() => {
                  handleUseBot(previewingBot)
                  setPreviewingBot(null)
                }}
                className="px-3.5 py-1.5 rounded-xl bg-brand-primary text-slate-950 font-bold text-xs hover:bg-emerald-400 transition"
              >
                Use this Bot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fallback Message Modal */}
      {isFallbackModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Default Fallback Message</h3>
            <p className="text-xs text-slate-500 mb-4">
              Triggered automatically when a user message doesn't match any keyword rules.
            </p>

            <textarea
              rows={4}
              value={fallbackMessage}
              onChange={(e) => setFallbackMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
            />

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsFallbackModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsFallbackModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-brand-primary text-slate-950 font-bold text-xs"
              >
                Save Fallback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Timer Modal */}
      {isTimerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Chatbot Session Timer</h3>
            <p className="text-xs text-slate-500 mb-4">
              Set conversation idle timeout before the chatbot resets or escalates to team.
            </p>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="120"
                value={timeoutMinutes}
                onChange={(e) => setTimeoutMinutes(e.target.value)}
                className="w-24 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
              />
              <span className="text-xs font-bold text-slate-700">minutes of inactivity</span>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsTimerModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsTimerModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-brand-primary text-slate-950 font-bold text-xs"
              >
                Save Timeout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
