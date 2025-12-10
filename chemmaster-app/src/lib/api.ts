// src/lib/api.ts
import { Topic, Module, CmsDataResponse } from '../types/cms';

// Configuración de URL (Automática con Vite)
const BASE_URL = import.meta.env.PROD 
  ? 'https://spectcr.com/API/ChemMaster/' 
  : 'http://chemmaster.com/API/';

/**
 * Cliente HTTP genérico y tipado.
 */
const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  // Aquí confiamos en que el backend devuelve la estructura T
  return response.json() as Promise<T>;
}

export const API = {
  // GET: Lista de Temas
  GetTopics: () => request<Topic[]>('getTopics.php'),

  // GET: Datos completos del CMS
  GetCmsData: () => request<CmsDataResponse>('cmsData.php'),

  // GET: Un Módulo específico
  GetModule: (id: number) => request<Module>(`getModule.php?id=${id}`),

  // POST: Crear Tema (Omitimos ID porque es autogenerado)
  AddTopic: (data: Omit<Topic, 'id' | 'module_id'> & { module_id: number }) => 
    request<{ success: boolean; id: number }>('addTopic.php', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),

  // PUT: Actualizar Tema (Partial permite enviar solo campos modificados)
  UpdateTopic: (id: number, data: Partial<Topic>) => 
    request<{ success: boolean }>('updateTopic.php', { 
      method: 'PUT', 
      body: JSON.stringify({ id, ...data }) 
    }),

  // DELETE: Borrar Tema
  DeleteTopic: (id: number) => 
    request<{ success: boolean }>('deleteTopic.php', { 
      method: 'DELETE', 
      body: JSON.stringify({ id }) 
    })
}