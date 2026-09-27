import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function FAQ({ onOpenAskModal }) {
  const [activeTab, setActiveTab] = useState('General');
  const [openIndex, setOpenIndex] = useState(0); // First item open by default matching SS 5

  const categories = ['General', 'Pricing', 'Community'];

  const faqs = {
    General: [
      {
        question: 'Can this UI Kit be used for any chat-based app?',
        answer:
          'Absolutely! This kit is designed to be flexible and works great for AI chatbots, virtual assistants, customer support apps, and more.',
      },
      {
        question: 'Is the file ready to use in Figma?',
        answer:
          'Yes! The file is fully compatible with Figma, featuring auto-layout and well-organized layers for easy customization.',
      },
      {
        question: 'Does it include both Light and Dark modes?',
        answer:
          "Yes, you'll get both Light and Dark theme versions to fit any branding style or user preference.",
      },
    ],
    Pricing: [
      {
        question: 'Can I upgrade or downgrade between tiers anytime?',
        answer:
          'Yes, tier transitions are instantaneous and pro-rated down to the hour within your Aoneix billing console.',
      },
      {
        question: 'How are Meta WhatsApp Cloud API conversations billed?',
        answer:
          'Aoneix links directly via Meta BSP so you pay Meta direct wholesale conversation rates with zero hidden markups.',
      },
      {
        question: 'Do you offer custom SLA agreements for High-Throughput tiers?',
        answer:
          'Yes, our Corporate Enterprise plans include bespoke 99.999% SLA guarantees with dedicated Technical Account Managers.',
      },
    ],
    Community: [
      {
        question: 'Where can developers access SDK documentation and sandbox keys?',
        answer:
          'Instant SDK keys and developer sandbox endpoints are accessible via our API Portal with sample code in Node.js, Python, and Go.',
      },
      {
        question: 'Is there an active developer forum or Discord community?',
        answer:
          'Yes! Join over 4,500 active Meta BSP architects on the official Aoneix Discord and GitHub discussions.',
      },
    ],
  };

  const currentQuestions = faqs[activeTab] || faqs.General;

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading (Matching SS 5) */}
        <h2 className="text-3xl sm:text-5xl font-normal text-emerald-950 text-center tracking-tight mb-10 font-sf">
          Frequently Asked Question
        </h2>

        {/* Filter / Action Pills Row (Matching SS 5) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveTab(cat);
                  setOpenIndex(0); // open first question in selected category
                }}
                className={`px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#62c98d] to-[#88d9a7] text-emerald-950 shadow-sm ring-2 ring-emerald-300/40'
                    : 'bg-[#d8f5e1] hover:bg-[#c6efd3] text-emerald-900'
                }`}
              >
                {cat}
              </button>
            );
          })}

          {/* Ask Question Dark Green CTA Pill (Matching SS 5) */}
          <button
            onClick={onOpenAskModal}
            className="px-8 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#187e46] hover:bg-[#126637] text-white shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Ask Question
          </button>
        </div>

        {/* Accordion Questions List (Matching SS 5) */}
        <div className="space-y-0">
          {currentQuestions.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className="border-b border-[#075e37]/25 py-6 transition-all duration-200"
              >
                {/* Question Header Button */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between text-left group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-brand-primary transition-colors pr-6">
                    {item.question}
                  </h3>

                  <span className="shrink-0 text-gray-400 group-hover:text-emerald-700 transition-colors">
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isOpen ? 'rotate-90 text-emerald-700' : ''
                      }`} 
                    />
                  </span>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="pt-3 pr-8 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
