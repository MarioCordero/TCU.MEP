"use client"

import { useParams, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Module } from "../types/cms"
import { API } from "../lib/api" // <--- Tu nueva librería
import { GradeModulePath } from "../components/grade-selection/GradeModulePath"
import { SelectedTopic } from "../types/gradeSelector"
import { useProgressContext } from "../hooks/useProgressContext"
// import TopicLearningPage from "./TopicLearningPage" // Asegúrate de que la ruta sea correcta

export default function GradePage() {
  const { gradeId } = useParams<{ gradeId: string }>()
  const navigate = useNavigate()
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null)
  const [showCompletion, setShowCompletion] = useState(false)
  const { getModuleProgress, resetGradeProgress } = useProgressContext()

  useEffect(() => {
    const fetchGradeContent = async () => {
      if (!gradeId) return
      
      try {
        setLoading(true)
        setError(null)
        const data = await API.GetModules(gradeId)
        setModules(data)
      } catch (err: any) {
        console.error("API Error:", err)
        setError(err.message || "No se pudieron cargar los módulos")
      } finally {
        setLoading(false)
      }
    }
    fetchGradeContent()
  }, [gradeId])

  const moduleProgress: Record<string | number, number> = {}
  modules.forEach((mod) => {
    moduleProgress[mod.id] = getModuleProgress(gradeId!, mod.id, mod.topics?.length || 0)
  })

  const overallProgress = modules.length > 0
    ? Math.round(
        Object.values(moduleProgress).reduce((sum, p) => sum + p, 0) / modules.length
      )
    : 0

  const handleSelectTopic = (topic: SelectedTopic) => {
    setSelectedTopic(topic)
    setSelectedModule(null)
  }

  const handleBackFromTopic = () => {
    const updatedAllComplete = modules.every(
      (mod) => getModuleProgress(gradeId!, mod.id, mod.topics?.length || 0) === 100
    )
    if (updatedAllComplete && !showCompletion) setShowCompletion(true)
    setSelectedTopic(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4">
        <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white/60 animate-pulse">Cargando currículo...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center p-6">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-4">
          <p className="text-red-400 font-medium">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="text-white/60 hover:text-white underline transition-colors"
        >
          Reintentar conexión
        </button>
      </div>
    )
  }

  // if (selectedTopic) {
  //   const currentModule = modules.find((m) => m.id === selectedTopic.moduleId)
  //   return (
  //     <TopicLearningPage
  //       topicId={selectedTopic.id}
  //       topicTitle={selectedTopic.title}
  //       moduleId={selectedTopic.moduleId}
  //       moduleColor={selectedTopic.moduleColor}
  //       gradeId={gradeId!}
  //       totalTopicsInModule={currentModule?.topics?.length || 0}
  //       onBack={handleBackFromTopic}
  //       htmlContent={selectedTopic.content}
  //     />
  //   )
  // }

  return (
    <GradeModulePath
      gradeId={gradeId || ""}
      gradeTitle={`${gradeId}° Año`}
      gradeSubtitle="Tu camino de aprendizaje personalizado"
      modules={modules}
      onBack={() => navigate('/grade-selector')}
      onSelectTopic={handleSelectTopic}
      selectedModule={selectedModule}
      onSelectModule={setSelectedModule}
      overallProgress={overallProgress}
      showCompletion={showCompletion}
      onCloseCompletion={() => setShowCompletion(false)}
      onResetProgress={() => {
        resetGradeProgress(gradeId!)
        setShowCompletion(false)
      }}
      // moduleProgress={moduleProgress}
    />
  )
}