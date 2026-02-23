"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { CheckCircle2, ChevronRight, Play, BookOpen } from "lucide-react"
import { useProgressContext } from "../../hooks/useProgressContext"
import { TopicRowProps } from "../../types/topicSelector"

export default function TopicRow({
  topic,
  index,
  moduleColor,
  gradeId,
  moduleId,
  onSelectTopic,
}: TopicRowProps) {
  const { isTopicCompleted } = useProgressContext()
  const completed = isTopicCompleted(gradeId, moduleId, topic.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelectTopic}
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
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                completed ? `bg-gradient-to-r ${moduleColor} text-white` : "bg-white/10 text-white/50"
              }`}
            >
              {completed ? <CheckCircle2 className="h-4 w-4" /> : topic.order_in_module}
            </div>

            <div className="flex-1 min-w-0">
              <span
                className={`font-medium text-sm block truncate ${completed ? "text-white" : "text-white/80"}`}
              >
                {topic.title}
              </span>
              <span className={`text-xs ${completed ? "text-emerald-400" : "text-white/50"}`}>
                {completed ? "Completado" : "Pendiente"}
              </span>
            </div>

            <ChevronRight
              className={`h-4 w-4 shrink-0 ${completed ? "text-emerald-400" : "text-white/30"}`}
            />
          </div>
        </div>
      </div>

      {/* Desktop Design - Timeline Layout */}
      <div className="hidden md:flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
            completed ? `bg-gradient-to-r ${moduleColor} text-white` : "bg-white/10 text-white/50"
          }`}
        >
          {completed ? <CheckCircle2 className="h-6 w-6" /> : topic.order_in_module}
        </div>

        <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`font-medium ${completed ? "text-white" : "text-white/70"}`}
              >
                {topic.title}
              </span>
              {completed && (
                <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                  Completado
                </Badge>
              )}
            </div>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onSelectTopic()
              }}
              className={`bg-gradient-to-r ${moduleColor} text-white hover:opacity-90`}
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
}