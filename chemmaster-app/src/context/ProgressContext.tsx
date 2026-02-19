"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ProgressContextType {
  getModuleProgress: (gradeId: string, moduleId: number, totalTopics: number) => number
  resetGradeProgress: (gradeId: string) => void
  isTopicCompleted: (gradeId: string, moduleId: number, topicId: number) => boolean
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedTopics, setCompletedTopics] = useState<Record<string, Record<number, number[]>>>(() => {
    const saved = localStorage.getItem('chemmaster_progress')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('chemmaster_progress', JSON.stringify(completedTopics))
  }, [completedTopics])

  const getModuleProgress = (gradeId: string, moduleId: number, totalTopics: number) => {
    if (totalTopics === 0) return 0
    const completed = completedTopics[gradeId]?.[moduleId]?.length || 0
    return Math.round((completed / totalTopics) * 100)
  }

  const isTopicCompleted = (gradeId: string, moduleId: number, topicId: number) => {
    return completedTopics[gradeId]?.[moduleId]?.includes(topicId) || false
  }

  const resetGradeProgress = (gradeId: string) => {
    setCompletedTopics(prev => {
      const newProgress = { ...prev }
      delete newProgress[gradeId]
      return newProgress
    })
  }

  return (
    <ProgressContext.Provider value={{ getModuleProgress, resetGradeProgress, isTopicCompleted }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgressContext() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgressContext must be used within a ProgressProvider")
  }
  return context
}