import React, { useEffect, useState } from 'react';
import { Check, X, ShieldCheck, ArrowRight, RefreshCw, KeyRound, AlertTriangle, Sparkles } from 'lucide-react';
import orbReferenceImg from '../assets/orb_reference.png';
import confetti from 'canvas-confetti';

export default function LoginStatusModal({
  isOpen,
  type = 'success', // 'success' | 'failed'
  userEmail = 'user@company.com',
  errorMessage = 'The email or password you entered is incorrect. Please verify your credentials and try again.',
  onClose,
  onContinue,
  onResetPassword,
  autoRedirectSeconds = 4
}) {
  const isSuccess = type === 'success';
  const [secondsRemaining, setSecondsRemaining] = useState(autoRedirectSeconds);

  // Trigger celebratory confetti on success popup open
  useEffect(() => {
    if (isOpen && isSuccess) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (_) {}
    }
  }, [isOpen, isSuccess]);

  // Auto redirect countdown on success
  useEffect(() => {
    if (!isOpen || !isSuccess) return;
    setSecondsRemaining(autoRedirectSeconds);

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onContinue) onContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isSuccess, autoRedirectSeconds, onContinue]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Card Container with black outline and rounded-2xl matching login/signup forms */}
      <div 
        className={`relative w-full max-w-[390px] rounded-2xl p-6 sm:p-7 overflow-hidden bg-white border border-black shadow-2xl transition-all animate-modal-spring ${
          !isSuccess ? 'animate-warning-shake' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Soft Ambient Radiant Background Glow at the Top */}
        <div 
          className={`absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[45px] pointer-events-none ${
            isSuccess 
              ? 'bg-gradient-to-tr from-emerald-300/30 via-teal-200/25 to-lime-300/35' 
              : 'bg-gradient-to-tr from-rose-300/35 via-red-200/30 to-amber-300/35'
          }`} 
        />

        {/* Top Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors z-20"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* =========================================================
            3D Liquid Crystal Orb (Like website loader, tailored for status)
            ========================================================= */}
        <div className="relative flex flex-col items-center justify-center pt-1 pb-2">
          
          <div className="relative flex items-center justify-center animate-orb-float">
            {/* Radiant Ambient Aura */}
            <div 
              className="absolute w-20 h-20 rounded-full pointer-events-none animate-orb-glow"
              style={{
                background: isSuccess
                  ? 'radial-gradient(circle, rgba(0, 194, 90, 0.28) 0%, rgba(16, 185, 129, 0.18) 45%, rgba(132, 204, 22, 0.1) 65%, transparent 75%)'
                  : 'radial-gradient(circle, rgba(225, 29, 72, 0.32) 0%, rgba(244, 63, 94, 0.2) 45%, rgba(249, 115, 22, 0.12) 65%, transparent 75%)',
                filter: 'blur(5px)'
              }}
            />

            {/* Glass Orb Shell (72px) */}
            <div 
              className={`w-[72px] h-[72px] rounded-full relative overflow-hidden flex items-center justify-center border border-white/90 ${
                isSuccess
                  ? 'shadow-[0_12px_28px_-6px_rgba(0,194,90,0.38),0_4px_12px_-2px_rgba(14,165,233,0.22)]'
                  : 'shadow-[0_12px_28px_-6px_rgba(225,29,72,0.42),0_4px_12px_-2px_rgba(249,115,22,0.25)]'
              }`}
              style={{
                boxShadow: isSuccess
                  ? 'inset 0 0 16px rgba(255, 255, 255, 0.75), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -4px 10px rgba(0, 0, 0, 0.12), inset 0 -2px 6px rgba(0, 194, 90, 0.4), 0 12px 28px -6px rgba(0, 194, 90, 0.38)'
                  : 'inset 0 0 16px rgba(255, 255, 255, 0.75), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -4px 10px rgba(0, 0, 0, 0.15), inset 0 -2px 6px rgba(225, 29, 72, 0.45), 0 12px 28px -6px rgba(225, 29, 72, 0.42)',
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
              <div 
                className={`absolute inset-0 rounded-full pointer-events-none opacity-95 ${
                  isSuccess 
                    ? 'bg-gradient-to-br from-[#e0f2fe] via-[#ecfdf5] to-[#f0fdf4]' 
                    : 'bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fef2f2]'
                }`} 
              />

              {/* 2. Deep Fluid Swirling Liquid Active Mesh (morphing blobs) */}
              <div 
                className="absolute inset-0 rounded-full filter blur-[8px] pointer-events-none opacity-95 overflow-hidden"
                style={{
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  maskImage: 'radial-gradient(white, black)',
                  borderRadius: '9999px'
                }}
              >
                {isSuccess ? (
                  <>
                    {/* Oceanic Emerald/Teal Blob */}
                    <div 
                      className="absolute top-[8%] left-[12%] w-[75%] h-[75%] bg-gradient-to-br from-[#0f766e] via-[#0284c7] to-[#042f2e] animate-orb-morph-1 animate-orb-spin"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                    {/* Vibrant Lime Blob */}
                    <div 
                      className="absolute bottom-[5%] right-[8%] w-[85%] h-[85%] bg-gradient-to-tr from-[#84cc16] via-[#22c55e] to-[#10b981] animate-orb-morph-2 animate-orb-spin-reverse"
                      style={{ mixBlendMode: 'normal' }}
                    />
                    {/* Chartreuse Core Swirl */}
                    <div 
                      className="absolute top-[35%] left-[25%] w-[60%] h-[60%] bg-[#a3e635] rounded-full animate-orb-morph-1"
                      style={{ mixBlendMode: 'color-dodge', opacity: 0.7 }}
                    />
                  </>
                ) : (
                  <>
                    {/* Deep Crimson/Burgundy Blob */}
                    <div 
                      className="absolute top-[8%] left-[12%] w-[75%] h-[75%] bg-gradient-to-br from-[#881337] via-[#be123c] to-[#4c0519] animate-orb-morph-1 animate-orb-spin"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                    {/* Vibrant Coral/Amber Blob */}
                    <div 
                      className="absolute bottom-[5%] right-[8%] w-[85%] h-[85%] bg-gradient-to-tr from-[#f43f5e] via-[#ef4444] to-[#ea580c] animate-orb-morph-2 animate-orb-spin-reverse"
                      style={{ mixBlendMode: 'normal' }}
                    />
                    {/* Rose Coral Core Swirl */}
                    <div 
                      className="absolute top-[35%] left-[25%] w-[60%] h-[60%] bg-[#fda4af] rounded-full animate-orb-morph-1"
                      style={{ mixBlendMode: 'color-dodge', opacity: 0.75 }}
                    />
                  </>
                )}
              </div>

              {/* 3. High-Refraction Reference Texture Blend */}
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

              {/* 4. Center Hero Icon Floating Inside the Crystal Lens */}
              <div className="relative z-10 flex items-center justify-center">
                {isSuccess ? (
                  <Check className="w-8 h-8 text-white stroke-[3.4] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-transform animate-in zoom-in-50 duration-300" />
                ) : (
                  <X className="w-8 h-8 text-white stroke-[3.4] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] transition-transform animate-in zoom-in-50 duration-300" />
                )}
              </div>

              {/* 5. Realistic Specular Reflections on Top */}
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-[76%] h-[36%] rounded-[100%] bg-gradient-to-b from-white/90 via-white/35 to-transparent blur-[0.5px] pointer-events-none" />
              <div className="absolute top-2 left-2.5 w-1.5 h-1 bg-white rounded-full blur-[0.2px] rotate-[-30deg] pointer-events-none animate-orb-highlight" />
              <div className="absolute inset-0 rounded-full border border-white/70 pointer-events-none" />
            </div>
          </div>

          {/* Contact Shadow directly under Orb */}
          <div 
            className={`w-12 h-1 rounded-[100%] blur-[2px] mt-1.5 pointer-events-none ${
              isSuccess ? 'bg-emerald-950/20' : 'bg-rose-950/25'
            }`} 
          />
        </div>

        {/* =========================================================
            Content Body (Status Pill, Title, Details)
            ========================================================= */}
        <div className="text-center mt-2.5 space-y-2">
          
          {/* Status Badge Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border">
            {isSuccess ? (
              <span className="bg-emerald-50 text-emerald-800 border-emerald-200/80 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c25a] animate-pulse" />
                <span>Authentication Verified</span>
              </span>
            ) : (
              <span className="bg-rose-50 text-rose-800 border-rose-200/80 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Authentication Failed</span>
              </span>
            )}
          </div>

          {/* Headline */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-950 tracking-tight">
            {isSuccess ? 'Welcome Back!' : 'Unable to Sign In'}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
            {isSuccess 
              ? 'Your identity has been verified. Session established with Aoneix Cloud API Gateway.' 
              : errorMessage
            }
          </p>

          {/* Session / Diagnostic Info Box */}
          <div 
            className={`mt-3 p-3 rounded-xl text-left text-xs border ${
              isSuccess 
                ? 'bg-emerald-50/60 border-emerald-100/90 text-emerald-950' 
                : 'bg-rose-50/70 border-rose-100/90 text-rose-950'
            }`}
          >
            {isSuccess ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 font-medium">Account</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[170px]">{userEmail}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-emerald-200/50">
                  <span className="text-gray-500 font-medium">Pipeline Security</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#00c25a]" />
                    <span>256-Bit TLS Active</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Credential Mismatch</span>
                </div>
                <p className="text-rose-700/90 leading-tight text-[10.5px]">
                  Please check for typos, verify your password casing, or reset your password if forgotten.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* =========================================================
            Action Buttons
            ========================================================= */}
        <div className="mt-5 space-y-2">
          {isSuccess ? (
            <>
              {/* Primary: Continue to Dashboard */}
              <button
                type="button"
                onClick={onContinue}
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#00c25a] to-[#075e37] hover:from-[#00b050] hover:to-[#054c2c] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Auto Redirect Countdown Footer */}
              <div className="text-center pt-1">
                <span className="text-[10px] text-gray-400 font-normal">
                  Auto-redirecting in {secondsRemaining}s...
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Primary: Try Again */}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-lg bg-gray-950 hover:bg-black active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>

              {/* Secondary: Forgot Password */}
              <button
                type="button"
                onClick={() => {
                  if (onClose) onClose();
                  if (onResetPassword) onResetPassword();
                }}
                className="w-full py-2 px-4 rounded-lg text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50/70 border border-emerald-200/80 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                <span>Forgot password? Reset here</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
