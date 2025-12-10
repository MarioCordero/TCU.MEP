export const API_CONFIG = {
  ENVIRONMENT: 'development' as 'development' | 'production',
  ENDPOINTS: {
    development: 'http://chemmaster.com/API/',
    production: 'https://spectcr.com/API/ChemMaster/'
  }
} as const

const baseUrl = () => API_CONFIG.ENDPOINTS[API_CONFIG.ENVIRONMENT]

const request = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${baseUrl()}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers }
  })
  if (!response.ok) throw new Error(`API Error: ${response.status}`)
  return response.json()
}

// Endpoint routes
export const API = {
  GetTopics: () => request('getTopics.php'),
  GetCmsData: () => request('cmsData.php'),
  GetModule: (id: number) => request(`getModule.php?id=${id}`),
  AddTopic: (data: any) => request('addTopic.php', { method: 'POST', body: JSON.stringify(data) }),
  UpdateTopic: (id: number, data: any) => request('updateTopic.php', { method: 'PUT', body: JSON.stringify({ id, ...data }) }),
  DeleteTopic: (id: number) => request('deleteTopic.php', { method: 'DELETE', body: JSON.stringify({ id }) })
}