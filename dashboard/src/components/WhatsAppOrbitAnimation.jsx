import React from 'react'
import {
  Code2,
  Send,
  Zap,
  Users,
  ShieldCheck,
  Check
} from 'lucide-react'

import whatsapp3dIcon from '../assets/whatsapp-icon-.png'

export default function WhatsAppOrbitAnimation({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer ambient glow circles */}
      <div className="absolute w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-purple-200/30 via-emerald-200/25 to-blue-200/30 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-[320px] h-[320px] rounded-full bg-emerald-400/15 blur-2xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-[420px] h-[420px] flex items-center justify-center">

        {/* 1. Concentric Rotational Orbit Ring 1 (Clockwise) */}
        <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-indigo-300/70 animate-[spin_40s_linear_infinite] pointer-events-none">
          {/* Satellite Orbit Dot Top */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/50 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
          {/* Satellite Orbit Dot Right */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-sm shadow-indigo-500/40" />
          {/* Satellite Orbit Dot Bottom */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/50" />
          {/* Satellite Orbit Dot Left */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-sm shadow-indigo-500/40" />
        </div>

        {/* 2. Concentric Rotational Orbit Ring 2 (Counter-Clockwise - Inner secondary) */}
        <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-emerald-300/50 animate-[spin_55s_linear_infinite_reverse] pointer-events-none">
          {/* Satellite Orbit Dot Diagonal 1 */}
          <div className="absolute top-6 left-6 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-500/40" />
          {/* Satellite Orbit Dot Diagonal 2 */}
          <div className="absolute bottom-6 right-6 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-xs shadow-emerald-500/40" />
        </div>

        {/* 3. Center Meta BSP Card */}
        <div className="relative z-10 w-[240px] h-[220px] bg-white rounded-3xl border-2 border-emerald-400/80 shadow-2xl p-5 flex flex-col items-center justify-between text-center overflow-visible transition-all duration-300 hover:shadow-emerald-500/20">
          {/* Top 3D Green Shield Badge */}
          <div className="relative -mt-9">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-[#10b981] to-[#059669] flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 border-2 border-white transform transition-transform hover:scale-110">
              <Check className="w-6 h-6 stroke-[3] text-white" />
            </div>
            {/* Soft pulse behind shield */}
            <span className="absolute -inset-1 rounded-2xl bg-emerald-400/30 blur-xs -z-10 animate-ping opacity-60" />
          </div>

          {/* Central Typography Matching 2nd Image */}
          <div className="space-y-0.5 my-auto">
            <p className="text-xs font-bold text-slate-800 tracking-tight">
              Meta-aligned
            </p>
            <h3 className="text-2xl font-black tracking-tight text-[#00c25a] drop-shadow-xs">
              WhatsApp
            </h3>
            <p className="text-[12px] font-extrabold text-slate-900 leading-tight">
              Business Solution
            </p>
            <p className="text-[11px] font-bold text-slate-700">
              Provider (BSP)
            </p>
          </div>

          {/* Bottom Overlapping 3D WhatsApp Logo Badge using official assets/whatsapp-icon-.png */}
          <div className="relative -mb-11 z-20 transition-transform duration-300 hover:scale-110 cursor-pointer">
            <img
              src={whatsapp3dIcon}
              alt="WhatsApp 3D"
              className="w-18 h-18 sm:w-20 sm:h-20 object-contain drop-shadow-2xl select-none pointer-events-none"
            />
          </div>
        </div>

        {/* 4. Four Orbiting Floating Feature Cards (Matching 2nd Image Layout) */}

        {/* TOP-LEFT: Official API Access */}
        <div className="absolute top-1 left-2 z-20 transition-transform duration-500 hover:-translate-y-1 hover:scale-105">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-indigo-100 shadow-xl shadow-indigo-500/10 flex flex-col items-center justify-center w-26 sm:w-28 text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30 mb-1.5 transition-transform group-hover:scale-110">
              <Code2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-[10.5px] font-extrabold text-slate-800 leading-tight">
              Official
            </span>
            <span className="text-[10px] font-bold text-slate-600">
              API Access
            </span>
          </div>
        </div>

        {/* TOP-RIGHT: Bulk Messaging */}
        <div className="absolute top-1 right-2 z-20 transition-transform duration-500 hover:-translate-y-1 hover:scale-105">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-emerald-100 shadow-xl shadow-emerald-500/10 flex flex-col items-center justify-center w-26 sm:w-28 text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center shadow-sm mb-1.5 transition-transform group-hover:scale-110">
              <Send className="w-5 h-5 stroke-[2.5] text-emerald-600" />
            </div>
            <span className="text-[10.5px] font-extrabold text-slate-800 leading-tight">
              Bulk
            </span>
            <span className="text-[10px] font-bold text-slate-600">
              Messaging
            </span>
          </div>
        </div>

        {/* BOTTOM-LEFT: Smart Automation */}
        <div className="absolute bottom-1 left-2 z-20 transition-transform duration-500 hover:translate-y-1 hover:scale-105">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-blue-100 shadow-xl shadow-blue-500/10 flex flex-col items-center justify-center w-26 sm:w-28 text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shadow-sm mb-1.5 transition-transform group-hover:scale-110">
              <Zap className="w-5 h-5 stroke-[2.5] text-blue-600" />
            </div>
            <span className="text-[10.5px] font-extrabold text-slate-800 leading-tight">
              Smart
            </span>
            <span className="text-[10px] font-bold text-slate-600">
              Automation
            </span>
          </div>
        </div>

        {/* BOTTOM-RIGHT: Customer Engagement */}
        <div className="absolute bottom-1 right-2 z-20 transition-transform duration-500 hover:translate-y-1 hover:scale-105">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-amber-100 shadow-xl shadow-amber-500/10 flex flex-col items-center justify-center w-26 sm:w-28 text-center group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/80 flex items-center justify-center shadow-sm mb-1.5 transition-transform group-hover:scale-110">
              <Users className="w-5 h-5 stroke-[2.5] text-amber-600" />
            </div>
            <span className="text-[10.5px] font-extrabold text-slate-800 leading-tight">
              Customer
            </span>
            <span className="text-[10px] font-bold text-slate-600">
              Engagement
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
