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
    <div className="min-h-screen lg:h-screen bg-white relative overflow-hidden flex flex-col justify-between font-sf select-none">
      
      {/* Top Header Row matching ClientOnboarding header design with absolute center logo and symmetric padding */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shrink-0">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between relative">
          
          {/* Left: Back button */}
          <div className="flex items-center z-10">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors py-1 group"
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
              className="focus:outline-none transition-transform hover:scale-105"
              title="Return to Home"
            >
              <AoneixLogo className="h-7 sm:h-8" />
            </button>
          </div>

          {/* Right: Sleek Pill Login Link */}
          <div className="flex items-center justify-end gap-2 z-10">
            <span className="hidden sm:inline text-xs text-gray-500 font-medium">Remember password?</span>
            <button
              type="button"
              onClick={onOpenSignIn}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
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

      {/* Main Center Area: Centered Forgot Password Card */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-7 flex-1 flex items-center justify-center">
        
        {/* Centered Forgot Password Card matching Theme & Screenshot */}
        <div className="w-full max-w-[400px]">
          <div className="bg-white rounded-2xl border border-black shadow-2xl overflow-hidden relative">
            
            {/* Dark Green Gradient Header matching theme */}
            <div className="bg-gradient-to-r from-[#075e37] to-[#0a5c36] px-5 py-3 sm:px-6 sm:py-3.5 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                  <KeyRound className="w-4.5 h-4.5 text-[#86efac]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-[15px] leading-tight text-white">Forgot Password?</h3>
                  <p className="text-[11px] text-emerald-200 mt-0.5">Aoneix Account Recovery</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={onOpenSignIn} 
                className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                title="Back to login"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-5">
              
              {!isSubmitted ? (
                <>
                  {/* Form Description matching SS */}
                  <div className="mb-3">
                    <h2 className="text-base font-bold text-gray-950 mb-0.5">
                      Reset your password
                    </h2>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Enter your email address to get instructions for resetting your password.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    
                    {/* 1. Email Field with mail icon */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input 
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-[13px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white placeholder-gray-400 text-gray-900 transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* 2. Client ID Field with fixed prefix */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-800 mb-1">
                        Client ID <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <div className="flex rounded-lg border border-gray-200 overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-600 transition-all">
                        <span className="inline-flex items-center px-2.5 bg-gray-50 border-r border-gray-200 text-xs text-gray-500 select-none">
                          live.aoneix.io/
                        </span>
                        <input 
                          type="text"
                          value={clientId}
                          onChange={(e) => setClientId(e.target.value)}
                          placeholder="Enter your Client ID e.g. 123456"
                          className="flex-1 px-3 py-1.5 text-xs sm:text-[13px] bg-white placeholder-gray-400 text-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 3. Send Password Reset Email Button (Green #00c25a) */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-2 px-3 rounded-lg bg-[#00c25a] hover:bg-[#00b050] active:scale-[0.99] text-white font-bold text-xs sm:text-sm shadow-sm transition-all text-center flex items-center justify-center gap-2 mt-1"
                    >
                      {isLoading ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                      className="w-full py-1.5 px-3 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50/80 active:scale-[0.99] font-bold text-xs sm:text-sm transition-all text-center flex items-center justify-center cursor-pointer"
                    >
                      Back to Login
                    </button>
                  </form>
                </>
              ) : (
                /* Success Confirmation View */
                <div className="text-center py-3 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#00c25a] flex items-center justify-center mx-auto animate-in zoom-in-50 duration-300">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-950 mb-0.5">
                      Check your email
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                      We've sent a password reset link and verification instructions to <span className="font-semibold text-gray-900">{email}</span>.
                    </p>
                  </div>

                  <div className="pt-1 space-y-2">
                    <button
                      type="button"
                      onClick={onOpenSignIn}
                      className="w-full py-2 px-3 rounded-lg bg-[#00c25a] hover:bg-[#00b050] text-white font-bold text-xs sm:text-sm transition-all shadow-sm"
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
              <div className="text-center mt-2 text-[10px] text-gray-400 font-normal">
                Aoneix 2026. All rights reserved.
              </div>

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
