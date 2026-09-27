import React, { useState, useEffect } from 'react'
import {
  MessageSquare,
  Smartphone,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Save,
  Check
} from 'lucide-react'
import { WhatsAppIcon } from '../ChannelIcons.jsx'
import { campaignsApi } from '../../api/index.js'

export default function SmsFallbackView() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [accountSid, setAccountSid] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [twilioPhone, setTwilioPhone] = useState('')
  const [isConfigured, setIsConfigured] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    campaignsApi.getTwilioConfig().then((res) => {
      if (res.success && res.data.isConnected) {
        setIsConfigured(true)
        setAccountSid(res.data.accountSid || '')
        setTwilioPhone(res.data.twilioPhone || '')
      }
    })
  }, [])

  const handleSaveConfig = async (e) => {
    e.preventDefault()
    if (!accountSid || !authToken || !twilioPhone) return
    await campaignsApi.saveTwilioConfig({ accountSid, authToken, twilioPhone })
    setIsConfigured(true)
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
      setIsModalOpen(false)
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-[#f8fafc] font-sans overflow-y-auto">
      {/* Feature Card matching Screenshot 5 */}
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Mockup Illustration */}
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex flex-col items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
          {/* Top Channel Icons */}
          <div className="flex items-center gap-12 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          {/* Dual Phone Mockup Illustration */}
          <div className="flex items-center gap-4 max-w-sm">
            {/* Phone 1: WhatsApp */}
            <div className="w-36 bg-slate-900 rounded-2xl p-1.5 shadow-xl border-2 border-slate-800">
              <div className="bg-[#efeae2] rounded-xl p-2 text-[9px] space-y-1.5">
                <div className="bg-[#075e54] text-white p-1 rounded-t text-center font-bold text-[8px]">
                  Pure Earth 🟢
                </div>
                <div className="bg-white p-1.5 rounded-lg shadow-xs leading-tight">
                  <span className="font-bold text-[8px] block">📢 Announcement!</span>
                  Special 15% discount for you! Use code EARTH15.
                  <span className="text-[7px] text-red-500 block mt-1">Undeliverable ⚠️</span>
                </div>
              </div>
            </div>

            {/* Phone 2: SMS Fallback */}
            <div className="w-36 bg-slate-900 rounded-2xl p-1.5 shadow-xl border-2 border-slate-800">
              <div className="bg-white rounded-xl p-2 text-[9px] space-y-1.5">
                <div className="bg-blue-600 text-white p-1 rounded-t text-center font-bold text-[8px]">
                  AD-PURE-EARTH
                </div>
                <div className="bg-blue-50 text-slate-800 p-1.5 rounded-lg shadow-xs leading-tight">
                  <span className="font-bold text-[8px] block">SMS Fallback:</span>
                  Hi, your Pure Earth voucher is active. Visit wa.me/aionex
                  <span className="text-[7px] text-blue-600 block mt-1">Delivered via SMS ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copy & CTA matching Screenshot 5 */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            Connect with customers via SMS
          </h2>

          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Enable SMS fallback for WhatsApp Campaigns and send SMS Campaigns to your contacts when data is turned off or messages cannot be delivered.
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00c25a] hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{isConfigured ? 'Manage Twilio Configuration' : 'Set up your Twilio account'}</span>
            </button>

            <div>
              <a
                href="https://www.twilio.com/docs/sms"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 hover:underline inline-block mt-2"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Twilio Setup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn p-6 font-sans">
            <h3 className="text-base font-bold text-slate-900 mb-1">Twilio Account Setup</h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter your official Twilio credentials to activate instant SMS fallback.
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Account SID
                </label>
                <input
                  type="text"
                  required
                  value={accountSid}
                  onChange={(e) => setAccountSid(e.target.value)}
                  placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-brand-primary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Auth Token
                </label>
                <input
                  type="password"
                  required
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  placeholder="••••••••••••••••••••••••••••••••"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-brand-primary outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Twilio Phone Number / Sender ID
                </label>
                <input
                  type="text"
                  required
                  value={twilioPhone}
                  onChange={(e) => setTwilioPhone(e.target.value)}
                  placeholder="+1 555 123 4567 or AIONEX"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-primary outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00c25a] hover:bg-emerald-500 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Connected!</span>
                    </>
                  ) : (
                    <span>Save & Activate</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
