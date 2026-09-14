import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { Mail, ArrowLeft, KeyRound, X, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import orbReferenceImg from '../assets/orb_reference.png';

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

                    {/* Quick Demo Preview Button */}
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (!email) setEmail('httpsaaravjha@gmail.com');
                          setIsSubmitted(true);
                          try {
                            confetti({ particleCount: 35, spread: 55, origin: { y: 0.5 } });
                          } catch (_) {}
                        }}
                        className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#00c25a]" />
                        <span>Preview "Check your email" view</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success Confirmation View with 3D Liquid Crystal Orb Checkmark */
                <div className="text-center py-2 space-y-2.5">
                  
                  {/* 3D Liquid Crystal Orb with Checkmark Animation (Like loader, but status icon) */}
                  <div className="relative flex flex-col items-center justify-center pt-1 pb-1">
                    <div className="relative flex items-center justify-center animate-orb-float">
                      {/* Radiant Ambient Aura (Radial gradient prevents square artifact on iOS Safari) */}
                      <div 
                        className="absolute w-20 h-20 rounded-full pointer-events-none animate-orb-glow"
                        style={{
                          background: 'radial-gradient(circle, rgba(0, 194, 90, 0.28) 0%, rgba(16, 185, 129, 0.16) 45%, rgba(132, 204, 22, 0.08) 65%, transparent 75%)',
                          filter: 'blur(5px)'
                        }}
                      />

                      {/* Glass Orb Shell (62px) */}
                      <div 
                        className="w-[62px] h-[62px] rounded-full relative overflow-hidden flex items-center justify-center border border-white/90 shadow-[0_10px_25px_-6px_rgba(0,194,90,0.32),0_4px_12px_-2px_rgba(14,165,233,0.18)]"
                        style={{
                          boxShadow: 'inset 0 0 14px rgba(255, 255, 255, 0.75), inset 0 1.5px 3px rgba(255, 255, 255, 0.95), inset 0 -3px 8px rgba(0, 0, 0, 0.12), inset 0 -1.5px 5px rgba(0, 194, 90, 0.4), 0 10px 25px -6px rgba(0, 194, 90, 0.32)',
                          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                          maskImage: 'radial-gradient(white, black)',
                          WebkitBorderRadius: '9999px',
                          borderRadius: '9999px',
                          isolation: 'isolate',
                          transform: 'translate3d(0, 0, 0)',
                          WebkitTransform: 'translate3d(0, 0, 0)'
                        }}
                      >
                        {/* 1. Base Spherical Gradient Layer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe] via-[#ecfdf5] to-[#f0fdf4] opacity-95 rounded-full pointer-events-none" />

                        {/* 2. Deep Fluid Swirling Liquid Active Mesh */}
                        <div 
                          className="absolute inset-0 rounded-full filter blur-[7px] pointer-events-none opacity-95 overflow-hidden"
                          style={{
                            WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                            maskImage: 'radial-gradient(white, black)',
                            borderRadius: '9999px'
                          }}
                        >
                          {/* Oceanic Teal/Blue Swirling Blob */}
                          <div 
                            className="absolute top-[8%] left-[12%] w-[75%] h-[75%] bg-gradient-to-br from-[#0f766e] via-[#0284c7] to-[#042f2e] animate-orb-morph-1 animate-orb-spin"
                            style={{ mixBlendMode: 'multiply' }}
                          />
                          {/* Vibrant Lime/Emerald Swirling Blob */}
                          <div 
                            className="absolute bottom-[5%] right-[8%] w-[85%] h-[85%] bg-gradient-to-tr from-[#84cc16] via-[#22c55e] to-[#10b981] animate-orb-morph-2 animate-orb-spin-reverse"
                            style={{ mixBlendMode: 'normal' }}
                          />
                          {/* Chartreuse Core Accent Swirl */}
                          <div 
                            className="absolute top-[35%] left-[25%] w-[60%] h-[60%] bg-[#a3e635] rounded-full animate-orb-morph-1"
                            style={{ mixBlendMode: 'color-dodge', opacity: 0.7 }}
                          />
                        </div>

                        {/* 3. Reference Orb Texture Blend */}
                        <div 
                          className="absolute inset-0 rounded-full pointer-events-none animate-orb-spin-reverse"
                          style={{
                            backgroundImage: `url(${orbReferenceImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            mixBlendMode: 'overlay',
                            opacity: 0.75
                          }}
                        />

                        {/* 4. Center White Checkmark Floating Inside the Crystal Lens */}
                        <div className="relative z-10 flex items-center justify-center">
                          <Check className="w-7 h-7 text-white stroke-[3.4] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] animate-in zoom-in-50 duration-300" />
                        </div>

                        {/* 5. Realistic Specular Highlights */}
                        <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-[76%] h-[36%] rounded-[100%] bg-gradient-to-b from-white/90 via-white/35 to-transparent blur-[0.5px] pointer-events-none" />
                        <div className="absolute top-1.5 left-2 w-1.5 h-1 bg-white rounded-full blur-[0.2px] rotate-[-30deg] pointer-events-none animate-orb-highlight" />
                        <div className="absolute inset-0 rounded-full border border-white/70 pointer-events-none" />
                      </div>
                    </div>

                    {/* Contact Shadow directly under Orb */}
                    <div className="w-11 h-1 bg-emerald-950/15 rounded-[100%] blur-[2px] mt-1.5 pointer-events-none" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-950 mb-0.5">
                      Check your email
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                      We've sent a password reset link and verification instructions to <span className="font-semibold text-gray-900">{email || 'httpsaaravjha@gmail.com'}</span>.
                    </p>
                  </div>

                  <div className="pt-1 space-y-2">
                    <button
                      type="button"
                      onClick={onOpenSignIn}
                      className="w-full py-2 px-3 rounded-lg bg-[#00c25a] hover:bg-[#00b050] text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                    >
                      Return to Login
                    </button>

                    <div className="flex items-center justify-center gap-3 pt-0.5">
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-xs text-emerald-700 hover:underline font-semibold cursor-pointer"
                      >
                        Didn't receive email? Resend link
                      </button>
                      <span className="text-gray-300 text-xs">•</span>
                      <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs text-gray-500 hover:text-gray-800 hover:underline font-medium cursor-pointer"
                      >
                        Edit email
                      </button>
                    </div>
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
