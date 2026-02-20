"use client"

import { useParams, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { Module } from "@/types/cms"
import { GradeModulePath } from "@/components/grade-selection/GradeModulePath"
import { SelectedTopic } from "@/types/gradeSelector"
import { useProgressContext } from "@/hooks/useProgressContext"

export default function GradePage() {
  const { gradeId } = useParams<{ gradeId: string }>()
  const navigate = useNavigate()
  const [modules, setModules] = useState<Module[]>([])
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<SelectedTopic | null>(null)
  const [showCompletion, setShowCompletion] = useState(false)

  const { getModuleProgress, resetGradeProgress } = useProgressContext()

  useEffect(() => {
    if (gradeId) {
      const dummyModules: Module[] = [
        {
          id: 1,
          slug: "periodic-table",
          grade_level: gradeId as "10" | "11",
          title: "Tabla Periódica",
          description: "Explora los elementos y sus propiedades químicas.",
          icon: "Table2",
          color: "from-violet-500 to-purple-600",
          active: true,
          topics: [
            {
              id: 1,
              module_id: 1,
              title: "Historia de la Tabla Periódica",
              description: "Origen y evolución del sistema periódico",
              content: "<p>Contenido sobre la historia de la tabla periódica</p>",
              order_in_module: 1,
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-01-01T00:00:00Z"
            },
            {
              id: 2,
              module_id: 1,
              title: "Grupos y Períodos",
              description: "Clasificación de elementos",
              content: "<p>Contenido sobre grupos y períodos</p>",
              order_in_module: 2,
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-01-01T00:00:00Z"
            }
          ]
        },
        {
          id: 2,
          slug: "chemical-bonds",
          grade_level: gradeId as "10" | "11",
          title: "Enlaces Químicos",
          description: "Iónico, covalente y metálico paso a paso.",
          icon: "Atom",
          color: "from-cyan-500 to-blue-600",
          active: true,
          topics: [
            {
              id: 3,
              module_id: 2,
              title: "Estructura de Lewis",
              description: "Representación de electrones de valencia",
              content: "<p>Contenido sobre estructura de Lewis</p>",
              order_in_module: 1,
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-01-01T00:00:00Z"
            },
            {
              id: 4,
              module_id: 2,
              title: "Enlaces Iónicos",
              description: "Transferencia de electrones",
              content: "<p>Contenido sobre enlaces iónicos</p>",
              order_in_module: 2,
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-01-01T00:00:00Z"
            },
            {
              id: 5,
              module_id: 2,
              title: "Enlaces Covalentes",
              description: "Compartición de electrones",
              content: "<p>Contenido sobre enlaces covalentes</p>",
              order_in_module: 3,
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-01-01T00:00:00Z"
            }
          ]
        }
      ]
      setModules(dummyModules)
    }
  }, [gradeId])

  const overallProgress = modules.length > 0
    ? Math.round(
        modules.reduce((sum, mod) => {
          const progress = getModuleProgress(gradeId!, mod.id, mod.topics?.length || 0)
          return sum + progress
        }, 0) / modules.length
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