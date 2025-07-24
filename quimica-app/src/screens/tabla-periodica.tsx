"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Table2,
  Diamond,
  Leaf,
  Microscope,
  Sparkles,
  Zap,
  Gauge,
  ArrowRight,
  Play,
  Flame,
  Lightbulb,
  Snowflake,
  Wind,
  Radiation,
} from "lucide-react"

interface TablaPeriodicaScreenProps {
  onBack: () => void
}

export default function TablaPeriodicaScreen({ onBack }: TablaPeriodicaScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Barra de navegación */}
      <nav className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-600" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Table2 className="h-6 w-6" />
              <h1 className="text-lg font-bold">Tabla Periódica</h1>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/10 text-white border-0">
            Tema 3
          </Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Encabezado de la sección */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Tabla Periódica</h1>
            <p className="text-green-100">
              Explora la organización de los elementos químicos y sus familias según sus propiedades.
            </p>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <Tabs defaultValue="tipos" className="mb-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-2 mb-6">
            <TabsTrigger value="tipos" className="flex items-center gap-2">
              <Diamond className="h-4 w-4" />
              <span>Tipos de Elementos</span>
            </TabsTrigger>
            <TabsTrigger value="familias" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Familias Químicas</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido: Tipos de Elementos */}
          <TabsContent value="tipos" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Diamond className="h-5 w-5" />
                  Tipos de Elementos
                </CardTitle>
                <CardDescription className="text-green-100">
                  Clasificación según sus propiedades físicas y químicas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-gray-800">
                        <Diamond className="h-5 w-5 text-gray-600" />
                        Metales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Propiedades:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Buenos conductores de calor y electricidad</li>
                          <li>• Maleables y dúctiles</li>
                          <li>• Brillo metálico característico</li>
                          <li>• Tienden a perder electrones</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Ejemplos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-gray-600 text-xs">Hierro (Fe)</Badge>
                          <Badge className="bg-gray-600 text-xs">Oro (Au)</Badge>
                          <Badge className="bg-gray-600 text-xs">Plata (Ag)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <Leaf className="h-5 w-5 text-green-600" />
                        No Metales
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Propiedades:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Malos conductores de calor y electricidad</li>
                          <li>• Frágiles en estado sólido</li>
                          <li>• No tienen brillo metálico</li>
                          <li>• Tienden a ganar electrones</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Ejemplos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-green-600 text-xs">Oxígeno (O)</Badge>
                          <Badge className="bg-green-600 text-xs">Carbono (C)</Badge>
                          <Badge className="bg-green-600 text-xs">Azufre (S)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-purple-800">
                        <Microscope className="h-5 w-5 text-purple-600" />
                        Metaloides
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Propiedades:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Propiedades intermedias entre metales y no metales</li>
                          <li>• Semiconductores de electricidad</li>
                          <li>• Útiles en tecnología electrónica</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Ejemplos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-purple-600 text-xs">Silicio (Si)</Badge>
                          <Badge className="bg-purple-600 text-xs">Boro (B)</Badge>
                          <Badge className="bg-purple-600 text-xs">Germanio (Ge)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-amber-800">
                        <Sparkles className="h-5 w-5 text-amber-600" />
                        Tierras Raras
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Propiedades:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Incluye lantánidos y algunos actínidos</li>
                          <li>• Propiedades magnéticas especiales</li>
                          <li>• Importantes en tecnología moderna</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Ejemplos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-amber-600 text-xs">Lantano (La)</Badge>
                          <Badge className="bg-amber-600 text-xs">Cerio (Ce)</Badge>
                          <Badge className="bg-amber-600 text-xs">Neodimio (Nd)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Zap className="h-5 w-5 text-blue-600" />
                        Superconductores
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Propiedades:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Conducen electricidad sin resistencia</li>
                          <li>• Requieren temperaturas muy bajas</li>
                          <li>• Aplicaciones en tecnología avanzada</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Ejemplos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-blue-600 text-xs">Niobio (Nb)</Badge>
                          <Badge className="bg-blue-600 text-xs">Mercurio (Hg)</Badge>
                          <Badge className="bg-blue-600 text-xs">Compuestos cerámicos</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-teal-800">
                        <Gauge className="h-5 w-5 text-teal-600" />
                        Elementos Traza
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Propiedades:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Necesarios en pequeñas cantidades</li>
                          <li>• Esenciales para procesos biológicos</li>
                          <li>• Deficiencia causa problemas de salud</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Ejemplos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-teal-600 text-xs">Zinc (Zn)</Badge>
                          <Badge className="bg-teal-600 text-xs">Cobre (Cu)</Badge>
                          <Badge className="bg-teal-600 text-xs">Selenio (Se)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenido: Familias */}
          <TabsContent value="familias" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Familias Químicas
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Grupos de elementos con propiedades químicas similares
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-red-800">
                        <Flame className="h-5 w-5 text-red-600" />
                        Metales Alcalinos (Grupo 1)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Características:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Muy reactivos con agua</li>
                          <li>• Blandos y de baja densidad</li>
                          <li>• Un electrón en la capa externa</li>
                          <li>• Forman hidróxidos básicos</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Elementos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-red-600 text-xs">Litio (Li)</Badge>
                          <Badge className="bg-red-600 text-xs">Sodio (Na)</Badge>
                          <Badge className="bg-red-600 text-xs">Potasio (K)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-yellow-800">
                        <Lightbulb className="h-5 w-5 text-yellow-600" />
                        Metales Alcalinotérreos (Grupo 2)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Características:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Reactivos pero menos que los alcalinos</li>
                          <li>• Dos electrones en la capa externa</li>
                          <li>• Forman compuestos iónicos</li>
                          <li>• Importantes en construcción</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Elementos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-yellow-600 text-xs">Berilio (Be)</Badge>
                          <Badge className="bg-yellow-600 text-xs">Magnesio (Mg)</Badge>
                          <Badge className="bg-yellow-600 text-xs">Calcio (Ca)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-cyan-800">
                        <Snowflake className="h-5 w-5 text-cyan-600" />
                        Halógenos (Grupo 17)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Características:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Muy reactivos</li>
                          <li>• Siete electrones en la capa externa</li>
                          <li>• Forman sales con metales</li>
                          <li>• Existen en diferentes estados</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Elementos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-cyan-600 text-xs">Flúor (F)</Badge>
                          <Badge className="bg-cyan-600 text-xs">Cloro (Cl)</Badge>
                          <Badge className="bg-cyan-600 text-xs">Bromo (Br)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-purple-800">
                        <Wind className="h-5 w-5 text-purple-600" />
                        Gases Nobles (Grupo 18)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Características:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Extremadamente estables</li>
                          <li>• Ocho electrones en la capa externa</li>
                          <li>• Baja reactividad química</li>
                          <li>• Gases a temperatura ambiente</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Elementos:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-purple-600 text-xs">Helio (He)</Badge>
                          <Badge className="bg-purple-600 text-xs">Neón (Ne)</Badge>
                          <Badge className="bg-purple-600 text-xs">Argón (Ar)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-amber-800">
                        <Sparkles className="h-5 w-5 text-amber-600" />
                        Lantánidos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Características:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Propiedades químicas similares</li>
                          <li>• Utilizados en tecnología moderna</li>
                          <li>• Propiedades magnéticas especiales</li>
                          <li>• Elementos de tierras raras</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Rango:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-amber-600 text-xs">Lantano (La)</Badge>
                          <Badge className="bg-amber-600 text-xs">a</Badge>
                          <Badge className="bg-amber-600 text-xs">Lutecio (Lu)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-red-800">
                        <Radiation className="h-5 w-5 text-red-600" />
                        Actínidos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Características:</span>
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Elementos radiactivos</li>
                          <li>• Mayoría son sintéticos</li>
                          <li>• Vida media corta</li>
                          <li>• Importantes en energía nuclear</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Rango:</p>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-red-600 text-xs">Actinio (Ac)</Badge>
                          <Badge className="bg-red-600 text-xs">a</Badge>
                          <Badge className="bg-red-600 text-xs">Lawrencio (Lr)</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botones de navegación */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Menú
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Ejercicios
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              Siguiente Tema
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
