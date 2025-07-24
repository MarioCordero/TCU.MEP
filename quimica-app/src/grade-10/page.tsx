"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Table2,
  Atom,
  Orbit,
  Link,
  FileText,
  FlaskRound,
  Scale,
  Play,
  Star,
  Users,
  Clock,
  ChevronRight,
  Sparkles,
  Calculator,
  Zap,
  Target,
  BookOpen,
  Layers,
  Gamepad2,
  Eye,
  Settings,
  Beaker,
  FlaskConical,
  Trophy,
  BarChart3,
} from "lucide-react"

interface GradeTenPageProps {
  onBack: () => void
  onNavigate?: (screen: string) => void
}

export default function GradeTenPage({ onBack, onNavigate }: GradeTenPageProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const handleModuleStart = (moduleId: string) => {
    const screenMap: Record<string, string> = {
      "periodic-table": "tabla-periodica",
      "atomic-structure": "estructura-atomica", 
      "electronic-config": "configuracion-electronica"
    }
    
    const screen = screenMap[moduleId]
    if (screen && onNavigate) {
      onNavigate(screen)
    }
  }

  const modules = [
    {
      id: "periodic-table",
      title: "Tabla Periódica Interactiva",
      description: "Explorador completo de elementos con herramientas avanzadas",
      icon: Table2,
      color: "from-purple-500 to-purple-600",
      progress: 75,
      difficulty: "Básico",
      estimatedTime: "3-4 horas",
      students: "3.2k",
      rating: 4.9,
      features: [
        { name: "Explorador de Elementos", icon: Eye, description: "Datos completos con búsqueda inteligente" },
        { name: "Sistema de Clasificación Visual", icon: Settings, description: "Codificación por colores y filtros" },
        { name: "Destacador de Lantánidos/Actínidos", icon: Sparkles, description: "Visualización especializada" },
        { name: "Juego de Identificación", icon: Gamepad2, description: "Reconocer elementos por posición/símbolo" },
      ],
      tools: ["Búsqueda inteligente", "Filtros por bloques", "Modo interactivo", "Base de datos completa"],
    },
    {
      id: "atomic-structure",
      title: "Estructura Atómica",
      description: "Simuladores 3D y calculadoras nucleares avanzadas",
      icon: Atom,
      color: "from-blue-500 to-blue-600",
      progress: 60,
      difficulty: "Intermedio",
      estimatedTime: "4-5 horas",
      students: "2.8k",
      rating: 4.8,
      features: [
        { name: "Simulador 3D de Átomos", icon: Atom, description: "Modelos interactivos ajustables" },
        { name: "Calculadora Nuclear", icon: Calculator, description: "Protones, neutrones, electrones" },
        { name: "Manejo de Iones e Isótopos", icon: Zap, description: "Cationes, aniones y variantes" },
        { name: "Laboratorio Virtual", icon: FlaskConical, description: "Experimentar con cambios atómicos" },
      ],
      tools: ["Simulador 3D", "Calculadora nuclear", "Visualizador de iones", "Lab virtual"],
    },
    {
      id: "electronic-config",
      title: "Configuración Electrónica",
      description: "Generadores automáticos y visualizadores de orbitales",
      icon: Orbit,
      color: "from-green-500 to-green-600",
      progress: 45,
      difficulty: "Intermedio",
      estimatedTime: "5-6 horas",
      students: "2.5k",
      rating: 4.7,
      features: [
        { name: "Generador Automático", icon: Settings, description: "Notación estándar y simplificada" },
        { name: "Visualizador de Orbitales", icon: Eye, description: "Diagramas animados con reglas cuánticas" },
        { name: "Tutor de Principios", icon: BookOpen, description: "Pauli, Hund, Aufbau interactivos" },
        { name: "Constructor de Lewis", icon: Link, description: "Estructuras de Lewis paso a paso" },
      ],
      tools: ["Generador automático", "Visualizador 3D", "Tutor interactivo", "Constructor Lewis"],
    },
    {
      id: "chemical-bonds",
      title: "Enlaces Químicos",
      description: "Comparadores y laboratorio molecular 3D",
      icon: Link,
      color: "from-orange-500 to-orange-600",
      progress: 30,
      difficulty: "Intermedio",
      estimatedTime: "4-5 horas",
      students: "2.1k",
      rating: 4.6,
      features: [
        { name: "Comparador de Enlaces", icon: BarChart3, description: "Diferencias iónico/covalente/metálico" },
        { name: "Laboratorio de Moléculas", icon: FlaskRound, description: "Constructor de fórmulas 3D" },
        { name: "Visualizador 3D", icon: Eye, description: "Geometrías moleculares interactivas" },
        { name: "Guía de Hibridación", icon: BookOpen, description: "Ejemplos paso a paso" },
      ],
      tools: ["Comparador visual", "Constructor 3D", "Visualizador molecular", "Guía interactiva"],
    },
    {
      id: "nomenclature",
      title: "Nomenclatura Inorgánica",
      description: "Asistente IUPAC y sistema de desafíos",
      icon: FileText,
      color: "from-teal-500 to-teal-600",
      progress: 20,
      difficulty: "Avanzado",
      estimatedTime: "3-4 horas",
      students: "1.9k",
      rating: 4.5,
      features: [
        { name: "Asistente IUPAC", icon: Settings, description: "Generador para binarios/ternarios" },
        { name: "Sistemas Stock y Tradicional", icon: BookOpen, description: "Nomenclatura completa" },
        { name: "Base de Ejemplos", icon: Target, description: "Óxidos, sales, hidrácidos clasificados" },
        { name: "Modo Desafío", icon: Trophy, description: "Pruebas cronometradas" },
      ],
      tools: ["Generador IUPAC", "Base de ejemplos", "Modo desafío", "Sistema dual"],
    },
    {
      id: "reactions",
      title: "Reacciones Químicas",
      description: "Identificadores y balanceadores inteligentes",
      icon: FlaskRound,
      color: "from-pink-500 to-pink-600",
      progress: 15,
      difficulty: "Avanzado",
      estimatedTime: "5-6 horas",
      students: "1.7k",
      rating: 4.4,
      features: [
        { name: "Identificador de Tipos", icon: Eye, description: "Combinación, descomposición, desplazamiento" },
        { name: "Balanceador Inteligente", icon: Scale, description: "Explicación paso a paso" },
        { name: "Simulador Termoquímico", icon: Beaker, description: "Visualización energía reacciones" },
        { name: "Clasificador Avanzado", icon: Layers, description: "Neutralización, redox, precipitación" },
      ],
      tools: ["Identificador automático", "Balanceador IA", "Simulador térmico", "Clasificador"],
    },
    {
      id: "stoichiometry",
      title: "Estequiometría",
      description: "Suite completa de cálculos y problemas",
      icon: Scale,
      color: "from-indigo-500 to-indigo-600",
      progress: 10,
      difficulty: "Avanzado",
      estimatedTime: "6-7 horas",
      students: "1.5k",
      rating: 4.3,
      features: [
        { name: "Suite de Cálculos", icon: Calculator, description: "Conversiones masa-mol-partículas" },
        { name: "Resolución Guiada", icon: BookOpen, description: "Problemas paso a paso" },
        { name: "Calculadora de Rendimiento", icon: Target, description: "Eficiencia de reacciones" },
        { name: "Banco de Problemas", icon: Layers, description: "Organizado por dificultad" },
      ],
      tools: ["Suite de cálculos", "Guía paso a paso", "Calc. rendimiento", "Banco problemas"],
    },
  ]

  const overallProgress = Math.round(modules.reduce((sum, mod) => sum + mod.progress, 0) / modules.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-purple-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Table2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Décimo Grado</h1>
                  <p className="text-xs text-gray-600">7 Módulos Especializados</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{overallProgress}% Completado</p>
                <Progress value={overallProgress} className="w-24 h-2" />
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">10° Grado</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">Módulos de Décimo Grado</h1>
                <p className="text-purple-100 text-lg">
                  Domina los fundamentos de la química con herramientas interactivas y simuladores avanzados.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{overallProgress}%</div>
                <p className="text-purple-100 text-sm">Progreso General</p>
                <Progress value={overallProgress} className="w-32 h-3 mt-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 text-center">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg w-fit mx-auto mb-2">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">7</div>
            <div className="text-xs text-gray-600">Módulos</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 text-center">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg w-fit mx-auto mb-2">
              <FlaskConical className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">25+</div>
            <div className="text-xs text-gray-600">Simuladores</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100 text-center">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg w-fit mx-auto mb-2">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">15+</div>
            <div className="text-xs text-gray-600">Calculadoras</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100 text-center">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg w-fit mx-auto mb-2">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">30h</div>
            <div className="text-xs text-gray-600">Contenido</div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
              onClick={() => setSelectedModule(module.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-3 bg-gradient-to-r ${module.color} rounded-xl group-hover:scale-110 transition-transform`}
                  >
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      module.difficulty === "Básico"
                        ? "border-green-300 text-green-700 bg-green-50"
                        : module.difficulty === "Intermedio"
                          ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                          : "border-red-300 text-red-700 bg-red-50"
                    }`}
                  >
                    {module.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-800 mb-2">{module.title}</CardTitle>
                <CardDescription className="text-gray-600 text-sm">{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progreso</span>
                    <span className="font-semibold text-gray-800">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{module.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{module.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(module.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{module.rating}</span>
                  </div>

                  <div className="pt-2">
                    <Button
                      onClick={() => handleModuleStart(module.id)}
                      className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white font-semibold group-hover:scale-105 transition-transform`}
                    >
                      {module.progress > 0 ? "Continuar" : "Comenzar"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Detail Modal */}
        {selectedModule && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const module = modules.find((mod) => mod.id === selectedModule)!
                return (
                  <div>
                    <div className={`bg-gradient-to-r ${module.color} text-white p-6 rounded-t-2xl`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <module.icon className="h-8 w-8" />
                          <div>
                            <h2 className="text-2xl font-bold">{module.title}</h2>
                            <p className="text-white/80">{module.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedModule(null)}
                          className="text-white hover:bg-white/20"
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-2xl font-bold">{module.progress}%</div>
                          <div className="text-white/80 text-sm">Completado</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{module.students}</div>
                          <div className="text-white/80 text-sm">Estudiantes</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{module.estimatedTime}</div>
                          <div className="text-white/80 text-sm">Duración</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{module.rating}</div>
                          <div className="text-white/80 text-sm">Calificación</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Características Principales</h3>
                          <div className="space-y-3">
                            {module.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-gray-200 rounded-lg">
                                  <feature.icon className="h-4 w-4 text-gray-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-800">{feature.name}</div>
                                  <div className="text-sm text-gray-600">{feature.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Herramientas Incluidas</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {module.tools.map((tool, index) => (
                              <div key={index} className="p-3 bg-blue-50 rounded-lg text-center">
                                <div className="text-sm font-medium text-blue-800">{tool}</div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-800 mb-2">Lo que aprenderás:</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              <li>• Conceptos fundamentales del módulo</li>
                              <li>• Aplicación práctica con simuladores</li>
                              <li>• Resolución de problemas complejos</li>
                              <li>• Preparación para evaluaciones</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleModuleStart(module.id)}
                          className={`flex-1 bg-gradient-to-r ${module.color} hover:opacity-90 text-white`}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {module.progress > 0 ? "Continuar Módulo" : "Comenzar Módulo"}
                        </Button>
                        <Button variant="outline" className="px-6 bg-transparent">
                          Vista Previa
                        </Button>
                        <Button variant="outline" className="px-6 bg-transparent">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Recursos
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
