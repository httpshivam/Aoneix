import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { Eye, EyeOff, ArrowLeft, Check, Mail, KeyRound, Smartphone, ShieldCheck, X } from 'lucide-react';
import loginPageImg from '../assets/login_page_img.png';
import logoOverlayImg from '../assets/logo_overlay.png';
import confetti from 'canvas-confetti';

export default function SignIn({ onBack, onOpenSignUp, onOpenForgotPassword, showToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientId, setClientId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpMode) {
      const fullOtp = otpCode.join('');
      if (fullOtp.length < 6) {
        if (showToast) showToast('Please enter the complete 6-digit OTP.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        try {
          confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
        } catch (_) {}
        if (showToast) showToast('OTP Verified! Welcome to Aoneix Enterprise.');
        setTimeout(() => { if (onBack) onBack(); }, 1000);
      }, 700);
      return;
    }

    if (!email.trim() || !password.trim()) {
      if (showToast) showToast('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
      } catch (_) {}

      if (showToast) {
        showToast(`Welcome back, ${email.split('@')[0]}! Logged in successfully.`);
      }
      setTimeout(() => {
        if (onBack) onBack();
      }, 1000);
    }, 700);
  };

  const handleFacebookLogin = () => {
    if (showToast) {
      showToast('Connecting with Facebook Meta API OAuth gateway...');
    }
    setTimeout(() => {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch (_) {}
      if (showToast) showToast('Facebook Meta account authenticated successfully!');
      setTimeout(() => { if (onBack) onBack(); }, 1000);
    }, 800);
  };

  const handleGoogleLogin = () => {
    if (showToast) {
      showToast('Opening Google OAuth authentication dialog...');
    }
    setTimeout(() => {
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch (_) {}
      if (showToast) showToast('Google account verified! Logging into Aoneix Workspace.');
      setTimeout(() => { if (onBack) onBack(); }, 1000);
    }, 800);
  };

  const handleForgotPassword = () => {
    if (showToast) {
      showToast(email ? `Password reset instructions sent to ${email}` : 'Please enter your email to receive a password reset link.');
    }
  };

  const handleSendOtp = () => {
    if (!email.trim()) {
      if (showToast) showToast('Please enter your email or registered phone number first.');
      return;
    }
    setOtpSent(true);
    if (showToast) showToast(`One-Time Password (OTP) sent to ${email}! Check your inbox.`);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col justify-between font-sf select-none">
      
      {/* Background Brand Logo Overlay: Full-screen cover on mobile/tablet, positioned on desktop */}
      <div 
        className="absolute inset-0 lg:inset-auto lg:-left-12 lg:top-1/2 lg:-translate-y-[46%] lg:-translate-x-[10%] w-full h-full lg:w-[660px] lg:h-auto pointer-events-none z-0 select-none overflow-hidden transition-all"
        aria-hidden="true"
      >
        <img 
          src={logoOverlayImg} 
          alt="Aoneix Brand Shape Overlay" 
          className="w-full h-full object-cover object-center opacity-75 sm:opacity-85 lg:opacity-90 lg:w-full lg:h-auto lg:object-contain scale-105 sm:scale-100"
        />
      </div>

      {/* Top Header Row with Logo & Return Link */}
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
            onClick={onOpenSignUp}
            className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors"
          >
            Don't have an account? <span className="text-emerald-700 font-bold underline">Sign Up</span>
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

      {/* Main Center Area: Side-by-Side Left Illustration & Right Login Card */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 py-6 lg:py-10 flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
        
        {/* Left Side: Illustration from login_page_img.png (Hidden on mobile, visible on tablet & laptop) */}
        <div className="hidden md:flex flex-1 w-full items-center justify-center lg:justify-start lg:pl-4">
          <div className="w-full max-w-[480px] sm:max-w-[540px] animate-login-motion transition-transform duration-500 hover:scale-[1.015]">
            <img 
              src={loginPageImg} 
              alt="Aoneix WhatsApp Automation Suite" 
              className="w-full h-auto object-contain drop-shadow-xl select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Right Side: Form Card matching MetaAuthModal / Screenshot aesthetic */}
        <div className="w-full max-w-[470px] shrink-0">
          <div className="bg-white rounded-2xl border border-black shadow-2xl overflow-hidden relative">
            
            {/* Dark Green Gradient Header with increased top & bottom padding */}
            <div className="bg-gradient-to-r from-[#075e37] to-[#0a5c36] px-6 py-7 sm:px-7 sm:py-8 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#86efac]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg leading-tight text-white">Log in to your account</h3>
                  <p className="text-xs sm:text-sm text-emerald-200 mt-0.5">Aoneix Cloud Workspace Access</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={onBack} 
                className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Back to website"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Card Body containing all form content and buttons */}
            <div className="p-6 sm:p-7">

              {/* Standard Login or OTP Form */}
              {!isOtpMode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* 1. Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Email
                    </label>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white placeholder-gray-400 text-gray-900 transition-all shadow-2xs"
                    />
                  </div>

                  {/* 2. Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full px-3.5 py-2.5 pr-11 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white placeholder-gray-400 text-gray-900 transition-all shadow-2xs font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 3. Client ID Field with fixed prefix */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Client ID
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
                        className="flex-1 px-3.5 py-2.5 text-sm bg-white placeholder-gray-400 text-gray-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* 4. Remember me & Forgot password? */}
                  <div className="flex items-center justify-between pt-1">
                    <label 
                      onClick={() => setRememberMe(!rememberMe)}
                      className="inline-flex items-center gap-2 cursor-pointer select-none"
                    >
                      <div 
                        className={`w-4 h-4 rounded-[4px] transition-colors flex items-center justify-center ${
                          rememberMe 
                            ? 'bg-[#00c25a] text-white' 
                            : 'border border-gray-300 bg-white'
                        }`}
                      >
                        {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
                        Remember me
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenForgotPassword) onOpenForgotPassword();
                        else handleForgotPassword();
                      }}
                      className="text-sm font-semibold text-gray-900 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* 5. Green Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00c25a] hover:bg-[#00b050] active:scale-[0.99] text-white font-semibold text-base shadow-sm transition-all text-center flex items-center justify-center gap-2 mt-2"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Logging in...</span>
                      </span>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </form>
              ) : (
                /* Alternate OTP Login Flow */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1.5">
                      Registered Email or Phone
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@company.com or +91"
                        className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-3.5 py-2 text-xs font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl whitespace-nowrap transition-colors"
                      >
                        {otpSent ? 'Resend' : 'Send OTP'}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Enter 6-digit OTP
                      </label>
                      <div className="flex gap-2 justify-between">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#00c25a] hover:bg-[#00b050] text-white font-semibold text-base shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsOtpMode(false)}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      ← Back to Password Login
                    </button>
                  </div>
                </form>
              )}

              {/* OR Divider with horizontal lines */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-500 font-semibold text-[11px] tracking-wider">
                    OR
                  </span>
                </div>
              </div>

              {/* Social Logins: Facebook Meta + Google */}
              <div className="space-y-2.5">
                
                {/* 1. Login with Facebook Meta */}
                <button 
                  type="button" 
                  onClick={handleFacebookLogin}
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 text-sm font-semibold text-gray-800 shadow-2xs group"
                >
                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Login with Facebook</span>
                </button>

                {/* 2. Login with Google */}
                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  className="w-full py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 text-sm font-semibold text-gray-800 shadow-2xs group"
                >
                  <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Login with Google</span>
                </button>
              </div>

              {/* Login with OTP Button */}
              <div className="text-center mt-3.5 mb-3">
                <button
                  type="button"
                  onClick={() => setIsOtpMode(!isOtpMode)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors py-1 group"
                >
                  <div className="w-5 h-4 border border-gray-400 rounded-[3px] flex items-center justify-center relative overflow-hidden group-hover:border-black transition-colors">
                    <div className="w-3 h-2 border-b border-r border-gray-500 transform rotate-45 -translate-y-0.5" />
                  </div>
                  <span>{isOtpMode ? 'Login with Password' : 'Login with OTP'}</span>
                </button>
              </div>

              {/* Don't have an account? Sign Up */}
              <div className="text-center text-sm text-gray-600 pt-1">
                <span>Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenSignUp) onOpenSignUp();
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </div>

              {/* Bottom Note inside Card */}
              <div className="text-center mt-5 text-[11px] text-gray-400 font-normal">
                Aoneix 2026. All rights reserved.
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Outer Bottom Spacer for visual balance */}
      <div className="h-4" />

    </div>
  );
}
