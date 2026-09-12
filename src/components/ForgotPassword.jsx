import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { Mail, ArrowLeft, KeyRound, X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ForgotPassword({ onBack, onOpenSignIn, onOpenSignUp, showToast }) {
  const [email, setEmail] = useState('');
  const [clientId, setClientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      if (showToast) showToast('Please enter your registered email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
      } catch (_) {}

      if (showToast) {
        showToast(`Password reset link dispatched to ${email}!`);
      }
    }, 800);
  };

  const handleResend = () => {
    if (showToast) showToast(`Reset instructions re-sent to ${email}.`);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col justify-between font-sf select-none">
      
      {/* Top Header Row with Logo & Navigation */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 group focus:outline-none"
          title="Return to Aoneix Home"
        >
          <AoneixLogo className="h-8 sm:h-9 transition-transform group-hover:scale-105" />
        </button>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenSignIn}
            className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors"
          >
            Remember password? <span className="text-emerald-700 font-bold underline">Login</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-950 bg-white hover:bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full shadow-2xs transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to website</span>
          </button>
        </div>
      </header>

      {/* Main Center Area: Centered Forgot Password Card */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-14 flex-1 flex items-center justify-center">
        
        {/* Centered Forgot Password Card matching Theme & Screenshot */}
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-2xl border border-black shadow-2xl overflow-hidden relative">
            
            {/* Dark Green Gradient Header matching theme */}
            <div className="bg-gradient-to-r from-[#075e37] to-[#0a5c36] px-6 py-6 sm:px-7 sm:py-7 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                  <KeyRound className="w-5 h-5 text-[#86efac]" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg leading-tight text-white">Forgot Password?</h3>
                  <p className="text-xs text-emerald-200 mt-0.5">Aoneix Account Recovery</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={onOpenSignIn} 
                className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Back to login"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-7">
              
              {!isSubmitted ? (
                <>
                  {/* Form Description matching SS */}
                  <div className="mb-5">
                    <h2 className="text-lg font-bold text-gray-950 mb-1">
                      Reset your password
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Enter your email address to get instructions for resetting your password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* 1. Email Field with mail icon */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input 
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white placeholder-gray-400 text-gray-900 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* 2. Client ID Field with fixed prefix */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1.5">
                        Client ID <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <div className="flex rounded-xl border border-gray-200 overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600 transition-all">
                        <span className="inline-flex items-center px-3.5 bg-gray-50 border-r border-gray-200 text-xs sm:text-sm text-gray-500 select-none">
                          live.aoneix.io/
                        </span>
                        <input 
                          type="text"
                          value={clientId}
                          onChange={(e) => setClientId(e.target.value)}
                          placeholder="Enter your Client ID e.g. 123456"
                          className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-white placeholder-gray-400 text-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 3. Send Password Reset Email Button (Green #00c25a) */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#00c25a] hover:bg-[#00b050] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-sm transition-all text-center flex items-center justify-center gap-2 mt-2"
                    >
                      {isLoading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending instructions...</span>
                        </span>
                      ) : (
                        <span>Send Password Reset Email</span>
                      )}
                    </button>

                    {/* 4. Back to Login Button (Outlined matching SS) */}
                    <button
                      type="button"
                      onClick={onOpenSignIn}
                      className="w-full py-2 px-4 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50/80 active:scale-[0.99] font-bold text-sm sm:text-base transition-all text-center flex items-center justify-center cursor-pointer"
                    >
                      Back to Login
                    </button>
                  </form>
                </>
              ) : (
                /* Success Confirmation View */
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#00c25a] flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-950 mb-1">
                      Check your email
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                      We've sent a password reset link and verification instructions to <span className="font-semibold text-gray-900">{email}</span>.
                    </p>
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <button
                      type="button"
                      onClick={onOpenSignIn}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#00c25a] hover:bg-[#00b050] text-white font-bold text-sm transition-all shadow-sm"
                    >
                      Return to Login
                    </button>

                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-xs text-emerald-700 hover:underline font-semibold"
                    >
                      Didn't receive email? Resend link
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Copyright Note */}
              <div className="text-center mt-5 text-[11px] text-gray-400 font-normal">
                Aoneix 2026. All rights reserved.
              </div>

            </div>

          </div>
        </div>

      </main>

      {/* Outer Bottom Spacer */}
      <div className="h-4" />

    </div>
  );
}
