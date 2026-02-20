import { Topic } from "./cms"

// Re-export core types
export type { Module, Topic } from "./cms"

export interface TopicRowProps {
  topic: Topic
  index: number
  moduleColor: string
  gradeId: string
  moduleId: string
  onSelectTopic: (topicId: string, topicTitle: string, topicContent: string) => void
}