import { createContext, ReactNode, useState } from 'react'

export interface ProgressContextType {
  getModuleProgress: (gradeId: string | number, moduleId: string | number, totalTopics: number) => number
  getCompletedTopicsCount: (gradeId: string | number, moduleId: string | number) => number
  isTopicCompleted: (gradeId: string | number, moduleId: string | number, topicId: string | number) => boolean
  completeTopic: (gradeId: string | number, moduleId: string | number, topicId: string | number, totalTopics: number) => void
  resetGradeProgress: (gradeId: string | number) => void
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, Record<string, number>>>({})

  const getModuleProgress = (gradeId: string | number, moduleId: string | number, totalTopics: number): number => {
    if (totalTopics === 0) return 0
    const key = `${gradeId}-${moduleId}`
    const completed = progress[key]?.completed || 0
    return Math.round((completed / totalTopics) * 100)
  }

  const getCompletedTopicsCount = (gradeId: string | number, moduleId: string | number): number => {
    const key = `${gradeId}-${moduleId}`
    return progress[key]?.completed || 0
  }

  const isTopicCompleted = (gradeId: string | number, moduleId: string | number, topicId: string | number): boolean => {
    const key = `${gradeId}-${moduleId}-${topicId}`
    return progress[key]?.completed === 1
  }

  const completeTopic = (gradeId: string | number, moduleId: string | number, topicId: string | number, totalTopics: number): void => {
    setProgress((prev) => {
      const updated = { ...prev }
      const topicKey = `${gradeId}-${moduleId}-${topicId}`
      const moduleKey = `${gradeId}-${moduleId}`
      
      // Mark topic as completed
      updated[topicKey] = { completed: 1 }
      
      // Update module progress count
      if (!updated[moduleKey]) {
        updated[moduleKey] = { completed: 0 }
      }
      
      // Count total completed topics for this module
      let completedCount = 0
      for (let i = 1; i <= totalTopics; i++) {
        const key = `${gradeId}-${moduleId}-${i}`
        if (updated[key]?.completed === 1) {
          completedCount++
        }
      }
      
      updated[moduleKey] = { completed: completedCount }
      
      return updated
    })
  }

  const resetGradeProgress = (gradeId: string | number): void => {
    setProgress((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${gradeId}-`)) {
          delete updated[key]
        }
      })
      return updated
    })
  }

  return (
    <ProgressContext.Provider value={{ getModuleProgress, getCompletedTopicsCount, isTopicCompleted, completeTopic, resetGradeProgress }}>
      {children}
    </ProgressContext.Provider>
  )
}