import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { Eye, EyeOff, ArrowLeft, Check, X, Sparkles, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SignUp({ onBack, onOpenSignIn, onOpenOnboarding, showToast, triggerLoader }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [countryName, setCountryName] = useState('IN');
  const [phone, setPhone] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !businessEmail.trim() || !password.trim() || !phone.trim()) {
      if (showToast) showToast('Please fill in all required fields.');
      return;
    }

    if (triggerLoader) {
      setIsLoading(true);
      triggerLoader('signup-success', () => {
        setIsLoading(false);
        try {
          confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
        } catch (_) {}

        if (showToast) {
          showToast(`🎉 Free trial account created for ${firstName}! Personalising your setup...`);
        }
        if (onOpenOnboarding) onOpenOnboarding();
        else if (onOpenSignIn) onOpenSignIn();
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
      } catch (_) {}

      if (showToast) {
        showToast(`🎉 Free trial account created for ${firstName}! Personalising your setup...`);
      }
      setTimeout(() => {
        if (onOpenOnboarding) onOpenOnboarding();
        else if (onOpenSignIn) onOpenSignIn();
      }, 1000);
    }, 800);
  };

  const handleGoogleSignUp = () => {
    if (triggerLoader) {
      triggerLoader('signup-success', () => {
        try { confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } }); } catch (_) {}
        if (showToast) showToast('Google account linked! Setting up onboarding...');
        if (onOpenOnboarding) onOpenOnboarding();
        else if (onOpenSignIn) onOpenSignIn();
      });
      return;
    }
    if (showToast) showToast('Opening Google OAuth sign-up gateway...');
    setTimeout(() => {
      try { confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } }); } catch (_) {}
      if (showToast) showToast('Google account linked! Setting up onboarding...');
      setTimeout(() => { 
        if (onOpenOnboarding) onOpenOnboarding();
        else if (onOpenSignIn) onOpenSignIn(); 
      }, 900);
    }, 700);
  };

  const handleFacebookSignUp = () => {
    if (triggerLoader) {
      triggerLoader('signup-success', () => {
        try { confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } }); } catch (_) {}
        if (showToast) showToast('Facebook Meta account linked! Setting up onboarding...');
        if (onOpenOnboarding) onOpenOnboarding();
        else if (onOpenSignIn) onOpenSignIn();
      });
      return;
    }
    if (showToast) showToast('Connecting with Facebook Meta API OAuth gateway...');
    setTimeout(() => {
      try { confetti({ particleCount: 35, spread: 55, origin: { y: 0.6 } }); } catch (_) {}
      if (showToast) showToast('Facebook Meta account linked! Setting up onboarding...');
      setTimeout(() => { 
        if (onOpenOnboarding) onOpenOnboarding();
        else if (onOpenSignIn) onOpenSignIn(); 
      }, 900);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white relative flex flex-col justify-between font-sf select-none">
      
      {/* Top Header Row matching ClientOnboarding header design with absolute center logo and symmetric padding */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shrink-0">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8 h-12 sm:h-16 flex items-center justify-between relative">
          
          {/* Left: Back button */}
          <div className="flex items-center z-10">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors py-1 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back</span>
            </button>
          </div>

          {/* Center: Absolute 50% Dead Center Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <button 
              type="button" 
              onClick={onBack} 
              className="focus:outline-none transition-transform hover:scale-105 cursor-pointer"
              title="Return to Home"
            >
              <AoneixLogo className="h-6 sm:h-8" />
            </button>
          </div>

          {/* Right: Sleek Pill Login Link */}
          <div className="flex items-center justify-end gap-2 z-10">
            <span className="hidden sm:inline text-xs text-gray-500 font-medium">Already have an account?</span>
            <button
              type="button"
              onClick={onOpenSignIn}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>

        {/* Thin Brand Accent Line */}
        <div className="w-full h-1 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-[#00c25a] to-[#075e37] w-full" />
        </div>
      </header>

      {/* Main Center Area: Left Benefits + Right Sign Up Card */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8 py-2 sm:py-6 flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 lg:gap-10">
        
        {/* Left Side: Enterprise Benefits & Social Proof (Hidden on mobile, visible on tablet md: & laptop lg:) */}
        <div className="hidden md:flex flex-1 w-full flex-col justify-center max-w-[500px] lg:pl-2">
          
          {/* Main Tagline */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-gray-950 tracking-tight leading-[1.2] mb-4">
            Business conversation made simple, <br />
            <span className="text-[#00c25a]">powered by AI</span>
          </h1>

          {/* 4 Core Value Propositions with Green Checkmarks */}
          <div className="space-y-2.5 mb-4">
            <div className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-[#00c25a] flex items-center justify-center text-white shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-[13px] text-gray-700 font-medium leading-snug">
                Run high converting campaigns on: WhatsApp, RCS, SMS, Calls and more
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-[#00c25a] flex items-center justify-center text-white shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-[13px] text-gray-700 font-medium leading-snug">
                Become 10x more productive with Aoneix AI: Copilot, Agents, and Chatbots
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-[#00c25a] flex items-center justify-center text-white shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-[13px] text-gray-700 font-medium leading-snug">
                Collaborate, convert and retain better with AI-enabled multichannel Team inbox
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-[#00c25a] flex items-center justify-center text-white shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-[13px] text-gray-700 font-medium leading-snug">
                Breathe easy with enterprise-grade reliability, better delivery rates, and secure infrastructure
              </p>
            </div>
          </div>

          {/* Customer Quote Box */}
          <div className="p-3 bg-[#ecfdf5]/80 border border-emerald-200/80 rounded-xl mb-4 backdrop-blur-xs">
            <p className="text-xs text-gray-800 font-medium italic leading-relaxed mb-1.5">
              "Our entire subscription model now works on WhatsApp powered by Aoneix. We get 5X more reach and 2X higher order confirmation rates."
            </p>
            <p className="text-[11px] font-bold text-emerald-900 tracking-wide">
              Heritage Foods
            </p>
          </div>

          {/* Social Proof Stats & Logos */}
          <div>
            <p className="text-xs text-gray-500 font-medium mb-2">
              Loved by 16,000+ customers, across 190+ countries
            </p>
            
            {/* Logos Row: Clean Modern Logo Placeholders */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                {
                  id: 1,
                  label: 'Logo 1',
                  icon: (
                    <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  )
                },
                {
                  id: 2,
                  label: 'Logo 2',
                  icon: (
                    <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3a9 9 0 0 0 0 18v-9z" />
                    </svg>
                  )
                },
                {
                  id: 3,
                  label: 'Logo 3',
                  icon: (
                    <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  )
                },
                {
                  id: 4,
                  label: 'Logo 4',
                  icon: (
                    <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                    </svg>
                  )
                },
                {
                  id: 5,
                  label: 'Logo 5',
                  icon: (
                    <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    </svg>
                  )
                }
              ].map((item) => (
                <div 
                  key={item.id}
                  title="This logo will be shown after the development phase"
                  className="relative h-7 px-2.5 rounded-lg bg-gray-50/90 hover:bg-gray-100 hover:border-gray-300 border border-gray-200/90 flex items-center gap-1.5 text-[11px] font-medium text-gray-600 transition-all select-none shadow-2xs group cursor-pointer"
                >
                  <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                  <span className="text-gray-500 font-medium text-[10.5px] tracking-wide">{item.label}</span>

                  {/* Sleek Hover Tooltip Developer Notice */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-30 flex items-center px-2 py-0.5 bg-gray-900 text-white text-[10px] font-medium rounded shadow-lg whitespace-nowrap">
                    <span>This logo will be shown after the development phase</span>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Sign Up Card matching Theme & Screenshot */}
        <div className="w-full max-w-[390px] sm:max-w-[420px] shrink-0">
          <div className="bg-white rounded-2xl border border-black shadow-2xl overflow-hidden relative p-4 sm:p-5">

            {/* Top Card Title matching Screenshot aesthetic */}
            <div className="mb-2 sm:mb-2.5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight leading-tight">
                Start your free trial
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Sign up in 30 seconds. No credit card required.
              </p>
            </div>
              
            {/* Social Sign Up Buttons (Google & Facebook Meta) */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {/* 1. Google Sign Up */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="py-1.5 px-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-800 shadow-2xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="truncate">Google</span>
              </button>

              {/* 2. Facebook Sign Up */}
              <button
                type="button"
                onClick={handleFacebookSignUp}
                className="py-1.5 px-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-800 shadow-2xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="truncate">Facebook</span>
              </button>
            </div>

            {/* Divider: or sign up with email */}
            <div className="relative my-1.5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="bg-white px-2 text-gray-400 font-medium">
                  or sign up with email
                </span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-1.5">
              
              {/* First Name & Last Name (Side by Side) */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                    * First Name
                  </label>
                  <input 
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John"
                    required
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-gray-900 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                    * Last Name
                  </label>
                  <input 
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    required
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-gray-900 shadow-2xs"
                  />
                </div>
              </div>

              {/* Business Email Address */}
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                  * Business Email Address
                </label>
                <input 
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-gray-900 shadow-2xs"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                  * Password
                </label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    required
                    className="w-full px-2.5 py-1.5 pr-8 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-gray-900 shadow-2xs font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                  >
                    {showPassword ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Phone Number with Country Code */}
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-0.5 flex items-center gap-1">
                  <span>* Phone number</span>
                  <span className="text-[9px] text-gray-400">ⓘ</span>
                </label>
                <div className="flex rounded-lg border border-gray-200 overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600">
                  <div className="flex items-center px-2 py-1.5 bg-gray-50 border-r border-gray-200 text-[11px] font-semibold text-gray-700 select-none gap-1 shrink-0">
                    <span>🇮🇳</span>
                    <span>{countryName}</span>
                    <span className="text-gray-400 text-[10px]">({countryCode})</span>
                  </div>
                  <input 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    required
                    className="flex-1 px-2.5 py-1.5 text-xs bg-white text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* How did you hear about Aoneix? */}
              <div>
                <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                  * How did you hear about Aoneix?
                </label>
                <div className="relative">
                  <select
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    required
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-gray-900 appearance-none shadow-2xs cursor-pointer"
                  >
                    <option value="" disabled>Select</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Social Media (Instagram/LinkedIn)">Social Media (Instagram / LinkedIn)</option>
                    <option value="Friend or Colleague Referral">Friend or Colleague Referral</option>
                    <option value="YouTube / Tech Review">YouTube / Tech Review</option>
                    <option value="Meta Partner Directory">Meta Partner Directory</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Terms and Privacy Policy disclaimer note */}
              <div className="p-2 bg-gray-50 border border-gray-100 rounded-lg text-[9px] text-gray-500 leading-tight">
                By signing up, you agree to the <span className="underline font-medium text-gray-700">Terms & Conditions</span> and <span className="underline font-medium text-gray-700">Privacy Policy</span>, and consent to receive marketing communications.
              </div>

              {/* Start My Trial Button (Green #00c25a) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 sm:py-2.5 px-3 rounded-lg bg-[#00c25a] hover:bg-[#00b050] active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-sm transition-all text-center flex items-center justify-center gap-2 mt-1 cursor-pointer"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating Trial Account...</span>
                  </span>
                ) : (
                  <span>Start My Trial</span>
                )}
              </button>
            </form>

            {/* Already have an account? Login */}
            <div className="text-center text-xs text-gray-600 pt-1.5">
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={onOpenSignIn}
                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline cursor-pointer"
              >
                Login
              </button>
            </div>

            {/* Bottom Copyright Note */}
            <div className="text-center mt-1.5 text-[10px] text-gray-400 font-normal">
              Aoneix 2026. All rights reserved.
            </div>

          </div>
        </div>

      </main>

      {/* Outer Bottom Footer matching ClientOnboarding */}
      <footer className="py-3 sm:py-4 border-t border-gray-100 text-center text-[11px] text-gray-400">
        Aoneix Cloud Workspace • Protected by 256-bit SSL encryption
      </footer>

    </div>
  );
}
