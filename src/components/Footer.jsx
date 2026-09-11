import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenAuthModal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <AoneixLogo className="h-8" variant="white" />
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Meta BSP Verified Cloud Integration API. High-throughput WhatsApp Business infrastructure for modern enterprise teams.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#075e37]/40 border border-[#00c25a]/30 text-emerald-300 text-xs px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-[#00c25a]" />
              <span>Official Meta Business Partner Verified</span>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs text-gray-400 block mb-2 font-medium">Subscribe to API Release Notes</span>
              {subscribed ? (
                <div className="text-xs text-[#00c25a] flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed to developer changelog!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-900 border border-gray-800 text-xs text-white rounded-lg px-3 py-2 flex-1 focus:outline-none focus:border-brand-primary"
                  />
                  <button
                    type="submit"
                    className="bg-[#00c25a] hover:bg-[#00a84e] text-gray-950 font-bold px-3.5 py-2 rounded-lg text-xs transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Nav Col 1: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Platform</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Dashboard Matrix</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Webhook Router</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Namespace Isolation</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Rich Media Engine</a></li>
              <li><a href="#metrics" className="hover:text-white transition-colors">Live Latency Telemetry</a></li>
            </ul>
          </div>

          {/* Nav Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Solutions</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#pricing" className="hover:text-white transition-colors">E-Commerce Retargeting</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Customer Care AI</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Transactional Alerts</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Marketing Campaigns</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Enterprise SLA</a></li>
            </ul>
          </div>

          {/* Nav Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Resources</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#faq" className="hover:text-white transition-colors">Developer Docs</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">SDKs & Postman</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">System Status</a></li>
              <li>
                <button 
                  onClick={onOpenAuthModal}
                  className="text-[#00c25a] hover:underline font-semibold"
                >
                  Meta Embedded Signup →
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Aoneix Technologies Inc. All rights reserved. Meta, WhatsApp, and Facebook are trademarks of Meta Platforms, Inc.</p>
          
          <div className="flex items-center space-x-6">
            <a href="#faq" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#faq" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#faq" className="hover:text-gray-300 transition-colors">Security & ISO 27001</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
