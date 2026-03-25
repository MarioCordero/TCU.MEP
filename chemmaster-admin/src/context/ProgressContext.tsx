import { createContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { readProgressCookie, writeProgressCookie, type ProgressMap, type ProgressEntry } from "../utils/progressCookie"

type ProgressContextType = {
  getModuleProgress: (gradeId: string | number, moduleId: string | number, totalTopics: number) => number
  getCompletedTopicsCount: (gradeId: string | number, moduleId: string | number) => number
  isTopicCompleted: (gradeId: string | number, moduleId: string | number, topicId: string | number) => boolean
  completeTopic: (
    gradeId: string | number,
    moduleId: string | number,
    topicId: string | number,
    earned: number,
    total: number
  ) => void
  resetGradeProgress: (gradeId: string | number) => void
  getTopicScore: (gradeId: string | number, moduleId: string | number, topicId: string | number) => { earned: number; total: number }
  getModuleTotalPoints: (gradeId: string | number, moduleId: string | number) => { earned: number; total: number }
  getGradeTotalPoints: (gradeId: string | number) => { earned: number; total: number }
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressMap>(() => readProgressCookie())

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

  const getTopicScore = (
    gradeId: string | number,
    moduleId: string | number,
    topicId: string | number
  ): { earned: number; total: number } => {
    const key = `${gradeId}-${moduleId}-${topicId}`
    const entry = progress[key]
    return {
      earned: entry?.earned ?? 0,
      total: entry?.total ?? 1,
    }
  }

  const getModuleTotalPoints = (
    gradeId: string | number,
    moduleId: string | number
  ): { earned: number; total: number } => {
    const modulePrefix = `${gradeId}-${moduleId}-`
    let totalEarned = 0
    let totalPossible = 0

    Object.entries(progress).forEach(([key, entry]) => {
      if (key.startsWith(modulePrefix) && key !== `${gradeId}-${moduleId}`) {
        totalEarned += entry?.earned ?? 0
        totalPossible += entry?.total ?? 1
      }
    })

    return { earned: totalEarned, total: totalPossible }
  }

  const getGradeTotalPoints = (gradeId: string | number): { earned: number; total: number } => {
    const gradePrefix = `${gradeId}-`
    let totalEarned = 0
    let totalPossible = 0

    Object.entries(progress).forEach(([key, entry]) => {
      // Only count topic entries (gradeId-moduleId-topicId format, not gradeId-moduleId)
      if (key.startsWith(gradePrefix) && key.split("-").length === 3) {
        totalEarned += entry?.earned ?? 0
        totalPossible += entry?.total ?? 1
      }
    })

    return { earned: totalEarned, total: totalPossible }
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
    earned: number,
    total: number
  ): void => {
    setProgress((prev) => {
      const updated = { ...prev }
      const topicKey = `${gradeId}-${moduleId}-${topicId}`
      const moduleKey = `${gradeId}-${moduleId}`
      const moduleTopicPrefix = `${gradeId}-${moduleId}-`

      // Calculate if topic passes (>= 75%)
      const passThreshold = 0.75
      const topicPassed = total > 0 && earned / total >= passThreshold
      const completed = topicPassed ? 1 : 0

      // Store topic score and completion status
      updated[topicKey] = {
        completed,
        earned,
        total,
      }

      // Recalculate module completion count (count only completed topics)
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
      getTopicScore,
      getModuleTotalPoints,
      getGradeTotalPoints,
    }),
    [progress]
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}