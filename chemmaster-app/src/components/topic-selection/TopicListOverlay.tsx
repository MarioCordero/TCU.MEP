"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { X, Sparkles, Star, Rocket, CheckCircle2, BookOpen, Play, ChevronRight } from "lucide-react"
import { getIconComponent } from "../../lib/iconMap"
import { ModuleDetailModalProps } from "../../types/gradeSelector"

// This hook needs to be imported from wherever it's defined in your project
import { useProgressContext } from "@/hooks/useProgressContext" // Adjust path as needed

export function ModuleDetailModal({ module, onClose, gradeId, onSelectTopic }: ModuleDetailModalProps) {
  const IconComponent = getIconComponent(module.icon)
  const { isTopicCompleted, getModuleProgress, getCompletedTopicsCount } = useProgressContext()

  const progress = getModuleProgress(gradeId, module.id, module.topics?.length || 0)
  const completedCount = getCompletedTopicsCount(gradeId, module.id)

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
        {/* Header - Compact on mobile */}
        <div className={`bg-gradient-to-r ${module.color} p-4 md:p-6 relative sticky top-0 z-10`}>
          {/* Drag indicator for mobile */}
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

          {/* Progress Stats - Compact row on mobile */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-1.5 text-white/90 text-xs md:text-sm">
              <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>{module.topics?.length || 0} Temas</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-xs md:text-sm">
              <Star className="h-3.5 w-3.5 md:h-4 md:w-4 text-yellow-400 fill-yellow-400" />
              <span>
                {completedCount}/{module.topics?.length || 0} completados
              </span>
            </div>
          </div>

          {/* Progress bar */}
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

          {/* Mobile: Card list / Desktop: Timeline */}
          <div className="space-y-2 md:space-y-4">
            {module.topics?.map((topic, index) => {
              const completed = isTopicCompleted(gradeId, module.id, topic.id)

              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectTopic(topic.id?.toString() || "", topic.title, topic.content)}
                  className="cursor-pointer"
                >
                  {/* Mobile Design - Compact Cards */}
                  <div className="md:hidden">
                    <div
                      className={`relative p-3 rounded-xl border transition-all active:scale-[0.98] ${
                        completed
                          ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-emerald-500/30"
                          : "bg-white/5 border-white/10 active:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Step number/check */}
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                            completed ? `bg-gradient-to-r ${module.color} text-white` : "bg-white/10 text-white/50"
                          }`}
                        >
                          {completed ? <CheckCircle2 className="h-4 w-4" /> : topic.order_in_module}
                        </div>

                        {/* Title and status */}
                        <div className="flex-1 min-w-0">
                          <span className={`font-medium text-sm block truncate ${completed ? "text-white" : "text-white/80"}`}>
                            {topic.title}
                          </span>
                          <span className={`text-xs ${completed ? "text-emerald-400" : "text-white/50"}`}>
                            {completed ? "Completado" : "Pendiente"}
                          </span>
                        </div>

                        {/* Action indicator */}
                        <ChevronRight className={`h-4 w-4 shrink-0 ${completed ? "text-emerald-400" : "text-white/30"}`} />
                      </div>
                    </div>
                  </div>

                  {/* Desktop Design - Original Timeline */}
                  <div className="hidden md:flex items-center gap-4">
                    {/* Step indicator */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                        completed ? `bg-gradient-to-r ${module.color} text-white` : "bg-white/10 text-white/50"
                      }`}
                    >
                      {completed ? <CheckCircle2 className="h-6 w-6" /> : topic.order_in_module}
                    </div>

                    {/* Content - Clickable to open topic */}
                    <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`font-medium ${completed ? "text-white" : "text-white/70"}`}>{topic.title}</span>
                          {completed && <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Completado</Badge>}
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectTopic(topic.id?.toString() || "", topic.title, topic.content)
                          }}
                          className={`bg-gradient-to-r ${module.color} text-white hover:opacity-90`}
                        >
                          {completed ? (
                            <>
                              <BookOpen className="h-3 w-3 mr-1" />
                              Repasar
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              Estudiar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile: Bottom padding for safe area */}
          <div className="h-6 md:hidden" />
        </div>
      </motion.div>
    </motion.div>
  )
}