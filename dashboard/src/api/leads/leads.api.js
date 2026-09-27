import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Section: Website Inquiries & Client Leads
 */

let mockLeads = [
  {
    id: 'lead-101',
    name: 'Aditi Sharma',
    email: 'aditi.sharma@techsphere.io',
    phone: '+91 98765 43210',
    company: 'TechSphere Labs',
    service: 'AI Voice Agent Integration',
    budget: '$5,000 - $10,000',
    status: 'Qualified',
    source: 'Website Contact Modal',
    createdAt: '12m ago',
    notes: 'Requested voice-based automated customer support demo for their fintech application.',
  },
  {
    id: 'lead-102',
    name: 'Michael Chen',
    email: 'm.chen@nexusgroup.co',
    phone: '+1 (415) 890-1234',
    company: 'Nexus Real Estate',
    service: 'Custom CRM & Automation',
    budget: '$15,000+',
    status: 'Proposal Sent',
    source: 'Hero CTA Form',
    createdAt: '1h ago',
    notes: 'Multi-agent lead qualification pipeline needed across WhatsApp and Email.',
  },
  {
    id: 'lead-103',
    name: 'Vikram Patel',
    email: 'vikram@healthscale.org',
    phone: '+91 99887 76655',
    company: 'HealthScale Global',
    service: 'Brand Redesign & Web Platform',
    budget: '$8,000',
    status: 'New Lead',
    source: 'Website Header CTA',
    createdAt: '3h ago',
    notes: 'Looking for a complete redesign with high-performance animations and custom portal.',
  },
  {
    id: 'lead-104',
    name: 'Elena Rostova',
    email: 'elena@finpulse.de',
    phone: '+49 170 1234567',
    company: 'FinPulse Advisory',
    service: 'Enterprise Workflow AI',
    budget: '$20,000+',
    status: 'Qualified',
    source: 'Case Study Link',
    createdAt: 'Yesterday',
    notes: 'Document OCR processing and automated invoice audit bot.',
  },
]

export const leadsApi = {
  /**
   * Fetch all leads with dynamic filters
   */
  async getLeads(filters = {}) {
    try {
      if (!USE_MOCK_FALLBACK) {
        const query = new URLSearchParams(filters).toString()
        return await apiClient(`/leads?${query}`)
      }
      await new Promise(r => setTimeout(r, 60))
      return { success: true, data: mockLeads }
    } catch {
      return { success: true, data: mockLeads }
    }
  },

  /**
   * Update lead status (e.g. New -> Qualified -> Proposal Sent -> Won)
   */
  async updateStatus(leadId, newStatus) {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient(`/leads/${leadId}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ status: newStatus }),
        })
      }
      mockLeads = mockLeads.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
      return { success: true, message: 'Status updated' }
    } catch {
      mockLeads = mockLeads.map(l => (l.id === leadId ? { ...l, status: newStatus } : l))
      return { success: true, message: 'Status updated locally' }
    }
  },
}
