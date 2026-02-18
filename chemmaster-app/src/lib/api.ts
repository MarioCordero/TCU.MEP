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
  UploadImage: async (file: File): Promise<{ success: boolean; url: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${BASE_URL}upload.php`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();
    if (!json.success) throw new Error(json.message || "Error al subir imagen");
    return json;
  },

  DeleteFile: async (filename: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}deleteFile.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });
    return response.json();
  },

  GetTopics: (slug: string) => request<Topic[]>(`getTopics.php?slug=${slug}`),

  AddTopic: (data: { module_id: number, title: string, description?: string, content: string, order_in_module: number }) => 
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

  AddModule: (data: { slug: string, grade_level: string, title: string, description?: string, icon?: string, color?: string, active?: number }) => 
    request<{ success: boolean; id: number; slug: string }>('addModule.php', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),

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