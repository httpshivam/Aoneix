import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Section: Team Inbox & WhatsApp Conversations
 */

let mockConversations = [
  {
    id: 'conv-1',
    customerName: 'Rohit Verma',
    phoneNumber: '+91 98201 92831',
    channel: 'whatsapp',
    unreadCount: 2,
    status: 'open', // open, pending, resolved
    lastMessage: 'Can you please share the API documentation for WhatsApp webhook?',
    timestamp: '2m ago',
    assignedTo: 'Shivam',
    messages: [
      { id: 'm1', sender: 'customer', text: 'Hi, I need assistance with the WhatsApp integration.', time: '10:14 AM' },
      { id: 'm2', sender: 'bot', text: 'Hello Rohit! Sure, are you setting up Cloud API or On-Premises?', time: '10:14 AM' },
      { id: 'm3', sender: 'customer', text: 'Can you please share the API documentation for WhatsApp webhook?', time: '10:16 AM' },
    ],
  },
  {
    id: 'conv-2',
    customerName: 'Priya Desai',
    phoneNumber: '+91 97120 44556',
    channel: 'whatsapp',
    unreadCount: 0,
    status: 'pending',
    lastMessage: 'Payment verified for Annual Enterprise Plan. Thank you!',
    timestamp: '18m ago',
    assignedTo: 'Support Bot',
    messages: [
      { id: 'm1', sender: 'customer', text: 'I sent the transfer receipt for invoice #INV-4029.', time: '09:45 AM' },
      { id: 'm2', sender: 'agent', text: 'Thanks Priya, reviewing with accounts now.', time: '09:50 AM' },
      { id: 'm3', sender: 'customer', text: 'Payment verified for Annual Enterprise Plan. Thank you!', time: '10:02 AM' },
    ],
  },
  {
    id: 'conv-3',
    customerName: 'Marcus Vance',
    phoneNumber: '+1 (312) 555-0199',
    channel: 'whatsapp',
    unreadCount: 0,
    status: 'resolved',
    lastMessage: 'Awesome, the automated flow is working flawlessly now.',
    timestamp: '1h ago',
    assignedTo: 'Shivam',
    messages: [
      { id: 'm1', sender: 'customer', text: 'Our order confirmation template was rejected by Meta.', time: '08:30 AM' },
      { id: 'm2', sender: 'agent', text: 'Adjusted variable placeholders per Meta guidelines, now re-submitted and approved!', time: '08:55 AM' },
      { id: 'm3', sender: 'customer', text: 'Awesome, the automated flow is working flawlessly now.', time: '09:12 AM' },
    ],
  },
]

export const inboxApi = {
  async getConversations(statusFilter = 'all') {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient(`/inbox/conversations?filter=${statusFilter}`)
      }
      await new Promise((r) => setTimeout(r, 60))
      let list = mockConversations
      if (statusFilter !== 'all') {
        list = mockConversations.filter((c) => c.status === statusFilter)
      }
      return { success: true, data: list }
    } catch {
      return { success: true, data: mockConversations }
    }
  },

  async sendMessage(conversationId, text) {
    const conv = mockConversations.find((c) => c.id === conversationId)
    if (conv) {
      const newMsg = {
        id: `m-${Date.now()}`,
        sender: 'agent',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      conv.messages.push(newMsg)
      conv.lastMessage = text
      conv.timestamp = 'Just now'
    }
    return { success: true, message: 'Message delivered to WhatsApp customer' }
  },

  async updateStatus(conversationId, newStatus) {
    const conv = mockConversations.find((c) => c.id === conversationId)
    if (conv) conv.status = newStatus
    return { success: true, data: conv }
  },
}
