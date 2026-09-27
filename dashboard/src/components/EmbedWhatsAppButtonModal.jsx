import React, { useState } from 'react'
import { X, Copy, Check, MessageCircle, Code2, Sparkles } from 'lucide-react'

export default function EmbedWhatsAppButtonModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('+919876543210')
  const [welcomeText, setWelcomeText] = useState('Hi AIONEX! I need assistance with your services.')

  if (!isOpen) return null

  const embedCode = `<!-- AIONEX WhatsApp Floating Chat Widget -->
<script 
  src="https://cdn.aionex.ai/widget/whatsapp-button.js" 
  data-phone="${phoneNumber.replace(/\D/g, '')}" 
  data-message="${encodeURIComponent(welcomeText)}" 
  data-color="#00c25a"
  defer>
</script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden font-sans">
        <div className="bg-gradient-to-r from-[#062419] to-[#0a3824] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Website Integration Widget
          </div>
          <h2 className="text-xl font-bold">Add WhatsApp Button to Your Website</h2>
          <p className="text-slate-300 text-xs mt-1">
            Embed this floating WhatsApp widget on your landing page to convert website visitors into WhatsApp conversations instantly.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              WhatsApp Business Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Pre-filled Message
            </label>
            <input
              type="text"
              value={welcomeText}
              onChange={(e) => setWelcomeText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-primary focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                Copy Embed Code (Paste before &lt;/body&gt;)
              </label>
              <button
                onClick={handleCopy}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-brand-primary" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto border border-slate-800">
              {embedCode}
            </pre>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
