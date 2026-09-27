import React, { useState, useEffect } from 'react'
import {
  PlayCircle,
  Plus,
  Search,
  ExternalLink,
  ChevronDown,
  X,
  Sparkles,
  Edit2,
  Calendar,
  Layers,
  Send,
  CheckCircle2
} from 'lucide-react'
import { campaignsApi } from '../../api/index.js'

export default function TemplateLibraryView({ onUseTemplate, onOpenNewTemplateModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [searchQuery, setSearchQuery] = useState('')
  const [templates, setTemplates] = useState([])
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)

  const categories = [
    { id: 'All', label: 'All', count: 93 },
    { id: 'Travel', label: 'Travel', count: 6 },
    { id: 'Healthcare', label: 'Healthcare', count: 4 },
    { id: 'E-Commerce', label: 'E-Commerce', count: 16 },
    { id: 'Education', label: 'Education', count: 12 },
  ]

  const moreCategories = [
    { id: 'Festival', label: 'Festival', count: 14 },
    { id: 'Others', label: 'Others', count: 41 },
  ]

  useEffect(() => {
    campaignsApi.getLibraryTemplates(selectedCategory).then((res) => {
      if (res.success) setTemplates(res.data)
    })
  }, [selectedCategory])

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getCategoryBadgeColor = (cat) => {
    switch (cat.toLowerCase()) {
      case 'travel':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200'
      case 'healthcare':
        return 'bg-teal-50 text-teal-800 border-teal-200'
      case 'e-commerce':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200'
      case 'festival':
        return 'bg-amber-50 text-amber-800 border-amber-200'
      case 'education':
        return 'bg-blue-50 text-blue-800 border-blue-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="h-full flex flex-col bg-white font-sans overflow-hidden relative">
      {/* Top Header matching Screenshot 1 */}
      <div className="p-6 border-b border-slate-200/80 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Template Library</h1>
            <p className="text-xs text-slate-500 mt-1">
              Select or create your template and submit it for WhatsApp approval. All templates must adhere to{' '}
              <a
                href="https://business.whatsapp.com/policy"
                target="_blank"
                rel="noreferrer"
                className="text-[#00c25a] font-semibold underline hover:text-emerald-700"
              >
                WhatsApp's guidelines
              </a>
              .
            </p>
          </div>

          {/* Right Action Controls matching Screenshot 1 */}
          <div className="flex items-center gap-3">
            <a
              href="https://youtu.be/RvgbwSsUhCw?si=Br-NxcZOQMfWRXd2"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
            >
              <PlayCircle className="w-4 h-4 fill-blue-600 text-white" />
              <span>Watch Tutorial</span>
            </a>

            <button
              onClick={onOpenNewTemplateModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00c25a] hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Template Message</span>
            </button>
          </div>
        </div>

        {/* Category Tabs & Filter Controls matching Screenshots 1, 2, 3 */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-6 relative z-30">
          {/* Category Tabs without overflow clipping */}
          <div className="flex items-center gap-6 border-b border-slate-200 lg:border-none pb-2 lg:pb-0 relative">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id)
                  setIsMoreDropdownOpen(false)
                }}
                className={`text-xs font-bold pb-2 transition relative cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'text-[#00c25a]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 text-[11px] text-slate-400 font-semibold">{cat.count}</span>
                {selectedCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c25a]" />
                )}
              </button>
            ))}

            {/* More... Dropdown matching Screenshot 3 */}
            <div className="relative">
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className={`text-xs font-bold pb-2 flex items-center gap-1 transition cursor-pointer ${
                  moreCategories.some((c) => c.id === selectedCategory)
                    ? 'text-[#00c25a]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>
                  {moreCategories.find((c) => c.id === selectedCategory)
                    ? `More (${moreCategories.find((c) => c.id === selectedCategory).label})`
                    : 'More...'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                    isMoreDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
                {moreCategories.some((c) => c.id === selectedCategory) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c25a]" />
                )}
              </button>

              {/* Dropdown Menu matching Screenshot 3 */}
              {isMoreDropdownOpen && (
                <>
                  {/* Backdrop to close on outside click */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMoreDropdownOpen(false)}
                  />

                  <div className="absolute left-0 top-full mt-1.5 w-40 bg-white border border-slate-200/90 rounded-xl shadow-xl py-1 z-50 font-sans animate-fadeIn">
                    {moreCategories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCategory(c.id)
                          setIsMoreDropdownOpen(false)
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition cursor-pointer ${
                          selectedCategory === c.id
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                        }`}
                      >
                        <span>{c.label}</span>
                        <span className="text-[11px] text-slate-400 font-semibold">{c.count}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Filters (Language & Search) */}
          <div className="flex items-center gap-3">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold outline-none"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>

            <div className="relative w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-3 pr-9 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Header with Title and Category Badge */}
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 truncate flex-1" title={tpl.title}>
                    {tpl.title}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getCategoryBadgeColor(
                      tpl.categoryTag
                    )}`}
                  >
                    {tpl.categoryTag}
                  </span>
                </div>

                {/* Body Text Content */}
                <div className="mt-3 text-xs text-slate-600 font-sans leading-relaxed line-clamp-6 whitespace-pre-line select-text">
                  {tpl.content}
                </div>
              </div>

              {/* Bottom "Use sample" Button matching Screenshot 1 */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onUseTemplate(tpl)}
                  className="w-full py-1.5 rounded-xl border border-blue-400 text-blue-700 hover:bg-blue-50 text-xs font-bold transition cursor-pointer"
                >
                  Use sample
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Welcome / Unlocked Modal matching Screenshot 1 */}
      {showWelcomeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn p-6 relative font-sans">
            {/* Close button */}
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title */}
            <div className="pr-6 mb-6">
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                Congratulations Sanes,
                <br />
                <span className="text-slate-950 font-black">You’ve unlocked Template Messages!</span>
              </h2>
            </div>

            {/* 3 Features List matching Screenshot 1 */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Pre-created templates</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Ready-to-use messages - designed for every stage of your customer journey
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Customise with Ease</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Modify to suit your customers’ needs & preferences
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Send now or schedule for later</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Flexible scheduling for festive or special occasions
                  </p>
                </div>
              </div>
            </div>

            {/* Explore Button */}
            <button
              onClick={() => setShowWelcomeModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#00c25a] hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              Explore Your Template Messages!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
