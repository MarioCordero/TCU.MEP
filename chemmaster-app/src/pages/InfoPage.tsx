import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import {
  Atom, X, FlaskConical, Calculator, Eye, BookOpen, Target, Sparkles, 
  Users, Trophy, Clock, Play
} from 'lucide-react'

export default function InfoPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')} 
                className="hover:bg-purple-100"
              >
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
            La plataforma educativa más avanzada para el aprendizaje de química en secundaria.
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
                Modelos interactivos para una comprensión visual completa.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl w-fit mx-auto mb-3">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Calculadoras</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm text-center">
                Herramientas avanzadas para cálculos químicos especializados.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center pb-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl w-fit mx-auto mb-3">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Visualizadores</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm text-center">
                Representaciones gráficas de estructuras moleculares.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Listo para comenzar?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl"
              onClick={() => navigate('/grade-10')}
            >
              <Play className="mr-3 h-6 w-6" />
              Comenzar Ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}