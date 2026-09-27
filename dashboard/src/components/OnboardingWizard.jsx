import React, { useState } from 'react'
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react'
import { onboardingApi } from '../api/index.js'
import logoImg from '../assets/aioneix.png'
import WhatsAppOrbitAnimation from './WhatsAppOrbitAnimation.jsx'
import { WhatsAppIcon } from './ChannelIcons.jsx'

export default function OnboardingWizard({ onComplete, onSkip }) {
  const [step, setStep] = useState(1) // 1: Business profile, 2: Channels
  const [userName, setUserName] = useState('Shivam')
  const [selectedIndustry, setSelectedIndustry] = useState('eCommerce/ Retail')
  const [website, setWebsite] = useState('www.aionex.ai')
  const [role, setRole] = useState('Business owner / Founder')
  const [companySize, setCompanySize] = useState('11 - 50')

  // Step 2 Channel selection
  const [primaryChannel, setPrimaryChannel] = useState('whatsapp')
  const [hasMetaAccount, setHasMetaAccount] = useState('yes')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const industries = [
    'eCommerce/ Retail',
    'Healthcare',
    'Education/ Training',
    'Digital Agency',
    'BFSI/ Fintech',
    'Food/ Restaurant',
    'Travel/ Hospitality',
    'Tech/ Electronics',
    'Logistics/ Supply chain',
    'Non-profit/ Social impact',
    'Creative, entertainment & Fashion',
    'Spiritual/ regional community',
    'Others',
  ]

  const roleOptions = [
    'Business owner / Founder',
    'Team lead / Manager',
    'Team member / Individual contributor',
    'IT / Technical implementer',
    'Other',
  ]

  const companySizes = ['1 - 10', '11 - 50', '51 - 200', '201 - 500', 'More than 500']

  const handleStep1Submit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onboardingApi.saveBusinessProfile({
        userName,
        industry: selectedIndustry,
        website,
        role,
        companySize,
      })
      setStep(2)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStep2Submit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onboardingApi.saveChannelPreferences({
        primaryChannel,
        hasMetaAccount: hasMetaAccount === 'yes',
      })
      onComplete?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white relative flex flex-col justify-between font-sans select-none text-slate-900">
      {/* Top Header Row matching AONEIX SignIn Header Design */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shrink-0">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-12 sm:h-14 flex items-center justify-between relative">
          {/* Left: Back button */}
          <div className="flex items-center z-10">
            <button
              type="button"
              onClick={step === 2 ? () => setStep(1) : onSkip}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors py-1 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>{step === 2 ? 'Back to Step 1' : 'Back'}</span>
            </button>
          </div>

          {/* Center: Absolute 50% Dead Center Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <img
              src={logoImg}
              alt="AONEIX"
              className="h-6 sm:h-7 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
          </div>

          {/* Right: Sleek Pill Indicator & Skip Action */}
          <div className="flex items-center justify-end gap-2.5 z-10">
            <span className="hidden sm:inline text-xs text-gray-500 font-medium">
              Step {step} of 2
            </span>
            <button
              type="button"
              onClick={onSkip}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
            >
              Skip to Dashboard
            </button>
          </div>
        </div>

        {/* Thin Brand Gradient Line */}
        <div className="w-full h-1 bg-gradient-to-r from-[#00c25a] to-[#075e37]" />
      </header>

      {/* Main Center Area: Side-by-Side Left Illustration & Right Card (Screenshot 2 Theme) */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-10">
        {/* Left Side: Modern Rotational WhatsApp Orbit Animation (Image 2) */}
        <div className="hidden md:flex flex-1 w-full items-center justify-center lg:justify-start lg:pl-2">
          <WhatsAppOrbitAnimation />
        </div>

        {/* Right Side: Form Card matching Screenshot 2 Dark Green Header Aesthetic */}
        <div className="w-full max-w-[460px] shrink-0">
          <div className="bg-white rounded-2xl border border-black shadow-2xl overflow-hidden relative">
            {/* Dark Green Gradient Header (Screenshot 2) */}
            <div className="bg-gradient-to-r from-[#075e37] to-[#0a5c36] px-5 py-3.5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#86efac]" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] leading-tight text-white">
                    {step === 1 ? 'Personalise your workspace' : 'Connect WhatsApp Channel'}
                  </h3>
                  <p className="text-[11px] text-emerald-200 mt-0.5">
                    {step === 1 ? 'Aoneix Cloud Workspace • Step 1 of 2' : 'Official Meta Cloud API • Step 2 of 2'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onSkip}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Skip to Dashboard"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-5 sm:p-6">
              {step === 1 ? (
                /* STEP 1: Business Profile Form */
                <form onSubmit={handleStep1Submit} className="space-y-4 animate-fadeIn">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">
                      Hello, <span className="text-emerald-700 font-bold">{userName}</span> 👋
                    </p>
                    <h2 className="text-xl font-extrabold text-slate-950 tracking-tight mt-0.5">
                      Welcome to <span className="text-[#00c25a]">AONEIX!</span>
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Help us personalise AONEIX for your business.
                    </p>
                  </div>

                  {/* Industry Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      Confirm your industry
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {industries.map((ind) => {
                        const isSelected = selectedIndustry === ind
                        return (
                          <button
                            type="button"
                            key={ind}
                            onClick={() => setSelectedIndustry(ind)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#00c25a] text-slate-950 font-bold shadow-xs'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {ind}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Website Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Confirm your website
                    </label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="www.yourcompany.com"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white placeholder-gray-400 text-gray-900 transition"
                    />
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      We'll use this to pre-fill your brand details.
                    </p>
                  </div>

                  {/* Role Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      What best describes you?
                    </label>
                    <div className="relative">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-gray-900 appearance-none transition"
                      >
                        {roleOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      How big is your company?
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {companySizes.map((size) => {
                        const isSelected = companySize === size
                        return (
                          <button
                            type="button"
                            key={size}
                            onClick={() => setCompanySize(size)}
                            className={`px-3 py-1 rounded-full text-[11px] font-semibold transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#00c25a] text-slate-950 font-bold shadow-xs'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {size}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !selectedIndustry}
                      className="w-full py-2.5 bg-[#00c25a] hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? 'Saving Profile...' : 'Continue to WhatsApp Setup →'}
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2: Channel Preference Form */
                <form onSubmit={handleStep2Submit} className="space-y-5 animate-fadeIn">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-950 tracking-tight">
                      Connect with <span className="text-[#00c25a]">your customers</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Official Meta Cloud API Verified Connection
                    </p>
                  </div>

                  {/* Single Channel: WhatsApp & Meta */}
                  <div className="p-4 rounded-xl border-2 border-[#00c25a] bg-emerald-50/50 shadow-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300 shrink-0">
                        <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900">WhatsApp & Meta</h4>
                          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-full border border-emerald-300">
                            Official Channel
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          Meta Cloud API for team inbox, broadcasts, and automated workflows.
                        </p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-[#00c25a] text-slate-950 flex items-center justify-center shrink-0 font-bold">
                      <CheckCircle className="w-3.5 h-3.5 text-slate-950" />
                    </div>
                  </div>

                  {/* Facebook Account Radio */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-800 mb-2">
                      Do you have a Facebook or Meta Business Manager account?
                    </p>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="metaAccount"
                          value="yes"
                          checked={hasMetaAccount === 'yes'}
                          onChange={(e) => setHasMetaAccount(e.target.value)}
                          className="text-[#00c25a] focus:ring-emerald-500"
                        />
                        Yes, I have an account
                      </label>
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="metaAccount"
                          value="no"
                          checked={hasMetaAccount === 'no'}
                          onChange={(e) => setHasMetaAccount(e.target.value)}
                          className="text-[#00c25a] focus:ring-emerald-500"
                        />
                        No, set one up for me
                      </label>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 bg-[#00c25a] hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                    >
                      {isSubmitting ? 'Opening Dashboard...' : 'Launch AONEIX Dashboard →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer matching AONEIX SignIn Theme */}
      <footer className="py-4 text-center text-[11px] text-slate-400 select-none shrink-0 border-t border-slate-100">
        Aoneix Cloud Workspace • Protected by 256-bit SSL encryption
      </footer>
    </div>
  )
}
