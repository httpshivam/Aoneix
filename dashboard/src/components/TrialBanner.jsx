import React from 'react'

export default function TrialBanner({ onConnectChannel }) {
  return (
    <div className="bg-[#111827] text-white px-6 py-2 flex items-center justify-between text-xs font-sans shrink-0 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <span className="text-slate-300">
          You have <strong className="text-white font-bold">7 days</strong> to explore this{' '}
          <strong className="text-white font-bold">Trial account</strong>. Connect your preferred channel to unlock all features.
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onConnectChannel}
          className="px-3.5 py-1 rounded-lg bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-xs cursor-pointer"
        >
          Connect Channel
        </button>
        <button
          onClick={() => window.open('http://localhost:3002/#pricing', '_blank')}
          className="px-3.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition cursor-pointer"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}
