import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { SearchBar } from '../../components/ui/searchbar'
import { getApiUrl } from "../../lib/api"
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

const ICONS = {
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
};

type Feature = {
  name: string;
  icon: keyof typeof ICONS;
  description: string;
};

type Module = {
  id: number;
  module_id: string;
  grade_level: string;
  title: string;
  description: string;
  icon: keyof typeof ICONS;
  color: string;
  difficulty?: string;
  features: Feature[];
  tools: string[];
};

export default function GradeTenPage() {
  const navigate = useNavigate()
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(getApiUrl("cmsData.php"))
      .then(res => res.json())
      .then(data => {
        if (data.success) setModules(data.modules)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
        {loading ? (
          <div className="text-center py-12">Cargando módulos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = ICONS[module.icon];
              return (
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
                        {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
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
              );
            })}
          </div>
        )}

        {/* Module Detail Modal */}
        {selectedModule !== null && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              {(() => {
                const module = modules.find((mod) => mod.id === selectedModule)
                if (!module) return null
                const IconComponent = ICONS[module.icon];
                return (
                  <div>
                    <div className={`bg-gradient-to-r ${module.color} text-white p-6 rounded-t-2xl`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {IconComponent && <IconComponent className="h-8 w-8" />}
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
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Lo que deberás aprender</h3>
                          <div className="space-y-3">
                            {module.features.map((feature: Feature, index: number) => {
                              const FeatureIcon = ICONS[feature.icon];
                              return (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="p-2 bg-gray-200 rounded-lg">
                                    {FeatureIcon ? <FeatureIcon className="h-4 w-4 text-gray-600" /> : null}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-800">{feature.name}</div>
                                    <div className="text-sm text-gray-600">{feature.description}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">Herramientas Incluidas</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {module.tools.map((tool: string, index: number) => (
                              <div key={index} className="p-3 bg-purple-50 rounded-lg text-center">
                                <div className="text-sm font-medium text-purple-800">{tool}</div>
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