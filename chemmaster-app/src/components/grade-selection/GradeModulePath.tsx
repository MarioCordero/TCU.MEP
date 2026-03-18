"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Zap,
  Atom,
  Star,
} from "lucide-react"
import { StairStep } from "./StairStep"
import { ModuleDetailModal } from "../topic-selection/TopicListOverlay"
import { CompletionModal } from "./CompletionModal"
import GradeModulePathHeader from "./GradeModulePathHeader"
import { GradeModulePathProps } from "../../types/gradeSelector"

export function GradeModulePath({
  gradeId,
  gradeTitle,
  gradeSubtitle,
  modules,
  onBack,
  onSelectTopic,
  selectedModule,
  onSelectModule,
  overallProgress,
  showCompletion,
  onCloseCompletion,
  onResetProgress,
}: GradeModulePathProps) {
  const selectedModuleData = modules.find((m) => m.id === selectedModule)

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <GradeModulePathHeader
        gradeTitle={gradeTitle}
        gradeSubtitle={gradeSubtitle}
        overallProgress={overallProgress}
        moduleCount={modules.length}
        onBack={onBack}
      />

      {/* Main Content - Stair Path */}
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Page Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4"
          >
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white/70">Tu camino de aprendizaje</span>
          </motion.div>

          <h2 className="text-2xl md:text-4xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Ruta de Modulos
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Explora todos los modulos libremente. Completa los temas a tu ritmo para ganar tu estrella.
          </p>
        </motion.div>

        {/* Empty state */}
        {modules.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 max-w-md mx-auto">
              <Atom className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No hay modulos disponibles</h3>
              <p className="text-white/60">Los modulos para este grado aun no han sido configurados.</p>
            </div>
          </motion.div>
        )}

        {/* Stair Path */}
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          {modules.map((module, index) => (
            <StairStep
              key={module.id}
              module={module}
              index={index}
              totalSteps={modules.length}
              onSelect={onSelectModule}
              isReversed={index % 2 === 1}
              progress={0}
              gradeId={gradeId}
            />
          ))}
        </div>

        {/* Final Achievement */}
        {modules.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-16 md:mt-24 text-center transition-all duration-500 ${
              overallProgress === 100 ? "opacity-100 scale-100" : "opacity-50 scale-95"
            }`}
          >
            <div className={`inline-block p-6 md:p-8 rounded-full ${overallProgress === 100 ? "bg-gradient-to-r from-yellow-500 to-orange-500" : "bg-white/10"}`}>
              <Star className={`h-12 w-12 md:h-16 md:w-16 ${overallProgress === 100 ? "text-white fill-white" : "text-white/30"}`} />
            </div>
            <p className={`mt-4 text-base md:text-lg font-medium ${overallProgress === 100 ? "text-yellow-400" : "text-white/40"}`}>
              {overallProgress === 100 ? "Has completado todos los modulos!" : "Completa todos los modulos para obtener tu estrella"}
            </p>
          </motion.div>
        )}
      </main>

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModuleData && (
          <ModuleDetailModal
            module={selectedModuleData}
            onClose={() => onSelectModule(null)}
            gradeId={gradeId}
            onSelectTopic={(topicId, topicTitle, topicContent) => {
              onSelectTopic({
                id: topicId,
                title: topicTitle,
                content: topicContent,
                moduleId: selectedModuleData.id,
                moduleColor: selectedModuleData.color || "from-blue-500 to-blue-600",
              })
              onSelectModule(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* Completion Celebration */}
      <AnimatePresence>
        {showCompletion && (
          <CompletionModal
            gradeTitle={gradeTitle}
            onClose={onCloseCompletion}
            onReset={onResetProgress}
          />
        )}
      </AnimatePresence>
    </div>
  )
}