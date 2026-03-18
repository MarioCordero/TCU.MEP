"use client"

import { API } from "../lib/api"
import { Module } from "../types/cms"
import { useEffect, useState } from "react"
import { SelectedTopic } from "../types/gradeSelector"
import { useParams, useNavigate } from "react-router-dom"
import { useProgressContext } from "../hooks/useProgressContext"
import { GradeModulePath } from "../components/grade-selection/GradeModulePath"

interface GradePageProps {
  basePath?: string;
}

export default function GradePage({ basePath = '' }: GradePageProps) {
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
      if (!gradeId) {
        setError("Grado no especificado")
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        setError(null)
        
        let data: any = null

        if (gradeId === '10') {
          data = await API.GetModules.tenth()
        } else if (gradeId === '11') {
          data = await API.GetModules.eleventh()
        } else {
          throw new Error(`Grado ${gradeId} no válido. Use 10 o 11.`)
        }

        if (!data) {
          throw new Error(`No se recibieron datos para grado ${gradeId}`)
        }

        let modulesArray: Module[] = []
        
        if (Array.isArray(data)) {
          modulesArray = data
        } else if (Array.isArray(data.modules)) {
          modulesArray = data.modules
        } else if (Array.isArray(data.data)) {
          modulesArray = data.data
        } else {
          console.warn('Unexpected data format:', data)
          modulesArray = []
        }

        if (!Array.isArray(modulesArray)) {
          throw new Error('La respuesta no contiene un array de módulos')
        }

        setModules(modulesArray)
      } catch (err: any) {
        console.error("API Error:", err)
        setError(err.message || "No se pudieron cargar los módulos")
        setModules([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchGradeContent()
  }, [gradeId])

  const moduleProgress: Record<string | number, number> = {}
  if (Array.isArray(modules)) {
    modules.forEach((mod) => {
      moduleProgress[mod.id] = getModuleProgress(gradeId!, mod.id, mod.topics?.length || 0)
    })
  }

  const overallProgress = modules.length > 0
    ? Math.round(
        Object.values(moduleProgress).reduce((sum, p) => sum + p, 0) / modules.length
      )
    : 0

  // TODO: IMPROVE
  const handleSelectTopic = (topic: SelectedTopic) => {
    navigate(`${basePath}/grade/${gradeId}/module/${topic.moduleId}/topic/${topic.id}`);
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

  if (modules.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center p-6">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl mb-4">
          <p className="text-yellow-400 font-medium">No hay módulos disponibles para este grado</p>
        </div>
        <button 
          onClick={() => navigate('/grade-selector')}
          className="text-white/60 hover:text-white underline transition-colors mt-4"
        >
          Volver al selector de grado
        </button>
      </div>
    )
  }

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
    />
  )
}