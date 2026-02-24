"use client"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { X, Sparkles, Star, Rocket } from "lucide-react"
import { getIconComponent } from "../../lib/iconMap"
import { useProgressContext } from "../../hooks/useProgressContext"
import { useNavigationBase } from "../../context/NavigationContext"
import { API } from "../../lib/api"
import TopicRow from "./TopicRow"
import { Module } from "../../types/gradeSelector"
import { ModuleDetailModalProps } from "../../types/gradeSelector"
import { Topic } from "../../types/cms"

export function ModuleDetailModal({ module, onClose, gradeId, onSelectTopic }: ModuleDetailModalProps) {
  const navigate = useNavigate();
  const IconComponent = getIconComponent(module.icon);
  const { getModuleProgress, getCompletedTopicsCount } = useProgressContext();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { basePath } = useNavigationBase();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedTopics = await API.GetTopics(module.id);
        setTopics(fetchedTopics);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar los temas");
        console.error("Error fetching topics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics()
  }, [module.id])

  const progress = getModuleProgress(gradeId, module.id, topics.length);
  const completedCount = getCompletedTopicsCount(gradeId, module.id);

  const handleTopicSelect = (topic: Topic) => {
    navigate(`${basePath}/grade/${gradeId}/module/${module.id}/topic/${topic.id}`);
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
        {/* Header */}
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
              <h2 className="text-lg md:text-xl font-bold text-white truncate">{module.title}</h2>
              <p className="text-white/70 text-xs md:text-sm line-clamp-1">{module.description}</p>
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

          <div className="w-full h-1.5 md:h-2 bg-white/20 rounded-full overflow-hidden mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>

        {/* Topics List */}
        <div className="p-3 md:p-6">
          <h3 className="text-sm md:text-lg font-bold text-white mb-3 md:mb-6 flex items-center gap-2 px-1">
            <Rocket className="h-4 w-4 md:h-5 md:w-5 text-violet-400" />
            Ruta de Aprendizaje
          </h3>

          {loading && (
            <div className="text-center py-8 text-white/60">
              Cargando temas...
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && topics.length === 0 && (
            <div className="text-center py-8 text-white/60">
              No hay temas disponibles
            </div>
          )}

          {!loading && !error && topics.length > 0 && (
            <div className="space-y-2 md:space-y-4">
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
            </div>
          )}

          <div className="h-6 md:hidden" />
        </div>
      </motion.div>
    </motion.div>
  )
}