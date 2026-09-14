import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { Eye, EyeOff, ArrowLeft, Check, Mail, KeyRound, Smartphone, ShieldCheck, X, Sparkles, AlertTriangle } from 'lucide-react';
import loginPageImg from '../assets/login_page_img.png';
import confetti from 'canvas-confetti';
import LoginStatusModal from './LoginStatusModal';

export default function SignIn({ onBack, onOpenSignUp, onOpenForgotPassword, showToast, triggerLoader }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientId, setClientId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);

  // Login Success & Login Failed Popup state
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    type: 'success', // 'success' | 'failed'
    errorMessage: '',
    email: '',
  });

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
        // Simulate failed OTP if all 0s or 1s
        if (fullOtp === '000000' || fullOtp === '111111') {
          setStatusModal({
            isOpen: true,
            type: 'failed',
            errorMessage: 'The 6-digit verification code you entered has expired or is invalid. Please request a new OTP.',
            email: email.trim() || 'user@company.com'
          });
          return;
        }
        setStatusModal({
          isOpen: true,
          type: 'success',
          email: email.trim() || 'enterprise@aoneix.io'
        });
      }, 450);
      return;
    }

    if (!email.trim() || !password.trim()) {
      if (showToast) showToast('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // If user inputs 'wrong' or 'fail' or under 4 chars: trigger Login Failed Popup
      if (
        password.toLowerCase() === 'wrong' ||
        password.toLowerCase() === 'fail' ||
        password.length < 4 ||
        email.toLowerCase().includes('fail')
      ) {
        setStatusModal({
          isOpen: true,
          type: 'failed',
          errorMessage: 'The email or password you entered is incorrect. Please verify your credentials and try again.',
          email: email.trim()
        });
        return;
      }

      // Successful login popup
      setStatusModal({
        isOpen: true,
        type: 'success',
        email: email.trim()
      });
    }, 450);
  };

  const handleFacebookLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatusModal({
        isOpen: true,
        type: 'success',
        email: 'facebook.user@aoneix.io'
      });
    }, 400);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatusModal({
        isOpen: true,
        type: 'success',
        email: 'google.workspace@aoneix.io'
      });
    }, 400);
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
    <div className="min-h-screen bg-white relative flex flex-col justify-between font-sf select-none">

      {/* Top Header Row matching ClientOnboarding header design with absolute center logo and symmetric padding */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shrink-0">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8 h-11 sm:h-14 flex items-center justify-between relative">

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
              <AoneixLogo className="h-6 sm:h-7" />
            </button>
          </div>

          {/* Right: Sleek Pill Sign Up Link */}
          <div className="flex items-center justify-end gap-2 z-10">
            <span className="hidden sm:inline text-xs text-gray-500 font-medium">Don't have an account?</span>
            <button
              type="button"
              onClick={onOpenSignUp}
              className="text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Thin Brand Accent Line */}
        <div className="w-full h-0.5 sm:h-1 bg-gray-100">
          <div className="h-full bg-gradient-to-r from-[#00c25a] to-[#075e37] w-full" />
        </div>
      </header>

      {/* Main Center Area: Side-by-Side Left Illustration & Right Login Card */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8 pt-1.5 pb-2.5 sm:py-6 flex-1 flex flex-col lg:flex-row items-center justify-start sm:justify-center lg:justify-between gap-3 lg:gap-10">

        {/* Left Side: Illustration from login_page_img.png (Hidden on mobile, visible on tablet & laptop) */}
        <div className="hidden md:flex flex-1 w-full items-center justify-center lg:justify-start lg:pl-4">
          <div className="w-full max-w-[380px] sm:max-w-[440px] animate-login-motion transition-transform duration-500 hover:scale-[1.015]">
            <img
              src={loginPageImg}
              alt="Aoneix WhatsApp Automation Suite"
              className="w-full h-auto object-contain drop-shadow-xl select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Right Side: Form Card matching MetaAuthModal / Screenshot aesthetic */}
        <div className="w-full max-w-[410px] shrink-0">
          <div className="bg-white rounded-2xl border border-black shadow-2xl overflow-hidden relative">

            {/* Dark Green Gradient Header */}
            <div className="bg-gradient-to-r from-[#075e37] to-[#0a5c36] px-4 py-2 sm:px-5 sm:py-3 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#86efac]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-[15px] leading-tight text-white">Log in to your account</h3>
                  <p className="text-[10.5px] sm:text-[11px] text-emerald-200 mt-0.5">Aoneix Cloud Workspace Access</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onBack}
                className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                title="Back to website"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Card Body containing all form content and buttons */}
            <div className="p-3 sm:p-4">

              {/* Standard Login or OTP Form */}
              {!isOtpMode ? (
                <form onSubmit={handleSubmit} className="space-y-2.5">

                  {/* 1. Email Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-3 py-1.5 text-xs sm:text-[13px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white placeholder-gray-400 text-gray-900 transition-all shadow-2xs"
                    />
                  </div>

                  {/* 2. Password Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full px-3 py-1.5 pr-9 text-xs sm:text-[13px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white placeholder-gray-400 text-gray-900 transition-all shadow-2xs font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-0.5"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 3. Client ID Field with fixed prefix */}
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      Client ID
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

                  {/* 4. Remember me & Forgot password? */}
                  <div className="flex items-center justify-between pt-0.5">
                    <label
                      onClick={() => setRememberMe(!rememberMe)}
                      className="inline-flex items-center gap-1.5 cursor-pointer select-none"
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-[3px] transition-colors flex items-center justify-center ${rememberMe
                            ? 'bg-[#00c25a] text-white'
                            : 'border border-gray-300 bg-white'
                          }`}
                      >
                        {rememberMe && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="text-xs text-gray-700 font-medium">
                        Remember me
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenForgotPassword) onOpenForgotPassword();
                        else handleForgotPassword();
                      }}
                      className="text-xs font-semibold text-gray-900 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* 5. Green Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-3 rounded-lg bg-[#00c25a] hover:bg-[#00b050] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all text-center flex items-center justify-center gap-2 mt-1"
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Logging in...</span>
                      </span>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                </form>
              ) : (
                /* Alternate OTP Login Flow */
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      Registered Email or Phone
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@company.com or +91"
                        className="flex-1 px-3 py-1.5 text-xs sm:text-[13px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-3 py-1 text-xs font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg whitespace-nowrap transition-colors"
                      >
                        {otpSent ? 'Resend' : 'Send OTP'}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-1.5">
                        Enter 6-digit OTP
                      </label>
                      <div className="flex gap-1.5 justify-between">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            className="w-9 h-10 text-center text-base font-bold border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 px-3 rounded-lg bg-[#00c25a] hover:bg-[#00b050] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 mt-1"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setIsOtpMode(false)}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline"
                    >
                      ← Back to Password Login
                    </button>
                  </div>
                </form>
              )}

              {/* OR Divider with horizontal lines */}
              <div className="relative my-2 sm:my-2.5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-white px-2.5 text-gray-400 font-semibold tracking-wider">
                    OR
                  </span>
                </div>
              </div>

              {/* Social Logins: Facebook Meta + Google */}
              <div className="space-y-1.5">

                {/* 1. Login with Facebook Meta */}
                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  className="w-full py-1.5 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs font-semibold text-gray-800 shadow-2xs group"
                >
                  <svg className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Login with Facebook</span>
                </button>

                {/* 2. Login with Google */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-1.5 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs font-semibold text-gray-800 shadow-2xs group"
                >
                  <svg className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Login with Google</span>
                </button>
              </div>

              {/* Login with OTP Button */}
              <div className="text-center mt-2 mb-1">
                <button
                  type="button"
                  onClick={() => setIsOtpMode(!isOtpMode)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-950 transition-colors py-0.5 group"
                >
                  <div className="w-4 h-3.5 border border-gray-400 rounded-[2px] flex items-center justify-center relative overflow-hidden group-hover:border-black transition-colors">
                    <div className="w-2.5 h-1.5 border-b border-r border-gray-500 transform rotate-45 -translate-y-0.5" />
                  </div>
                  <span>{isOtpMode ? 'Login with Password' : 'Login with OTP'}</span>
                </button>
              </div>

              {/* Quick Demo Preview Pills for User */}
              <div className="flex items-center justify-center gap-2 pt-2 mt-1 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStatusModal({
                    isOpen: true,
                    type: 'success',
                    email: email.trim() || 'shivam@aoneix.com'
                  })}
                  className="px-2.5 py-1 text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                  title="Click to preview Login Successful popup"
                >
                  <Sparkles className="w-3 h-3 text-[#00c25a]" />
                  <span>Preview Success</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatusModal({
                    isOpen: true,
                    type: 'failed',
                    errorMessage: 'The email or password you entered is incorrect. Please verify your credentials and try again.',
                    email: email.trim() || 'shivam@aoneix.com'
                  })}
                  className="px-2.5 py-1 text-[10.5px] font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                  title="Click to preview Login Failed popup"
                >
                  <X className="w-3 h-3 text-rose-600" />
                  <span>Preview Failed</span>
                </button>
              </div>

              {/* Don't have an account? Sign Up */}
              <div className="text-center text-xs text-gray-600 pt-1">
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
              <div className="text-center mt-1.5 text-[10px] text-gray-400 font-normal">
                Aoneix 2026. All rights reserved.
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Outer Bottom Footer matching ClientOnboarding */}
      <footer className="py-2 sm:py-3.5 border-t border-gray-100 text-center text-[10px] sm:text-[11px] text-gray-400 shrink-0">
        Aoneix Cloud Workspace • Protected by 256-bit SSL encryption
      </footer>

      {/* Login Successful & Login Failed Status Modal */}
      <LoginStatusModal
        isOpen={statusModal.isOpen}
        type={statusModal.type}
        userEmail={statusModal.email || email || 'user@company.com'}
        errorMessage={statusModal.errorMessage}
        onClose={() => setStatusModal(prev => ({ ...prev, isOpen: false }))}
        onContinue={() => {
          setStatusModal(prev => ({ ...prev, isOpen: false }));
          if (showToast) showToast(`Welcome back, ${email ? email.split('@')[0] : 'User'}! Logged in successfully.`);
          if (onBack) onBack();
        }}
        onResetPassword={() => {
          setStatusModal(prev => ({ ...prev, isOpen: false }));
          if (onOpenForgotPassword) onOpenForgotPassword();
        }}
      />

    </div>
  );
}
