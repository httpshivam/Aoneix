import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Domain API: Automations & Visual Node Flow Engine
 * 
 * Supports:
 * - Automation Rules (Table + Node Flow Builder)
 * - Chatbots Library (Templates + Active Bots)
 * - Reply Material Library (Text, Image, Video, Document, Stickers)
 * - Smart Conversation Routing
 * - Real-time Node Execution Simulator
 */

let mockRules = [
  {
    id: 'rule-ooo',
    name: 'WA Out of Office',
    isBuiltIn: true,
    triggerType: 'New WhatsApp message is received',
    triggerChannel: 'Default (+)',
    actionSummary: 'Send message',
    status: false,
    executedCount: 0,
    lastUpdated: '27/9/2026',
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        badge: 'When',
        title: 'New WhatsApp message is received',
        subtitle: 'Channel: Default WhatsApp (+91 98765 43210)',
        iconType: 'whatsapp',
        config: { channel: 'Default (+)', event: 'message_received' }
      },
      {
        id: 'node-2',
        type: 'filter',
        badge: 'Filter',
        title: 'Continue rule only if',
        subtitle: 'Outside working hours (Mon-Sat 10:00 - 19:00)',
        tags: ['Working hours', 'Outside schedule', 'Any incoming message'],
        iconType: 'filter',
        config: { condition: 'outside_hours', schedule: '10am-7pm IST' }
      },
      {
        id: 'node-3',
        type: 'action',
        badge: 'Then',
        title: 'Send message',
        subtitle: 'Template: WA Out of Office message text',
        previewText: 'Thank you for the message! We are currently unavailable. Our team will respond as soon as we are back, thanks for understanding.',
        tags: ['WA Out of Office message text'],
        iconType: 'message',
        config: { actionType: 'send_text', materialId: 'mat-ooo' }
      }
    ]
  },
  {
    id: 'rule-welcome',
    name: 'WA Welcome message',
    isBuiltIn: true,
    triggerType: 'New WhatsApp message is received',
    triggerChannel: 'Default (+)',
    actionSummary: 'Send message',
    status: false,
    executedCount: 0,
    lastUpdated: '27/9/2026',
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        badge: 'When',
        title: 'New WhatsApp message is received',
        subtitle: 'Channel: Default WhatsApp (+91 98765 43210)',
        iconType: 'whatsapp',
        config: { channel: 'Default (+)', event: 'message_received' }
      },
      {
        id: 'node-2',
        type: 'filter',
        badge: 'Filter',
        title: 'Continue rule only if',
        subtitle: 'First time user or no interaction in 24 hours',
        tags: ['New contact', 'Session window', 'First message'],
        iconType: 'filter',
        config: { condition: 'first_interaction', sessionHours: 24 }
      },
      {
        id: 'node-3',
        type: 'action',
        badge: 'Then',
        title: 'Send message',
        subtitle: 'Template: WA Welcome message text',
        previewText: 'Thank you for the message and welcome to our WhatsApp account. Our team will be with you shortly!',
        tags: ['WA Welcome message text'],
        iconType: 'message',
        config: { actionType: 'send_text', materialId: 'mat-welcome' }
      }
    ]
  },
  {
    id: 'rule-unsubscribe',
    name: 'Unsubscribe from broadcast',
    isBuiltIn: false,
    triggerType: 'New WhatsApp message is received',
    triggerChannel: 'Default (+)',
    actionSummary: 'Update contact attribute',
    status: false,
    executedCount: 0,
    lastUpdated: '27/9/2026',
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        badge: 'When',
        title: 'New WhatsApp message is received',
        subtitle: 'Channel: Default (+)',
        iconType: 'whatsapp',
        config: { channel: 'Default (+)', event: 'message_received' }
      },
      {
        id: 'node-2',
        type: 'filter',
        badge: 'Filter',
        title: 'Continue rule only if',
        subtitle: 'Matches STOP, UNSUBSCRIBE, CANCEL keywords',
        tags: ['Incoming message', 'Exact match', 'STOP / UNSUBSCRIBE'],
        iconType: 'filter',
        config: { condition: 'keyword_match', keywords: ['stop', 'unsubscribe', 'cancel'], matchType: 'exact' }
      },
      {
        id: 'node-3',
        type: 'action',
        badge: 'Then',
        title: 'Update contact attribute',
        subtitle: 'Set broadcast_opted_in = false & add tag [Unsubscribed]',
        tags: ['Attribute: Opt-out', 'Tag: Unsubscribed'],
        iconType: 'tag',
        config: { actionType: 'update_attribute', attribute: 'broadcast_opted_in', value: false }
      }
    ]
  },
  {
    id: 'rule-hello',
    name: 'WA Hello keyword sample rule',
    isBuiltIn: false,
    triggerType: 'New WhatsApp message is received',
    triggerChannel: 'Default (+)',
    actionSummary: 'Send message',
    status: true,
    executedCount: 0,
    lastUpdated: '27/9/2026',
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        badge: 'When',
        title: 'New WhatsApp message is received',
        subtitle: 'Channel: Default (+)',
        iconType: 'whatsapp',
        config: { channel: 'Default (+)', event: 'message_received' }
      },
      {
        id: 'node-2',
        type: 'filter',
        badge: 'Filter',
        title: 'Continue rule only if',
        subtitle: 'Matches keyword greeting variations',
        tags: ['Incoming message', 'Fuzzy matches', '3 keywords'],
        keywords: ['hello', 'hi', 'hey'],
        iconType: 'filter',
        config: { condition: 'keyword_match', keywords: ['hello', 'hi', 'hey'], matchType: 'fuzzy' }
      },
      {
        id: 'node-3',
        type: 'action',
        badge: 'Then',
        title: 'Send message',
        subtitle: 'Template: WA Sample keyword response text',
        previewText: 'Hello to you too! You just triggered an automation rule! Rules give you a powerful way to automate your WhatsApp interactions and target specific customer segments. Welcome message rules and more in your AIONEX account here: live.aionex.io/rules',
        tags: ['WA Sample keyword response text'],
        iconType: 'message',
        config: { actionType: 'send_text', materialId: 'mat-sample' }
      }
    ]
  }
]

