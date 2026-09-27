import React, { useState } from 'react';
import { Plus, X, Shield, Server, CreditCard, MessageSquare } from 'lucide-react';
import securityLockImg from '../../assets/enterprise_security_lock.jpg';

export default function EnterpriseFAQPage({ onOpenAskModal }) {
  const [openId, setOpenId] = useState('sec-1');

  const faqs = [
    {
      category: "Security & Compliance",
      icon: <Shield className="w-5 h-5" />,
      items: [
        { id: 'sec-1', q: "Are our WhatsApp conversations encrypted?", a: "Yes, all messages routed through Aoneix utilize WhatsApp's official end-to-end encryption. Aoneix servers operate with AES-256 encryption at rest and TLS 1.3 in transit." },
        { id: 'sec-2', q: "Is Aoneix GDPR compliant?", a: "Absolutely. We provide full GDPR compliance, including right-to-erasure workflows, data residency options (EU/US servers), and DPA agreements." },
        { id: 'sec-3', q: "Do you offer Role-Based Access Control (RBAC)?", a: "Yes, our Enterprise plan includes granular RBAC. You can restrict agents from viewing specific phone numbers, exporting contacts, or modifying automation logic." }
      ]
    },
    {
      category: "API & Integrations",
      icon: <Server className="w-5 h-5" />,
      items: [
        { id: 'api-1', q: "Can I connect my own CRM?", a: "Aoneix offers native integrations with HubSpot, Salesforce, and Zoho. For custom CRMs, you can use our comprehensive REST API and bidirectional Webhooks." },
        { id: 'api-2', q: "What is the API rate limit?", a: "Standard plans support up to 50 API requests per second. Enterprise plans include dedicated infrastructure with custom rate limits based on your throughput needs." }
      ]
    },
    {
      category: "Billing & Numbers",
      icon: <CreditCard className="w-5 h-5" />,
      items: [
        { id: 'bill-1', q: "Can I migrate an existing WhatsApp number?", a: "Yes. If your number is not currently tied to the official WhatsApp Business API, we can port it seamlessly without downtime." },
        { id: 'bill-2', q: "Are Meta's conversation charges included?", a: "Meta charges per-conversation fees (marketing, utility, service, etc.). These fees are passed through to you at cost, separate from your Aoneix platform subscription." }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Enterprise <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c25a] to-[#075e37]">FAQ.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Everything you need to know about platform security, API capabilities, compliance, and billing.
        </p>
      </section>

      {/* FAQ Content - Stacked Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-16 relative z-20 space-y-12">
        {faqs.map((group, gIdx) => (
          <div key={gIdx} className="bg-[#f4f6f8] rounded-[3rem] p-8 md:p-12 shadow-xl border border-white/50">
            
            {/* Group Header matching the mockup styling */}
            <div className="flex flex-col items-center justify-center mb-10">
              <div className="bg-white rounded-full px-3 py-1 text-[10px] font-bold text-gray-500 flex items-center gap-2 uppercase tracking-widest mb-4 shadow-sm">
                <span className="text-gray-400">0{gIdx + 1}</span>
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                {group.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                {group.icon} {group.category}
              </h2>
            </div>
            
            <div className="space-y-4">
              {group.items.map((item, index) => {
                const isOpen = openId === item.id;
                
                return (
                  <div 
                    key={item.id} 
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'bg-white rounded-[2rem] border border-blue-200/50 shadow-md' 
                        : 'bg-gray-200/60 rounded-full hover:bg-gray-200'
                    }`}
                  >
                    <button 
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full flex items-center p-4 md:px-6 focus:outline-none"
                    >
                      {/* Number Pill */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mr-4 shrink-0 transition-colors ${
                        isOpen ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 shadow-sm'
                      }`}>
                        {index + 1}
                      </div>
                      
                      {/* Question Text */}
                      <span className={`font-semibold text-left pr-4 ${isOpen ? 'text-gray-900' : 'text-gray-800'}`}>
                        {item.q}
                      </span>
                      
                      {/* Toggle Icon */}
                      <div className={`ml-auto w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? 'border border-gray-200 bg-white text-gray-500 rotate-90' : 'bg-gray-900 text-white'
                      }`}>
                        {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    {/* Answer Content */}
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden px-6 md:px-20 ${
                        isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-500 leading-relaxed text-sm md:text-base">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Fallback Question Section (Full Width) */}
      <section className="mt-24 relative overflow-hidden bg-[#bbf7d0]/80 py-24 text-center border-t border-[#86efac]/50">
        <div className="absolute inset-0 bg-gradient-to-br from-[#75dc97]/30 to-transparent pointer-events-none" />
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <MessageSquare className="w-16 h-16 text-emerald-950 mx-auto mb-6 opacity-90" />
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Have more questions?</h3>
          <p className="text-emerald-950/80 text-lg mb-10 max-w-2xl mx-auto">
            Our enterprise solutions team is ready to discuss your custom infrastructure and compliance needs.
          </p>
          <button 
            onClick={onOpenAskModal}
            className="px-8 py-4 rounded-xl bg-[#75dc97] hover:bg-[#5fcf84] text-emerald-950 font-bold transition-all shadow-md hover:shadow-lg active:scale-95 inline-flex items-center gap-2"
          >
            Contact Solutions Team
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

    </div>
  );
}
