import { createContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { readProgressCookie, writeProgressCookie } from "../utils/progressCookie"

type ProgressContextType = {
  getModuleProgress: (gradeId: string | number, moduleId: string | number, totalTopics: number) => number
  getCompletedTopicsCount: (gradeId: string | number, moduleId: string | number) => number
  isTopicCompleted: (gradeId: string | number, moduleId: string | number, topicId: string | number) => boolean
  completeTopic: (
    gradeId: string | number,
    moduleId: string | number,
    topicId: string | number,
    totalTopics: number
  ) => void
  resetGradeProgress: (gradeId: string | number) => void
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Record<string, Record<string, number>>>(() => readProgressCookie())

  const getModuleProgress = (
    gradeId: string | number,
    moduleId: string | number,
    totalTopics: number
  ): number => {
    if (totalTopics === 0) return 0
    const key = `${gradeId}-${moduleId}`
    const completed = progress[key]?.completed || 0
    return Math.min(100, Math.round((completed / totalTopics) * 100))
  }

  const getCompletedTopicsCount = (gradeId: string | number, moduleId: string | number): number => {
    const key = `${gradeId}-${moduleId}`
    return progress[key]?.completed || 0
  }

  const isTopicCompleted = (
    gradeId: string | number,
    moduleId: string | number,
    topicId: string | number
  ): boolean => {
    const key = `${gradeId}-${moduleId}-${topicId}`
    return progress[key]?.completed === 1
  }

  const completeTopic = (
    gradeId: string | number,
    moduleId: string | number,
    topicId: string | number,
    _totalTopics: number
  ): void => {
    setProgress((prev) => {
      const updated = { ...prev }
      const topicKey = `${gradeId}-${moduleId}-${topicId}`
      const moduleKey = `${gradeId}-${moduleId}`
      const moduleTopicPrefix = `${gradeId}-${moduleId}-`

      updated[topicKey] = { completed: 1 }

      const completedCount = Object.entries(updated).filter(
        ([k, v]) => k.startsWith(moduleTopicPrefix) && v?.completed === 1
      ).length

      updated[moduleKey] = { completed: completedCount }
      return updated
    })
  }

  const resetGradeProgress = (gradeId: string | number): void => {
    setProgress((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${gradeId}-`)) delete updated[key]
      })
      return updated
    })
  }

  useEffect(() => {
    writeProgressCookie(progress)
  }, [progress])

  const value = useMemo<ProgressContextType>(
    () => ({
      getModuleProgress,
      getCompletedTopicsCount,
      isTopicCompleted,
      completeTopic,
      resetGradeProgress,
    }),
    [progress]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}