import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Section: Analytics & Performance Metrics (Meta Cloud API & Team Inbox)
 */

export const analyticsApi = {
  /**
   * Fetch Team Inbox Analytics
   */
  async getInboxAnalytics(samplePreview = false) {
    if (samplePreview) {
      return {
        success: true,
        data: {
          metrics: {
            open: 14,
            pending: 8,
            solved: 96,
            solvedByBot: 62,
            solvedByOperator: 34,
            expired: 2,
            missed: 1,
          },
          statusOverTime: [
            { date: '20 Sep', open: 2, pending: 1, solved: 12 },
            { date: '21 Sep', open: 3, pending: 2, solved: 15 },
            { date: '22 Sep', open: 1, pending: 0, solved: 18 },
            { date: '23 Sep', open: 4, pending: 1, solved: 14 },
            { date: '24 Sep', open: 2, pending: 2, solved: 19 },
            { date: '25 Sep', open: 1, pending: 1, solved: 10 },
            { date: '26 Sep', open: 1, pending: 1, solved: 8 },
          ]
        }
      }
    }

    // Default: Zero state requested by user
    return {
      success: true,
      data: {
        metrics: {
          open: 0,
          pending: 0,
          solved: 0,
          solvedByBot: 0,
          solvedByOperator: 0,
          expired: 0,
          missed: 0,
        },
        statusOverTime: []
      }
    }
  },

  /**
   * Fetch Sales Analytics
   */
  async getSalesAnalytics(samplePreview = false) {
    if (samplePreview) {
      return {
        success: true,
        data: {
          winRate: 34,
          wonLeads: 28,
          lostLeads: 12,
          pipeline: {
            newLead: 45,
            contacted: 32,
            qualified: 20,
            proposalSent: 12,
            dealWon: 8,
          }
        }
      }
    }

    return {
      success: true,
      data: {
        winRate: 0,
        wonLeads: 0,
        lostLeads: 0,
        pipeline: {
          newLead: 0,
          contacted: 0,
          qualified: 0,
          proposalSent: 0,
          dealWon: 0,
        }
      }
    }
  },

  /**
   * Fetch WhatsApp Calls Analytics
   */
  async getCallsAnalytics(samplePreview = false) {
    if (samplePreview) {
      return {
        success: true,
        data: {
          totalVolume: 48,
          outboundConnected: 32,
          outboundAttempted: 14,
          inboundCalls: 18,
          missedCalls: 2,
          avgDuration: '2m 45s',
          agentPerformance: [
            { agent: 'Sanes Official', avgDuration: '2m 14s', outboundAttempted: 12, outboundConnected: 10, inboundCalls: 6 },
            { agent: 'Rahul Verma', avgDuration: '3m 05s', outboundAttempted: 18, outboundConnected: 14, inboundCalls: 8 },
          ]
        }
      }
    }

    return {
      success: true,
      data: {
        totalVolume: 0,
        outboundConnected: 0,
        outboundAttempted: 0,
        inboundCalls: 0,
        missedCalls: 0,
        avgDuration: '-',
        agentPerformance: [
          { agent: 'Sanes Official', avgDuration: '0s', outboundAttempted: 0, outboundConnected: 0, inboundCalls: 0 }
        ]
      }
    }
  },

  /**
   * Fetch Chatbot Analytics (Beta)
   */
  async getChatbotAnalytics(samplePreview = false) {
    if (samplePreview) {
      return {
        success: true,
        data: {
          sessions: 184,
          completed: 142,
          droppedOff: 24,
          reassigned: 18,
          completionRate: '77.2%',
          dropOffRate: '13.0%',
          reassignmentRate: '9.8%',
        }
      }
    }

    return {
      success: true,
      data: {
        sessions: 0,
        completed: 0,
        droppedOff: 0,
        reassigned: 0,
        completionRate: '0.0%',
        dropOffRate: '0.0%',
        reassignmentRate: '0.0%',
      }
    }
  },

  /**
   * Fetch CX Intelligence (Beta)
   */
  async getCxAnalytics(samplePreview = false) {
    if (samplePreview) {
      return {
        success: true,
        data: {
          score: 60,
          totalConversations: 45,
          positiveShare: 60,
          positiveCount: 27,
          negativeShare: 40,
          negativeCount: 18,
          trend: [
            { day: 'Mon', score: 55 },
            { day: 'Tue', score: 62 },
            { day: 'Wed', score: 48 },
            { day: 'Thu', score: 70 },
            { day: 'Fri', score: 58 },
            { day: 'Sat', score: 64 },
            { day: 'Sun', score: 60 },
          ]
        }
      }
    }

    return {
      success: true,
      data: {
        score: 0,
        totalConversations: 0,
        positiveShare: 0,
        positiveCount: 0,
        negativeShare: 0,
        negativeCount: 0,
        trend: []
      }
    }
  }
}
