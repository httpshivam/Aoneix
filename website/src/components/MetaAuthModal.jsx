import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Smartphone, RefreshCw, Key } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MetaAuthModal({ isOpen, onClose, onAuthenticated }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wabaName, setWabaName] = useState('Aoneix Global Commerce (WABA ID: 938491029)');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 382-9921');

  if (!isOpen) return null;

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (onAuthenticated) onAuthenticated();
      }
    }, 700);
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#075e37] to-[#0a5c36] p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-[#86efac]" />
            </div>
            <div>
              <h3 className="font-semibold text-base leading-tight">Meta BSP Gateway Setup</h3>
              <p className="text-xs text-emerald-200">Aoneix Cloud API Provisioning</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-emerald-50 px-6 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs font-medium text-emerald-900">
          <div className="flex items-center space-x-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 1 ? 'bg-[#00c25a] text-white font-bold' : 'bg-gray-200 text-gray-600'
            }`}>1</span>
            <span className={step === 1 ? 'font-semibold' : 'text-gray-500'}>Meta Auth</span>
          </div>
          <div className="w-6 h-[1px] bg-emerald-200" />
          <div className="flex items-center space-x-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 2 ? 'bg-[#00c25a] text-white font-bold' : 'bg-gray-200 text-gray-600'
            }`}>2</span>
            <span className={step === 2 ? 'font-semibold' : 'text-gray-500'}>Select WABA</span>
          </div>
          <div className="w-6 h-[1px] bg-emerald-200" />
          <div className="flex items-center space-x-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step >= 3 ? 'bg-[#00c25a] text-white font-bold' : 'bg-gray-200 text-gray-600'
            }`}>3</span>
            <span className={step === 3 ? 'font-semibold' : 'text-gray-500'}>Linked</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl flex items-start space-x-3 text-xs text-blue-900">
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">f</div>
                <div>
                  <span className="font-semibold block text-blue-950">OAuth 2.0 Meta Authentication</span>
                  Authorize Aoneix to link your Meta Business Manager and WhatsApp Cloud API infrastructure.
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Meta Business Account ID</label>
                <input 
                  type="text" 
                  readOnly 
                  value="act_889204104820129" 
                  className="w-full text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Permissions Granted</label>
                <ul className="text-xs text-gray-600 space-y-1.5 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00c25a]" />
                    <span>whatsapp_business_management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00c25a]" />
                    <span>whatsapp_business_messaging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00c25a]" />
                    <span>read_webhook_telemetry</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <Smartphone className="w-10 h-10 text-[#075e37] mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-gray-900">Select WhatsApp Business Account</h4>
                <p className="text-xs text-gray-500">Pick the registered sender endpoint for your workspace.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-700">Choose WABA Profile</label>
                <select 
                  value={wabaName}
                  onChange={(e) => setWabaName(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:border-brand-primary"
                >
                  <option>Aoneix Global Commerce (WABA ID: 938491029)</option>
                  <option>Aoneix Support Node APAC (WABA ID: 481029481)</option>
                  <option>Aoneix Marketing Automation (WABA ID: 104928172)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-700">Verified Phone Number</label>
                <input 
                  type="text" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-[#eaf8ef] text-[#00c25a] rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Embedded Gateway Synchronized!</h4>
                <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">
                  Your WhatsApp Business Cloud account is securely linked to the RBSH high-throughput data pool.
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-left text-xs space-y-1">
                <div className="flex justify-between text-gray-500">
                  <span>Status:</span>
                  <span className="font-semibold text-emerald-600">Active & Verified</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Latency SLA:</span>
                  <span className="font-mono text-gray-700">&lt; 220ms</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Webhook URL:</span>
                  <span className="font-mono text-gray-700">https://api.aoneix.io/v1/meta</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          {step < 3 ? (
            <>
              <button 
                type="button" 
                onClick={onClose}
                className="text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="bg-[#00c25a] hover:bg-[#00a84e] text-gray-900 font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center space-x-1.5 transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-[#075e37] hover:bg-[#054b2b] text-white font-semibold text-xs py-2.5 rounded-lg transition-all shadow-md active:scale-95"
            >
              Done & Return to Workspace
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
