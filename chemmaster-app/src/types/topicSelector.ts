import { Topic } from "./cms"

// Re-export core types
export type { Module, Topic } from "./cms"

export interface TopicRowProps {
  topic: Topic
  index: number
  moduleColor: string
  gradeId: string
  moduleId: number
  onSelectTopic: () => void
}

// BlockNote Block types
export interface BlockNoteBlock {
  id: string
  type: string
  props: {
    backgroundColor?: string
    textColor?: string
    textAlignment?: string
    level?: number
    isToggleable?: boolean
  }
  content: Array<{
    type: string
    text: string
    styles: Record<string, boolean>
  }>
  children: BlockNoteBlock[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface TopicLearningPageProps {
  topic: Topic
  moduleId: number
  moduleColor: string
  gradeId: string
  totalTopicsInModule: number
  onBack: () => void
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface TopicQuizProps {
  topicTitle: string
  quiz: QuizQuestion[]
  onBack: () => void
  onComplete: (score: number) => void
}
