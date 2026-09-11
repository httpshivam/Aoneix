import React, { useState } from 'react';
import { Check, Terminal, Share2, Building2, Sparkles, ArrowRight } from 'lucide-react';

export default function Pricing({ onSelectPlan }) {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  const plans = [
    {
      id: 'standard',
      name: 'Standard Development Workspace',
      badge: null,
      icon: Terminal,
      monthlyPrice: '₹2199',
      annualPrice: '₹1759',
      priceSuffix: '/month',
      description: 'Standard features',
      cardBg: 'bg-white text-gray-900 border border-gray-200/90 shadow-xl',
      titleColor: 'text-gray-900',
      priceColor: 'text-gray-950',
      dividerColor: 'border-gray-100',
      labelColor: 'text-gray-900 font-semibold',
      checkColor: 'bg-[#00c25a] text-white',
      itemTextColor: 'text-gray-700',
      buttonStyle: 'bg-[#48ce7d] hover:bg-[#3bbf6e] text-white font-semibold',
      features: [
        'Business hours support',
        'Standard analytics',
        'Monthly reports',
        'Up to 20 members',
      ],
    },
    {
      id: 'pro',
      name: 'Professional Growth Cluster',
      badge: 'Popular',
      icon: Share2,
      monthlyPrice: '₹4899',
      annualPrice: '₹3919',
      priceSuffix: '/month',
      description: 'Profesional features',
      cardBg: 'bg-[#4cd37e] text-gray-950 shadow-2xl scale-105 z-10 border border-emerald-400/40',
      titleColor: 'text-gray-950',
      priceColor: 'text-gray-950',
      dividerColor: 'border-black/10',
      labelColor: 'text-gray-950 font-bold',
      checkColor: 'bg-[#0a5c36] text-white',
      itemTextColor: 'text-gray-950 font-medium',
      buttonStyle: 'bg-[#0a5c36] hover:bg-[#074b2b] text-white font-bold',
      features: [
        '24/7 Customer support',
        'Advanced analytics',
        'Weekly reports',
        'Up to 50 members',
      ],
    },
    {
      id: 'enterprise',
      name: 'High-Throughput Corporate Space',
      badge: null,
      icon: Building2,
      monthlyPrice: 'Custom Tier',
      annualPrice: 'Custom Tier',
      priceSuffix: '',
      description: 'Enterprise features',
      cardBg: 'bg-[#0a5c36] text-white shadow-xl border border-emerald-800',
      titleColor: 'text-white',
      priceColor: 'text-white',
      dividerColor: 'border-white/15',
      labelColor: 'text-white font-semibold',
      checkColor: 'bg-[#00c25a] text-gray-950',
      itemTextColor: 'text-emerald-100',
      buttonStyle: 'bg-[#3ecf8e] hover:bg-[#2fc481] text-gray-950 font-bold',
      features: [
        '24/7 Priority support',
        'Customized analytics',
        'Custom reports',
        'Scalable members',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#faf7f2] relative overflow-hidden">
      
      {/* Decorative Watermark Curved Arrows (Matching SS 4 background) */}
      <div 
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-20 text-[#c8bfb0]" 
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="12" className="w-full h-full">
          <path d="M 40,160 A 70,70 0 1,1 160,100" strokeLinecap="round" />
          <path d="M 140,80 L 160,100 L 140,120" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div 
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-20 text-[#c8bfb0]" 
        aria-hidden="true"
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="12" className="w-full h-full">
          <path d="M 160,40 A 70,70 0 1,1 40,100" strokeLinecap="round" />
          <path d="M 60,120 L 40,100 L 60,80" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#141b2d] tracking-tight mb-6">
            Transparent Tier Architectures
          </h2>

          {/* Billing Cycle Toggle (Monthly / Annual) Matching SS 4 */}
          <div className="inline-flex items-center bg-[#eae4d8]/60 p-1.5 rounded-full border border-gray-300/60 shadow-inner">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-[#57cf84] text-gray-950 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#57cf84] text-gray-950 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-[#075e37] text-white px-1.5 py-0.5 rounded-full font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const IconComp = plan.icon;
            const currentPrice = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${plan.cardBg}`}
              >
                <div>
                  {/* Top Row: Title + Icon / Badge */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <h3 className={`text-base sm:text-lg font-bold leading-snug ${plan.titleColor} max-w-[170px]`}>
                      {plan.name}
                    </h3>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {plan.badge && (
                        <span className="bg-[#183626] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                          {plan.badge}
                        </span>
                      )}
                      <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="my-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-sf ${plan.priceColor}`}>
                        {currentPrice}
                      </span>
                      {plan.priceSuffix && (
                        <span className={`text-xs sm:text-sm font-medium ${plan.id === 'pro' ? 'text-gray-900' : 'text-gray-500'}`}>
                          {plan.priceSuffix}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'annual' && plan.priceSuffix && (
                      <span className="text-[10px] text-emerald-800 font-semibold block mt-0.5">
                        Billed annually (Save 20%)
                      </span>
                    )}
                  </div>

                  {/* Divider Line */}
                  <div className={`w-full border-t my-5 ${plan.dividerColor}`} />

                  {/* Features Label */}
                  <h4 className={`text-xs sm:text-sm mb-4 ${plan.labelColor}`}>
                    {plan.description}
                  </h4>

                  {/* Checklist Items */}
                  <ul className="space-y-3 mb-8 text-xs sm:text-sm">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.checkColor}`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className={plan.itemTextColor}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div>
                  <button
                    onClick={() => {
                      if (onSelectPlan) onSelectPlan(plan);
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95 text-center block ${plan.buttonStyle}`}
                  >
                    Get started
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
