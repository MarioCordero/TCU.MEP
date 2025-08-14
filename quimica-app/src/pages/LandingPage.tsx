import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Atom, Play, Info } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

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
            Aprende química de forma divertida e interactiva con videos educativos, quices interactivos y laboratorios virtuales. Diseñado específicamente para estudiantes de 10° y 11° grado.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => navigate('/grade-selector')}
          >
            <Play className="mr-3 h-6 w-6" />
            Comenzar
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={() => navigate('/info')}
          >
            <Info className="mr-3 h-6 w-6" />
            Más Información
          </Button>
        </div>
        {/* Footer or quick stats if we want */}
      </div>
    </div>
  )
}