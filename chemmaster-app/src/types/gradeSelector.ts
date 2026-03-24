import { Module } from "./cms"

// Re-export core types
export type { Module, Topic } from "./cms"

// Props for StairStep component
export interface StairStepProps {
  module: Module
  index: number
  totalSteps: number
  onSelect: (id: number) => void
  isReversed: boolean
  progress: number
  gradeId: string
  topicCount?: number
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
  earnedPoints?: number
  totalPoints?: number
  moduleTopicCounts?: Record<number, number>
}

// Topic selection type
export interface SelectedTopic {
  id: number
  title: string
  content: string
  moduleId: number
  moduleColor: string
}