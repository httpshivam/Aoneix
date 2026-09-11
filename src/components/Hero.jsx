import React, { useState, useRef, useEffect } from 'react';
import {
  ExternalLink,
  Check,
  Shield,
  Settings,
  Zap,
  Phone,
  Video,
  ChevronLeft,
  ClipboardCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Lock,
  Send
} from 'lucide-react';
import AoneixLogo from './AoneixLogo';
import faviconImg from '../assets/favicon.png';

export default function Hero({ onOpenAuthModal, onBadgeClick }) {
  // Live Indian Standard Time (IST, GMT+5:30) helper
  const getIndiaTime = (withPeriod = true) => {
    const formatted = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date());

    return withPeriod ? formatted : formatted.replace(/\s*[ap]m/i, '').trim();
  };

  // Real-time automatic clock for phone status bar & chat
  const [livePhoneTime, setLivePhoneTime] = useState(() => getIndiaTime(false));

  useEffect(() => {
    const updateLiveTime = () => {
      setLivePhoneTime(getIndiaTime(false));
    };

    updateLiveTime();
    const timer = setInterval(updateLiveTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Interactive WhatsApp chat state
  const [chatReplies, setChatReplies] = useState([]);
  const [selectedQuickReply, setSelectedQuickReply] = useState(null);
  const [botTyping, setBotTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef(null);

  // Dynamic template variable state
  const [productVar, setProductVar] = useState('Aoneix Luxe Tote');

  // Auto-scroll ONLY inside the phone chat box (NEVER scrolls main window)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatReplies, botTyping]);

  // Intelligent Aoneix service bot knowledge engine
  const getBotResponse = (query) => {
    const q = query.toLowerCase().trim();

    // Pricing / Cost / Plans
    if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('plan') || q.includes('rate') || q.includes('charge') || q.includes('paisa') || q.includes('rupee') || q.includes('kharch')) {
      return {
        text: "💰 *AONEIX Transparent Pricing:*\n• *Standard:* ₹2,199/mo (20 members, standard analytics)\n• *Pro:* ₹4,899/mo (50 members, 24/7 support)\n• *Enterprise:* ₹8,999/mo (Unlimited members, bespoke 99.999% SLA)\nZero Meta markup on direct wholesale conversations!",
        actionText: "Tell me more about Pro Plan",
        actionQuery: "What are the full details of the Professional ₹4899 plan?"
      };
    }

    // Meta API / WABA / Verification / Gateway Onboarding
    if (q.includes('meta') || q.includes('waba') || q.includes('verif') || q.includes('connect') || q.includes('onboard') || q.includes('gateway') || q.includes('bsp') || q.includes('setup') || q.includes('signup')) {
      return {
        text: "⚡ *Meta BSP Verified Gateway:*\nConnect your WhatsApp Business Account (WABA) in under 2 minutes. We provision secure multi-tenant pipelines, phone numbers, and official green-tick verification with zero code.",
        actionText: "Launch Meta Gateway Setup",
        onAction: onOpenAuthModal
      };
    }

    // Services / Features / Capabilities
    if (q.includes('service') || q.includes('feature') || q.includes('kya') || q.includes('offer') || q.includes('what') || q.includes('work') || q.includes('all') || q.includes('batao')) {
      return {
        text: "🚀 *AONEIX Enterprise Services:*\n1. Direct Meta WhatsApp Cloud API Gateway\n2. Real-Time Webhook Router (<45ms dispatch)\n3. Automated Broadcasts & Product Carousels\n4. Multi-agent CRM & Support Inbox\n5. Vault-Grade Multi-Tenant Isolation\n6. Instagram & Messenger DM Sync",
        actionText: "Explain Webhook & Automation Features",
        actionQuery: "How does the Dynamic Webhook Router and automation work?"
      };
    }

    // Webhook / API / SDK / Developers
    if (q.includes('webhook') || q.includes('api') || q.includes('sdk') || q.includes('dev') || q.includes('code') || q.includes('endpoint') || q.includes('speed') || q.includes('latency')) {
      return {
        text: "💻 *Developer Core:*\nEngineered for 10,000 req/sec burst throughput with <45ms dispatch latency. Full SDK support for Node.js, Python, & Go with HMAC SHA-256 cryptographic verification.",
        actionText: "Show Webhook Signature Details",
        actionQuery: "How does HMAC SHA-256 webhook signature verification work?"
      };
    }

    // Security / Privacy / Encryption
    if (q.includes('security') || q.includes('secure') || q.includes('safe') || q.includes('data') || q.includes('privacy') || q.includes('protect') || q.includes('leak') || q.includes('isolate')) {
      return {
        text: "🛡️ *Vault-Grade Security:*\nStrict namespace data isolation, localized VPC peering, dedicated per-tenant AES-256 keys, and zero cross-tenant leak guarantee.",
        actionText: "How does Encryption & Isolation work?",
        actionQuery: "Tell me how tenant data isolation and encryption work in AONEIX"
      };
    }

    // Templates / Catalogs / Broadcasts
    if (q.includes('template') || q.includes('catalog') || q.includes('media') || q.includes('broadcast') || q.includes('image') || q.includes('video') || q.includes('product') || q.includes('tote')) {
      return {
        text: "📦 *Rich Media Templates:*\nPre-compile videos, PDF documents, interactive catalogs, and Quick-Reply buttons with automated Meta compliance checks and instant CDN caching.",
        actionText: "Setup Live Template",
        onAction: onOpenAuthModal
      };
    }

    // Support / Help / Team / Human
    if (q.includes('support') || q.includes('help') || q.includes('contact') || q.includes('team') || q.includes('human') || q.includes('call') || q.includes('madad')) {
      return {
        text: "🤝 *24/7 Enterprise Support:*\nDedicated Technical Account Managers, guaranteed <15min response SLA, and direct Slack/Discord channels with over 4,500+ active Meta BSP architects.",
        actionText: "Connect with Support Specialist",
        onAction: onOpenAuthModal
      };
    }

    // Greetings / Intro
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('namaste') || q.includes('hlo') || q.includes('kaise')) {
      return {
        text: "👋 Namaste! Welcome to AONEIX. I'm your interactive WhatsApp Business assistant. You can ask me about our *Services*, *Pricing*, *Meta Cloud Gateway*, *Webhooks*, or *Security*!",
      };
    }

    // Default intelligent answer
    return {
      text: `✨ AONEIX delivers direct WhatsApp Business Cloud API integration with 99.99% uptime, dynamic webhook routing, and AI-powered broadcasts. Would you like to connect your Meta WABA or inspect our pricing?`,
      actionText: "Connect Meta Gateway Now",
      onAction: onOpenAuthModal
    };
  };

  const handleSendMessage = (e, customText) => {
    if (e) e.preventDefault();
    const query = (customText || inputText).trim();
    if (!query) return;

    const currentTime = getIndiaTime(true);

    // Add user message to chat
    setChatReplies((prev) => [
      ...prev,
      { sender: 'user', text: query, time: currentTime }
    ]);
    setInputText('');

    // Trigger simulated bot typing & reply
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      const botAns = getBotResponse(query);
      setChatReplies((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botAns.text,
          time: getIndiaTime(true),
          actionText: botAns.actionText,
          onAction: botAns.onAction,
          actionLink: botAns.actionLink
        }
      ]);
    }, 650);
  };

  const handleQuickReply = (text) => {
    if (selectedQuickReply) return;
    setSelectedQuickReply(text);

    const currentTime = getIndiaTime(true);

    // Add user response to chat
    setChatReplies((prev) => [...prev, { sender: 'user', text, time: currentTime }]);

    // Trigger simulated bot reply
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      if (text.includes('Yes')) {
        setChatReplies((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: '🎉 Exclusive 15% VIP Access applied! Would you like to reserve yours with 1-click WhatsApp Pay?',
            time: getIndiaTime(true),
            hasAction: true
          }
        ]);
      } else {
        setChatReplies((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'No problem at all! We have saved your preferences. Message us anytime for assistance!',
            time: getIndiaTime(true)
          }
        ]);
      }
    }, 900);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28 bg-gradient-to-b from-[#e8fbf0]/60 via-[#f8fdf9]/30 to-white">
      {/* Background Soft Emerald Radial Blur Glow */}
      <div
        className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-br from-[#00c25a]/15 via-[#86efac]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 left-10 w-[450px] h-[450px] bg-[#dcfce7]/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Two Column Layout: Left Copy & Right Provision Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-14">

          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-7">
            {/* Meta BSP Verified Badge */}
            <button
              onClick={() => onBadgeClick && onBadgeClick('Meta BSP Verified', 'Official Cloud Integration API with 99.99% uptime')}
              className="inline-flex items-center gap-2 bg-[#132c1c] text-white text-xs font-semibold px-4 py-2 rounded-md tracking-wide shadow-sm mb-6 cursor-pointer hover:bg-[#1c3f29] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#00c25a] animate-ping" />
              <span>Meta BSP Verified Cloud Integration API</span>
            </button>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-gray-950 tracking-tight leading-[1.12] mb-6">
              Scale Communications <br />
              Via WhatsApp Business
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
              Connect your multi-tenant workspace configurations directly to Meta's WhatsApp Business Cloud Infrastructure. Broadcast alerts, synchronize chats, automate operations, and track user insights inside a high-throughput pipeline.
            </p>
          </div>

          {/* Right Column: Provision Space Card (Matching SS 1) */}
          <div className="w-full lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-xl shadow-gray-200/60 border border-gray-100 w-full max-w-full lg:max-w-md relative transition-transform hover:-translate-y-0.5 duration-200">

              {/* Card Header */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Provision Space
                </h2>
                <span className="text-[11px] font-semibold bg-[#e0f2fe] text-[#0284c7] px-2.5 py-1 rounded-md">
                  Step 1 of 2
                </span>
              </div>

              {/* Subheading */}
              <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-normal">
                Configure administrative contexts and lock your infrastructure pipelines.
              </p>

              {/* Step 1 Row */}
              <div className="flex items-start gap-3.5 mb-6">
                <div className="w-6 h-6 rounded-full bg-[#075e37] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                    Launch Embedded Gateway Setup
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Authorize RBSH infrastructure parameters to communicate directly with your Meta Business manager records.
                  </p>
                </div>
              </div>

              {/* CTA Button: Authenticate via Meta Channels */}
              <button
                onClick={onOpenAuthModal}
                className="w-full bg-[#00c25a] hover:bg-[#00a84e] text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-200/50 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 fill-white transition-transform group-hover:scale-110" />
                <span>Authenticate via Meta Channels</span>
              </button>

              {/* Card Footer Subtext */}
              <div className="text-center mt-5">
                <p className="text-xs text-gray-500">
                  Already tracking parameters?{' '}
                  <button
                    onClick={onOpenAuthModal}
                    className="font-semibold text-gray-800 hover:text-[#00c25a] transition-colors underline underline-offset-2"
                  >
                    Access Portal
                  </button>
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Interactive Showcase Mockup: Phone & WhatsApp Configure Matrix */}
        <div className="relative mt-8 max-w-5xl mx-auto">

          {/* Floating Badge 1: Instant SDK Handshake (Top Left) */}
          <button
            onClick={() => onBadgeClick && onBadgeClick('Instant SDK Handshake', 'Latency < 45ms direct to Meta WhatsApp endpoints')}
            className="animate-float-1 hidden md:flex absolute -top-6 -left-8 lg:-left-4 z-20 items-center gap-2.5 bg-[#4ed181] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 backdrop-blur-sm border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <div className="p-1 bg-white/20 rounded-md">
              <ExternalLink className="w-4 h-4" />
            </div>
            <span>Instant SDK Handshake</span>
          </button>

          {/* Floating Badge 2: Automated Sync (Top Right of Phone) */}
          <button
            onClick={() => onBadgeClick && onBadgeClick('Automated Sync', 'Full bi-directional WhatsApp Business webhook synchronization')}
            className="animate-float-2 hidden md:flex absolute top-4 right-10 lg:right-24 z-20 items-center gap-2.5 bg-[#173827] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-black/10 border border-emerald-900/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span>Automated Sync</span>
            <div className="p-1 bg-white/10 rounded-md">
              <ClipboardCheck className="w-4 h-4 text-[#86efac]" />
            </div>
          </button>

          {/* Floating Badge 3: Vault-Grade Security (Bottom Center) */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20">
            <button
              onClick={() => onBadgeClick && onBadgeClick('Vault-Grade Security', 'Zero cross-tenant leaks with isolated encryption keys')}
              className="animate-float-3 flex items-center gap-2.5 bg-[#3eb76f] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xl shadow-emerald-600/25 border border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center -space-x-1">
                <Shield className="w-4 h-4 text-white fill-white/30" />
                <Settings className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <span>Vault-Grade Security</span>
            </button>
          </div>

          {/* Main Container with Phone (Left) and WhatsApp Configure (Right) */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 pb-10">

            {/* Left Item: Smartphone WhatsApp Simulation */}
            <div className="w-[300px] sm:w-[325px] bg-[#111827] p-2.5 rounded-[2.5rem] shadow-2xl shadow-emerald-900/20 border-4 border-gray-900 shrink-0">
              {/* Phone Inner Screen */}
              <div className="bg-[#e5ddd5] rounded-[2rem] overflow-hidden flex flex-col h-[530px] border border-gray-700/30 text-gray-900 relative">

                {/* Phone Status Bar */}
                <div className="bg-[#075e37] text-white px-5 pt-2 pb-1 text-[11px] flex justify-between items-center font-medium">
                  <span className="font-semibold tracking-tight">{livePhoneTime}</span>
                  <div className="w-14 h-3.5 bg-black rounded-full mx-auto" />
                  <div className="flex items-center space-x-1.5 text-[10px]">
                    <span>5G</span>
                    <div className="w-2.5 h-2 bg-white rounded-sm" />
                  </div>
                </div>

                {/* WhatsApp Chat Header */}
                <div className="bg-[#075e37] text-white px-3 py-2 flex items-center justify-between shadow-md">
                  <div className="flex items-center space-x-2">
                    <ChevronLeft className="w-5 h-5 cursor-pointer text-white/80 hover:text-white" />
                    {/* Aoneix Favicon Avatar */}
                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 shadow-sm bg-[#163323] flex items-center justify-center">
                      <img 
                        src={faviconImg} 
                        alt="Aoneix Favicon" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5 leading-none">
                        <span className="font-bold text-xs tracking-tight text-white leading-none">AONEIX</span>
                        {/* Meta WhatsApp Official Scalloped Verified Badge */}
                        <svg className="w-3.5 h-3.5 shrink-0 translate-y-[1px]" viewBox="0 0 24 24" fill="none">
                          <path d="M10.52 2.44a2 2 0 0 1 2.96 0l.44.48a2 2 0 0 0 1.62.67l.65-.05a2 2 0 0 1 2.1 2.1l-.05.65a2 2 0 0 1 .67 1.62l.48.44a2 2 0 0 1 0 2.96l-.48.44a2 2 0 0 0-.67 1.62l.05.65a2 2 0 0 1-2.1 2.1l-.65-.05a2 2 0 0 0-1.62.67l-.44.48a2 2 0 0 1-2.96 0l-.44-.48a2 2 0 0 0-1.62-.67l-.65.05a2 2 0 0 1-2.1-2.1l.05-.65a2 2 0 0 0-.67-1.62l-.48-.44a2 2 0 0 1 0-2.96l.48-.44a2 2 0 0 0 .67-1.62l-.05-.65a2 2 0 0 1 2.1-2.1l.65.05a2 2 0 0 0 1.62-.67l.44-.48z" fill="#00C25A"/>
                          <path d="M9 12.5l2 2 4.5-4.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-[10px] text-emerald-200 block mt-0.5">Verified Business</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-white/90">
                    <Video className="w-4 h-4 cursor-pointer hover:text-white" />
                    <Phone className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
                  </div>
                </div>

                {/* Chat Message Scrollable Container */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#e8ece8] relative text-xs"
                >
                  {/* Subtle WhatsApp Wallpaper Pattern Simulation */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(#075e37 0.75px, transparent 0.75px)`,
                      backgroundSize: '12px 12px'
                    }}
                  />

                  {/* Today Badge */}
                  <div className="text-center">
                    <span className="bg-white/90 shadow-sm text-gray-500 text-[10px] font-medium px-2.5 py-0.5 rounded-md">
                      Today
                    </span>
                  </div>

                  {/* WhatsApp Business Template Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative max-w-[270px] mx-auto">
                    {/* Support Agent Avatar Floating */}
                    <div className="absolute top-2 right-2 z-10">
                      <div className="relative">
                        <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-md bg-amber-100">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                            alt="Aoneix Sales Concierge"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#00c25a] rounded-full border border-white flex items-center justify-center">
                          <Check className="w-2 h-2 text-white stroke-[3]" />
                        </div>
                      </div>
                    </div>

                    {/* Product Image: Luxe Brown Tote */}
                    <div className="h-28 bg-[#f5ede3] relative overflow-hidden flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80"
                        alt="Aoneix Luxe Tote Bag"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.parentElement.innerHTML = `
                            <div class="flex flex-col items-center justify-center text-amber-800 p-4">
                              <span class="text-3xl mb-1">👜</span>
                              <span class="text-[10px] font-semibold">Aoneix Luxe Tote</span>
                            </div>
                          `;
                        }}
                      />
                    </div>

                    {/* Message Body */}
                    <div className="p-3 text-gray-800 leading-snug">
                      <p className="font-semibold text-gray-900 mb-1">
                        Introducing the <span className="text-[#075e37]">Aoneix Luxe Tote</span> ✨
                      </p>
                      <p className="text-[11px] text-gray-600">
                        Your new everyday essential—crafted for style, space, and sophistication. Ready to make it yours?
                      </p>
                    </div>

                    {/* Quick Reply Interactive Buttons */}
                    <div className="border-t border-gray-100 divide-y divide-gray-100 text-center text-[11px] font-semibold text-[#00c25a]">
                      <button
                        onClick={() => handleQuickReply('Yes, show me more')}
                        className={`w-full py-2 hover:bg-green-50 transition-colors flex items-center justify-center gap-1.5 ${selectedQuickReply === 'Yes, show me more' ? 'bg-emerald-50 text-emerald-800 font-bold' : ''
                          }`}
                      >
                        <span>Yes, show me more</span>
                      </button>
                      <button
                        onClick={() => handleQuickReply('Maybe later')}
                        className={`w-full py-2 hover:bg-gray-50 text-gray-500 transition-colors ${selectedQuickReply === 'Maybe later' ? 'bg-gray-100 font-bold' : ''
                          }`}
                      >
                        <span>Maybe later</span>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic User & Bot Replies */}
                  {chatReplies.map((reply, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${reply.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                    >
                      <div className={`p-2.5 rounded-xl max-w-[240px] text-[11px] shadow-sm leading-relaxed whitespace-pre-line ${reply.sender === 'user'
                        ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none'
                        : 'bg-white text-gray-900 rounded-tl-none border border-gray-100'
                        }`}>
                        <p>{reply.text}</p>

                        {/* Legacy Quick Reply action */}
                        {reply.hasAction && (
                          <div className="mt-2 pt-1.5 border-t border-emerald-100">
                            <button
                              onClick={onOpenAuthModal}
                              className="w-full bg-[#00c25a] hover:bg-[#00a84e] text-white py-1 rounded text-[10px] font-bold shadow-xs cursor-pointer"
                            >
                              Reserve Now (Instant)
                            </button>
                          </div>
                        )}

                        {/* Interactive Bot Action CTA */}
                        {reply.actionText && (
                          <div className="mt-2 pt-1.5 border-t border-emerald-100">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (reply.onAction) {
                                  reply.onAction();
                                } else if (reply.actionQuery) {
                                  handleSendMessage(null, reply.actionQuery);
                                }
                              }}
                              className="w-full bg-[#00c25a] hover:bg-[#00a84e] text-white py-1.5 px-2 rounded-lg text-[10px] font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <Sparkles className="w-3 h-3 text-amber-200 shrink-0" />
                              <span>{reply.actionText}</span>
                            </button>
                          </div>
                        )}

                        <span className="text-[9px] text-gray-400 block text-right mt-1">
                          {reply.time}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Bot Typing Indicator */}
                  {botTyping && (
                    <div className="flex items-center space-x-1 bg-white p-2 rounded-lg max-w-[60px] shadow-sm">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {/* Quick Topic Suggestion Chips */}
                <div className="px-2 pt-1.5 pb-1 flex items-center gap-1.5 overflow-x-auto bg-[#f0f2f0] border-t border-gray-200/80">
                  {[
                    { label: '💰 Pricing', query: 'What are your pricing plans?' },
                    { label: '⚡ Meta API', query: 'How does Meta API setup work?' },
                    { label: '🚀 Services', query: 'Tell me about all your services' },
                    { label: '💻 Webhook', query: 'What is your webhook latency and SDK support?' },
                    { label: '🛡️ Security', query: 'How secure is your multi-tenant data?' }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(null, chip.query)}
                      className="text-[9px] font-semibold bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 border border-gray-200/90 px-2 py-0.5 rounded-full whitespace-nowrap transition-colors shrink-0 shadow-xs cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Real Interactive Input Form */}
                <form
                  onSubmit={handleSendMessage}
                  className="bg-white p-1.5 border-t border-gray-200 flex items-center gap-1.5 text-[11px] relative z-10"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message (e.g. pricing, services)..."
                    className="flex-1 bg-gray-100 focus:bg-white text-gray-800 placeholder:text-gray-400 text-[11px] px-3 py-1.5 rounded-full border border-gray-200 focus:border-[#00c25a] focus:ring-1 focus:ring-[#00c25a] focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${inputText.trim()
                      ? 'bg-[#00c25a] hover:bg-[#00a84e] text-white cursor-pointer shadow-sm scale-105 active:scale-95'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    title="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>
            </div>

            {/* Right Item: WhatsApp Configure Editor Matrix (Matching SS 1) */}
            <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-xl border border-gray-100 relative">

              {/* Card Mini Header */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00c25a]" />
                  <span className="text-xs font-bold text-gray-800 tracking-tight">WhatsApp Configure</span>
                </div>
                <div className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Template Live
                </div>
              </div>

              {/* Media Preview Box */}
              <div className="rounded-lg bg-[#faf7f2] border border-gray-200 p-2.5 mb-3 flex items-center justify-center h-28 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80"
                  alt="Template Media"
                  className="h-full object-contain mix-blend-multiply"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="absolute bottom-1 right-2 text-[9px] bg-black/40 text-white px-1.5 py-0.5 rounded backdrop-blur-xs">
                  Header: IMAGE
                </span>
              </div>

              {/* Template Body Config */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-gray-700">Body</label>
                    <span className="text-[10px] text-gray-400 font-mono">UTF-8 Verified</span>
                  </div>
                  <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 leading-relaxed text-[11px]">
                    Introducing the Aoneix{' '}
                    <span className="inline-block bg-[#eff6ff] text-[#2563eb] border border-blue-200 px-1 rounded font-mono font-medium text-[10px]">
                      {`{{Product_name}}`}
                    </span>{' '}
                    ✨ Your new everyday essential—crafted for style, space, and sophistication. Ready to make it yours?
                  </div>
                </div>

                {/* Quick Reply Buttons Config */}
                <div>
                  <label className="text-[11px] font-semibold text-gray-700 block mb-1.5">
                    Quick Reply Buttons
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-center text-[10px] font-medium text-gray-700 flex items-center justify-center gap-1">
                      <span>💬 Yes, show me more</span>
                    </div>
                    <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-center text-[10px] font-medium text-gray-700 flex items-center justify-center gap-1">
                      <span>⏳ Maybe later</span>
                    </div>
                  </div>

                  {/* Flow Connector Line and CTA */}
                  <div className="mt-3 pt-2 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 border-b-2 border-emerald-400" />
                    <button
                      onClick={onOpenAuthModal}
                      className="bg-[#6366f1] hover:bg-[#4f46e5] text-white text-[11px] font-medium px-4 py-1.5 rounded-lg shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 mx-auto"
                    >
                      <Sparkles className="w-3 h-3 text-amber-200" />
                      <span>Set your automation</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
