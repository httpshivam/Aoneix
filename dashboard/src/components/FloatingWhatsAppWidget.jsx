import React, { useState } from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { aiAgentApi } from '../api/index.js'

export default function FloatingWhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey there! 👋 Need help setting up your WhatsApp Business account or testing WhatsApp auto-replies?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const text = input
    setInput('')
    setMessages((prev) => [...prev, { sender: 'user', text }])
    setLoading(true)

    try {
      const res = await aiAgentApi.simulateReply(text)
      setMessages((prev) => [...prev, { sender: 'bot', text: res.reply }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[460px] animate-fadeIn">
          {/* Header */}
          <div className="bg-[#075e54] p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold leading-tight">AIONEX Live Help</p>
                <p className="text-[10px] text-emerald-200">Online • WhatsApp Bot Simulator</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-[#efeae2] p-4 overflow-y-auto space-y-2.5 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#dcf8c6] text-slate-900 rounded-tr-none'
                      : 'bg-white text-slate-900 rounded-tl-none border border-slate-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl px-3 py-1.5 text-[11px] text-slate-500 italic shadow-xs">
                  Typing reply...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about AIONEX..."
              className="flex-1 text-xs px-3.5 py-2 bg-slate-100 rounded-xl border-none focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-[#128c7e] hover:bg-[#075e54] text-white rounded-xl transition shadow-xs disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          title="Open WhatsApp Help"
          className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <MessageCircle className="w-7 h-7 fill-current" />
        </button>
      )}
    </div>
  )
}
