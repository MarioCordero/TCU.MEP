// -------------------------------------------------------------------------------- //
// ------------------------These are the types used in the CMS--------------------- //
// -------------------------------------------------------------------------------- //
export interface CMSTopic {
  id: string
  title: string
  description: string
  content: string
  icon: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CMSSubmodule {
  id: string
  title: string
  description: string
  icon: string
  topics: CMSTopic[]
  order: number
  isActive: boolean
}

export interface CMSModule {
  id: string
  title: string
  description: string
  icon: string
  color: string
  grade?: "10" | "11"         // Optional, for legacy/new data
  grade_level?: string        // Optional, for DB/API compatibility
  submodules: CMSSubmodule[]
  order: number
  isActive: boolean
  features: string[]
  tools: string[]
  topics: { title: string; content: string }[]
}

export interface CMSData {
  modules: CMSModule[]
  lastUpdated: string
}

export type CMSEditMode = "view" | "edit" | "add"
export type CMSContentType = "module" | "submodule" | "topic"