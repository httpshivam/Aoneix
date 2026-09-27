import React from 'react';
import { MessageSquare, Users, Zap, Webhook, BarChart, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import dashboardImg from '../../assets/whatsapp_automation_dashboard.jpg';

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: <Users className="w-6 h-6 text-[#00c25a]" />,
      title: "Shared Team Inbox",
      desc: "Unify your team's WhatsApp communication. Assign chats, add internal notes, and use custom labels to never miss a follow-up."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#00c25a]" />,
      title: "Smart Automations",
      desc: "Build drag-and-drop workflows to automate welcome messages, qualify leads, and route support tickets without writing a single line of code."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#00c25a]" />,
      title: "Broadcast Campaigns",
      desc: "Send personalized, rich-media bulk messages to segmented audiences safely using official WhatsApp Business APIs."
    },
    {
      icon: <Webhook className="w-6 h-6 text-[#00c25a]" />,
      title: "Seamless Integrations",
      desc: "Connect instantly with HubSpot, Salesforce, Google Sheets, or any custom backend via robust Webhooks and REST APIs."
    },
    {
      icon: <BarChart className="w-6 h-6 text-[#00c25a]" />,
      title: "Advanced Analytics",
      desc: "Track agent performance, message read rates, and campaign ROI with real-time dynamic dashboards."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#00c25a]" />,
      title: "Enterprise Security",
      desc: "Bank-grade encryption, Role-Based Access Control (RBAC), and full compliance with GDPR and local data protection laws."
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-800 text-sm font-medium mb-6 border border-emerald-200">
          <SparklesIcon className="w-4 h-4 text-[#00c25a]" />
          Aoneix Platform Features
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Everything you need to <br className="hidden md:block"/>
          scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c25a] to-[#075e37]">WhatsApp operations</span>.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          From a collaborative shared inbox to complex multi-step automations, Aoneix provides the enterprise-grade tools required to manage customer interactions at scale.
        </p>
      </section>

      {/* Hero Image Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white/50 backdrop-blur-xl p-2 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00c25a]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
          <img 
            src={dashboardImg} 
            alt="Aoneix Automation Dashboard" 
            className="w-full h-auto rounded-xl shadow-inner object-cover"
          />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful capabilities, zero complexity.</h2>
            <p className="text-lg text-gray-600">Built natively on the WhatsApp Business API to guarantee stability and scale.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, idx) => (
              <div key={idx} className="bg-gray-50/50 rounded-2xl p-8 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-emerald-100/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Dive Section */}
      <section className="py-24 bg-[#020617] text-white overflow-hidden relative">
        {/* Background glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-[#00c25a]/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Turn chaotic chats into <br/><span className="text-[#00c25a]">structured tickets.</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Don't let valuable leads or support requests slip through the cracks. Our ticketing system integrates directly with WhatsApp, automatically organizing incoming messages into actionable items.
              </p>
              <ul className="space-y-4">
                {[
                  "Auto-assign tickets based on keywords or departments.",
                  "Set SLAs and escalation rules for fast resolution.",
                  "Internal @mentions and private notes for team collaboration.",
                  "Close tickets with automated CSAT surveys."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#00c25a] shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-10 px-8 py-4 rounded-xl bg-[#00c25a] hover:bg-[#069c4a] text-white font-bold flex items-center gap-2 transition-all">
                Explore Automation <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00c25a] to-emerald-800 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-[#0f172a] border border-gray-800 rounded-2xl p-8 shadow-2xl">
                 <div className="space-y-4">
                   {/* Mock Ticket Cards */}
                   {[
                     { user: "Rajesh Kumar", issue: "Payment failed on checkout", time: "2m ago", status: "Open", color: "bg-red-500/20 text-red-400 border-red-500/30" },
                     { user: "Sarah Jenkins", issue: "Looking for enterprise pricing", time: "15m ago", status: "Assigned", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                     { user: "Amit Patel", issue: "How to integrate API?", time: "1h ago", status: "Resolved", color: "bg-[#00c25a]/20 text-[#00c25a] border-[#00c25a]/30" }
                   ].map((ticket, i) => (
                     <div key={i} className="bg-[#1e293b] border border-gray-700 rounded-xl p-4 flex justify-between items-center hover:border-gray-500 transition-colors cursor-pointer">
                        <div>
                          <div className="font-medium text-white mb-1">{ticket.user}</div>
                          <div className="text-sm text-gray-400">{ticket.issue}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xs font-semibold px-2 py-1 rounded-md border inline-block mb-2 ${ticket.color}`}>
                            {ticket.status}
                          </div>
                          <div className="text-xs text-gray-500">{ticket.time}</div>
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Inline component for Sparkles icon to avoid missing import
function SparklesIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  );
}
