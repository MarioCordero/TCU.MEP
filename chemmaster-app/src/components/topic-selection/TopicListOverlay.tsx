"use client"

import TopicRow from "./TopicRow"
import { API } from "../../lib/api"
import { Button } from "../ui/button"
import { Topic } from "../../types/cms"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getIconComponent } from "../../lib/iconMap"
import { motion, AnimatePresence } from "framer-motion"
import { ModuleDetailModalProps } from "../../types/gradeSelector"
import { useProgressContext } from "../../hooks/useProgressContext"
import { useNavigationBase } from "../../context/NavigationContext"
import { X, Sparkles, Star, Rocket, AlertCircle, Loader2 } from "lucide-react"

export function ModuleDetailModal({ 
  module, 
  onClose, 
  gradeId, 
  onSelectTopic 
}: ModuleDetailModalProps) {
  const navigate = useNavigate()
  const IconComponent = getIconComponent(module.icon)
  const { getModuleProgress, getCompletedTopicsCount } = useProgressContext()
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { basePath } = useNavigationBase()

  useEffect(() => {
    const fetchTopics = async () => {
      if (!module?.id) {
        setError("ID del módulo no disponible")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const fetchedTopics = await API.GetTopics(module.id)

        if (!Array.isArray(fetchedTopics)) {
          console.warn('Unexpected topics format:', fetchedTopics)
          setTopics([])
        } else {
          setTopics(fetchedTopics)
        }
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : "Error al cargar los temas"
        
        console.error("Error fetching topics:", err)
        setError(errorMessage)
        setTopics([])
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [module.id])

  const progress = topics.length > 0 
    ? getModuleProgress(gradeId, module.id, topics.length)
    : 0
  
  const completedCount = topics.length > 0
    ? getCompletedTopicsCount(gradeId, module.id)
    : 0

  const handleTopicSelect = (topic: Topic) => {
    navigate(`${basePath}/grade/${gradeId}/module/${module.id}/topic/${topic.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-2xl max-h-[92vh] md:max-h-[85vh] overflow-auto bg-gray-900 rounded-t-3xl md:rounded-3xl border-t md:border border-white/10 shadow-2xl"
      >
        {/* ─── Header ─── */}
        <div className={`bg-gradient-to-r ${module.color || "from-gray-500 to-gray-400"} p-4 md:p-6 relative sticky top-0 z-10`}>
          <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-3 md:hidden" />

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 text-white/80 hover:text-white hover:bg-white/20"
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </Button>

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 md:p-3 bg-white/20 rounded-xl">
              <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-xl font-bold text-white truncate">
                {module.title}
              </h2>
              <p className="text-white/70 text-xs md:text-sm line-clamp-1">
                {module.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-1.5 text-white/90 text-xs md:text-sm">
              <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>{topics.length} Temas</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-xs md:text-sm">
              <Star className="h-3.5 w-3.5 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
              <span>
                {completedCount}/{topics.length} completados
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 md:h-2 bg-white/20 rounded-full overflow-hidden mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>

        {/* ─── Topics List Content ─── */}
        <div className="p-3 md:p-6">
          <h3 className="text-sm md:text-lg font-bold text-white mb-3 md:mb-6 flex items-center gap-2 px-1">
            <Rocket className="h-4 w-4 md:h-5 md:w-5 text-violet-400" />
            Ruta de Aprendizaje
          </h3>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-white/60">
              <Loader2 className="h-8 w-8 mb-3 animate-spin text-violet-400" />
              <p>Cargando temas...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-red-400">Error al cargar los temas</p>
                <p className="text-sm text-red-400/80">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && topics.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-white/60">
              <Sparkles className="h-8 w-8 mb-3 text-white/20" />
              <p>No hay temas disponibles para este módulo</p>
            </div>
          )}

          {/* Topics List */}
          {!loading && !error && topics.length > 0 && (
            <div className="space-y-2 md:space-y-4">
              <AnimatePresence>
                {topics.map((topic, index) => (
                  <TopicRow
                    key={topic.id}
                    topic={topic}
                    index={index}
                    moduleColor={module.color || "from-gray-500 to-gray-400"}
                    gradeId={gradeId}
                    moduleId={module.id}
                    onSelectTopic={() => handleTopicSelect(topic)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Bottom Spacing for Mobile */}
          <div className="h-6 md:hidden" />
        </div>
      </motion.div>
    </motion.div>
  )
}