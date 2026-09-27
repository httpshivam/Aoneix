import { apiClient, USE_MOCK_FALLBACK } from '../client.js'

/**
 * Section: Client Projects & Deliveries
 */

let mockProjects = [
  {
    id: 'proj-1',
    name: 'TechSphere AI Voice Assistant',
    client: 'TechSphere Labs',
    progress: 75,
    status: 'In Progress',
    deadline: 'Oct 15, 2026',
    team: ['Shivam', 'Agent Bot 01'],
  },
  {
    id: 'proj-2',
    name: 'Nexus Real Estate CRM Flow',
    client: 'Nexus Real Estate',
    progress: 40,
    status: 'Development',
    deadline: 'Nov 02, 2026',
    team: ['Shivam'],
  },
  {
    id: 'proj-3',
    name: 'HealthScale Patient Intake Portal',
    client: 'HealthScale Global',
    progress: 100,
    status: 'Completed',
    deadline: 'Sep 24, 2026',
    team: ['Shivam', 'Dev AIONEX'],
  },
]

export const projectsApi = {
  async getProjects() {
    try {
      if (!USE_MOCK_FALLBACK) {
        return await apiClient('/projects')
      }
      await new Promise(r => setTimeout(r, 60))
      return { success: true, data: mockProjects }
    } catch {
      return { success: true, data: mockProjects }
    }
  },
}
