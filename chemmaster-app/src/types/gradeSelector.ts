import { Module, Topic } from "@/types/cms"

// Re-export core types
export type { Module, Topic } from "@/types/cms"

// Props for StairStep component
export interface StairStepProps {
  module: Module
  index: number
  totalSteps: number
  onSelect: (id: number) => void
  isReversed: boolean
  progress: number
  gradeId: string
}

// Props for ModuleDetailModal component
export interface ModuleDetailModalProps {
  module: Module
  onClose: () => void
  gradeId: string
  onSelectTopic: (topicId: number, topicTitle: string, topicContent: string) => void
}

// Props for CompletionModal component
export interface CompletionModalProps {
  gradeTitle: string
  onClose: () => void
  onReset: () => void
}

// Props for GradeModulePath component (dumb/presentational)
export interface GradeModulePathProps {
  gradeId: string
  gradeTitle: string
  gradeSubtitle: string
  modules: Module[]
  onBack: () => void
  onSelectTopic: (topic: SelectedTopic) => void
  selectedModule: number | null
  onSelectModule: (moduleId: number | null) => void
  overallProgress: number
  showCompletion: boolean
  onCloseCompletion: () => void
  onResetProgress: () => void
}

// Topic selection type
export interface SelectedTopic {
  id: number
  title: string
  content: string
  moduleId: number
  moduleColor: string
}