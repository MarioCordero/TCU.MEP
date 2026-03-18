import { Topic, Module, AllContentResponse } from '../types/cms';
import { Activity } from '../types/activities';
import { LoginResponse } from '../types/login';

const BASE_URL = import.meta.env.PROD 
  ? 'https://spectcr.com/API/ChemMaster/' 
  : 'http://chemmaster.com/API/';

// ============ ENDPOINTS CONSTANTS ============
export const ENDPOINTS = {
  // Auth
  LOGIN: 'login.php',
  
  // Content Retrieval
  GET_ALL_CONTENT: 'getAllContent.php',
  GET_MODULES: 'getModules.php',
  GET_TOPICS: 'getTopics.php',
  GET_ACTIVITIES: 'getActivities.php',
  
  // Module Operations
  ADD_MODULE: 'addModule.php',
  UPDATE_MODULE: 'updateModule.php',
  DELETE_MODULE: 'deleteModule.php',
  
  // Topic Operations
  ADD_TOPIC: 'addTopic.php',
  UPDATE_TOPIC: 'updateTopic.php',
  DELETE_TOPIC: 'deleteTopic.php',
  
  // Activity Operations
  ADD_ACTIVITY: 'addActivity.php',
  UPDATE_ACTIVITY: 'updateActivity.php',
  DELETE_ACTIVITY: 'deleteActivity.php',
  
  // File Operations
  UPLOAD_FILE: 'upload.php',
  DELETE_FILE: 'deleteFile.php',
} as const;

// ============ REQUEST HELPER ============
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

// ============ API OBJECT ============
export const API = {
  // ===== Auth =====
  Login: (data: { username: string; password: string }) =>
    request<LoginResponse>(ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // ===== Content Retrieval (Minimal params) =====
  GetAllContent: () => 
    request<AllContentResponse>(ENDPOINTS.GET_ALL_CONTENT),

  GetModules: {
    tenth: () => request<Module[]>(`${ENDPOINTS.GET_MODULES}?grade=10`),
    eleventh: () => request<Module[]>(`${ENDPOINTS.GET_MODULES}?grade=11`),
  },

  GetTopics: (moduleId: number) => 
    request<Topic[]>(`${ENDPOINTS.GET_TOPICS}?module_id=${moduleId}`),

  GetActivities: (moduleId: number, topicId?: number) => {
    const params = new URLSearchParams();
    params.append('module_id', moduleId.toString());
    if (topicId) params.append('topic_id', topicId.toString());
    return request<Activity[]>(`${ENDPOINTS.GET_ACTIVITIES}?${params}`);
  },

  // ===== Module Operations (Full payload) =====
  Module: {
    Add: (payload: { 
      slug: string;
      grade_level: '10' | '11';
      title: string;
      description?: string;
      icon?: string;
      color?: string;
      active?: number;
    }) => 
      request<{ success: boolean; id: number; slug: string }>(ENDPOINTS.ADD_MODULE, { 
        method: 'POST', 
        body: JSON.stringify(payload) 
      }),

    Update: (id: number, payload: Partial<Module>) => 
      request<{ success: boolean }>(ENDPOINTS.UPDATE_MODULE, { 
        method: 'PUT', 
        body: JSON.stringify({ id, ...payload }) 
      }),

    Delete: (id: number) => 
      request<{ success: boolean }>(ENDPOINTS.DELETE_MODULE, { 
        method: 'DELETE', 
        body: JSON.stringify({ id }) 
      }),
  },

  // ===== Topic Operations (Full payload) =====
  Topic: {
    Add: (payload: { 
      module_id: number;
      title: string;
      description?: string;
      content: string;
      order_in_module: number;
    }) => 
      request<{ success: boolean; id: number }>(ENDPOINTS.ADD_TOPIC, { 
        method: 'POST', 
        body: JSON.stringify(payload) 
      }),

    Update: (id: number, payload: { 
      title: string;
      description?: string;
      content: string;
      order_in_module: number;
    }) => 
      request<{ success: boolean }>(ENDPOINTS.UPDATE_TOPIC, { 
        method: 'PUT', 
        body: JSON.stringify({ id, ...payload }) 
      }),

    Delete: (id: number) => 
      request<{ success: boolean }>(ENDPOINTS.DELETE_TOPIC, { 
        method: 'DELETE', 
        body: JSON.stringify({ id }) 
      }),
  },

  // ===== Activity Operations (Full payload) =====
  Activity: {
    Add: (payload: {
      topic_id: number;
      type: 'quiz' | 'match' | 'word_soup' | 'fill_blank' | 'drag_drop';
      question?: string;
      content: string | Record<string, unknown> | unknown[];
      order_in_topic?: number;
    }) =>
      request<{
        id: number;
        topic_id: number;
        type: string;
        question: string | null;
        content: string;
        order_in_topic: number;
      }>(ENDPOINTS.ADD_ACTIVITY, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),

    Update: (activityId: number, payload: {
      type: 'quiz' | 'match' | 'word_soup' | 'fill_blank' | 'drag_drop';
      question: string;
      content: string | Record<string, unknown>;
      order_in_topic?: number;
    }) =>
      request<{ success: boolean }>(ENDPOINTS.UPDATE_ACTIVITY, {
        method: 'POST',
        body: JSON.stringify({ activity_id: activityId, ...payload }),
      }),

    Delete: (activityId: number) =>
      request<{ success: boolean }>(ENDPOINTS.DELETE_ACTIVITY, {
        method: 'POST',
        body: JSON.stringify({ activity_id: activityId }),
      }),
  },

  // ===== File Operations =====
  File: {
    Upload: async (file: File): Promise<{ success: boolean; url: string }> => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${BASE_URL}${ENDPOINTS.UPLOAD_FILE}`, {
        method: 'POST',
        body: formData,
      });

      const json = await response.json();
      if (!json.success) throw new Error(json.message || "Error al subir imagen");
      return json;
    },

    Delete: (filename: string) =>
      request<{ success: boolean }>(ENDPOINTS.DELETE_FILE, {
        method: 'POST',
        body: JSON.stringify({ filename }),
      }),
  },
};