import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Plus, Search, Settings } from "lucide-react"
import type { CMSEditMode, Module, AllContentResponse } from "../types/cms"
import { CMSModuleEditor } from "./cms/ModuleEditor"
import { API } from "../lib/api"

interface CMSPageProps {
  onClose: () => void
}

const CMSPage = ({ onClose }: CMSPageProps) => {

  // ---------------------------- CONSTANTS & STATES ----------------------------
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [editMode, setEditMode] = useState<CMSEditMode>("view")
  const [showSuccess, setShowSuccess] = useState(false)

  const [cmsData, setCMSData] = useState<AllContentResponse>({
    modules: [],
    lastUpdated: new Date().toISOString(),
    total_modules: 0,
  })

  // Fetch all content on mount
  useEffect(() => {
    loadCMSData()
  }, [])

  const loadCMSData = async () => {
    try {
      setIsLoading(true)
      const data = await API.GetAllContent()
      setCMSData(data)
    } catch (error) {
      console.error("Error fetching CMS data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredModules = cmsData.modules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedModule = cmsData.modules.find((m) => m.id === selectedModuleId)

  const handleModuleUpdate = async (updatedModule: Module) => {
    try {
      // Update via API
      await API.UpdateModule(updatedModule.id, updatedModule)

      // Update local state
      setCMSData((prev) => ({
        ...prev,
        modules: prev.modules.map((m) => (m.id === updatedModule.id ? updatedModule : m)),
        lastUpdated: new Date().toISOString(),
      }))

      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (error) {
      console.error("Error updating module:", error)
      alert("Error al guardar el módulo en el servidor")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">

      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">CMS ChemMaster</h1>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar módulos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="mt-4 text-xs text-gray-500">
            {cmsData.total_modules} módulos disponibles
          </div>
        </div>

        {/* Modules List */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <div className="text-center text-gray-400 py-8">Cargando módulos...</div>
          ) : filteredModules.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No se encontraron módulos</div>
          ) : (
            filteredModules.map((module) => (
              <div
                key={module.id}
                className={`flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 mb-2 cursor-pointer transition ${
                  selectedModuleId === module.id ? "bg-blue-100 border-l-4 border-blue-500" : ""
                }`}
                onClick={() => setSelectedModuleId(module.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {module.grade_level}°
                    </Badge>
                    {!module.active && (
                      <Badge variant="secondary" className="text-xs bg-gray-200">
                        Inactivo
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium truncate">{module.title}</p>
                  <p className="text-xs text-gray-500 truncate">{module.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        {selectedModule ? (
          <CMSModuleEditor
            key={selectedModule.id}
            module={selectedModule}
            onSave={handleModuleUpdate}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Sistema de Gestión de Contenido</h2>
              <p className="text-gray-500 max-w-md">
                Selecciona un módulo del panel izquierdo para comenzar a editar el contenido y sus temas.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <div className="font-semibold">{cmsData.total_modules}</div>
                  <div>Módulos</div>
                </div>
                <div>
                  <div className="font-semibold">
                    {cmsData.modules.reduce(
                      (acc, m) => acc + (m.topics?.length || 0),
                      0
                    )}
                  </div>
                  <div>Temas</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition">
          ¡Cambios guardados exitosamente!
        </div>
      )}
    </div>
  )
}

export default CMSPage