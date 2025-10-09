// API Configuration
export const API_CONFIG = {
  // Change this to switch between environments
  ENVIRONMENT: 'development' as 'development' | 'production',

  ENDPOINTS: {
    development: 'http://chemmaster.com/API/',
    production: 'https://spectcr.com/API/ChemMaster/'
  }
} as const

// Get current API base URL
export const getApiUrl = (endpoint?: string): string => {
  const baseUrl = API_CONFIG.ENDPOINTS[API_CONFIG.ENVIRONMENT]
  return endpoint ? `${baseUrl}${endpoint}` : baseUrl
}

// Helper function for making API requests
export const apiRequest = async (endpoint: string, options?: RequestInit) => {
  const url = getApiUrl(endpoint)
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  return response
}