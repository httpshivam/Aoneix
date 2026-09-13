import React, { useState, useEffect } from 'react';
import AoneixLogo from './AoneixLogo';
import orbReferenceImg from '../assets/orb_reference.png';
import { Sparkles } from 'lucide-react';

export default function WebsiteRefreshLoader({ onComplete, duration = 3000, mode = 'default' }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusText, setStatusText] = useState(() => {
    if (mode === 'signin') return 'Connecting to Sign In Gateway...';
    if (mode === 'signup') return 'Preparing Secure Sign Up...';
    if (mode === 'login-success') return 'Verifying Credentials...';
    if (mode === 'signup-success') return 'Creating Enterprise Account...';
    return 'Initializing Aoneix Intelligence...';
  });

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 25; // Update every 25ms for butter-smooth progress

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(calculatedProgress);

      if (mode === 'signin') {
        if (calculatedProgress < 35) {
          setStatusText('Connecting to Sign In Gateway...');
        } else if (calculatedProgress < 75) {
          setStatusText('Verifying Security Protocol...');
        } else if (calculatedProgress < 100) {
          setStatusText('Loading Sign In Portal...');
        } else {
          setStatusText('Welcome to Sign In');
        }
      } else if (mode === 'signup') {
        if (calculatedProgress < 35) {
          setStatusText('Preparing Secure Sign Up...');
        } else if (calculatedProgress < 75) {
          setStatusText('Configuring Multi-Tenant Pipeline...');
        } else if (calculatedProgress < 100) {
          setStatusText('Allocating Sandbox Workspace...');
        } else {
          setStatusText('Welcome to Sign Up');
        }
      } else if (mode === 'login-success') {
        if (calculatedProgress < 35) {
          setStatusText('Verifying Credentials...');
        } else if (calculatedProgress < 75) {
          setStatusText('Authenticating Aoneix Session...');
        } else if (calculatedProgress < 100) {
          setStatusText('Launching Cloud Workspace...');
        } else {
          setStatusText('Login Successful');
        }
      } else if (mode === 'signup-success') {
        if (calculatedProgress < 35) {
          setStatusText('Creating Enterprise Account...');
        } else if (calculatedProgress < 75) {
          setStatusText('Provisioning Meta WABA Sandbox...');
        } else if (calculatedProgress < 100) {
          setStatusText('Setting Up Onboarding Portal...');
        } else {
          setStatusText('Account Ready');
        }
      } else {
        if (calculatedProgress < 35) {
          setStatusText('Initializing Aoneix Intelligence...');
        } else if (calculatedProgress < 75) {
          setStatusText('Connecting Cloud Messaging Gateway...');
        } else if (calculatedProgress < 100) {
          setStatusText('Finalizing Enterprise Experience...');
        } else {
          setStatusText('Welcome to Aoneix');
        }
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsExiting(true);
        // Wait for exit transition (700ms) before notifying parent to unmount
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 700);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration, onComplete, mode]);

  return (
    <div 
      className={`fixed inset-0 z-[99999] bg-[#f8fafc] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ease-out ${
        isExiting 
          ? 'opacity-0 scale-[1.04] pointer-events-none' 
          : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      aria-label="Website Refresh Loader"
    >
      {/* Ambient background soft subtle glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-gradient-to-tr from-emerald-200/25 via-teal-100/20 to-lime-200/30 rounded-full blur-[40px] pointer-events-none animate-orb-glow" />

      {/* Main Center Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-xs w-full">
        
        {/* =========================================================
            Creative 3D Liquid Crystal Orb - Refined Micro Size (~64px - 80px)
            ========================================================= */}
        <div className="relative flex items-center justify-center animate-orb-float">
          
          {/* Ambient Orb Aura Glow behind the glass */}
          <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-400/15 to-lime-400/25 blur-lg pointer-events-none animate-orb-glow" />

          {/* Glass Orb Shell (Micro: ~64px on mobile, ~80px on desktop) */}
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative overflow-hidden flex items-center justify-center shadow-[0_10px_25px_-6px_rgba(0,194,90,0.28),0_4px_12px_-2px_rgba(14,165,233,0.18)] border border-white/80 backdrop-blur-[2px]"
            style={{
              boxShadow: 'inset 0 0 14px rgba(255, 255, 255, 0.7), inset 0 1.5px 3px rgba(255, 255, 255, 0.95), inset 0 -4px 10px rgba(0, 0, 0, 0.12), inset 0 -1.5px 6px rgba(0, 194, 90, 0.35), 0 10px 25px -6px rgba(0, 194, 90, 0.28)'
            }}
          >
            {/* 1. Base Spherical Atmospheric Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe] via-[#ecfdf5] to-[#f0fdf4] opacity-90 rounded-full pointer-events-none" />

            {/* 2. Deep Fluid Swirling Liquid Layer (Active Mesh) */}
            <div className="absolute inset-[-15%] rounded-full filter blur-[10px] sm:blur-[12px] pointer-events-none opacity-95">
              
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
                style={{ mixBlendMode: 'color-dodge', opacity: 0.65 }}
              />

              {/* Deep Oceanic Dark Center Shadow */}
              <div 
                className="absolute top-[20%] left-[28%] w-[45%] h-[45%] bg-[#083344] rounded-full animate-orb-spin-reverse"
                style={{ mixBlendMode: 'overlay', opacity: 0.8 }}
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
                opacity: 0.78
              }}
            />

            {/* Second gentle counter-swirling overlay */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none animate-orb-spin"
              style={{
                backgroundImage: `url(${orbReferenceImg})`,
                backgroundSize: '106%',
                backgroundPosition: 'center',
                mixBlendMode: 'soft-light',
                opacity: 0.5
              }}
            />

            {/* 4. Realistic 3D Crystal Lens & Specular Reflections */}
            {/* Top crescent specular light reflection */}
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-[76%] h-[36%] rounded-[100%] bg-gradient-to-b from-white/90 via-white/35 to-transparent blur-[0.5px] pointer-events-none" />

            {/* Pinpoint studio light specular glint */}
            <div className="absolute top-2 left-2.5 sm:top-2.5 sm:left-3 w-1.5 h-1 bg-white rounded-full blur-[0.2px] rotate-[-30deg] pointer-events-none animate-orb-highlight" />

            {/* Refraction rim light border inside the lens */}
            <div className="absolute inset-0 rounded-full border border-white/70 pointer-events-none" />
          </div>
        </div>

        {/* Soft Ambient Contact Shadow directly under Orb */}
        <div className="w-10 sm:w-14 h-1 bg-emerald-950/15 rounded-[100%] blur-[2px] mt-1 pointer-events-none" />

        {/* =========================================================
            Loader Information & Progress Indicator (Tightly Spaced)
            ========================================================= */}
        <div className="mt-1.5 flex flex-col items-center text-center space-y-2 w-full">
          
          {/* Logo with gentle pulse */}
          <div className="flex items-center justify-center transition-transform hover:scale-105">
            <AoneixLogo className="h-4.5 sm:h-5" />
          </div>

          {/* High-Tech Progress Track */}
          <div className="w-32 sm:w-40 h-1 bg-gray-200/90 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#00c25a] via-[#10b981] to-[#075e37] rounded-full transition-all duration-100 ease-out shadow-[0_0_5px_rgba(0,194,90,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Percentage & Status Message */}
          <div className="flex items-center justify-between w-32 sm:w-40 text-[9px] sm:text-[10px] font-medium text-gray-500">
            <span className="flex-1 truncate mr-1 text-left">{statusText}</span>
            <span className="font-mono font-bold text-gray-700 shrink-0">{progress}%</span>
          </div>

        </div>

      </div>
    </div>
  );
}
