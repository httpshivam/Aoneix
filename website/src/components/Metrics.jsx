
import React, { useEffect, useState, useRef } from 'react';

export default function Metrics() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Animated counters
  const [uptime, setUptime] = useState(90.0);
  const [payloads, setPayloads] = useState(0);
  const [latency, setLatency] = useState(400);
  const [tenants, setTenants] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate uptime to 99.99
          let uptimeVal = 95.0;
          const uptimeTimer = setInterval(() => {
            uptimeVal += 0.35;
            if (uptimeVal >= 99.99) {
              setUptime(99.99);
              clearInterval(uptimeTimer);
            } else {
              setUptime(parseFloat(uptimeVal.toFixed(2)));
            }
          }, 40);

          // Animate payloads to 45
          let payloadVal = 0;
          const payloadTimer = setInterval(() => {
            payloadVal += 3;
            if (payloadVal >= 45) {
              setPayloads(45);
              clearInterval(payloadTimer);
            } else {
              setPayloads(payloadVal);
            }
          }, 35);

          // Animate latency down to 220
          let latVal = 380;
          const latTimer = setInterval(() => {
            latVal -= 12;
            if (latVal <= 220) {
              setLatency(220);
              clearInterval(latTimer);
            } else {
              setLatency(latVal);
            }
          }, 30);

          // Animate tenants to 140
          let tenantVal = 0;
          const tenantTimer = setInterval(() => {
            tenantVal += 10;
            if (tenantVal >= 140) {
              setTenants(140);
              clearInterval(tenantTimer);
            } else {
              setTenants(tenantVal);
            }
          }, 35);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const metricsData = [
    {
      value: `${uptime.toFixed(2)}%`,
      label: 'API Uptime Guarantee SLA',
    },
    {
      value: `${payloads}M+`,
      label: 'Dispatched Data Payloads Daily',
    },
    {
      value: `< ${latency}ms`,
      label: 'Worldwide Request Latency',
    },
    {
      value: `${tenants}+`,
      label: 'Enterprise Network Tenants Connected',
    },
  ];

  return (
    <section 
      id="metrics" 
      ref={sectionRef} 
      className="bg-[#075e37] py-16 sm:py-20 text-white relative overflow-hidden border-y border-[#0a5c36]"
    >
      {/* Background subtle radial spotlight */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #22c55e 0%, transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
          {metricsData.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
            >
              {/* Stat Big Number (Matching SS 3) */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 font-sf">
                {item.value}
              </div>

              {/* Sub-label */}
              <div className="text-xs sm:text-sm font-medium text-emerald-100/90 tracking-wide max-w-[220px]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
