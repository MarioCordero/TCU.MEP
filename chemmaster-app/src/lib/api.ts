import { Topic, Module, AllContentResponse } from '../types/cms';

const BASE_URL = import.meta.env.PROD 
  ? 'https://spectcr.com/API/ChemMaster/' 
  : 'http://chemmaster.com/API/';

const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers }
  });

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || `Error en la API: ${endpoint}`);
  }

  if (json.topics) return json.topics as T;
  if (json.modules) return json.modules as T;
  if (json.data) return json.data as T;
  return json as T;
}

export const API = {
  GetTopics: (slug: string) => request<Topic[]>(`getTopics.php?slug=${slug}`),

  AddTopic: (data: { module_slug: string, title: string, description?: string, content: string, order_in_module: number }) => 
    request<{ success: boolean; id: number }>('addTopic.php', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),

  UpdateTopic: (id: number, data: { title: string, description?: string, content: string, order_in_module: number }) => 
    request<{ success: boolean }>('updateTopic.php', { 
      method: 'PUT', 
      body: JSON.stringify({ id, ...data }) 
    }),

  DeleteTopic: (id: number) => 
    request<{ success: boolean }>('deleteTopic.php', { 
      method: 'DELETE', 
      body: JSON.stringify({ id }) 
    }),

  GetModules: (grade: string) => request<Module[]>(`getModules.php?grade=${grade}`),

  UpdateModule: (id: number, data: Partial<Module>) => 
    request<{ success: boolean }>('updateModule.php', { 
      method: 'PUT', 
      body: JSON.stringify({ id, ...data }) 
    }),

  DeleteModule: (id: number) => 
    request<{ success: boolean }>('deleteModule.php', { 
      method: 'DELETE', 
      body: JSON.stringify({ id }) 
    }),

  GetAllContent: () => request<AllContentResponse>('getAllContent.php'),
};