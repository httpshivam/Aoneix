import React, { useState } from 'react'
import { X, CheckCircle, ShieldCheck, QrCode, Smartphone, Sparkles, AlertCircle } from 'lucide-react'
import { whatsappApi } from '../api/index.js'

export default function ConnectWhatsAppModal({ isOpen, onClose, onConnected }) {
  const [method, setMethod] = useState('meta') // 'meta' or 'qr'
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 43210')
  const [businessName, setBusinessName] = useState('AIONEX Solutions')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleConnect = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await whatsappApi.connectNumber({
        phoneNumber,
        verifiedName: businessName,
      })
      if (res.success) {
        setSuccess(true)
        setTimeout(() => {
          onConnected?.(res.data)
          onClose()
          setSuccess(false)
        }, 1200)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200/80 shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#062419] to-[#0a3824] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-semibold mb-2 border border-brand-primary/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Meta Official Business Solution Provider
          </div>
          <h2 className="text-xl font-bold">Connect WhatsApp Number</h2>
          <p className="text-slate-300 text-xs mt-1">
            Link your official WhatsApp Business phone number to unlock automated workflows, bulk broadcasts, and multi-agent team inbox.
          </p>
        </div>

        {/* Tabs for Connection Method */}
        <div className="p-6">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
            <button
              onClick={() => setMethod('meta')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                method === 'meta'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Meta Embedded Signup (Recommended)
            </button>
            <button
              onClick={() => setMethod('qr')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                method === 'qr'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Scan QR Code
            </button>
          </div>

          {success ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">WhatsApp Connected!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Your WhatsApp number {phoneNumber} has been approved with Official Green Tick Tier.
              </p>
            </div>
          ) : method === 'meta' ? (
            <form onSubmit={handleConnect} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Business Phone Number
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-primary focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Must be capable of receiving a 6-digit SMS verification code.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Meta Verified Display Name
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. AIONEX Global"
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Automatic tier boost: New AIONEX accounts receive free 1,000 tier-1 Meta service conversations each month.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
                >
                  {loading ? 'Verifying with Meta...' : 'Connect WhatsApp Now'}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="inline-block p-4 bg-white border-2 border-dashed border-emerald-500/40 rounded-2xl shadow-sm">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=AIONEX_OFFICIAL_WHATSAPP_LINK"
                  alt="WhatsApp QR Code"
                  className="w-44 h-44 mx-auto rounded-lg"
                />
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Open WhatsApp on your phone &gt; Linked Devices &gt; Link a Device to scan.
              </p>
              <button
                type="button"
                onClick={handleConnect}
                disabled={loading}
                className="w-full py-2.5 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
              >
                {loading ? 'Confirming Sync...' : 'Simulate QR Code Scanned'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
