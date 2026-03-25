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
  content: Array<{
    type: string
    text: string
    styles?: {
      bold?: boolean
      italic?: boolean
      underline?: boolean
      strike?: boolean
      superscript?: boolean
      subscript?: boolean
    }
  }>
  children?: BlockNoteBlock[]
  props: {
    backgroundColor?: string
    textColor?: string
    textAlignment?: string
    level?: number
    isToggleable?: boolean
    equation?: string
    url?: string
    caption?: string
    previewWidth?: number
    name?: string
  }
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
  basePath?: string
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
