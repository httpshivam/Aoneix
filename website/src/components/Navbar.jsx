import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { User, Menu, X, ArrowRight, Sparkles, LogIn, ChevronRight, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({ onOpenAuthModal, onOpenAnnouncement, onNavigateToSignIn, onNavigateToSignUp, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [isBannerVanishing, setIsBannerVanishing] = useState(false);

  const handleDismissBanner = (e) => {
    e.stopPropagation();
    if (isBannerVanishing) return;

    // Trigger butter-smooth vanishing animation immediately
    setIsBannerVanishing(true);

    if (e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      
      // Decouple sparkles to requestAnimationFrame so CSS animation starts at 60fps
      requestAnimationFrame(() => {
        try {
          confetti({
            particleCount: 14,
            spread: 50,
            origin: { x, y },
            colors: ['#059669', '#34d399', '#86efac', '#fbbf24'],
            ticks: 40,
            gravity: 0.85,
            scalar: 0.6,
            shapes: ['circle']
          });
        } catch (_) {}
      });
    }

    // Wait until full 450ms collapse completes before removing from DOM
    setTimeout(() => {
      setIsBannerDismissed(true);
      setIsBannerVanishing(false);
    }, 500);
  };

  const handleRestoreBanner = () => {
    setIsBannerDismissed(false);
    setIsBannerVanishing(false);
  };

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Metrics', id: 'metrics' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Enterprise FAQ', id: 'faq' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-100 transition-all">
      {/* Top Black Utility Bar */}
      <div className="hidden md:block bg-black text-white text-xs py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a 
              href="#faq" 
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('faq'); }}
              className="text-gray-300 hover:text-white transition-colors duration-150 font-normal"
            >
              Help Center
            </a>
            <a 
              href="#features" 
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('features'); }}
              className="text-gray-300 hover:text-white transition-colors duration-150 font-normal"
            >
              Partners
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('pricing'); }}
              className="text-gray-300 hover:text-white transition-colors duration-150 font-normal"
            >
              Enterprise
            </a>
          </div>

          <div className="flex items-center space-x-3">
            {isBannerDismissed && (
              <button
                onClick={handleRestoreBanner}
                className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/30 px-2.5 py-0.5 rounded-full transition-all duration-200 group active:scale-95"
                title="Restore notification banner"
              >
                <Sparkles className="w-3 h-3 text-emerald-400 group-hover:rotate-12 transition-transform" />
                <span>Show Offer</span>
              </button>
            )}

            <button 
              onClick={() => {
                if (onNavigateToSignUp) onNavigateToSignUp();
                else if (onOpenAuthModal) onOpenAuthModal();
              }} 
              className="flex items-center space-x-1.5 text-gray-200 hover:text-white transition-colors font-medium text-xs group"
            >
              <User className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-primary transition-colors" />
              <span>Signup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Light Green Announcement Banner (Notification Center) */}
      {!isBannerDismissed && (
        <div 
          className={`notification-banner-wrapper ${isBannerVanishing ? 'vanishing' : ''}`}
        >
          <div className="notification-banner-inner">
            <div className="bg-[#bbf7d0]/80 border-b border-[#86efac]/50 text-gray-900 text-xs sm:text-sm px-4 py-2">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-2.5">
                <div className="flex items-center gap-2 text-center sm:text-left mx-auto sm:mx-0">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-800 hidden sm:inline shrink-0 animate-pulse" />
                  <span className="font-normal text-emerald-950">
                    Sign up on Aoneix with Instagram or Facebook: now with AI-powered comment and DM automations.
                  </span>
                </div>

                <div className="flex items-center gap-2 mx-auto sm:mx-0 shrink-0">
                  <button 
                    onClick={onOpenAnnouncement}
                    className="text-xs font-semibold bg-[#75dc97] hover:bg-[#5fcf84] text-emerald-950 px-3.5 py-1 rounded-md transition-all shadow-sm active:scale-95 whitespace-nowrap"
                  >
                    See what's new
                  </button>

                  {/* Cut Mark / Minimize Button with Magical Vanish Interaction */}
                  <button
                    onClick={handleDismissBanner}
                    className="p-1 rounded-md text-emerald-900/70 hover:text-emerald-950 hover:bg-emerald-600/20 active:scale-90 transition-all flex items-center justify-center group"
                    title="Minimize / Dismiss notification"
                    aria-label="Dismiss notification"
                  >
                    <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200 stroke-[2.2]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group">
          <AoneixLogo className="h-8 sm:h-9" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate(link.id);
                else window.location.hash = `#${link.id}`;
              }}
              className="text-[15px] font-medium text-gray-700 hover:text-black transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Action Button: Simple Green Sign-In Button with Glow */}
        <div className="hidden md:flex items-center relative group">
          <div className="absolute -inset-1 bg-[#059669] rounded-lg blur opacity-40 animate-pulse transition duration-1000 group-hover:opacity-75 group-hover:duration-200"></div>
          <button 
            onClick={onNavigateToSignIn || onOpenAuthModal}
            className="relative flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            aria-label="Sign in"
          >
            <LogIn className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Sign in</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Full-Screen Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-[100] bg-[#f9f9f9] flex flex-col h-[100dvh] overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-[#f9f9f9]">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-gray-700 hover:text-black transition-colors active:scale-95"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
              <span className="text-sm font-medium">Close</span>
            </button>
            <div className="opacity-90">
              <AoneixLogo className="h-6" />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col">
            {/* Main Navigation Links */}
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    if (onNavigate) onNavigate(link.id);
                    else window.location.hash = `#${link.id}`;
                  }}
                  className="flex items-center justify-between py-4 border-b border-dotted border-gray-300 group active:bg-gray-100 -mx-5 px-5 transition-colors"
                >
                  <span className="text-[22px] font-normal text-gray-900 group-hover:text-brand-primary transition-colors">
                    {link.name}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors" />
                </a>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <div className="flex items-center bg-[#133223] p-1.5 rounded-[2rem] mt-6 mb-6">
              
              {/* Sign In Button with Glow */}
              <div className="flex-1 relative group">
                <div className="absolute -inset-0.5 bg-[#9df5a5] rounded-full blur opacity-60 animate-pulse"></div>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToSignIn) onNavigateToSignIn();
                    else if (onOpenAuthModal) onOpenAuthModal();
                  }} 
                  className="relative w-full py-3 px-4 rounded-full bg-[#9df5a5] hover:bg-[#8ae893] text-[#133223] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              </div>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateToSignUp) onNavigateToSignUp();
                  else if (onOpenAuthModal) onOpenAuthModal();
                }} 
                className="flex-1 py-3 px-4 rounded-full bg-transparent hover:bg-white/5 text-[#9df5a5] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <User className="w-5 h-5" />
                <span>Sign Up</span>
              </button>
            </div>
            
            <div className="border-b border-dotted border-gray-300"></div>

            {/* Support Section */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Support</h3>
              <div className="flex flex-col space-y-3 pb-6 border-b border-dotted border-gray-300">
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-brand-primary transition-colors">Help Center</a>
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-brand-primary transition-colors">Partners</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-brand-primary transition-colors">Enterprise</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-brand-primary transition-colors">Terms of Service</a>
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-sm text-gray-600 hover:text-brand-primary transition-colors">Privacy Policy</a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all active:scale-95">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all active:scale-95">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all active:scale-95">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all active:scale-95">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            
            {/* Extra padding at bottom for sticky CTA clearance */}
            <div className="h-20"></div>
          </div>

          {/* Bottom Sticky CTA Bar */}
          <div className="w-full bg-[#059669] p-4 sm:p-5 flex items-center justify-between mt-auto cursor-pointer hover:bg-[#047857] transition-all active:bg-[#0369a1] z-10" 
            onClick={() => {
              setMobileMenuOpen(false);
              if (onNavigateToSignUp) onNavigateToSignUp();
              else if (onOpenAuthModal) onOpenAuthModal();
            }}>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-white/90" />
              <span className="text-white font-medium text-base">Book a demo</span>
            </div>
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>
    </header>
  );
}
