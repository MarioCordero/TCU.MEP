// -------------------------------------------------------------------------------- //
// ------------------------ Modelos de Base de Datos (API) ------------------------ //
// -------------------------------------------------------------------------------- //

/**
 * Representa un Tema (Topic) tal como viene de la base de datos 'topics'.
 * Nota: Se eliminó 'active' porque no existe en la tabla actual.
 */
export interface Topic {
  id?: number;
  module_slug: string;     // Relación con el módulo (FK: slug)
  title: string;           // ¡Faltaba este campo vital!
  description?: string;
  content: string;         // HTML o contenido rico (LONGTEXT en DB)
  order_in_module: number;
  
  created_at?: string;
  updated_at?: string;
}

/**
 * Representa un Módulo Educativo (Tabla 'modules').
 */
export interface Module {
  id: number;              // ID Numérico (PK)
  slug: string;            // ID de Texto para URL (antes module_id)
  grade_level: "10" | "11"; 
  
  title: string;
  description?: string;
  icon?: string;           // Nombre del icono (ej: "Atom", "Beaker")
  color?: string;          // Clases de Tailwind (ej: "from-blue-500 to-blue-600")
  
  active: boolean;         // El PHP ahora devuelve true/false

  // Campos JSON decodificados
  features?: string[];     
  tools?: string[];        

  // Relación: Un módulo contiene una lista de temas
  topics?: Topic[];        
  
  created_at?: string;
  updated_at?: string;
}

// -------------------------------------------------------------------------------- //
// ------------------------ Respuestas de la API ---------------------------------- //
// -------------------------------------------------------------------------------- //

/**
 * Respuesta del endpoint 'getAllContent.php'
 * Contiene todo el árbol de navegación.
 */
export interface AllContentResponse {
  modules: Module[];
  lastUpdated: string;
  total_modules: number;
}

// -------------------------------------------------------------------------------- //
// ------------------------ Tipos de UI / Estado Local ---------------------------- //
// -------------------------------------------------------------------------------- //

export type CMSEditMode = "view" | "edit" | "add";
export type CMSContentType = "module" | "topic"; // Simplificado (quitamos submodule si no se usa)