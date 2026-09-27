import React, { useState } from 'react'
import { Sparkles, Bot } from 'lucide-react'

export default function CopilotBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-emerald-50/90 border-b border-emerald-200/80 px-6 py-2 flex items-center justify-between text-xs font-sans text-emerald-950 shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
          <Sparkles className="w-3 h-3" />
        </div>
        <span>
          <strong className="font-bold">Team Inbox Automation:</strong> Supercharge your customer support with automated WhatsApp rules. Explore every capability using guided sample data.
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => alert('AIONEX Copilot Sample Flows loaded!')}
          className="px-3.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
        >
          Let's get started
        </button>
        <button
          onClick={() => setVisible(false)}
          className="text-emerald-700 hover:text-emerald-900 font-medium text-xs underline underline-offset-2"
        >
          Remind me later
        </button>
      </div>
    </div>
  )
}
