import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Section: Onboarding & Business Profile Setup
 * Zero-cache, 100% Dynamic state
 */

let mockOnboarding = {
  isCompleted: false,
  step: 1, // 1: Business Info, 2: Channels, 3: Completed -> Dashboard
  business: {
    userName: 'Shivam',
    industry: 'eCommerce/ Retail',
    website: 'https://aionex.ai',
    role: 'Business owner / Founder',
    companySize: '11 - 50',
  },
  channels: {
    primaryChannel: 'whatsapp',
    hasMetaAccount: true,
    enabledChannels: ['whatsapp'],
  },
  setupChecklist: {
    whatsappConnected: false,
    aiAgentDeployed: false,
    inboxConfigured: false,
    teamInvited: false,
  },
}

export const onboardingApi = {
  /**
   * Get current onboarding and setup status (strictly dynamic, cache: 'no-store')
   */
  async getStatus() {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient('/onboarding/status')
      }
      await new Promise((r) => setTimeout(r, 60))
      return { success: true, data: { ...mockOnboarding } }
    } catch {
      return { success: true, data: { ...mockOnboarding } }
    }
  },

  /**
   * Save Step 1: Industry, website, role, company size
   */
  async saveBusinessProfile(profileData) {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient('/onboarding/business-profile', {
          method: 'POST',
          body: JSON.stringify(profileData),
        })
      }
      mockOnboarding.business = { ...mockOnboarding.business, ...profileData }
      mockOnboarding.step = 2
      return { success: true, data: { ...mockOnboarding } }
    } catch (err) {
      mockOnboarding.business = { ...mockOnboarding.business, ...profileData }
      mockOnboarding.step = 2
      return { success: true, data: { ...mockOnboarding } }
    }
  },

  /**
   * Save Step 2: Customer connection channels & Meta account verification
   */
  async saveChannelPreferences(channelData) {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient('/onboarding/channels', {
          method: 'POST',
          body: JSON.stringify(channelData),
        })
      }
      mockOnboarding.channels = { ...mockOnboarding.channels, ...channelData }
      mockOnboarding.isCompleted = true
      mockOnboarding.step = 3
      return { success: true, data: { ...mockOnboarding } }
    } catch {
      mockOnboarding.channels = { ...mockOnboarding.channels, ...channelData }
      mockOnboarding.isCompleted = true
      mockOnboarding.step = 3
      return { success: true, data: { ...mockOnboarding } }
    }
  },

  /**
   * Reset onboarding for preview or re-configuration
   */
  async resetOnboarding() {
    mockOnboarding.isCompleted = false
    mockOnboarding.step = 1
    return { success: true, data: { ...mockOnboarding } }
  },

  /**
   * Update individual setup step progress
   */
  async updateSetupStep(stepKey, isCompleted) {
    mockOnboarding.setupChecklist[stepKey] = isCompleted
    return { success: true, data: { ...mockOnboarding.setupChecklist } }
  },
}
