import React, { useState } from 'react';
import { Check, X, Shield, Zap, Sparkles } from 'lucide-react';

export default function PricingPage({ onSelectPlan }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      desc: "For small teams just getting started with WhatsApp.",
      priceMonthly: 49,
      priceAnnual: 39,
      features: [
        "1 WhatsApp Number",
        "Up to 3 Team Members",
        "Shared Team Inbox",
        "Basic Auto-Replies",
        "Standard Support"
      ],
      missing: [
        "API Access",
        "Advanced Analytics",
        "Role-Based Access Control"
      ],
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Growth",
      desc: "For scaling businesses needing automation and API.",
      priceMonthly: 149,
      priceAnnual: 119,
      features: [
        "Up to 3 WhatsApp Numbers",
        "Up to 10 Team Members",
        "Advanced Workflows & Routing",
        "Full API & Webhooks",
        "Basic Analytics Dashboard",
        "Priority Email Support"
      ],
      missing: [
        "Dedicated Success Manager",
        "Custom Integrations"
      ],
      popular: true,
      cta: "Get Started"
    },
    {
      name: "Enterprise",
      desc: "For large organizations with complex security needs.",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      features: [
        "Unlimited WhatsApp Numbers",
        "Unlimited Team Members",
        "Role-Based Access Control (RBAC)",
        "Custom CRM Integrations",
        "Dedicated Success Manager",
        "24/7 Phone Support",
        "Enterprise SLAs & Uptime Guarantee"
      ],
      missing: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Simple, transparent <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c25a] to-[#075e37]">pricing.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          No hidden fees. No surprise charges. Choose the plan that scales with your business needs.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-[#00c25a] relative transition-colors focus:outline-none"
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all ${isAnnual ? 'left-8' : 'left-1'}`} />
          </button>
          <span className={`text-sm font-semibold ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
            Annually <span className="text-[#00c25a] text-xs bg-emerald-100 px-2 py-0.5 rounded-full ml-1">Save 20%</span>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white rounded-3xl p-8 border ${plan.popular ? 'border-[#00c25a] shadow-2xl shadow-emerald-500/10 scale-105' : 'border-gray-200 shadow-xl shadow-gray-200/50'} flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00c25a] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm h-10">{plan.desc}</p>
              </div>

              <div className="mb-8">
                {plan.priceMonthly === "Custom" ? (
                  <div className="text-4xl font-black text-gray-900 tracking-tight">Custom</div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900 tracking-tight">${isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                    <span className="text-gray-500 font-medium">/mo</span>
                  </div>
                )}
                {plan.priceMonthly !== "Custom" && isAnnual && (
                  <div className="text-sm text-[#00c25a] font-medium mt-1">Billed ${plan.priceAnnual * 12} yearly</div>
                )}
              </div>

              <button 
                onClick={() => onSelectPlan && onSelectPlan(plan.name.toLowerCase())}
                className={`w-full py-4 rounded-xl font-bold text-center transition-all mb-8 ${plan.popular ? 'bg-[#00c25a] text-white hover:bg-[#069c4a] shadow-lg shadow-emerald-500/25' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
              >
                {plan.cta}
              </button>

              <div className="flex-1 space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={`f-${i}`} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00c25a] shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.missing.map((feature, i) => (
                  <div key={`m-${i}`} className="flex items-start gap-3 opacity-50">
                    <X className="w-5 h-5 text-gray-400 shrink-0" />
                    <span className="text-gray-500 text-sm line-through">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="bg-[#bbf7d0]/80 py-24 relative overflow-hidden border-t border-[#86efac]/50">
        <div className="absolute inset-0 bg-gradient-to-br from-[#75dc97]/30 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Shield className="w-16 h-16 text-emerald-950 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Need a custom enterprise setup?</h2>
          <p className="text-emerald-950/80 text-lg mb-10">
            For deployments requiring dedicated infrastructure, strict compliance frameworks, and white-glove onboarding.
          </p>
          <button className="px-8 py-4 rounded-xl bg-[#75dc97] hover:bg-[#5fcf84] text-emerald-950 font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
            Contact Enterprise Sales
          </button>
        </div>
      </section>

    </div>
  );
}