let mockReplyMaterials = [
  {
    id: 'mat-welcome',
    type: 'text',
    title: 'WA Welcome message text',
    content: 'Thank you for the message and welcome to our WhatsApp account. Our team will be with you shortly!',
    lastUpdated: '27/9/2026'
  },
  {
    id: 'mat-ooo',
    type: 'text',
    title: 'WA Out of Office message text',
    content: 'Thank you for the message! We are currently unavailable. Our team will respond as soon as we are back, thanks for understanding.',
    lastUpdated: '27/9/2026'
  },
  {
    id: 'mat-sample',
    type: 'text',
    title: 'WA Sample keyword response text',
    content: 'Hello to you too! You just triggered an automation rule! Rules give you a powerful way to automate your WhatsApp interactions and target specific customer segments. Welcome message rules and more in your AIONEX account here: live.aionex.io/rules',
    lastUpdated: '27/9/2026'
  },
  {
    id: 'mat-doc-brochure',
    type: 'document',
    title: 'AIONEX Product Brochure 2026.pdf',
    content: 'Official AIONEX enterprise WhatsApp Cloud API solution guide and pricing catalog.',
    fileUrl: 'https://aionex.io/docs/brochure.pdf',
    fileSize: '2.4 MB',
    lastUpdated: '25/9/2026'
  },
  {
    id: 'mat-img-qr',
    type: 'image',
    title: 'Payment & UPI QR Code Card',
    content: 'Send instant UPI & payment QR code image when customer asks for payment link.',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop',
    lastUpdated: '24/9/2026'
  },
  {
    id: 'mat-vid-demo',
    type: 'video',
    title: 'Platform Quick Demo.mp4',
    content: '60-second video walkthrough of WhatsApp campaign creation.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    lastUpdated: '20/9/2026'
  },
  {
    id: 'mat-sticker-thumb',
    type: 'stickers',
    title: 'Thumbs Up WhatsApp Animated Sticker',
    content: 'Animated verified sticker for successful confirmation.',
    lastUpdated: '18/9/2026'
  }
]

