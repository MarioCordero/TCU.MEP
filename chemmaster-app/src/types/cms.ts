// Representa un Tema (Topic) tal como viene de la base de datos 'topics'.
export interface Topic {
  id?: number;
  module_id: number;       // Relación con el módulo (FK: module_id)
  title: string;
  description?: string;
  content: string;         // HTML o contenido rico (LONGTEXT en DB)
  order_in_module: number;
  
  created_at?: string;
  updated_at?: string;
}

// Representa un Módulo Educativo (Tabla 'modules').
export interface Module {
  id?: number;              // ID Numérico (PK)
  slug: string;            // ID de Texto para URL
  grade_level: "10" | "11"; 
  
  title: string;
  description?: string;
  icon?: string;           // Nombre del icono (ej: "Atom", "Beaker")
  color?: string;          // Clases de Tailwind (ej: "from-blue-500 to-blue-600")
  
  active: boolean;         // El PHP devuelve true/false

  // Campos JSON decodificados
  features?: string[];     
  tools?: string[];        

  // Relación: Un módulo contiene una lista de temas
  topics?: Topic[];        
  
  created_at?: string;
  updated_at?: string;
}

// Respuesta del endpoint 'getAllContent.php'
export interface AllContentResponse {
  modules: Module[];
  lastUpdated: string;
  total_modules: number;
}

export type CMSEditMode = "view" | "edit" | "add";
export type CMSContentType = "module" | "topic";

export interface ColorOption {
  value: string;
  label: string;
  preview: string;
}

export interface CMSModuleEditorProps {
  module: Module;
  onSave: (module: Module) => void;
}

export interface IconModalProps {
  show: boolean;
  onClose: () => void;
  currentIcon: string;
  onIconChange: (icon: string) => void;
  disabled: boolean;
}

export interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  password: string;
  onPasswordChange: (password: string) => void;
}

export interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
}

export interface UseModuleEditorReturn {
  editedModule: Module;
  setEditedModule: (module: Module) => void;
  deletedTopicIds: number[];
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  addTopic: () => void;
  updateTopic: (index: number, field: keyof Topic, value: any) => void;
  removeTopic: (index: number) => void;
  resetToOriginal: () => void;
  hasChanges: boolean;
}