import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Section: Team Members & Access Roles
 */

let mockTeam = [
  {
    id: 'u1',
    name: 'Shivam',
    email: 'shivam@aionex.ai',
    role: 'Owner & Admin',
    status: 'Active',
    assignedChats: 14,
  },
  {
    id: 'u2',
    name: 'Aakash Verma',
    email: 'aakash@aionex.ai',
    role: 'Support Agent',
    status: 'Active',
    assignedChats: 8,
  },
]

export const teamApi = {
  async getMembers() {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient('/team/members')
      }
      await new Promise((r) => setTimeout(r, 60))
      return { success: true, data: mockTeam }
    } catch {
      return { success: true, data: mockTeam }
    }
  },

  async inviteMember(memberData) {
    const newMember = {
      id: `u-${Date.now()}`,
      name: memberData.name || memberData.email.split('@')[0],
      email: memberData.email,
      role: memberData.role || 'Support Agent',
      status: 'Invited (Pending)',
      assignedChats: 0,
    }
    mockTeam.push(newMember)
    return { success: true, data: newMember, message: `Invite email sent to ${memberData.email}` }
  },
}