let mockChatbotTemplates = [
  {
    id: 'bot-lead-qual',
    name: 'Lead Qualification Bot',
    description: 'Use WhatsApp for quick lead qualification and seamless client communication',
    industry: 'All industries',
    metricsLabel: 'Number of Qualified leads',
    metricsValue: '85% conversion',
    nodesCount: 5,
    language: 'English'
  },
  {
    id: 'bot-appoint-booking',
    name: 'Appointment Booking Bot',
    description: 'Easily book appointments through Whatsapp for quick scheduling',
    industry: 'All industries',
    metricsLabel: 'Number of Appointment booked',
    metricsValue: '3.4x faster',
    nodesCount: 6,
    language: 'English'
  },
  {
    id: 'bot-event-reg',
    name: 'Event Registration Bot',
    description: 'Drive event registrations on WhatsApp & increase your registration numbers significantly.',
    industry: 'Education',
    metricsLabel: 'Number of registrations, event sign up',
    metricsValue: '92% completion',
    nodesCount: 4,
    language: 'English'
  },
  {
    id: 'bot-faq',
    name: 'FAQ Bot',
    description: 'Answer frequently asked questions automatically & reduce response times.',
    industry: 'All industries',
    metricsLabel: 'Response time',
    metricsValue: '< 5 sec avg',
    nodesCount: 7,
    language: 'English'
  },
  {
    id: 'bot-feedback',
    name: 'Feedback Bot',
    description: 'Collect feedback after every class / service or on purchase of specific products & continue to improve your customer experience.',
    industry: 'Education, Retail, Services',
    metricsLabel: 'Number of feedback received',
    metricsValue: '4.8/5 CSAT',
    nodesCount: 4,
    language: 'English'
  },
  {
    id: 'bot-upsell',
    name: 'Upselling Bot',
    description: 'Add this bot to specific landing pages. Drive more revenue by recommending products / services your customers are most likely to buy.',
    industry: 'Education, Healthcare, eCommerce, Retail, Services & more',
    metricsLabel: 'Revenue, leads, purchase',
    metricsValue: '+38% order value',
    nodesCount: 6,
    language: 'English'
  },
  {
    id: 'bot-welcome',
    name: 'Welcome Bot',
    description: 'Greet visitors when they reach out & share product information without any manual intervention.',
    industry: 'All industries',
    metricsLabel: 'Number of customer conversation',
    metricsValue: '100% replied',
    nodesCount: 3,
    language: 'English'
  },
  {
    id: 'bot-ooo',
    name: 'OOO Bot',
    description: 'Stay connected with your customers even during your non-working hours.',
    industry: 'All industries',
    metricsLabel: 'Number of customer conversation',
    metricsValue: 'Zero dropped leads',
    nodesCount: 3,
    language: 'English'
  },
  {
    id: 'bot-ai-phone',
    name: 'AI WhatsApp number collection bot',
    description: 'Capture verified phone numbers and opt-ins directly from web traffic and Instagram click-to-WhatsApp ads.',
    industry: 'All industries',
    metricsLabel: 'Lead capture rate',
    metricsValue: '94% valid phones',
    nodesCount: 4,
    language: 'English'
  }
]

let mockUserBots = [
  {
    id: 'userbot-1',
    name: 'AIONEX Assistant Bot',
    template: 'Lead Qualification Bot',
    status: 'Active',
    triggerCount: 142,
    lastActive: 'Today at 2:15 PM'
  }
]

let mockRoutingConfig = {
  strategy: 'round_robin', // 'round_robin' | 'skill_based' | 'workload'
  fallbackAgent: 'Sanes (Admin)',
  businessHoursOnly: true,
  autoAssignNewChats: true,
  idleTimeoutMinutes: 15,
  queues: [
    { id: 'q-sales', name: 'Sales & Onboarding', agentsCount: 2, isDefault: true },
    { id: 'q-support', name: 'Technical Support', agentsCount: 3, isDefault: false },
    { id: 'q-billing', name: 'Billing & Subscriptions', agentsCount: 1, isDefault: false }
  ]
}

