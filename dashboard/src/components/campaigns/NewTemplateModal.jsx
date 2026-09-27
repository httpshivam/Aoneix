import React, { useState } from 'react'
import { X, Send, Image as ImageIcon, CheckCircle, Sparkles } from 'lucide-react'
import { WhatsAppIcon } from '../ChannelIcons.jsx'
import { campaignsApi } from '../../api/index.js'

export default function NewTemplateModal({ isOpen, onClose, initialData, onCreated }) {
  const [templateName, setTemplateName] = useState(initialData?.title || initialData?.name || '')
  const [category, setCategory] = useState(initialData?.category || 'Marketing')
  const [language, setLanguage] = useState(initialData?.language || 'English')
  const [headerType, setHeaderType] = useState('None')
  const [bodyText, setBodyText] = useState(
    initialData?.content || initialData?.bodyText || 'Hi {{1}}, thank you for contacting AIONEX! How can we assist you today?'
  )
  const [footerText, setFooterText] = useState('Reply STOP to unsubscribe')
  const [buttonText, setButtonText] = useState('Visit Website')
  const [buttonUrl, setButtonUrl] = useState('https://aionex.io')
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!templateName || !bodyText) return
    setSubmitting(true)
    const res = await campaignsApi.createTemplate({
      name: templateName.toLowerCase().replace(/\s+/g, '_'),
      category,
      language,
      bodyText,
      headerType,
      footerText
    })
    setSubmitting(false)
    if (res.success) {
      onCreated?.(res.data)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh] animate-fadeIn font-sans">
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">New Template Message</h2>
              <p className="text-xs text-slate-500">Create & submit to Meta for instant approval</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 md:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Template Name
              </label>
              <input
                type="text"
                required
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g. order_update_v1"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-brand-primary outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 outline-none"
              >
                <option>Marketing</option>
                <option>Utility</option>
                <option>Authentication</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 outline-none"
              >
                <option>English</option>
                <option>English (US)</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>Hebrew</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Header Type
              </label>
              <select
                value={headerType}
                onChange={(e) => setHeaderType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 outline-none"
              >
                <option>None</option>
                <option>Text</option>
                <option>Image</option>
                <option>Document</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Body Text</label>
              <span className="text-[10px] text-slate-400">Use {'{{1}}'}, {'{{2}}'} for variables</span>
            </div>
            <textarea
              rows={4}
              required
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Footer (Optional)
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Button Label
              </label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-[#00c25a] hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit to Meta for Approval'}
            </button>
          </div>
        </form>

        {/* Right Phone Live Preview */}
        <div className="md:w-80 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-6 flex flex-col items-center justify-center shrink-0">
          <div className="w-full max-w-[260px] bg-slate-900 rounded-3xl p-2 shadow-2xl border-2 border-slate-800">
            {/* Phone header */}
            <div className="bg-[#075e54] text-white p-2.5 rounded-t-2xl flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-[10px]">
                A
              </div>
              <div>
                <p className="text-[10px] font-bold leading-tight">AIONEX</p>
                <p className="text-[8px] text-emerald-200">Official Business Account</p>
              </div>
            </div>

            {/* Chat wallpaper */}
            <div className="bg-[#efeae2] p-2.5 rounded-b-2xl min-h-[280px] flex flex-col justify-end">
              <div className="bg-white rounded-xl p-2.5 shadow-xs text-[10px] text-slate-800 space-y-1.5 leading-relaxed">
                {headerType === 'Image' && (
                  <div className="h-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
                <p className="whitespace-pre-line select-text font-sans">
                  {bodyText.replace('{{1}}', 'Sanes').replace('{{name}}', 'Sanes')}
                </p>
                {footerText && (
                  <p className="text-[8px] text-slate-400 pt-1 border-t border-slate-100">
                    {footerText}
                  </p>
                )}
                {buttonText && (
                  <div className="pt-1.5 border-t border-slate-100">
                    <div className="text-center text-[9px] font-bold text-blue-600 bg-slate-50 py-1 rounded">
                      ↗ {buttonText}
                    </div>
                  </div>
                )}
                <div className="text-[7px] text-slate-400 text-right">11:14 AM ✓✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
