"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "../ui/button"
import { CheckCircle2, Sparkles, Star, ChevronRight } from "lucide-react"
import { getIconComponent } from "../../lib/iconMap"
import { StairStepProps } from "../../types/gradeSelector"
import { useProgressContext } from "../../hooks/useProgressContext"

export function StairStep({
  module,
  index,
  totalSteps,
  onSelect,
  isReversed,
  gradeId,
  topicCount = 0,
}: StairStepProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const IconComponent = getIconComponent(module.icon)
  
  // Get progress from context
  const { getModuleProgress, getCompletedTopicsCount } = useProgressContext()
  const progress = getModuleProgress(gradeId, module.id, topicCount)
  const completedTopics = getCompletedTopicsCount(gradeId, module.id)
  const totalTopics = topicCount

  const stepNumber = index + 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isReversed ? 100 : -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 100 : -100 }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
      className={`flex items-center gap-4 md:gap-8 ${isReversed ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Step Number Block - 3D Effect */}
      <motion.div
        whileHover={{ scale: 1.05, rotateY: 10 }}
        onClick={() => onSelect(module.id)}
        className="relative cursor-pointer"
        style={{ perspective: "1000px" }}
      >
        {/* 3D Stair Block */}
        <div className="relative">
          {/* Top face */}
          <div
            className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-2xl relative z-10`}
            style={{
              boxShadow: `0 20px 40px -10px rgba(0,0,0,0.4), 0 10px 20px -5px rgba(0,0,0,0.3)`,
            }}
          >
            <IconComponent className="h-8 w-8 md:h-12 md:w-12 text-white" />

            {/* Step number badge */}
            <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-gray-900 flex items-center justify-center font-black text-lg md:text-xl shadow-lg">
              {stepNumber}
            </div>

            {/* Progress ring */}
            {progress > 0 && (
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 289} 289`}
                />
              </svg>
            )}

            {/* Completion checkmark */}
            {progress === 100 && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
            )}
          </div>

          {/* 3D Bottom face (shadow/depth) */}
          <div
            className={`absolute top-3 left-3 w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br ${module.color} opacity-40`}
            style={{ filter: "blur(1px)" }}
          />
        </div>

        {/* Connector line to next step */}
        {index < totalSteps - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
            className={`absolute ${isReversed ? "right-1/2" : "left-1/2"} top-full w-1 h-16 md:h-20 origin-top`}
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
            }}
          />
        )}
      </motion.div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        onClick={() => onSelect(module.id)}
        className="flex-1 max-w-md cursor-pointer"
      >
        <motion.div
          whileHover={{ scale: 1.02, x: isReversed ? -10 : 10 }}
          className="relative p-4 md:p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30"
        >
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2 flex items-center gap-2">
            {module.title}
            {progress === 100 && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm mb-3 line-clamp-2">{module.description}</p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-white/70 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>{completedTopics}/{totalTopics} Temas</span>
            </div>
            <div className="flex items-center gap-1 text-white/70 text-sm">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>{progress}% Completado</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${progress}%` } : { width: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
              className={`h-full bg-gradient-to-r ${module.color} rounded-full`}
            />
          </div>

          {/* CTA */}
          <div className="mt-4">
            <Button size="sm" className={`bg-gradient-to-r ${module.color} text-white border-0 hover:opacity-90`}>
              {progress > 0 ? "Continuar" : "Comenzar"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Decorative gradient */}
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${module.color} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}