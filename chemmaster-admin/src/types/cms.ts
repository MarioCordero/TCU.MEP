export interface Topic {
  id: number;
  module_id: number;
  title: string;
  description?: string;
  content: string;
  order_in_module: number;  
  points?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Module {
  id: number;
  grade_level: "10" | "11"; 
  title: string;
  description: string;
  icon?: string;
  color?: string;
  active: number;
  features?: string[];     
  tools?: string[];        
  topics?: Topic[]; // Relation: A module can have N topics
  total_points?: number; 
  created_at?: string;
  updated_at?: string;
}

// Endpoint response for fetching all content
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

export interface CMSTopicEditorProps {
  moduleId: number
  topics: Topic[]
  onUpdate: () => void
}

export interface CMSModuleEditorProps {
  module: Module;
  onSave: (module: Module) => void;
}

export interface CMSTopicEditorModalProps {
  show: boolean
  topic: Topic | null
  onClose: () => void
  onSave: (topic: Topic) => void
}

export interface CMSAddTopicModalProps {
  show: boolean
  onClose: () => void
  onSave: (topic: Topic) => void
  moduleId: number
  topicsCount: number
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

export interface SidebarProps {
  modules: Module[]
  selectedModule: Module | null
  onSelect: (module: Module) => void
  onModuleAdded?: (module: Module) => void
  onModuleDeleted?: (moduleId: number) => void
}