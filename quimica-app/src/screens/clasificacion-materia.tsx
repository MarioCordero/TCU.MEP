"use client"

import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Beaker,
  FlaskRoundIcon as Flask,
  Droplet,
  ArrowRight,
  Play,
  Microscope,
  Atom,
  Waves,
} from "lucide-react"

export default function ClasificacionMateria() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Barra de navegación */}
      <nav className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600" onClick={() => navigate('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Beaker className="h-6 w-6" />
              <h1 className="text-lg font-bold">Clasificación de la Materia</h1>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/10 text-white border-0">
            Tema 2
          </Badge>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Encabezado de la sección */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-2">Clasificación de la Materia</h1>
            <p className="text-blue-100">
              Descubre cómo se organiza y clasifica la materia según su composición y propiedades.
            </p>
          </div>
        </div>

        {/* Diagrama de clasificación */}
        <div className="mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-t-lg">
              <CardTitle>Esquema de Clasificación</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg inline-block mb-6">
                  <h3 className="text-xl font-bold">MATERIA</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Sustancias Puras */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg">
                      <h4 className="font-semibold">SUSTANCIAS PURAS</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-green-100 border border-green-300 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Atom className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">Elementos</span>
                        </div>
                        <p className="text-sm text-green-700">H₂, O₂, Fe, Au</p>
                      </div>
                      <div className="bg-green-100 border border-green-300 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Flask className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">Compuestos</span>
                        </div>
                        <p className="text-sm text-green-700">H₂O, CO₂, NaCl</p>
                      </div>
                    </div>
                  </div>

                  {/* Mezclas */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg">
                      <h4 className="font-semibold">MEZCLAS</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-blue-100 border border-blue-300 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplet className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800">Homogéneas</span>
                        </div>
                        <p className="text-sm text-blue-700">Soluciones, aleaciones</p>
                      </div>
                      <div className="bg-blue-100 border border-blue-300 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Microscope className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800">Heterogéneas</span>
                        </div>
                        <p className="text-sm text-blue-700">Granito, ensalada</p>
                      </div>
                      <div className="bg-blue-100 border border-blue-300 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Waves className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800">Coloides</span>
                        </div>
                        <p className="text-sm text-blue-700">Leche, gelatina</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido detallado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sustancias Puras */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Flask className="h-5 w-5" />
                Sustancias Puras
              </CardTitle>
              <CardDescription className="text-green-100">
                Composición química definida y propiedades constantes
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="elementos">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Atom className="h-4 w-4 text-green-600" />
                      Elementos
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-green-50 rounded-lg space-y-3">
                      <div>
                        <span className="font-semibold text-green-800">Definición:</span>
                        <p className="text-gray-700 mt-1">
                          Sustancias que no pueden descomponerse en sustancias más simples mediante procesos químicos
                          ordinarios.
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800">Ejemplos:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-green-600">Hierro (Fe)</Badge>
                          <Badge className="bg-green-600">Oxígeno (O₂)</Badge>
                          <Badge className="bg-green-600">Oro (Au)</Badge>
                          <Badge className="bg-green-600">Hidrógeno (H₂)</Badge>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800">Características:</span>
                        <p className="text-gray-700 mt-1">
                          Están formados por átomos del mismo tipo y se representan mediante símbolos químicos.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="compuestos">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Flask className="h-4 w-4 text-green-600" />
                      Compuestos
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-green-50 rounded-lg space-y-3">
                      <div>
                        <span className="font-semibold text-green-800">Definición:</span>
                        <p className="text-gray-700 mt-1">
                          Sustancias formadas por la unión química de dos o más elementos en proporciones fijas.
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800">Ejemplos:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-green-600">Agua (H₂O)</Badge>
                          <Badge className="bg-green-600">Dióxido de carbono (CO₂)</Badge>
                          <Badge className="bg-green-600">Cloruro de sodio (NaCl)</Badge>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800">Características:</span>
                        <p className="text-gray-700 mt-1">
                          Tienen propiedades diferentes a las de los elementos que los componen y se representan
                          mediante fórmulas químicas.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Mezclas */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-5 w-5" />
                Mezclas
              </CardTitle>
              <CardDescription className="text-blue-100">
                Combinación de dos o más sustancias que conservan sus propiedades
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="homogeneas">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-blue-600" />
                      Homogéneas
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                      <div>
                        <span className="font-semibold text-blue-800">Definición:</span>
                        <p className="text-gray-700 mt-1">
                          Mezclas con composición uniforme donde no se distinguen sus componentes.
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-800">Ejemplos:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-blue-600">Soluciones salinas</Badge>
                          <Badge className="bg-blue-600">Aleaciones metálicas</Badge>
                          <Badge className="bg-blue-600">Aire filtrado</Badge>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-800">Características:</span>
                        <p className="text-gray-700 mt-1">
                          Una sola fase visible, propiedades uniformes en toda la mezcla.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="heterogeneas">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Microscope className="h-4 w-4 text-blue-600" />
                      Heterogéneas
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                      <div>
                        <span className="font-semibold text-blue-800">Definición:</span>
                        <p className="text-gray-700 mt-1">
                          Mezclas con composición no uniforme donde se pueden distinguir sus componentes.
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-800">Ejemplos:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-blue-600">Granito</Badge>
                          <Badge className="bg-blue-600">Ensalada</Badge>
                          <Badge className="bg-blue-600">Agua con aceite</Badge>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-800">Características:</span>
                        <p className="text-gray-700 mt-1">
                          Múltiples fases visibles, propiedades variables según la región de la mezcla.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="coloides">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Waves className="h-4 w-4 text-blue-600" />
                      Coloides
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                      <div>
                        <span className="font-semibold text-blue-800">Definición:</span>
                        <p className="text-gray-700 mt-1">
                          Mezclas donde partículas de tamaño intermedio (1-1000 nm) están dispersas en un medio
                          continuo.
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-800">Ejemplos:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className="bg-blue-600">Leche</Badge>
                          <Badge className="bg-blue-600">Gelatina</Badge>
                          <Badge className="bg-blue-600">Mayonesa</Badge>
                          <Badge className="bg-blue-600">Niebla</Badge>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-blue-800">Características:</span>
                        <p className="text-gray-700 mt-1">
                          Efecto Tyndall (dispersión de la luz), movimiento browniano, estabilidad relativa.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

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
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              Siguiente Tema
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}