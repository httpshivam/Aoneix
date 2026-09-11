import React from 'react';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenAuthModal }) {
  return (
    <footer className="w-full bg-black text-white font-sans overflow-hidden">
      
      {/* 1. Radiant Green CTA Banner with Animated Motion-Blur Grid */}
      <div className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28 px-4 sm:px-8 text-center bg-black">
        
        {/* Emerald Radiant Glow */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(ellipse 90% 75% at 50% 12%, rgba(52, 211, 153, 0.65) 0%, rgba(16, 185, 129, 0.45) 30%, rgba(5, 150, 105, 0.22) 55%, rgba(4, 120, 87, 0.08) 75%, transparent 90%)',
            backgroundSize: '100% 100%'
          }}
        />

        {/* Animated Grid Lines with Motion Blur */}
        <div className="footer-grid-container" aria-hidden="true">
          <div className="footer-grid-animated" />
          <div className="footer-grid-trail" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Reach Out and Transform <br className="hidden sm:block" />
            Your Cloud Journey!
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            We're here to help you with all your cloud management and governance needs.
          </p>
          <button
            onClick={onOpenAuthModal}
            className="bg-[#52c96c] hover:bg-[#43b95c] text-white font-semibold text-sm sm:text-base px-9 py-3 rounded-full shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Contact us
          </button>
        </div>
      </div>

      {/* 2. Main Navigation Link Columns (Matching Screenshot Middle) */}
      <div className="bg-black py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          
          {/* Col 1: Company */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 tracking-tight">Company</h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-normal">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Blog</a></li>
              <li><button onClick={onOpenAuthModal} className="hover:text-white transition-colors text-left">Contact Us</button></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Privacy policy</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Terms of Services</a></li>
            </ul>
          </div>

          {/* Col 2: Resources */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 tracking-tight">Resources</h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-normal">
              <li><a href="#features" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Examples</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">React components</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Dev Tools</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Tutorial</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Guides</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Release notes</a></li>
            </ul>
          </div>

          {/* Col 3: Product */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 tracking-tight">Product</h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-normal">
              <li><a href="#pricing" className="hover:text-white transition-colors">Enterprise</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Small business</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Personal</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Col 4: Download */}
          <div>
            <h3 className="font-bold text-white text-base mb-4 tracking-tight">Download</h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-normal">
              <li><a href="#features" className="hover:text-white transition-colors">iOS & Android</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Mac & Windows</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Calendar</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Web Clipper</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. Trust & Contact Strip with 3 Grid Boxes (Matching Screenshot) */}
      <div className="border-t border-b border-gray-800/80 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-gray-800/80">
          
          {/* Box 1: Address */}
          <div className="md:col-span-4 flex items-center gap-3.5 px-6 sm:px-8 py-6">
            <MapPin className="w-8 h-8 text-white shrink-0 stroke-[1.75]" />
            <div className="text-xs sm:text-sm text-gray-200 font-normal leading-snug">
              Golden-I, T3-236, Greater Noida W Rd,<br />
              Greater Noida, Uttar Pradesh 201318
            </div>
          </div>

          {/* Box 2: Business Conversations & Partner Logos */}
          <div className="md:col-span-4 flex flex-col items-center justify-center px-6 sm:px-8 py-5 text-center">
            <span className="text-xs sm:text-sm text-gray-300 font-normal mb-2.5 block">
              Business Conversations made simple
            </span>
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              
              {/* Meta Business Partner */}
              <div className="flex items-center gap-1.5 shrink-0">
                <svg className="h-5 w-auto" viewBox="0 0 100 22" fill="none">
                  <path d="M12.5 1.5C8.5 1.5 5.5 4.5 3.5 7.5C1.5 10.5 0.5 13.5 0.5 16.5C0.5 19.5 2.5 21 5 21C8 21 11 18 13.5 13.5C16 18 19 21 22 21C24.5 21 26.5 19.5 26.5 16.5C26.5 13.5 25.5 10.5 23.5 7.5C21.5 4.5 18.5 1.5 14.5 1.5H12.5ZM6.5 16.5C5.5 16.5 4.5 16 4.5 14.5C4.5 12.5 6 9.5 8 7C9.5 5 11 4 12.5 4C14 4 15 5.5 14 8C12.5 11.5 9 16.5 6.5 16.5ZM20.5 16.5C18 16.5 14.5 11.5 13 8C12 5.5 13 4 14.5 4C16 4 17.5 5 19 7C21 9.5 22.5 12.5 22.5 14.5C22.5 16 21.5 16.5 20.5 16.5Z" fill="#0081FB"/>
                  <text x="30" y="16" fill="white" fontFamily="sans-serif" fontWeight="700" fontSize="13">Meta</text>
                </svg>
                <div className="text-[8.5px] text-gray-300 font-medium leading-tight text-left">
                  Business<br />Partner
                </div>
              </div>

              {/* Meta Certified Badge */}
              <div className="bg-[#1e293b] border border-gray-700/80 rounded px-1.5 py-0.5 flex items-center gap-1 shrink-0">
                <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-[#f97316] to-[#ea580c] flex items-center justify-center text-[7px] font-bold text-white">
                  ∞
                </div>
                <div className="text-[7.5px] leading-tight text-gray-300 font-semibold tracking-tight text-left">
                  <span className="text-white font-bold block text-[8px]">Meta</span>
                  CERTIFIED
                </div>
              </div>

              {/* Google Wordmark */}
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center font-sans shrink-0">
                Google
              </div>

            </div>
          </div>

          {/* Box 3: Phone Number */}
          <div className="md:col-span-4 flex items-center justify-start md:justify-center gap-3.5 px-6 sm:px-8 py-6">
            <Phone className="w-7 h-7 text-white shrink-0 stroke-[1.75]" />
            <a 
              href="tel:+919204309173" 
              className="text-xl sm:text-2xl font-bold text-white tracking-wide hover:text-emerald-400 transition-colors whitespace-nowrap"
            >
              +91 92043 09173
            </a>
          </div>

        </div>
      </div>

      {/* 4. Social Media Strip (4 Equal Interactive Blocks with Arrow Up Right) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-800/90 border-b border-gray-800 bg-[#030712]">
        
        {/* Facebook */}
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 bg-[#030712] hover:bg-[#0f172a] transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="font-bold text-xs sm:text-[13px] tracking-wider text-white">FACEBOOK</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Twitter */}
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 bg-[#030712] hover:bg-[#0f172a] transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="font-bold text-xs sm:text-[13px] tracking-wider text-white">TWITTER</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* LinkedIn */}
        <a 
          href="https://linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 bg-[#030712] hover:bg-[#0f172a] transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <span className="font-bold text-xs sm:text-[13px] tracking-wider text-white">LINKEDIN</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* YouTube */}
        <a 
          href="https://youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 bg-[#030712] hover:bg-[#0f172a] transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="font-bold text-xs sm:text-[13px] tracking-wider text-white">YOUTUBE</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

      </div>

      {/* 5. Bottom Clean Bar (Matching Screenshot Bottom with Terms, Privacy, Support, Watch Demo and Copyright) */}
      <div className="bg-white text-gray-600 py-3.5 px-6 sm:px-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium">
          
          {/* Left Links */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            <a href="#faq" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">Support</a>
            <a href="#hero" className="hover:text-gray-900 transition-colors">Watch Demo</a>
          </div>

          {/* Right Copyright */}
          <div className="text-gray-600 font-normal">
            © Copyright 2026, RBSH Studio
          </div>

        </div>
      </div>

    </footer>
  );
}
