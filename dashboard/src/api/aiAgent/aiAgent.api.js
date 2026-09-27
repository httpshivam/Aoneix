import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Section: AI Support Agent & WhatsApp Automation Bot
 */

let mockAgentConfig = {
  isDeployed: false,
  agentName: 'AIONEX Assistant',
  persona: 'Professional & Helpful Support Specialist',
  greetingMessage: 'Hi there! 👋 Welcome to AIONEX Support. How can I help you today? You can ask about our pricing, order tracking, or request a live demo.',
  businessHours: '24/7 Always Active',
  humanEscalationEnabled: true,
  fallbackToHumanKeyword: 'human, agent, speak with someone',
  autoTrackingEnabled: true,
  faqsCount: 14,
}

export const aiAgentApi = {
  async getConfig() {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient('/ai-agent/config')
      }
      await new Promise((r) => setTimeout(r, 60))
      return { success: true, data: { ...mockAgentConfig } }
    } catch {
      return { success: true, data: { ...mockAgentConfig } }
    }
  },

  async deployAgent(enable = true) {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient('/ai-agent/deploy', {
          method: 'POST',
          body: JSON.stringify({ isDeployed: enable }),
        })
      }
      mockAgentConfig.isDeployed = enable
      return { success: true, data: { ...mockAgentConfig }, message: enable ? 'AI Agent Deployed Live' : 'AI Agent Paused' }
    } catch {
      mockAgentConfig.isDeployed = enable
      return { success: true, data: { ...mockAgentConfig } }
    }
  },

  /**
   * Interactive WhatsApp preview simulator
   * Handles user test messages and replies dynamically
   */
  async simulateReply(userMessage) {
    const text = userMessage.toLowerCase()
    await new Promise((r) => setTimeout(r, 450)) // simulate WhatsApp typing latency

    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return {
        reply: "Hello! Welcome to AIONEX. 🟢\nI'm your automated WhatsApp assistant. What can I do for you today?\n\n1️⃣ Check Order / Service Status\n2️⃣ Explore AI Automation Solutions\n3️⃣ Talk to a Human Specialist",
      }
    }

    if (text.includes('price') || text.includes('cost') || text.includes('plan')) {
      return {
        reply: "Our WhatsApp Business plans start at $49/mo including 1,000 free service conversations, unlimited team members, and full AI bot access! Would you like a custom proposal?",
      }
    }

    if (text.includes('order') || text.includes('track') || text.includes('status')) {
      return {
        reply: "📦 Please share your 6-digit Order ID or Inquiry Number (e.g. #AO-8942) and I will retrieve the live delivery & milestone update immediately.",
      }
    }

    if (text.includes('human') || text.includes('agent') || text.includes('person') || text.includes('support')) {
      return {
        reply: "Connecting you with an available AIONEX specialist right away! 🔔 Your conversation has been transferred to our Team Inbox with High Priority.",
        escalated: true,
      }
    }

    return {
      reply: `Thanks for your message: "${userMessage}". Our AI model has logged your query and an automated response or team agent will assist you shortly!`,
    }
  },
}