export const automationsApi = {
  // Rules
  async getRules() {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient('/automations/rules')
      }
      return { success: true, data: [...mockRules] }
    } catch {
      return { success: true, data: [...mockRules] }
    }
  },

  async toggleRuleStatus(ruleId) {
    const rule = mockRules.find((r) => r.id === ruleId)
    if (rule) {
      rule.status = !rule.status
      rule.lastUpdated = new Date().toLocaleDateString('en-GB')
    }
    return { success: true, data: rule }
  },

  async saveRule(ruleData) {
    if (ruleData.id) {
      const idx = mockRules.findIndex((r) => r.id === ruleData.id)
      if (idx !== -1) {
        mockRules[idx] = { ...mockRules[idx], ...ruleData, lastUpdated: new Date().toLocaleDateString('en-GB') }
        return { success: true, data: mockRules[idx] }
      }
    }
    const newRule = {
      ...ruleData,
      id: `rule-${Date.now()}`,
      isBuiltIn: false,
      status: true,
      executedCount: 0,
      lastUpdated: new Date().toLocaleDateString('en-GB')
    }
    mockRules.unshift(newRule)
    return { success: true, data: newRule }
  },

  async duplicateRule(ruleId) {
    const original = mockRules.find((r) => r.id === ruleId)
    if (!original) return { success: false, message: 'Rule not found' }
    const copy = {
      ...JSON.parse(JSON.stringify(original)),
      id: `rule-${Date.now()}`,
      name: `${original.name} (Copy)`,
      isBuiltIn: false,
      status: false,
      executedCount: 0,
      lastUpdated: new Date().toLocaleDateString('en-GB')
    }
    mockRules.push(copy)
    return { success: true, data: copy }
  },

  async deleteRule(ruleId) {
    mockRules = mockRules.filter((r) => r.id !== ruleId)
    return { success: true }
  },

  // Reply Materials
  async getReplyMaterials(filterType = null) {
    let list = [...mockReplyMaterials]
    if (filterType && filterType !== 'all') {
      list = list.filter((m) => m.type === filterType)
    }
    return { success: true, data: list }
  },

  async saveReplyMaterial(material) {
    if (material.id) {
      const idx = mockReplyMaterials.findIndex((m) => m.id === material.id)
      if (idx !== -1) {
        mockReplyMaterials[idx] = { ...mockReplyMaterials[idx], ...material, lastUpdated: new Date().toLocaleDateString('en-GB') }
        return { success: true, data: mockReplyMaterials[idx] }
      }
    }
    const newMat = {
      ...material,
      id: `mat-${Date.now()}`,
      lastUpdated: new Date().toLocaleDateString('en-GB')
    }
    mockReplyMaterials.push(newMat)
    return { success: true, data: newMat }
  },

  async deleteReplyMaterial(id) {
    mockReplyMaterials = mockReplyMaterials.filter((m) => m.id !== id)
    return { success: true }
  },

  // Chatbots
  async getChatbots() {
    return {
      success: true,
      data: {
        templates: [...mockChatbotTemplates],
        userBots: [...mockUserBots]
      }
    }
  },

  async createBotFromTemplate(templateId, botName) {
    const template = mockChatbotTemplates.find((t) => t.id === templateId)
    if (!template) return { success: false, message: 'Template not found' }
    const newBot = {
      id: `userbot-${Date.now()}`,
      name: botName || `${template.name} Instance`,
      template: template.name,
      status: 'Active',
      triggerCount: 0,
      lastActive: 'Just now'
    }
    mockUserBots.push(newBot)
    return { success: true, data: newBot }
  },

  // Routing
  async getRoutingConfig() {
    return { success: true, data: { ...mockRoutingConfig } }
  },

  async saveRoutingConfig(config) {
    mockRoutingConfig = { ...mockRoutingConfig, ...config }
    return { success: true, data: { ...mockRoutingConfig } }
  },

  // Live Node Execution Simulator
  async simulateExecution(ruleId, userMessageText) {
    const rule = mockRules.find((r) => r.id === ruleId)
    if (!rule) return { success: false, message: 'Rule not found' }

    const inputLower = (userMessageText || '').toLowerCase()
    const logs = []

    // Node 1: Trigger
    logs.push({
      nodeId: rule.nodes[0]?.id || 'node-1',
      status: 'success',
      label: 'Message Received',
      detail: `Input text: "${userMessageText}" from WhatsApp Channel`
    })

    // Node 2: Filter check
    const filterNode = rule.nodes.find((n) => n.type === 'filter')
    let passedFilter = false
    let matchDetail = 'Matched'

    if (filterNode) {
      const keywords = filterNode.keywords || ['hello', 'hi', 'hey']
      const matched = keywords.some((kw) => inputLower.includes(kw))
      if (matched || !keywords.length) {
        passedFilter = true
        matchDetail = `Matches keyword condition (${keywords.join(', ')})`
      } else {
        matchDetail = `Did not match required keywords: ${keywords.join(', ')}`
      }
    } else {
      passedFilter = true
    }

    logs.push({
      nodeId: filterNode?.id || 'node-2',
      status: passedFilter ? 'success' : 'failed',
      label: 'Filter Evaluation',
      detail: matchDetail
    })

    // Node 3: Action Execution
    if (passedFilter) {
      const actionNode = rule.nodes.find((n) => n.type === 'action')
      logs.push({
        nodeId: actionNode?.id || 'node-3',
        status: 'success',
        label: 'Action Executed',
        reply: actionNode?.previewText || 'Automated response delivered to WhatsApp',
        detail: `Sent reply: "${(actionNode?.previewText || '').slice(0, 60)}..."`
      })
    }

    return {
      success: true,
      data: {
        ruleId,
        passed: passedFilter,
        executionLogs: logs
      }
    }
  }
}
