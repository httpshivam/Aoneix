import React, { useState } from 'react';
import { X, Check, CreditCard, Sparkles, Shield, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, selectedPlan, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [seats, setSeats] = useState(15);

  if (!isOpen || !selectedPlan) return null;

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onComplete) onComplete();
      }, 2500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#075e37] p-5 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-semibold block">
              Workspace Provisioning
            </span>
            <h3 className="text-lg font-bold">{selectedPlan.name}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-[#eaf8ef] text-[#00c25a] rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Workspace Activated!</h4>
              <p className="text-xs text-gray-600 max-w-xs mx-auto">
                Your dedicated high-throughput Aoneix environment is provisioned and ready for Meta verification.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Tier Level</span>
                  <span className="text-sm font-bold text-gray-900">{selectedPlan.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Price</span>
                  <span className="text-base font-extrabold text-[#075e37]">
                    {selectedPlan.monthlyPrice}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Company / Team Name</label>
                <input 
                  type="text" 
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Billing Administrator Email</label>
                <input 
                  type="email" 
                  required
                  defaultValue="billing@company.com"
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-xs text-emerald-950 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00c25a] shrink-0" />
                <span>Includes 14-day risk-free enterprise evaluation with full Meta Cloud API sandbox.</span>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-medium text-gray-500 hover:text-gray-800 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00c25a] hover:bg-[#00a84e] text-gray-950 font-bold text-xs px-6 py-2.5 rounded-lg flex items-center space-x-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Provisioning Space...</span>
                  ) : (
                    <>
                      <span>Confirm & Launch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
