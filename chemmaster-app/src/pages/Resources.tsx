"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Lock, Eye as EyeIcon, EyeOff, AlertCircle } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import Header from '../components/common/Header'
import {
  Atom, Play, Info,
  X, FlaskConical, Calculator,
  Eye, BookOpen, Target,
  Sparkles, Users, Trophy,
  Clock, Settings, Table2,
  Hexagon, ArrowLeft, ChevronRight,
  ExternalLink, Compass, Beaker,
  Gamepad2, GraduationCap, Zap,
} from "lucide-react"

type CurrentPage = "landing" | "grade-selector" | "grade-10" | "grade-11" | "info" | "cms" | "resources"

function ChemistryAppContent() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("landing")
  const [isCmsAuthenticated, setIsCmsAuthenticated] = useState(false)

  if (currentPage === "resources") {
    return <ExternalResourcesPage onBack={() => setCurrentPage("landing")} />
  }

  if (currentPage === "grade-selector") {
    return <GradeSelectorPage onBack={() => setCurrentPage("landing")} onSelectGrade={(grade) => setCurrentPage(grade)} />
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl" 
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{ left: `${10 + (i * 6)}%`, top: `${15 + (i * 5)}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Top Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.8 }}
          className="absolute -top-2 right-0 left-0 flex justify-end gap-2 px-2"
        >
          <button
            type="button"
            onClick={() => setCurrentPage("resources")}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors"
          >
            <Compass className="h-4 w-4 mr-2" />
            Explorar
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("cms")}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-violet-500/10 backdrop-blur-sm border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:border-violet-400 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            CMS
          </button>
        </motion.div>

        {/* Logo/Icon */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 md:mb-8 mt-12">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-5 md:p-6 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-full w-fit mx-auto mb-6 shadow-2xl shadow-violet-500/30"
            >
              <Atom className="h-12 w-12 md:h-16 md:w-16 text-white" />
            </motion.div>
            
            {/* Orbiting particles */}
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full absolute -top-1" />
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-pink-400 rounded-full absolute -bottom-2 -right-2" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="text-4xl md:text-6xl font-black text-white mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              ChemMaster
            </span>
          </motion.h1>

          {/* Subtitle with animated badge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-2 mb-6">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Zap className="h-5 w-5 text-yellow-400" />
            </motion.div>
            <span className="text-lg md:text-xl text-white/70">Quimica Interactiva para Secundaria</span>
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8 md:mb-10 px-4">
          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Aprende quimica de forma divertida con simuladores 3D, laboratorios virtuales y juegos interactivos. Disenado para estudiantes de 10 y 11 grado.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 hover:from-violet-600 hover:via-purple-600 hover:to-cyan-600 text-white px-8 py-5 md:py-6 text-lg font-bold rounded-2xl shadow-xl shadow-violet-500/25 transition-all duration-300"
              onClick={() => setCurrentPage("grade-selector")}
            >
              <Play className="mr-3 h-6 w-6" />
              Comenzar Ahora
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 px-8 py-5 md:py-6 text-lg font-semibold rounded-2xl transition-all duration-300 bg-transparent"
              onClick={() => setCurrentPage("info")}
            >
              <Info className="mr-3 h-6 w-6" />
              Mas Info
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-10 md:mt-14 grid grid-cols-3 gap-3 md:gap-6 max-w-md mx-auto px-4">
          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="text-center p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <motion.div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>
              12
            </motion.div>
            <div className="text-xs md:text-sm text-white/50">Modulos</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="text-center p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <motion.div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
              50+
            </motion.div>
            <div className="text-xs md:text-sm text-white/50">Actividades</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="text-center p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <motion.div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>
              100%
            </motion.div>
            <div className="text-xs md:text-sm text-white/50">Gratis</div>
          </motion.div>
        </motion.div>
        
        {/* Explore Resources CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 md:mt-10">
          <motion.button
            onClick={() => setCurrentPage("resources")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Compass className="h-4 w-4" />
            <span className="text-sm">Explora mas recursos externos</span>
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// Grade Selector Page
function GradeSelectorPage({ onBack, onSelectGrade }: { onBack: () => void; onSelectGrade: (grade: "grade-10" | "grade-11") => void }) {
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
        { name: "Estequiometria", icon: Calculator },
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
        { name: "Isomeria 3D", icon: Eye },
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

      {/* Header */}
      <header className="relative z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
                  <Atom className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-white">ChemMaster</h1>
                  <p className="text-xs text-white/50">Elige tu aventura</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

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

// Info Page
function InfoPage({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-950/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl">
                  <Atom className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">ChemMaster</h1>
                  <p className="text-xs text-white/50">Informacion de la App</p>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0">Pro v2.0</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sobre <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">ChemMaster</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            La plataforma educativa mas avanzada para el aprendizaje de quimica en secundaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: FlaskConical, title: "Simuladores 3D", desc: "Modelos interactivos de atomos, moleculas y reacciones quimicas.", color: "from-purple-500 to-purple-600" },
            { icon: Calculator, title: "Calculadoras", desc: "Herramientas de calculo avanzadas para estequiometria y concentraciones.", color: "from-cyan-500 to-blue-600" },
            { icon: Eye, title: "Visualizadores", desc: "Representaciones graficas de estructuras moleculares y orbitales.", color: "from-emerald-500 to-green-600" },
            { icon: BookOpen, title: "Contenido Curricular", desc: "Alineado con los programas oficiales de 10 y 11 grado.", color: "from-orange-500 to-amber-600" },
            { icon: Target, title: "Aprendizaje Adaptativo", desc: "Sistema que se adapta al ritmo de cada estudiante.", color: "from-pink-500 to-rose-600" },
            { icon: Sparkles, title: "Gamificacion", desc: "Elementos de juego, logros y desafios para mantener la motivacion.", color: "from-violet-500 to-purple-600" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-0 bg-white/5 backdrop-blur-sm border border-white/10 h-full">
                <CardHeader className="text-center pb-3">
                  <div className={`p-3 bg-gradient-to-r ${item.color} rounded-xl w-fit mx-auto mb-3`}>
                    <item.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 text-sm text-center">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white p-8 rounded-2xl shadow-lg mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Resultados Comprobados</h2>
            <p className="text-white/80">Miles de estudiantes han mejorado sus calificaciones.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "25,000+", label: "Estudiantes" },
              { icon: Trophy, value: "98%", label: "Aprobacion" },
              { icon: BookOpen, value: "12", label: "Modulos" },
              { icon: Clock, value: "50+", label: "Horas" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Listo para comenzar?</h2>
          <p className="text-white/60 mb-8">Unete a miles de estudiantes que ya estan dominando la quimica.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-xl" onClick={onStart}>
              <Play className="mr-3 h-6 w-6" />
              Comenzar Ahora
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent" onClick={onBack}>
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// External Resources Data
const externalResources = [
  {
    id: "ptable",
    name: "Ptable",
    description: "Tabla periodica interactiva con propiedades detalladas de cada elemento, isotopos y compuestos.",
    longDescription: "Explora la tabla periodica mas completa de internet. Visualiza propiedades atomicas, isotopos, estados de oxidacion, y mucho mas.",
    url: "https://ptable.com",
    icon: Table2,
    color: "from-violet-500 to-purple-600",
    category: "Tabla Periodica",
    tags: ["Interactivo", "Elementos", "Propiedades"],
  },
  {
    id: "molview",
    name: "MolView",
    description: "Visualizador 3D de moleculas. Dibuja, busca y explora estructuras moleculares en tiempo real.",
    longDescription: "Crea y visualiza moleculas en 3D. Puedes dibujar estructuras desde cero, buscar moleculas por nombre o formula, y rotarlas.",
    url: "https://molview.org",
    icon: Beaker,
    color: "from-cyan-500 to-blue-600",
    category: "Visualizador 3D",
    tags: ["Moleculas", "3D", "Estructuras"],
  },
  {
    id: "phet",
    name: "PhET Simulations",
    description: "Simulaciones interactivas de quimica de la Universidad de Colorado. Aprende jugando.",
    longDescription: "Coleccion de simulaciones educativas gratuitas. Experimenta con reacciones, equilibrio quimico, pH y mas.",
    url: "https://phet.colorado.edu/es/simulations/filter?subjects=chemistry",
    icon: Gamepad2,
    color: "from-emerald-500 to-green-600",
    category: "Simulaciones",
    tags: ["Juegos", "Experimentos", "Gratis"],
  },
  {
    id: "quimitube",
    name: "Quimitube",
    description: "Canal educativo con videos y ejercicios resueltos de quimica en espanol.",
    longDescription: "Miles de videos explicativos y ejercicios resueltos paso a paso. Perfecto para repasar o preparar examenes.",
    url: "https://www.quimitube.com",
    icon: GraduationCap,
    color: "from-indigo-500 to-violet-600",
    category: "Videos Educativos",
    tags: ["Espanol", "Ejercicios", "Videos"],
  },
  {
    id: "nobook",
    name: "Nobook Chemistry",
    description: "Laboratorio de quimica virtual interactivo con experimentos y simulaciones en linea.",
    longDescription: "Plataforma de laboratorio virtual con simulaciones de quimica interactivas. Realiza experimentos virtuales de forma segura y aprende sobre reacciones, propiedades y compuestos.",
    url: "https://chemistry-en.nobook.com/console/templates/resource",
    icon: Beaker,
    color: "from-teal-500 to-cyan-600",
    category: "Laboratorio Virtual",
    tags: ["Interactivo", "Experimentos", "Virtual"],
  },
]

// External Resources Page
function ExternalResourcesPage({ onBack }: { onBack: () => void }) {
  const [selectedResource, setSelectedResource] = useState<typeof externalResources[0] | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
      </div>

      <Header 
        onBack={onBack} 
        title="Recursos Externos" 
        subtitle="Apps y sitios para aprender mas" 
        showBackButton={true}
      />

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-12">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 md:mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4 md:mb-6">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white/70">Expande tu conocimiento</span>
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Recursos <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">Externos</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto px-4">
            Descubre apps y sitios web increibles para experimentar, visualizar y aprender quimica
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {externalResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              onHoverStart={() => setHoveredId(resource.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setSelectedResource(resource)}
              className="cursor-pointer group"
            >
              <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }} className="relative h-full">
                <div className={`absolute inset-0 bg-gradient-to-r ${resource.color} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative h-full bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-5 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300 overflow-hidden">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <Badge variant="outline" className="border-white/20 text-white/60 text-xs bg-transparent">{resource.category}</Badge>
                    <motion.div animate={hoveredId === resource.id ? { rotate: [0, 15, -15, 0] } : {}} transition={{ duration: 0.5 }}>
                      <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
                    </motion.div>
                  </div>

                  <motion.div className={`p-3 md:p-4 bg-gradient-to-br ${resource.color} rounded-xl w-fit mb-3 md:mb-4 shadow-lg`} whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                    <resource.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </motion.div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">{resource.name}</h3>
                  <p className="text-white/60 text-sm mb-3 md:mb-4 line-clamp-2">{resource.description}</p>

                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 md:py-1 bg-white/5 rounded-full text-xs text-white/50 group-hover:bg-white/10 group-hover:text-white/70 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${resource.color} opacity-5 rounded-tl-full pointer-events-none`} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10 md:mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-white/60">Todos estos recursos son gratuitos y seguros</span>
          </div>
        </motion.div>
      </div>

      {/* Resource Detail Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full md:max-w-lg max-h-[85vh] overflow-auto bg-gray-900 rounded-t-3xl md:rounded-3xl border-t md:border border-white/10 shadow-2xl"
            >
              <div className={`bg-gradient-to-r ${selectedResource.color} p-5 md:p-6 relative`}>
                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4 md:hidden" />
                <Button variant="ghost" size="icon" onClick={() => setSelectedResource(null)} className="absolute top-3 right-3 md:top-4 md:right-4 text-white/80 hover:text-white hover:bg-white/20">
                  <X className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-4">
                  <motion.div className="p-4 bg-white/20 rounded-2xl" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <selectedResource.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <div>
                    <Badge className="bg-white/20 text-white border-0 mb-2">{selectedResource.category}</Badge>
                    <h2 className="text-2xl font-bold text-white">{selectedResource.name}</h2>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <p className="text-white/80 mb-6 leading-relaxed">{selectedResource.longDescription}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedResource.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-white/20 text-white/70 bg-transparent">{tag}</Badge>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => window.open(selectedResource.url, '_blank')} className={`flex-1 bg-gradient-to-r ${selectedResource.color} text-white hover:opacity-90 py-6`}>
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visitar Sitio
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedResource(null)} className="flex-1 border-white/20 text-white/70 hover:bg-white/10 py-6 bg-transparent">
                    Volver
                  </Button>
                </div>
                <p className="text-xs text-white/40 text-center mt-4">Este enlace te llevara a un sitio externo en una nueva pestana</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ResourcesPage() {
  const navigate = useNavigate()
  return <ExternalResourcesPage onBack={() => navigate('/')} />
}

// CMS Login Page Component
function CMSLoginPage({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Credenciales temporales - cambiar a consulta backend posteriormente
  const TEMP_USERNAME = "admin"
  const TEMP_PASSWORD = "chemmaster2024"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))

    // TODO: Reemplazar con llamada al backend
    if (username === TEMP_USERNAME && password === TEMP_PASSWORD) {
      onSuccess()
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-white/70 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl w-fit mx-auto mb-4"
            >
              <Lock className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Acceso CMS</h1>
            <p className="text-white/60 text-sm">Ingresa tus credenciales para administrar el contenido</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/80">Usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500 focus:ring-violet-500/20"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Contrasena</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contrasena"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-violet-500 focus:ring-violet-500/20 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-6 rounded-xl font-semibold transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Ingresar al CMS
                </>
              )}
            </Button>
          </form>

          {/* Security Note */}
          <p className="text-xs text-white/40 text-center mt-6">
            Acceso restringido solo para administradores autorizados
          </p>
        </div>
      </motion.div>
    </div>
  )
}