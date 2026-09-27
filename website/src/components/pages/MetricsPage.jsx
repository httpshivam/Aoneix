import React from 'react';
import { TrendingUp, Clock, Target, ArrowRight } from 'lucide-react';
import metricsImg from '../../assets/analytics_metrics_chart.jpg';

export default function MetricsPage() {
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6 text-[#00c25a]" />,
      value: "340%",
      label: "Average ROI",
      desc: "Companies see a massive return on investment within the first 6 months of automating their WhatsApp workflows."
    },
    {
      icon: <Clock className="w-6 h-6 text-[#00c25a]" />,
      value: "< 2 mins",
      label: "Response Time",
      desc: "Drop your first-response time from hours to seconds with intelligent routing and auto-replies."
    },
    {
      icon: <Target className="w-6 h-6 text-[#00c25a]" />,
      value: "85%",
      label: "Resolution Rate",
      desc: "Increase first-contact resolution rates by empowering agents with full context and CRM data."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Data that drives <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c25a] to-[#075e37]">decisions.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Stop guessing. Aoneix gives you real-time visibility into your team's performance, campaign ROI, and customer engagement across all WhatsApp channels.
        </p>
      </section>

      {/* Hero Image Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,194,90,0.3)] border border-gray-200 p-2 bg-[#020617]">
          <img 
            src={metricsImg} 
            alt="Aoneix Analytics Chart" 
            className="w-full h-auto rounded-xl shadow-inner object-cover opacity-90"
          />
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="relative">
                <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-100/50 rounded-xl flex items-center justify-center -translate-y-6 translate-x-6 z-10 shadow-sm">
                  {stat.icon}
                </div>
                <div className="bg-white rounded-2xl p-8 pt-12 border border-gray-100 shadow-xl shadow-gray-200/20 hover:-translate-y-1 transition-transform">
                  <div className="text-5xl font-black text-gray-900 mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-lg font-bold text-[#00c25a] mb-4">{stat.label}</div>
                  <p className="text-gray-600 leading-relaxed">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-emerald-50 rounded-[100%] blur-3xl opacity-50" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            "Aoneix gave us the analytics we were completely blind to. Our support team's efficiency doubled in 3 weeks."
          </h2>
          <p className="text-gray-500 font-medium mb-10">— Director of Customer Success, TechCorp</p>
          
          <button className="px-8 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold flex items-center gap-2 transition-all mx-auto shadow-xl shadow-gray-900/20">
            View Live Dashboard Demo <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
}
