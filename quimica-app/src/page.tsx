"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Atom,
  Play,
  Info,
  X,
  FlaskConical,
  Calculator,
  Eye,
  BookOpen,
  Target,
  Sparkles,
  Users,
  Trophy,
  Clock,
} from "lucide-react"

// Import the grade pages
import GradeTenPage from "./grade-10/page"
import GradeElevenPage from "./grade-11/page"

// Import the screens
import ClasificacionMateria from "./screens/clasificacion-materia"
import TablaPeriodicaScreen from "./screens/tabla-periodica"
import EstructuraAtomica from "./screens/estructura-atomica"
import ConfiguracionElectronica from "./screens/configuracion-electronica"

type CurrentPage = "landing" | "grade-10" | "grade-11" | "info" | "clasificacion-materia" | "tabla-periodica" | "estructura-atomica" | "configuracion-electronica"

export default function ChemistryApp() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("landing")

  if (currentPage === "grade-10") {
    return <GradeTenPage 
      onBack={() => setCurrentPage("landing")} 
      onNavigate={(screen) => setCurrentPage(screen as CurrentPage)}
    />
  }

  if (currentPage === "grade-11") {
    return <GradeElevenPage 
      onBack={() => setCurrentPage("landing")} 
      onNavigate={(screen) => setCurrentPage(screen as CurrentPage)}
    />
  }

  if (currentPage === "info") {
    return <InfoPage onBack={() => setCurrentPage("landing")} onStart={() => setCurrentPage("grade-10")} />
  }

  // New screens
  if (currentPage === "clasificacion-materia") {
    return <ClasificacionMateria onBack={() => setCurrentPage("landing")} />
  }

  if (currentPage === "tabla-periodica") {
    return <TablaPeriodicaScreen onBack={() => setCurrentPage("landing")} />
  }

  if (currentPage === "estructura-atomica") {
    return <EstructuraAtomica onBack={() => setCurrentPage("landing")} />
  }

  if (currentPage === "configuracion-electronica") {
    return <ConfiguracionElectronica onBack={() => setCurrentPage("landing")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-fit mx-auto mb-6 shadow-lg">
            <Atom className="h-16 w-16 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ChemMaster
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8">Química Interactiva para Secundaria</p>
        </div>

        {/* Description */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 leading-relaxed max-w-xl mx-auto">
            Aprende química de forma divertida e interactiva con simuladores 3D, calculadoras especializadas y
            laboratorios virtuales. Diseñado específicamente para estudiantes de 10° y 11° grado.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => setCurrentPage("grade-10")}
          >
            <Play className="mr-3 h-6 w-6" />
            Comenzar
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={() => setCurrentPage("info")}
          >
            <Info className="mr-3 h-6 w-6" />
            Más Información
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Módulos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-gray-600">Simuladores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-gray-600">Éxito</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Info Page Component
function InfoPage({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-purple-100">
                <X className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
                  <Atom className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">ChemMaster</h1>
                  <p className="text-xs text-gray-600">Información de la App</p>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">Pro v2.0</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sobre{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ChemMaster
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La plataforma educativa más avanzada para el aprendizaje de química en secundaria, con tecnología de
            vanguardia y metodología pedagógica innovadora.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl w-fit mx-auto mb-3">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Simuladores 3D</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm text-center">
                Modelos interactivos de átomos, moléculas y reacciones químicas para una comprensión visual completa.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-3">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Calculadoras Especializadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm text-center">
                Herramientas de cálculo avanzadas para estequiometría, concentraciones y propiedades químicas.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Visualizadores Avanzados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm text-center">
                Representaciones gráficas de estructuras moleculares, orbitales y procesos químicos complejos.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl w-fit mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Contenido Curricular</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm text-center">
                Alineado con los programas oficiales de 10° y 11° grado, cubriendo todos los temas requeridos.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-3">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl w-fit mx-auto mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Aprendizaje Adaptativo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm text-center">
                Sistema inteligente que se adapta al ritmo y nivel de cada estudiante para optimizar el aprendizaje.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-3">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl w-fit mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Gamificación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm text-center">
                Elementos de juego, logros y desafíos que mantienen la motivación y el compromiso del estudiante.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl shadow-lg mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Resultados Comprobados</h2>
            <p className="text-purple-100">
              Miles de estudiantes han mejorado sus calificaciones y comprensión de la química.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">25,000+</div>
              <div className="text-purple-100 text-sm">Estudiantes Activos</div>
            </div>
            <div className="text-center">
              <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-purple-100 text-sm">Tasa de Aprobación</div>
            </div>
            <div className="text-center">
              <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-purple-100 text-sm">Módulos Completos</div>
            </div>
            <div className="text-center">
              <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-purple-100 text-sm">Horas de Contenido</div>
            </div>
          </div>
        </div>

        {/* Curriculum Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Contenido Curricular</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 10th Grade */}
            <Card className="border-0 bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Atom className="h-5 w-5" />
                  </div>
                  Décimo Grado
                </CardTitle>
                <CardDescription className="text-purple-100">Fundamentos avanzados de química</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-purple-100">
                  <li>• Tabla Periódica Interactiva</li>
                  <li>• Estructura Atómica</li>
                  <li>• Configuración Electrónica</li>
                  <li>• Enlaces Químicos</li>
                  <li>• Nomenclatura Inorgánica</li>
                  <li>• Reacciones Químicas</li>
                  <li>• Estequiometría</li>
                </ul>
              </CardContent>
            </Card>

            {/* 11th Grade */}
            <Card className="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  Undécimo Grado
                </CardTitle>
                <CardDescription className="text-emerald-100">Química avanzada y especializada</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-emerald-100">
                  <li>• Disoluciones Avanzadas</li>
                  <li>• Propiedades Coligativas</li>
                  <li>• Química Orgánica Fundamental</li>
                  <li>• Nomenclatura Orgánica</li>
                  <li>• Isomería</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Listo para comenzar?</h2>
          <p className="text-gray-600 mb-8">
            Únete a miles de estudiantes que ya están dominando la química con ChemMaster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={onStart}
            >
              <Play className="mr-3 h-6 w-6" />
              Comenzar Ahora
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 bg-transparent"
              onClick={onBack}
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
