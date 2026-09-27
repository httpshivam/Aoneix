/**
 * AIONEX Centralized API Client
 * 
 * Rules:
 * - ISR / Cache: STRICTLY 0 (cache: 'no-store') for 100% dynamic live data
 * - Clean centralized request handling & error logging
 * - Toggleable between Live Backend API and Dynamic Fallback Mock Data
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const USE_MOCK_FALLBACK = true // Set to false when connecting to production backend

/**
 * Core dynamic fetch wrapper
 * Ensures zero caching (revalidate: 0 / no-store) on every request
 */
export async function apiClient(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  }

  const config = {
    ...options,
    // ISR / Cache is ALWAYS 0: completely dynamic live requests
    cache: 'no-store',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.warn(`[AIONEX API] Endpoint ${endpoint} failed or unreachable:`, error.message)
    throw error
  }
}
