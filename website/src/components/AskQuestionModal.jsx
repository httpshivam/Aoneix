import React, { useState } from 'react';
import { X, Send, HelpCircle, CheckCircle } from 'lucide-react';

export default function AskQuestionModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'WhatsApp Integration',
    question: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', topic: 'WhatsApp Integration', question: '' });
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#075e37] p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <HelpCircle className="w-5 h-5 text-[#86efac]" />
            <h3 className="font-bold text-base">Submit a Question to Aoneix Specialists</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle className="w-14 h-14 text-[#00c25a] mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-gray-900">Question Received!</h4>
              <p className="text-xs text-gray-600 max-w-xs mx-auto">
                Our Meta Cloud API engineers will review your inquiry and reply via email within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Corporate Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                <select 
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:border-brand-primary"
                >
                  <option>WhatsApp Integration</option>
                  <option>Pricing & Custom Enterprise Tier</option>
                  <option>Meta BSP Cloud Architecture</option>
                  <option>Developer Webhooks & SDKs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Question</label>
                <textarea 
                  rows="3" 
                  required
                  placeholder="Describe your query or deployment requirements..."
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:border-brand-primary"
                />
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
                  className="bg-[#00c25a] hover:bg-[#00a84e] text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg flex items-center space-x-1.5 transition-all shadow-sm active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Question</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
