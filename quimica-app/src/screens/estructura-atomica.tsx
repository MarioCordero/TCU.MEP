"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Layers, Atom, ArrowRight, Play, Waves, Target, BookOpen, CheckCircle } from "lucide-react"

export default function EstructuraAtomica() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Barra de navegación */}
      <nav className="bg-gradient-to-r from-orange-700 to-orange-800 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-orange-600" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Layers className="h-6 w-6" />
              <h1 className="text-lg font-bold">Estructura Atómica</h1>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/10 text-white border-0">
            Tema 4
          </Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Encabezado de la sección */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Estructura Atómica</h1>
            <p className="text-orange-100">
              Descubre los componentes fundamentales del átomo y los modelos que explican su estructura.
            </p>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <Tabs defaultValue="particulas" className="mb-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
            <TabsTrigger value="particulas" className="flex items-center gap-2">
              <Atom className="h-4 w-4" />
              <span>Partículas Subatómicas</span>
            </TabsTrigger>
            <TabsTrigger value="numeros" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Números Atómicos</span>
            </TabsTrigger>
            <TabsTrigger value="modelos" className="flex items-center gap-2">
              <Waves className="h-4 w-4" />
              <span>Modelos Atómicos</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido: Partículas Subatómicas */}
          <TabsContent value="particulas" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Atom className="h-5 w-5" />
                  Partículas Subatómicas
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Los componentes fundamentales que forman todos los átomos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-red-800">
                        <Badge className="bg-red-600 text-white">+</Badge>
                        Protón
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg space-y-2">
                        <div>
                          <span className="font-semibold text-red-700">Carga:</span>
                          <p className="text-sm text-gray-700">Positiva (+1)</p>
                        </div>
                        <div>
                          <span className="font-semibold text-red-700">Masa:</span>
                          <p className="text-sm text-gray-700">1.673 × 10⁻²⁷ kg</p>
                        </div>
                        <div>
                          <span className="font-semibold text-red-700">Ubicación:</span>
                          <p className="text-sm text-gray-700">Núcleo atómico</p>
                        </div>
                        <div>
                          <span className="font-semibold text-red-700">Descubridor:</span>
                          <p className="text-sm text-gray-700">Ernest Rutherford (1919)</p>
                        </div>
                      </div>
                      <div className="bg-red-50 p-2 rounded-lg">
                        <p className="text-xs text-red-700">
                          <span className="font-semibold">Función:</span> Determina la identidad del elemento químico
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-gray-800">
                        <Badge className="bg-gray-600 text-white">0</Badge>
                        Neutrón
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg space-y-2">
                        <div>
                          <span className="font-semibold text-gray-700">Carga:</span>
                          <p className="text-sm text-gray-700">Neutra (0)</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Masa:</span>
                          <p className="text-sm text-gray-700">1.675 × 10⁻²⁷ kg</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Ubicación:</span>
                          <p className="text-sm text-gray-700">Núcleo atómico</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Descubridor:</span>
                          <p className="text-sm text-gray-700">James Chadwick (1932)</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-700">
                          <span className="font-semibold">Función:</span> Estabiliza el núcleo y define los isótopos
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Badge className="bg-blue-600 text-white">-</Badge>
                        Electrón
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg space-y-2">
                        <div>
                          <span className="font-semibold text-blue-700">Carga:</span>
                          <p className="text-sm text-gray-700">Negativa (-1)</p>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-700">Masa:</span>
                          <p className="text-sm text-gray-700">9.109 × 10⁻³¹ kg</p>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-700">Ubicación:</span>
                          <p className="text-sm text-gray-700">Orbitales alrededor del núcleo</p>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-700">Descubridor:</span>
                          <p className="text-sm text-gray-700">J.J. Thomson (1897)</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <p className="text-xs text-blue-700">
                          <span className="font-semibold">Función:</span> Responsable de las propiedades químicas
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Dato Importante
                  </h4>
                  <p className="text-amber-700">
                    Aunque los protones y neutrones tienen masas similares, el electrón es aproximadamente 1,836 veces
                    más liviano que un protón. Esta diferencia de masa explica por qué la masa del átomo se concentra
                    casi completamente en el núcleo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenido: Números Atómicos */}
          <TabsContent value="numeros" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Número Atómico, Número Másico e Isótopos
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Conceptos fundamentales para identificar y caracterizar los elementos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-purple-800">Número Atómico (Z)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Definición:</span> Número de protones en el núcleo de un
                          átomo.
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Importancia:</span> Determina la identidad del elemento
                          químico.
                        </p>
                        <div className="bg-purple-50 p-2 rounded">
                          <p className="text-xs text-purple-700">
                            <span className="font-semibold">Ejemplo:</span> El hidrógeno tiene Z = 1, el oxígeno tiene Z
                            = 8.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-800">Número Másico (A)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Definición:</span> Suma del número de protones y neutrones en
                          el núcleo.
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">Fórmula:</span> A = Z + N (donde N es el número de neutrones)
                        </p>
                        <div className="bg-blue-50 p-2 rounded">
                          <p className="text-xs text-blue-700">
                            <span className="font-semibold">Ejemplo:</span> El carbono-12 tiene A = 12 (6 protones + 6
                            neutrones).
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-800">Isótopos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-3">
                        <span className="font-semibold">Definición:</span> Átomos del mismo elemento (mismo Z) pero con
                        diferente número de neutrones (diferente A).
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <h5 className="font-semibold text-green-800 mb-1">Hidrógeno-1</h5>
                          <p className="text-xs text-gray-600">¹H</p>
                          <p className="text-xs text-gray-600">1 protón, 0 neutrones</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <h5 className="font-semibold text-green-800 mb-1">Deuterio</h5>
                          <p className="text-xs text-gray-600">²H</p>
                          <p className="text-xs text-gray-600">1 protón, 1 neutrón</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <h5 className="font-semibold text-green-800 mb-1">Tritio</h5>
                          <p className="text-xs text-gray-600">³H</p>
                          <p className="text-xs text-gray-600">1 protón, 2 neutrones</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-amber-800">Masa Atómica Promedio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-3">
                        <span className="font-semibold">Definición:</span> Promedio ponderado de las masas de los
                        isótopos naturales de un elemento.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold">Unidad:</span> uma (unidad de masa atómica)
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">1 uma =</span> 1.66054 × 10⁻²⁷ kg
                          </p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg">
                          <p className="text-xs text-amber-700">
                            <span className="font-semibold">Ejemplo:</span> El cloro tiene una masa atómica promedio de
                            35.45 uma debido a la abundancia natural de sus isótopos Cl-35 (75.8%) y Cl-37 (24.2%).
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenido: Modelos Atómicos */}
          <TabsContent value="modelos" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Modelos Atómicos
                </CardTitle>
                <CardDescription className="text-indigo-100">
                  Evolución histórica de nuestra comprensión del átomo
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-800">
                        <Waves className="h-5 w-5 text-purple-600" />
                        Modelo de Planck (1900)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-700 mb-2">Concepto Clave</h5>
                          <p className="text-sm text-gray-700">
                            La energía se emite o absorbe en paquetes discretos llamados "cuantos".
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-700 mb-2">Ecuación Fundamental</h5>
                          <p className="text-sm text-gray-700 font-mono bg-purple-50 p-2 rounded">E = hν</p>
                          <p className="text-xs text-gray-600 mt-1">donde h es la constante de Planck</p>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-purple-800">Importancia:</p>
                            <p className="text-sm text-purple-700">
                              Sentó las bases para la física cuántica y la comprensión moderna del átomo.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Waves className="h-5 w-5 text-blue-600" />
                        Modelo de de Broglie (1924)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-700 mb-2">Concepto Clave</h5>
                          <p className="text-sm text-gray-700">
                            Dualidad onda-partícula. Las partículas como los electrones también tienen propiedades
                            ondulatorias.
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-700 mb-2">Ecuación de de Broglie</h5>
                          <p className="text-sm text-gray-700 font-mono bg-blue-50 p-2 rounded">λ = h/p</p>
                          <p className="text-xs text-gray-600 mt-1">donde λ es la longitud de onda y p es el momento</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-blue-800">Importancia:</p>
                            <p className="text-sm text-blue-700">
                              Explicó por qué los electrones solo pueden existir en ciertos niveles de energía.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        <Waves className="h-5 w-5 text-green-600" />
                        Modelo de Schrödinger (1926)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-white p-4 rounded-lg">
                        <h5 className="font-semibold text-green-700 mb-2">Concepto Clave</h5>
                        <p className="text-sm text-gray-700 mb-3">
                          Mecánica ondulatoria. Los electrones se describen mediante funciones de onda (orbitales) que
                          representan la probabilidad de encontrar un electrón en una región del espacio.
                        </p>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h6 className="font-semibold text-green-700 mb-1">Ecuación de Schrödinger</h6>
                          <p className="text-sm text-gray-700 font-mono">HΨ = EΨ</p>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-green-800">Importancia:</p>
                            <p className="text-sm text-green-700">
                              Base del modelo actual del átomo. Introdujo el concepto de orbital atómico y permitió
                              calcular los niveles de energía con gran precisión.
                            </p>
                          </div>
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
          <Button variant="outline" onClick={() => navigate('/')} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Menú
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Ejercicios
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
              Completar Unidad
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
