export type ProgressContextType = {
  getModuleProgress: (gradeId: string | number, moduleId: string | number, totalTopics: number) => number
  getModuleScore: (gradeId: string | number, moduleId: string | number) => { earned: number; total: number }  // ← ADD
  getTotalGradeScore: (gradeId: string | number) => { earned: number; total: number }  // ← ADD
  getCompletedTopicsCount: (gradeId: string | number, moduleId: string | number) => number
  isTopicCompleted: (gradeId: string | number, moduleId: string | number, topicId: string | number) => boolean
  completeTopic: (
    gradeId: string | number,
    moduleId: string | number,
    topicId: string | number,
    totalTopics: number,
    score?: number,
    maxPoints?: number
  ) => void
  resetGradeProgress: (gradeId: string | number) => void
}