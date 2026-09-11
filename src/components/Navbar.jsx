import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { User, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenAuthModal, onOpenAnnouncement }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <button 
              onClick={onOpenAuthModal} 
              className="flex items-center space-x-1.5 text-gray-200 hover:text-white transition-colors font-medium text-xs group"
            >
              <User className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-primary transition-colors" />
              <span>Signup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Light Green Announcement Banner */}
      <div className="bg-[#bbf7d0]/80 border-b border-[#86efac]/50 text-gray-900 text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-emerald-800 hidden sm:inline" />
            <span className="font-normal text-emerald-950">
              Sign up on Aoneix with Instagram or Facebook: now with AI-powered comment and DM automations.
            </span>
          </div>
          <button 
            onClick={onOpenAnnouncement}
            className="text-xs font-semibold bg-[#75dc97] hover:bg-[#5fcf84] text-emerald-950 px-3.5 py-1 rounded-md transition-all shadow-sm active:scale-95 mx-auto sm:mx-0 whitespace-nowrap"
          >
            See what's new
          </button>
        </div>
      </div>

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

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={onOpenAuthModal}
            className="bg-[#00c25a] hover:bg-[#00ab4f] text-gray-900 font-semibold text-sm px-6 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            Sign in
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
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal();
              }}
              className="w-full bg-[#00c25a] text-gray-900 font-semibold text-center py-2.5 rounded-lg shadow-sm"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
