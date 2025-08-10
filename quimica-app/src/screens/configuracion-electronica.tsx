"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Orbit, Zap, Target, BookOpen, Play, CheckCircle, ArrowRight } from "lucide-react"

export default function ConfiguracionElectronica() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("numeros-atomicos")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Barra de navegación */}
      <nav className="bg-gradient-to-r from-purple-700 to-purple-800 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Orbit className="h-6 w-6" />
              <h1 className="text-lg font-bold">Configuración Electrónica</h1>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/10 text-white border-0">
            Tema 1
          </Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Encabezado de la sección */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Configuración Electrónica</h1>
            <p className="text-purple-100">
              Aprende sobre la distribución de electrones en los átomos y los números cuánticos que los describen.
            </p>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-6">
            <TabsTrigger value="numeros-atomicos" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Números Atómicos</span>
            </TabsTrigger>
            <TabsTrigger value="numeros-cuanticos" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Números Cuánticos</span>
            </TabsTrigger>
            <TabsTrigger value="niveles-energia" className="flex items-center gap-2">
              <Orbit className="h-4 w-4" />
              <span>Niveles de Energía</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido: Números Atómicos */}
          <TabsContent value="numeros-atomicos" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Números Atómicos
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Fundamento de la identidad química de los elementos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-purple-800 mb-2">¿Qué es el número atómico?</h3>
                    <p className="text-gray-700">
                      El <span className="font-semibold text-purple-700">número atómico (Z)</span> representa la
                      cantidad de protones en el núcleo de un átomo, que también equivale al número de electrones en un
                      átomo neutro.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-blue-800">Ejemplos Comunes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="font-medium">Hidrógeno (H)</span>
                            <Badge className="bg-blue-600">Z = 1</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="font-medium">Carbono (C)</span>
                            <Badge className="bg-blue-600">Z = 6</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="font-medium">Oxígeno (O)</span>
                            <Badge className="bg-blue-600">Z = 8</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <span className="font-medium">Hierro (Fe)</span>
                            <Badge className="bg-blue-600">Z = 26</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-green-800">Importancia</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-800">Identidad del elemento</p>
                              <p className="text-sm text-gray-600">Determina qué elemento es</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-800">Posición en la tabla</p>
                              <p className="text-sm text-gray-600">Define su ubicación periódica</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-800">Propiedades químicas</p>
                              <p className="text-sm text-gray-600">Influye en su comportamiento</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Dato Importante
                  </h4>
                  <p className="text-amber-700">
                    El número atómico es único para cada elemento. No pueden existir dos elementos diferentes con el
                    mismo número atómico, ya que esto determina completamente la identidad química del elemento.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenido: Números Cuánticos */}
          <TabsContent value="numeros-cuanticos" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Números Cuánticos
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Descripción completa del estado de los electrones en los átomos
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700">
                      Los <span className="font-semibold text-blue-700">números cuánticos</span> son valores que
                      describen las propiedades de los electrones en los átomos y determinan su ubicación y energía.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-purple-800">
                          <Badge className="bg-purple-600 text-white">n</Badge>
                          Número Cuántico Principal
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-gray-700">
                            <span className="font-semibold">Función:</span> Determina el nivel de energía principal
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Valores:</span> 1, 2, 3, 4, 5, 6, 7...
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Significado:</span> A mayor valor, mayor energía y distancia
                            del núcleo
                          </p>
                          <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm font-medium text-purple-700">
                              Ejemplo: n = 2 (segundo nivel de energía)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-blue-800">
                          <Badge className="bg-blue-600 text-white">l</Badge>
                          Número Cuántico Azimutal
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-gray-700">
                            <span className="font-semibold">Función:</span> Determina la forma del orbital
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Valores:</span> 0 a (n-1)
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Correspondencia:</span> s(0), p(1), d(2), f(3)
                          </p>
                          <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-700">Ejemplo: l = 1 (orbital tipo p)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-green-800">
                          <Badge className="bg-green-600 text-white">ml</Badge>
                          Número Cuántico Magnético
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-gray-700">
                            <span className="font-semibold">Función:</span> Determina la orientación del orbital
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Valores:</span> -l a +l
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Significado:</span> Define subniveles específicos
                          </p>
                          <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm font-medium text-green-700">Ejemplo: ml = -1, 0, +1 (para l = 1)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-red-800">
                          <Badge className="bg-red-600 text-white">ms</Badge>
                          Número Cuántico de Spin
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-gray-700">
                            <span className="font-semibold">Función:</span> Representa el giro del electrón
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Valores:</span> +1/2 o -1/2
                          </p>
                          <p className="text-gray-700">
                            <span className="font-semibold">Significado:</span> Momento magnético del electrón
                          </p>
                          <div className="bg-white p-3 rounded-lg">
                            <p className="text-sm font-medium text-red-700">Ejemplo: ms = +1/2 (spin hacia arriba)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contenido: Niveles de Energía */}
          <TabsContent value="niveles-energia" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Orbit className="h-5 w-5" />
                  Niveles de Energía
                </CardTitle>
                <CardDescription className="text-green-100">
                  Organización de los electrones en capas energéticas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700">
                      Los <span className="font-semibold text-green-700">niveles de energía</span> representan las
                      distancias a las que los electrones orbitan alrededor del núcleo, organizados en capas.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                          <th className="border border-green-400 p-4 text-left font-semibold">Nivel (n)</th>
                          <th className="border border-green-400 p-4 text-left font-semibold">Nombre</th>
                          <th className="border border-green-400 p-4 text-left font-semibold">Máx. Electrones</th>
                          <th className="border border-green-400 p-4 text-left font-semibold">Subniveles</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-green-50 transition-colors">
                          <td className="border border-green-200 p-4 font-semibold text-green-700">1</td>
                          <td className="border border-green-200 p-4">K</td>
                          <td className="border border-green-200 p-4">2</td>
                          <td className="border border-green-200 p-4">
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              1s
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 transition-colors">
                          <td className="border border-green-200 p-4 font-semibold text-green-700">2</td>
                          <td className="border border-green-200 p-4">L</td>
                          <td className="border border-green-200 p-4">8</td>
                          <td className="border border-green-200 p-4 space-x-1">
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              2s
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              2p
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 transition-colors">
                          <td className="border border-green-200 p-4 font-semibold text-green-700">3</td>
                          <td className="border border-green-200 p-4">M</td>
                          <td className="border border-green-200 p-4">18</td>
                          <td className="border border-green-200 p-4 space-x-1">
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              3s
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              3p
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              3d
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 transition-colors">
                          <td className="border border-green-200 p-4 font-semibold text-green-700">4</td>
                          <td className="border border-green-200 p-4">N</td>
                          <td className="border border-green-200 p-4">32</td>
                          <td className="border border-green-200 p-4 space-x-1">
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              4s
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              4p
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              4d
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              4f
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 transition-colors">
                          <td className="border border-green-200 p-4 font-semibold text-green-700">5</td>
                          <td className="border border-green-200 p-4">O</td>
                          <td className="border border-green-200 p-4">50</td>
                          <td className="border border-green-200 p-4 space-x-1">
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              5s
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              5p
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              5d
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              5f
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 transition-colors">
                          <td className="border border-green-200 p-4 font-semibold text-green-700">6</td>
                          <td className="border border-green-200 p-4">P</td>
                          <td className="border border-green-200 p-4">72</td>
                          <td className="border border-green-200 p-4 space-x-1">
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              6s
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              6p
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              6d
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              6f
                            </Badge>
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 transition-colors">
                          <td className="border border-green-200 p-4 font-semibold text-green-700">7</td>
                          <td className="border border-green-200 p-4">Q</td>
                          <td className="border border-green-200 p-4">98</td>
                          <td className="border border-green-200 p-4 space-x-1">
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              7s
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              7p
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              7d
                            </Badge>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              7f
                            </Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Regla de Capacidad
                    </h4>
                    <p className="text-blue-700">
                      La capacidad máxima de electrones en cada nivel se calcula con la fórmula:{" "}
                      <span className="font-mono bg-white px-2 py-1 rounded">2n²</span>
                      <br />
                      Por ejemplo: Nivel 3 → 2(3)² = 2(9) = 18 electrones máximo
                    </p>
                  </div>
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
            <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
              Siguiente Tema
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
