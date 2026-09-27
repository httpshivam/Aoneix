/**
 * Centralized API Registry
 * 
 * Modular domain-specific APIs (strictly zero-cache dynamic requests):
 * - onboardingApi: Multi-step business setup & channel selection
 * - whatsappApi: Meta WhatsApp Business API connection & QR status
 * - aiAgentApi: Automated AI bot deployment & live WhatsApp simulator
 * - inboxApi: Team conversations, live WhatsApp chat thread, replies
 * - teamApi: User invites & agent management
 * - analyticsApi: KPI stats & conversion rates
 * - leadsApi: Direct website inquiries
 */

export { apiClient, USE_MOCK_FALLBACK } from './client.js'
export { onboardingApi } from './onboarding/onboarding.api.js'
export { whatsappApi } from './whatsapp/whatsapp.api.js'
export { aiAgentApi } from './aiAgent/aiAgent.api.js'
export { inboxApi } from './inbox/inbox.api.js'
export { teamApi } from './team/team.api.js'
export { analyticsApi } from './analytics/analytics.api.js'
export { leadsApi } from './leads/leads.api.js'
export { automationsApi } from './automations/automations.api.js'
export { campaignsApi } from './campaigns/campaigns.api.js'
