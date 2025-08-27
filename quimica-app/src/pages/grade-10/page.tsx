"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { SearchBar } from '../../components/ui/searchbar'
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
  X,
} from "lucide-react"

export default function GradeTenPage() {
  const navigate = useNavigate()
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const handleModuleStart = (moduleId: string) => {
    const screenMap: Record<string, string> = {
      "periodic-table": "tabla-periodica",
      "atomic-structure": "estructura-atomica", 
      "electronic-config": "configuracion-electronica"
    }
    
    const screen = screenMap[moduleId]
    if (screen) {
      navigate(`/${screen}`)
    }
  }

  // Modulos de 10º grado
  const modules = [
    {
      id: "periodic-table",
      title: "Tabla Periódica Interactiva",
      description: "Explorador completo de elementos con herramientas avanzadas",
      icon: Table2,
      color: "from-purple-500 to-purple-600",
      difficulty: "Básico",
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
      difficulty: "Intermedio",
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
      difficulty: "Intermedio",
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
      difficulty: "Intermedio",
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
      difficulty: "Avanzado",
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
      difficulty: "Avanzado",
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
      difficulty: "Avanzado",
      features: [
        { name: "Suite de Cálculos", icon: Calculator, description: "Conversiones masa-mol-partículas" },
        { name: "Resolución Guiada", icon: BookOpen, description: "Problemas paso a paso" },
        { name: "Calculadora de Rendimiento", icon: Target, description: "Eficiencia de reacciones" },
        { name: "Banco de Problemas", icon: Layers, description: "Organizado por dificultad" },
      ],
      tools: ["Suite de cálculos", "Guía paso a paso", "Calc. rendimiento", "Banco problemas"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hover:bg-purple-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Table2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Décimo Grado</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">10° Grado</Badge>
            </div>
          </div>
        </div>
      </header>
      {/* HEADER */}

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Welcome section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">¡Te damos la bienvenida a química para décimo año!</h1>
                <p className="text-purple-100 text-lg">
                  Explora los fundamentos de la química con contenido interactivo y ejercicios prácticos.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Welcome section */}

        {/* Search bar */}
        <div className="mb-4 sm:mb-6">
          <SearchBar 
            placeholder="Busca en los contenidos de décimo año..." 
            onSearch={(query) => console.log('Busca en los contenidos de décimo año:', query)} 
          />
        </div>
        {/* Search bar */}

        {/* Modules Grid */}
        <h1 className="text-center font-bold text-2xl mb-6">Contenido de décimo año</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Goes through the array of modules and renders a Card for each one */}
          {modules.map((module) => (
            // What the card will say
            <Card
              key={module.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
              onClick={() => setSelectedModule(module.id)}
            >
              {/* The info that will be displayed on the card */}
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
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          {/* Where the learning objectives are listed */}
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Lo que deberás aprender</h3>
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