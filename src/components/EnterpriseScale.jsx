import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Activity, Layers, Cpu, Database, BarChart3, MessageSquare } from 'lucide-react';

export default function EnterpriseScale({ onSelectFeature }) {
  // Active accordion column (default to index 0: "Advanced Dashboard Matrix" matching SS 2)
  const [activeIndex, setActiveIndex] = useState(0);

  const columns = [
    {
      id: 'matrix',
      title: 'Advanced Dashboard Matrix',
      description: 'Monitor global deployment, tracking nodes, webhook feedback, and message performance stats via our data suite.',
      tag: 'Global Telemetry',
      icon: Activity,
      stat: '99.999% Sync',
    },
    {
      id: 'router',
      title: 'Dynamic Webhook Router',
      description: 'Event-driven high-availability dispatch engine with HMAC SHA-256 signature verification, microsecond routing, and zero data loss guarantee.',
      tag: 'Low-Latency Core',
      icon: Cpu,
      stat: '< 45ms Dispatch',
    },
    {
      id: 'isolate',
      title: 'Isolate Namespace Data',
      description: 'Cryptographically enforce strict multi-tenant boundaries, isolated encryption keys, and localized VPC peering compliance.',
      tag: 'Tenant Security',
      icon: ShieldCheck,
      stat: 'Zero Cross-Leak',
    },
    {
      id: 'media',
      title: 'Rich Media Assets Template',
      description: 'Pre-compile video, image, document, and interactive catalog payloads with global CDN caching and automated Meta compliance checks.',
      tag: 'Meta CDN Ready',
      icon: Layers,
      stat: '100% Validated',
    },
    {
      id: 'ratelimit',
      title: 'High Rate-Limit Threshold',
      description: 'Engineered for burst volumes up to 10,000 requests/sec with adaptive token bucket queuing and automated backpressure mitigation.',
      tag: 'Burst Handling',
      icon: Database,
      stat: '10K Req/Sec',
    },
    {
      id: 'tracking',
      title: 'Real-Time Tracking Insights',
      description: 'Sub-second delivery receipts, read state analytics, CTR conversions, and full customer lifecycle funnels with automated alerting.',
      tag: 'Analytics Suite',
      icon: BarChart3,
      stat: 'Real-Time Telemetry',
    },
  ];

  return (
    <section id="features" className="py-20 bg-[#eaf8ef]/50 relative overflow-hidden">

      {/* Animated Background Line Grid with Motion Blur & Decreased Opacity */}
      <div className="enterprise-grid-container" aria-hidden="true">
        <div className="enterprise-grid-animated" />
        <div className="enterprise-grid-motion-blur" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header with Pill Badge (Matching SS 2) */}
        <div className="text-center max-w-3xl mx-auto mb-12">

          {/* Engineered [Badge] For Enterprise Scale */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-950 tracking-tight">
              Engineered
            </h2>

            {/* Centered Graphic Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1b7a43] text-white px-3 sm:px-4 py-1.5 rounded-full shadow-md border-2 border-[#86efac]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-white shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Enterprise WhatsApp Specialist"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold pr-1">
                <MessageSquare className="w-3.5 h-3.5 fill-[#25d366] text-white" />
                <span className="tracking-wide">WhatsApp Scale</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-gray-950 tracking-tight">
              For Enterprise Scale
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            RBSH bridges structural data pools with mobile chat access, ensuring high throughput, rigorous isolation, and data integrity.
          </p>
        </div>

        {/* Interactive Horizontal Accordion Matrix (Matching SS 2 Layout) */}
        <div className="border-2 border-black rounded-xl overflow-hidden shadow-2xl bg-black">
          {/* Desktop & Tablet Flex View */}
          <div className="hidden md:flex min-h-[360px] h-[380px] w-full divide-x-2 divide-black">
            {columns.map((col, index) => {
              const isActive = activeIndex === index;
              const IconComp = col.icon;

              return (
                <div
                  key={col.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`relative cursor-pointer transition-all duration-300 ease-out select-none flex flex-col justify-between ${isActive
                      ? 'flex-[3.5] bg-[#0a5c36] text-white p-8 lg:p-10 shadow-inner'
                      : 'flex-1 bg-[#d8f5e1] hover:bg-[#c6efd3] text-gray-950 p-4 items-center'
                    }`}
                >
                  {isActive ? (
                    /* Active Expanded Column Content (Matching SS 2 Active Card) */
                    <div className="flex flex-col justify-between h-full animate-in fade-in zoom-in-95 duration-200">
                      <div>
                        {/* Status Tag */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-white/15 text-[#86efac] px-3 py-1 rounded-full border border-white/10">
                            <IconComp className="w-3.5 h-3.5" />
                            {col.tag}
                          </span>
                          <span className="text-xs font-mono text-emerald-200">
                            Node {index + 1} / {columns.length}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
                          {col.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm lg:text-base text-emerald-100/90 leading-relaxed max-w-md">
                          {col.description}
                        </p>
                      </div>

                      {/* Bottom Footer with Stat and Arrow Icon Button */}
                      <div className="flex items-end justify-between pt-6 border-t border-white/15 mt-4">
                        <div>
                          <span className="text-[11px] text-emerald-300 block uppercase font-medium tracking-wider">Metric Standard</span>
                          <span className="text-base font-bold text-white font-mono">{col.stat}</span>
                        </div>

                        {/* White Arrow Icon Button (Matching SS 2) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectFeature) onSelectFeature(col);
                          }}
                          className="w-12 h-12 rounded-xl bg-white hover:bg-emerald-50 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
                          aria-label={`Explore ${col.title}`}
                        >
                          <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Inactive Collapsed Vertical Column (Matching SS 2 Vertical Text) */
                    <div className="flex flex-col items-center justify-between h-full w-full py-4">
                      {/* Top Node Indicator */}
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0a5c36]" />

                      {/* Rotated Vertical Title */}
                      <div className="my-auto py-2">
                        <span className="vertical-text text-base lg:text-lg font-bold tracking-tight text-gray-950 uppercase sm:normal-case whitespace-nowrap">
                          {col.title}
                        </span>
                      </div>

                      {/* Bottom Icon */}
                      <div className="w-7 h-7 rounded-lg bg-black/5 flex items-center justify-center text-gray-800">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Accordion View (Stacked) */}
          <div className="md:hidden divide-y-2 divide-black bg-[#d8f5e1]">
            {columns.map((col, index) => {
              const isActive = activeIndex === index;
              const IconComp = col.icon;

              return (
                <div key={col.id} className="transition-colors">
                  <button
                    onClick={() => setActiveIndex(isActive ? -1 : index)}
                    className={`w-full p-4 flex items-center justify-between text-left ${isActive ? 'bg-[#0a5c36] text-white' : 'hover:bg-[#c6efd3] text-gray-950'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20 text-white' : 'bg-black/10 text-gray-900'
                        }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm sm:text-base">{col.title}</span>
                    </div>
                    <ArrowUpRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90 text-white' : 'text-gray-700'}`} />
                  </button>

                  {isActive && (
                    <div className="p-5 bg-[#0a5c36] text-white border-t border-white/10 space-y-3 animate-in slide-in-from-top-2 duration-150">
                      <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                        {col.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs font-mono text-emerald-300 font-semibold">{col.stat}</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white">{col.tag}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
