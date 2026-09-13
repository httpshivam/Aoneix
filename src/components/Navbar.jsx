import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { User, Menu, X, ArrowRight, Sparkles, LogIn } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({ onOpenAuthModal, onOpenAnnouncement, onNavigateToSignIn, onNavigateToSignUp }) {
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
    { name: 'Features', href: '#features' },
    { name: 'Metrics', href: '#metrics' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Enterprice FAQ', href: '#faq' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Black Utility Bar */}
      <div className="bg-black text-white text-xs py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a 
              href="#faq" 
              className="text-gray-300 hover:text-white transition-colors duration-150 font-normal"
            >
              Help Center
            </a>
            <a 
              href="#features" 
              className="text-gray-300 hover:text-white transition-colors duration-150 font-normal"
            >
              Partners
            </a>
            <a 
              href="#pricing" 
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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-gray-100">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group">
          <AoneixLogo className="h-8 sm:h-9" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-800 hover:text-brand-primary transition-colors duration-150 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-primary hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button: 3D Layered Sign-In Button */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={onNavigateToSignIn || onOpenAuthModal}
            className="btn-3d-signin group"
            aria-label="Sign in"
          >
            <div className="btn-3d-signin-core">
              <LogIn className="w-4 h-4 text-[#042e18] stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
              <span>Sign in</span>
            </div>
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-800 hover:text-brand-primary transition-colors py-1.5"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-100 flex flex-col items-center gap-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateToSignIn) onNavigateToSignIn();
                else onOpenAuthModal();
              }} 
              className="btn-3d-signin w-full group"
              aria-label="Sign in"
            >
              <div className="btn-3d-signin-core w-full justify-center">
                <LogIn className="w-4 h-4 text-[#042e18] stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
                <span>Sign in</span>
              </div>
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigateToSignUp) onNavigateToSignUp();
                else onOpenAuthModal();
              }} 
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              aria-label="Sign up"
            >
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span>Signup / Create Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
