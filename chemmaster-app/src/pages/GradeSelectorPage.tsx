"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/common/Header"
import {
  Atom,
  Table2,
  Hexagon,
  FlaskConical,
  BookOpen,
  Target,
  Sparkles,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"

interface GradeSelectorPageProps {
  onBack: () => void
  onSelectGrade: (grade: "grade-10" | "grade-11") => void
}

export default function GradeSelectorPage({ onBack, onSelectGrade }: GradeSelectorPageProps) {
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null)

  const grades = [
    {
      id: "grade-10" as const,
      title: "Decimo Grado",
      subtitle: "10",
      description: "Fundamentos de quimica",
      longDescription: "Explora los fundamentos de la quimica: desde la tabla periodica hasta las reacciones quimicas",
      icon: Table2,
      color: "from-violet-500 to-purple-600",
      modules: 7,
      topics: 42,
      features: [
        { name: "Tabla Periodica Interactiva", icon: Table2 },
        { name: "Estructura Atomica 3D", icon: Atom },
        { name: "Enlaces Quimicos", icon: Hexagon },
        { name: "Estequiometria", icon: FlaskConical },
      ]
    },
    {
      id: "grade-11" as const,
      title: "Undecimo Grado",
      subtitle: "11",
      description: "Quimica avanzada",
      longDescription: "Descubre la quimica organica, disoluciones avanzadas e isomeria molecular",
      icon: Hexagon,
      color: "from-emerald-500 to-teal-600",
      modules: 5,
      topics: 36,
      features: [
        { name: "Disoluciones Avanzadas", icon: FlaskConical },
        { name: "Quimica Organica", icon: Hexagon },
        { name: "Isomeria 3D", icon: Atom },
        { name: "Propiedades Coligativas", icon: Target },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header Component */}
      <Header 
        onBack={onBack} 
        title="ChemMaster" 
        subtitle="Elige tu aventura"
      />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 md:mb-16">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span className="text-sm text-white/70">Selecciona tu nivel</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explora tu{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Camino</span>
          </h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto">Cada grado es una nueva aventura en el mundo de la quimica</p>
        </motion.div>

        {/* Grade Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {grades.map((grade, index) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 100 }}
              onHoverStart={() => setHoveredGrade(grade.id)}
              onHoverEnd={() => setHoveredGrade(null)}
              onClick={() => onSelectGrade(grade.id)}
              className="cursor-pointer group"
            >
              <div className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${hoveredGrade === grade.id ? "scale-[1.02]" : "scale-100"}`}>
                <div className={`absolute inset-0 bg-gradient-to-r ${grade.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
                
                <div className="relative h-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 group-hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div animate={hoveredGrade === grade.id ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.5 }} className={`p-4 bg-gradient-to-br ${grade.color} rounded-2xl shadow-lg`}>
                      <grade.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <span className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}>{grade.subtitle}</span>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{grade.title}</h2>
                    <p className="text-white/60 text-sm md:text-base">{grade.longDescription}</p>
                  </div>

                  <div className="flex gap-3 mb-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                      <BookOpen className="h-4 w-4 text-white/50" />
                      <span className="text-sm text-white/70">{grade.modules} Modulos</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
                      <Target className="h-4 w-4 text-white/50" />
                      <span className="text-sm text-white/70">{grade.topics} Temas</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {grade.features.map((feature, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="flex items-center gap-2 p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                        <feature.icon className={`h-4 w-4 ${grade.id === "grade-10" ? "text-violet-400" : "text-emerald-400"}`} />
                        <span className="text-xs md:text-sm text-white/70">{feature.name}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full py-4 rounded-xl bg-gradient-to-r ${grade.color} text-white font-semibold flex items-center justify-center gap-2 shadow-lg`}>
                    <span>Comenzar Exploracion</span>
                    <motion.div animate={hoveredGrade === grade.id ? { x: [0, 5, 0] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
                      <ChevronRight className="h-5 w-5" />
                    </motion.div>
                  </motion.button>

                  <div className="absolute top-4 right-4 opacity-10">
                    <grade.icon className="h-32 w-32 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-xs text-white font-bold">+</div>
            </div>
            <span className="text-sm text-white/60">Unete a miles de estudiantes explorando quimica</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}