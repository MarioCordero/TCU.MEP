// -------------------------------------------------------------------------------- //
// ------------------------ Modelos de Base de Datos (API) ------------------------ //
// -------------------------------------------------------------------------------- //

/**
 * Representa un Tema (Topic) tal como viene de la base de datos.
 */
export interface Topic {
  id: number;              // En SQL los IDs suelen ser numéricos
  module_slug: string; // Antes module_id
  description?: string;
  content: string;         // HTML o Markdown string
  order_in_module: number;
  active: number | boolean; // PHP a veces devuelve 1/0 o true/false
}

/**
 * Representa un Submódulo (si aplica en tu lógica actual).
 */
export interface Submodule {
  id: number;
  title: string;
  description: string;
  icon?: string;
  topics: Topic[];
  order: number;
  active: number | boolean;
}

/**
 * Representa un Módulo Educativo (Grados 10 u 11).
 */
export interface Module {
  id: number;
  title: string;
  description: string;
  icon?: string;
  color?: string;          // Hex code para UI
  
  // Estandarización: Usamos el nombre de la DB o el de frontend, pero no ambos mezclados.
  // Asumiré 'grade_level' como el oficial de la DB.
  grade_level: "10" | "11"; 
  
  submodules?: Submodule[];
  topics?: Topic[];        // Un módulo puede tener temas directos
  order: number;
  
  // El campo conflictivo: Lo definimos flexible para la entrada, 
  // pero intentaremos tratarlo como boolean en la UI.
  active: number | boolean; 

  features?: string[];     // JSON parseado
  tools?: string[];        // JSON parseado
  
  created_at?: string;
  updated_at?: string;
}

// -------------------------------------------------------------------------------- //
// ------------------------ Tipos de Respuesta de API ----------------------------- //
// -------------------------------------------------------------------------------- //

export interface CmsDataResponse {
  modules: Module[];
  lastUpdated: string;
}

// -------------------------------------------------------------------------------- //
// ------------------------ Tipos de UI / Estado Local ---------------------------- //
// -------------------------------------------------------------------------------- //

export type CMSEditMode = "view" | "edit" | "add";
export type CMSContentType = "module" | "submodule" | "topic";