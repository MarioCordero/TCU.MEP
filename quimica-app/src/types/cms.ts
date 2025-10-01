// -------------------------------------------------------------------------------- //
// ------------------------These are the types used in the CMS--------------------- //
// -------------------------------------------------------------------------------- //

export interface Topic {
  id?: number
  title: string
  description?: string
  content: any
  order_in_module?: number
}

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
  id: string | number
  module_id: string
  title: string
  description: string
  icon: string
  color: string
  grade?: "10" | "11"         // Frontend field
  grade_level?: "10" | "11"   // Database field
  submodules?: CMSSubmodule[]
  order?: number
  isActive: boolean           // Frontend field (boolean)
  active?: number | boolean | string   // Database field - add string type if needed
  features?: string[]
  tools?: string[]
  topics?: Topic[]
  created_at?: string
  updated_at?: string
}

export interface CMSData {
  modules: CMSModule[]
  lastUpdated: string
}

export type CMSEditMode = "view" | "edit" | "add"
export type CMSContentType = "module" | "submodule" | "topic"