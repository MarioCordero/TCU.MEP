"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { SearchBar } from '../../components/ui/searchbar'
import {
  ArrowLeft,
  Droplet,
  Waves,
  Hexagon,
  FileText,
  Layers,
  Play,
  Star,
  Users,
  Clock,
  ChevronRight,
  Calculator,
  Eye,
  Settings,
  BookOpen,
  Trophy,
  Target,
  FlaskConical,
  Microscope,
  Gamepad2,
  BarChart3,
} from "lucide-react"

export default function GradeElevenPage() {
  const navigate = useNavigate()
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  const modules = [
    {
      id: "solutions",
      title: "Disoluciones Avanzadas",
      description: "Simuladores de polaridad y calculadoras de concentraciones",
      icon: Droplet,
      color: "from-blue-500 to-blue-600",
      progress: 65,
      difficulty: "Intermedio",
      estimatedTime: "4-5 horas",
      students: "2.1k",
      rating: 4.8,
      features: [
        { name: "Simulador de Polaridad", icon: Waves, description: "Moléculas polares/apolares interactivas" },
        { name: "Calculadora de Concentraciones", icon: Calculator, description: "% m/m, % m/v, % v/v completas" },
        { name: "Molaridad y Molalidad", icon: Target, description: "Cálculos avanzados automatizados" },
        { name: "Laboratorio Virtual", icon: FlaskConical, description: "Preparación de disoluciones" },
      ],
      tools: ["Simulador polaridad", "Calc. concentraciones", "Lab virtual", "Guía paso a paso"],
    },
    {
      id: "colligative",
      title: "Propiedades Coligativas",
      description: "Visualizadores de efectos y calculadoras especializadas",
      icon: Waves,
      color: "from-purple-500 to-purple-600",
      progress: 50,
      difficulty: "Avanzado",
      estimatedTime: "3-4 horas",
      students: "1.8k",
      rating: 4.7,
      features: [
        { name: "Visualizador de Efectos", icon: Eye, description: "Descenso crioscópico animado" },
        { name: "Ascenso Ebulloscópico", icon: Waves, description: "Simulación interactiva" },
        { name: "Presión Osmótica", icon: Target, description: "Cálculos y visualización" },
        { name: "Calculadora Práctica", icon: Calculator, description: "Magnitudes coligativas" },
      ],
      tools: ["Visualizador efectos", "Simulador térmico", "Calc. osmótica", "Ejemplos prácticos"],
    },
    {
      id: "organic-fundamental",
      title: "Química Orgánica Fundamental",
      description: "Clasificadores e identificadores de compuestos orgánicos",
      icon: Hexagon,
      color: "from-green-500 to-green-600",
      progress: 40,
      difficulty: "Avanzado",
      estimatedTime: "5-6 horas",
      students: "1.9k",
      rating: 4.6,
      features: [
        { name: "Clasificador de Hidrocarburos", icon: Layers, description: "Alcanos, alquenos, alquinos, aromáticos" },
        { name: "Identificador de Grupos", icon: Eye, description: "Haluros, alcoholes, éteres completos" },
        { name: "Aldehídos y Cetonas", icon: Hexagon, description: "Reconocimiento automático" },
        { name: "Ácidos y Derivados", icon: BookOpen, description: "Carboxílicos, ésteres, amidas, aminas" },
      ],
      tools: ["Clasificador automático", "Identificador grupos", "Base de datos", "Ejemplos 3D"],
    },
    {
      id: "organic-nomenclature",
      title: "Nomenclatura Orgánica",
      description: "Generador IUPAC y constructor de fórmulas avanzado",
      icon: FileText,
      color: "from-orange-500 to-orange-600",
      progress: 25,
      difficulty: "Avanzado",
      estimatedTime: "4-5 horas",
      students: "1.6k",
      rating: 4.5,
      features: [
        { name: "Generador IUPAC", icon: Settings, description: "Nomenclatura básica y avanzada" },
        { name: "Identificación de Cadenas", icon: Target, description: "Cadenas principales automáticas" },
        { name: "Numeración Correcta", icon: BookOpen, description: "Sustituyentes optimizados" },
        { name: "Constructor de Fórmulas", icon: Layers, description: "Desde nombre sistemático" },
      ],
      tools: ["Generador IUPAC", "Identificador cadenas", "Constructor fórmulas", "Validador nombres"],
    },
    {
      id: "isomerism",
      title: "Isomería",
      description: "Visualizadores 3D y juegos de identificación",
      icon: Layers,
      color: "from-teal-500 to-teal-600",
      progress: 15,
      difficulty: "Avanzado",
      estimatedTime: "5-6 horas",
      students: "1.4k",
      rating: 4.4,
      features: [
        { name: "Visualizador 3D de Isómeros", icon: Eye, description: "Isomería estructural completa" },
        { name: "Isomería de Cadena", icon: Layers, description: "Posición y función interactivas" },
        { name: "Estereoisomería", icon: Microscope, description: "Geométrica y óptica avanzada" },
        { name: "Juego de Identificación", icon: Gamepad2, description: "Reconocer tipos de isomería" },
      ],
      tools: ["Visualizador 3D", "Comparador isómeros", "Juego interactivo", "Guía estereoquímica"],
    },
  ]

  const crossCuttingFeatures = [
    {
      category: "Sistema de Aprendizaje",
      icon: Target,
      features: [
        "Ruta personalizada basada en nivel de conocimiento",
        "Tarjetas de estudio descargables por módulo",
        "Seguimiento de progreso con gráficos de avance",
        "Recomendaciones adaptativas de contenido",
      ],
    },
    {
      category: "Herramientas Interactivas",
      icon: Calculator,
      features: [
        "Calculadora científica integrada avanzada",
        "Tabla periódica offline con datos completos",
        "Glosario visual de términos químicos",
        "Conversor de unidades especializado",
      ],
    },
    {
      category: "Sistema de Evaluación",
      icon: BarChart3,
      features: [
        "Pruebas de competencia alineadas al currículo",
        "Simulador de exámenes con cronómetro",
        "Reportes de rendimiento y detección de debilidades",
        "Banco de preguntas categorizado por dificultad",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">

      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hover:bg-emerald-100">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <Hexagon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Undécimo Grado</h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 w-full sm:w-auto md:w-fit lg:w-auto px-4 py-1 whitespace-nowrap">11° Grado</Badge>
            </div>
          </div>
        </div>
      </header>
      {/* HEADER */}

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">¡Te damos la bienvenida a quimica para undécimo año!</h1>
                <p className="text-emerald-100 text-lg">
                  Profundizá en la química con contenidos avanzados y aplicaciones prácticas.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Welcome Section */}

        {/* Search bar */}
        <div className="mb-4 sm:mb-6">
          <SearchBar
            placeholder="Busca en los contenidos de undécimo año..."
            onSearch={(query) => console.log('Busca en los contenidos de undécimo año:', query)}
          />
        </div>
        {/* Search bar */}

        {/* Modules Grid */}
        <h1 className="text-center font-bold text-2xl mb-6">Contenido de undécimo año</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

        {/* Cross-Cutting Features */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Características Transversales</h2>
              <p className="text-indigo-100 max-w-2xl mx-auto">
                Herramientas y funciones avanzadas que potencian tu experiencia de aprendizaje en todos los módulos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {crossCuttingFeatures.map((section, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold">{section.category}</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-indigo-100">
                    {section.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                              <div key={index} className="p-3 bg-emerald-50 rounded-lg text-center">
                                <div className="text-sm font-medium text-emerald-800">{tool}</div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Competencias desarrolladas:</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              <li>• Análisis avanzado de sistemas químicos</li>
                              <li>• Resolución de problemas complejos</li>
                              <li>• Interpretación de datos experimentales</li>
                              <li>• Aplicación de conceptos teóricos</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className={`flex-1 bg-gradient-to-r ${module.color} hover:opacity-90 text-white`}>
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