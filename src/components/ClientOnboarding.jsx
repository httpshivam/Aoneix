import React, { useState } from 'react';
import AoneixLogo from './AoneixLogo';
import { 
  ArrowLeft, 
  Check, 
  ChevronDown, 
  Headphones, 
  Send, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ClientOnboarding({ onBack, onComplete, showToast }) {
  const [step, setStep] = useState(1);

  // Step 1 States
  const [primaryChannel, setPrimaryChannel] = useState('whatsapp');
  const [usingWhatsAppForBusiness, setUsingWhatsAppForBusiness] = useState('yes');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Interakt (Haptik)']);
  const [metaVerified, setMetaVerified] = useState('');
  const [hasFacebookAccount, setHasFacebookAccount] = useState('yes');

  // Step 2 States
  const [selectedUseCases, setSelectedUseCases] = useState(['marketing', 'sales']);
  const [teamSize, setTeamSize] = useState('4-10');
  const [dataStorage, setDataStorage] = useState(['Shopify', 'HubSpot']);
  const [aiTools, setAiTools] = useState(['ChatGPT', 'Gemini']);
  
  // Loading & Provisioning animation
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisioningStep, setProvisioningStep] = useState(0);

  // Platform Pill options (Screenshot 1 & 2)
  const platformOptions = [
    'Interakt (Haptik)',
    'AiSensy',
    'Gupshup',
    'Gallabox',
    'Doubletick',
    'Hellocharles',
    '360 Dialog',
    'Klaviyo',
    'RD Station',
    'MessageBird',
    'WhatsApp for Business mobile app',
    'Others'
  ];

  // Data Storage options (Screenshot 3 & 4)
  const dataStorageOptions = [
    'Shopify',
    'WooCommerce',
    'HubSpot',
    'Salesforce',
    'Zoho',
    'ActiveCampaign',
    'RD Station',
    'Pipedrive',
    'Google Sheets',
    'Others'
  ];

  // AI Tools options (Screenshot 3 & 4)
  const aiToolsOptions = [
    'Claude',
    'ChatGPT',
    'Microsoft Copilot',
    'Gemini',
    'Others',
    'Still exploring AI'
  ];

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const toggleUseCase = (id) => {
    if (selectedUseCases.includes(id)) {
      if (selectedUseCases.length === 1) return; // keep at least one
      setSelectedUseCases(selectedUseCases.filter(u => u !== id));
    } else {
      setSelectedUseCases([...selectedUseCases, id]);
    }
  };

  const toggleDataStorage = (item) => {
    if (dataStorage.includes(item)) {
      setDataStorage(dataStorage.filter(d => d !== item));
    } else {
      setDataStorage([...dataStorage, item]);
    }
  };

  const toggleAiTool = (tool) => {
    if (aiTools.includes(tool)) {
      setAiTools(aiTools.filter(t => t !== tool));
    } else {
      setAiTools([...aiTools, tool]);
    }
  };

  const handleStep1Continue = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = () => {
    setIsProvisioning(true);
    setProvisioningStep(1);

    setTimeout(() => {
      setProvisioningStep(2);
    }, 800);

    setTimeout(() => {
      setProvisioningStep(3);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (_) {}
    }, 1600);

    setTimeout(() => {
      setIsProvisioning(false);
      if (showToast) {
        showToast('🎉 Welcome to Aoneix! Your 7-day trial workspace is fully provisioned.');
      }
      if (onComplete) onComplete();
      else if (onBack) onBack();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sf flex flex-col justify-between select-none">
      
      {/* Top Fixed Header with Centered Logo & Step Progress Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between relative">
          
          {/* Left: Back button */}
          <div className="flex items-center z-10">
            <button
              type="button"
              onClick={() => {
                if (step === 2) setStep(1);
                else if (onBack) onBack();
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors py-1 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Back</span>
            </button>
          </div>

          {/* Center: Absolute 50% Dead Center Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <button 
              type="button" 
              onClick={onBack} 
              className="focus:outline-none transition-transform hover:scale-105"
              title="Return to Home"
            >
              <AoneixLogo className="h-7 sm:h-8" />
            </button>
          </div>

          {/* Right: Step Pill Badge */}
          <div className="flex items-center justify-end z-10">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
              Step {step} of 2
            </span>
          </div>
        </div>

        {/* Thin Progress Indicator Line */}
        <div className="w-full h-1 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-[#00c25a] to-[#075e37] transition-all duration-300 ease-out"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12">
        
        {/* STEP 1: How do you connect with your customers? */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* Header Titles matching Screenshot 1 */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight mb-2">
                How do you connect with <br className="hidden sm:inline" />
                <span className="text-[#00c25a]">your customers?</span>
              </h1>
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                What's your primary channel for customer conversations?
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                You can set up other channels later
              </p>
            </div>

            {/* 4 Primary Channel Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              
              {/* WhatsApp Card */}
              <div 
                onClick={() => setPrimaryChannel('whatsapp')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all relative border-2 ${
                  primaryChannel === 'whatsapp'
                    ? 'border-[#00c25a] bg-[#ecfdf5] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {primaryChannel === 'whatsapp' && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#00c25a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5">
                  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M12.004 2c-5.518 0-9.998 4.476-9.998 9.995 0 1.761.459 3.479 1.331 4.992l-1.417 5.176 5.305-1.391c1.458.796 3.102 1.218 4.779 1.218 5.519 0 9.999-4.476 9.999-9.995 0-5.519-4.48-9.995-9.999-9.995zm5.836 14.177c-.244.688-1.226 1.312-1.996 1.408-.528.065-1.217.118-3.535-.841-2.969-1.229-4.887-4.249-5.035-4.447-.145-.198-1.202-1.602-1.202-3.056 0-1.453.762-2.169 1.034-2.463.272-.294.595-.368.793-.368.199 0 .398.002.571.011.183.01.428-.069.669.51.248.595.845 2.062.919 2.212.074.149.124.323.025.522-.099.198-.149.322-.297.496-.149.174-.313.389-.447.522-.149.149-.304.31-.131.608.173.298.77 1.267 1.652 2.054 1.135 1.012 2.091 1.325 2.389 1.474.298.149.472.124.646-.075.174-.198.744-.868.943-1.166.199-.298.398-.248.669-.149.273.099 1.727.815 2.025.964.298.149.497.223.571.348.075.124.075.719-.169 1.407z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900">WhatsApp</span>
              </div>

              {/* Instagram Card */}
              <div 
                onClick={() => setPrimaryChannel('instagram')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all relative border-2 ${
                  primaryChannel === 'instagram'
                    ? 'border-[#00c25a] bg-[#ecfdf5] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {primaryChannel === 'instagram' && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#00c25a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5">
                  <svg className="w-9 h-9" viewBox="0 0 24 24">
                    <defs>
                      <radialGradient id="ig-grad" r="150%" cx="30%" cy="107%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900">Instagram</span>
              </div>

              {/* Messenger Card */}
              <div 
                onClick={() => setPrimaryChannel('messenger')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all relative border-2 ${
                  primaryChannel === 'messenger'
                    ? 'border-[#00c25a] bg-[#ecfdf5] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {primaryChannel === 'messenger' && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#00c25a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5">
                  <svg className="w-9 h-9" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="msg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00C6FF" />
                        <stop offset="100%" stopColor="#0078FF" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#msg-grad)" d="M12 2C6.477 2 2 6.145 2 11.26c0 2.915 1.455 5.518 3.734 7.202V22l3.376-1.854c.904.25 1.866.385 2.89.385 5.523 0 10-4.146 10-9.26S17.523 2 12 2zm1.066 12.433l-2.673-2.853-5.215 2.853 5.738-6.094 2.742 2.853 5.146-2.853-5.738 6.094z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900">Messenger</span>
              </div>

              {/* TikTok Card */}
              <div 
                onClick={() => setPrimaryChannel('tiktok')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center transition-all relative border-2 ${
                  primaryChannel === 'tiktok'
                    ? 'border-[#00c25a] bg-[#ecfdf5] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {primaryChannel === 'tiktok' && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#00c25a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#000000">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.896 2.896 0 0 1 2.31-4.636c.307 0 .604.05.882.14v-3.52a6.37 6.37 0 0 0-.882-.062 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.583a8.193 8.193 0 0 0 4.766 1.523V6.686z" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900">TikTok</span>
              </div>

            </div>

            {/* Question: Are you currently using WhatsApp for business? (Screenshot 1) */}
            <div className="pt-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2.5">
                Are you currently using WhatsApp for business?
              </label>
              <div className="flex items-center gap-6">
                <label 
                  onClick={() => setUsingWhatsAppForBusiness('yes')}
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    usingWhatsAppForBusiness === 'yes' ? 'border-[#00c25a] bg-[#00c25a]' : 'border-gray-300 bg-white'
                  }`}>
                    {usingWhatsAppForBusiness === 'yes' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">Yes</span>
                </label>

                <label 
                  onClick={() => setUsingWhatsAppForBusiness('no')}
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    usingWhatsAppForBusiness === 'no' ? 'border-[#00c25a] bg-[#00c25a]' : 'border-gray-300 bg-white'
                  }`}>
                    {usingWhatsAppForBusiness === 'no' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">No</span>
                </label>
              </div>
            </div>

            {/* Question: Which platform are you using? (Selectable pill buttons) */}
            {usingWhatsAppForBusiness === 'yes' && (
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2.5">
                  Which platform are you using?
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {platformOptions.map((platform) => {
                    const isSelected = selectedPlatforms.includes(platform);
                    return (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => togglePlatform(platform)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-2xs border ${
                          isSelected
                            ? 'bg-[#ecfdf5] border-[#00c25a] text-[#075e37] font-semibold'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {platform}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question: Is your business verified with Meta? (Dropdown select matching Screenshot 2) */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                Is your business verified with Meta?
              </label>
              <div className="relative max-w-lg">
                <select
                  value={metaVerified}
                  onChange={(e) => setMetaVerified(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white text-gray-900 appearance-none shadow-2xs cursor-pointer"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="Yes - Verified">Yes - Verified</option>
                  <option value="No - Not Verified">No - Not Verified</option>
                  <option value="I don't know">I don't know</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-gray-500 mt-1.5 leading-normal flex items-center gap-1">
                <span>Verified businesses receive priority features and higher messaging limits.</span>
                <span className="text-emerald-700 font-semibold underline cursor-pointer hover:text-emerald-800">Learn more</span>
              </p>
            </div>

            {/* Question: Do you have a Facebook account, or a managed Meta account? */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2.5">
                Do you have a Facebook account, or a managed Meta account?
              </label>
              <div className="flex items-center gap-6">
                <label 
                  onClick={() => setHasFacebookAccount('yes')}
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    hasFacebookAccount === 'yes' ? 'border-[#00c25a] bg-[#00c25a]' : 'border-gray-300 bg-white'
                  }`}>
                    {hasFacebookAccount === 'yes' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">Yes</span>
                </label>

                <label 
                  onClick={() => setHasFacebookAccount('no')}
                  className="inline-flex items-center gap-2 cursor-pointer"
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    hasFacebookAccount === 'no' ? 'border-[#00c25a] bg-[#00c25a]' : 'border-gray-300 bg-white'
                  }`}>
                    {hasFacebookAccount === 'no' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">No</span>
                </label>
              </div>
            </div>

            {/* Continue Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={handleStep1Continue}
                className="px-8 py-2.5 rounded-xl bg-[#00c25a] hover:bg-[#00b050] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all text-center min-w-[150px]"
              >
                Continue
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: What would you be using Aoneix for? */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
            
            {/* Header Titles matching Screenshot 3 & 4 */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight mb-2">
                What would you be <br className="hidden sm:inline" />
                <span className="text-[#00c25a]">using Aoneix for?</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                You can choose more than one. We will personalise your setup accordingly
              </p>
            </div>

            {/* 3 Main Purpose Cards: Support, Sales, Marketing (Multi-selectable) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              
              {/* 1. Support */}
              <div 
                onClick={() => toggleUseCase('support')}
                className={`cursor-pointer rounded-2xl p-5 flex flex-col justify-between transition-all relative border-2 ${
                  selectedUseCases.includes('support')
                    ? 'border-[#00c25a] bg-[#ecfdf5] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {selectedUseCases.includes('support') && (
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#00c25a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3.5 shadow-2xs">
                    <Headphones className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Support</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Resolve customer queries with AI
                  </p>
                </div>
              </div>

              {/* 2. Sales */}
              <div 
                onClick={() => toggleUseCase('sales')}
                className={`cursor-pointer rounded-2xl p-5 flex flex-col justify-between transition-all relative border-2 ${
                  selectedUseCases.includes('sales')
                    ? 'border-[#00c25a] bg-[#ecfdf5] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {selectedUseCases.includes('sales') && (
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#00c25a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3.5 shadow-2xs">
                    <TrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Sales</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Qualify leads instantly and follow up before they go cold
                  </p>
                </div>
              </div>

              {/* 3. Marketing */}
              <div 
                onClick={() => toggleUseCase('marketing')}
                className={`cursor-pointer rounded-2xl p-5 flex flex-col justify-between transition-all relative border-2 ${
                  selectedUseCases.includes('marketing')
                    ? 'border-[#00c25a] bg-[#ecfdf5] shadow-xs'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {selectedUseCases.includes('marketing') && (
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#00c25a] text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-3.5 shadow-2xs">
                    <Send className="w-5 h-5 text-gray-700" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Marketing</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Run campaigns people actually reply to
                  </p>
                </div>
              </div>

            </div>

            {/* Question: How many people on your team will use Aoneix? */}
            <div className="pt-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2.5">
                How many people on your team will use Aoneix?
              </label>
              <div className="flex flex-wrap gap-2.5">
                {['1-3', '4-10', '11-25', '>25'].map((size) => {
                  const isSelected = teamSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTeamSize(size)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border shadow-2xs ${
                        isSelected
                          ? 'bg-[#ecfdf5] border-[#00c25a] text-[#075e37] font-bold'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question: How do you store customer data? */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2.5">
                How do you store customer data?
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {dataStorageOptions.map((item) => {
                  const isSelected = dataStorage.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleDataStorage(item)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-2xs border ${
                        isSelected
                          ? 'bg-[#ecfdf5] border-[#00c25a] text-[#075e37] font-semibold'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question: Which AI / Tools are you currently using in your company/business ? */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-2.5">
                Which AI / Tools are you currently using in your company/business ?
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {aiToolsOptions.map((tool) => {
                  const isSelected = aiTools.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => toggleAiTool(tool)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shadow-2xs border ${
                        isSelected
                          ? 'bg-[#ecfdf5] border-[#00c25a] text-[#075e37] font-semibold'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {tool}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Final Action: That's it - your Aoneix account is ready */}
            <div className="pt-6 text-center space-y-3">
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                That's it - your Aoneix account is ready
              </p>
              
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isProvisioning}
                className="px-8 py-3 rounded-xl bg-[#00c25a] hover:bg-[#00b050] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2 min-w-[200px]"
              >
                {isProvisioning ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Preparing Workspace...</span>
                  </span>
                ) : (
                  <span>Start my 7-day trial</span>
                )}
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Outer Bottom Branding / Footer */}
      <footer className="py-4 border-t border-gray-100 text-center text-[11px] text-gray-400">
        Aoneix Cloud Workspace Onboarding • Protected by 256-bit SSL encryption
      </footer>

      {/* Animated Provisioning Modal Overlay */}
      {isProvisioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full p-6 text-center space-y-4">
            
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#00c25a] flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-950 mb-1">
                Setting up your Aoneix Workspace
              </h3>
              <p className="text-xs text-gray-500">
                Personalising channels, AI Copilot, and team inbox...
              </p>
            </div>

            {/* Steps Checklist */}
            <div className="space-y-2.5 text-left text-xs text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00c25a]" />
                <span>Primary Channel: <strong className="capitalize">{primaryChannel}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00c25a]" />
                <span>Team Seats: <strong>{teamSize} members</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                {provisioningStep >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00c25a]" />
                ) : (
                  <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                )}
                <span>Configuring integrations ({dataStorage.slice(0, 2).join(', ')})</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
