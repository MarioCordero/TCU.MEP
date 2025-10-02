import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { X, Plus, Trash2, Search, Settings, ChevronDown, ChevronRight, Download, Upload } from "lucide-react"
import type { CMSData, CMSModule, CMSEditMode } from "../types/cms"
import { CMSModuleEditor } from "./cms/ModuleEditor"
import { getApiUrl } from "../config/api"

interface CMSPageProps {
  onClose: () => void
}

const CMSPage = ({ onClose }: CMSPageProps) => {

  // ---------------------------- CONSTANTS & STATES ----------------------------
  const [selectedModule, setSelectedModule] = useState<string | number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [expandedSubmodules, setExpandedSubmodules] = useState<Set<string>>(new Set())
  const [selectedSubmodule, setSelectedSubmodule] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<CMSEditMode>("view")
  const [showSuccess, setShowSuccess] = useState(false)

  const [cmsData, setCMSData] = useState<CMSData>({
    modules: [],
    lastUpdated: new Date().toISOString(),
  })

  const handleDataChange = (newData: CMSData) => {
    setCMSData(newData)
    setHasUnsavedChanges(true)
  }

  // Add a new module
  const addNewModule = () => {
    const newModule: CMSModule = {
      id: `module-${Date.now()}`,
      module_id: `new-module-${Date.now()}`,
      title: "Nuevo Módulo",
      description: "Descripción del nuevo módulo",
      icon: "BookOpen",
      color: "from-gray-500 to-gray-600",
      grade: "10",
      order: cmsData.modules.length + 1,
      isActive: true,
      features: [],
      tools: [],
      submodules: [],
    }

    const newData = {
      ...cmsData,
      modules: [...cmsData.modules, newModule],
      lastUpdated: new Date().toISOString(),
    }
    handleDataChange(newData)
    setSelectedModule(newModule.id)
    setEditMode("edit")
  }

  const filteredModules = cmsData.modules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // ---------------------------- EFFECTS & HELPERS ----------------------------
  useEffect(() => {
    fetch(getApiUrl("cmsData.php"))
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.success && data.cmsData) {
          const normalizedModules = data.cmsData.modules.map(normalizeModule);
          setCMSData({ ...data.cmsData, modules: normalizedModules });
        }
      })
      .catch(error => {
        console.error('Error fetching CMS data:', error);
      });
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        setHasUnsavedChanges(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [cmsData, hasUnsavedChanges])

  // Helper to normalize modules
  function normalizeModule(module: CMSModule): CMSModule {
    const normalized = {
      ...module,
      features: Array.isArray(module.features) ? module.features : [],
      tools: Array.isArray(module.tools) ? module.tools : [],
      topics: Array.isArray(module.topics) ? module.topics : [],
      grade: module.grade_level || module.grade,
      isActive: module.active === 1 || module.active === "1" || module.active === true
    };

    return normalized;
  }

  const refreshCMSData = async () => {
    try {
      const response = await fetch(getApiUrl("cmsData.php"));
      const data = await response.json();
      if (data.success && data.cmsData) {
        const normalizedModules = data.cmsData.modules.map(normalizeModule);
        setCMSData({ ...data.cmsData, modules: normalizedModules });
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

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

          {/* Actions */}
          <div className="flex gap-2 mt-4 bg-black rounded text-white">
            <Button size="sm" onClick={addNewModule} className="flex-1 cursor-pointer">
              <Plus className="h-4 w-4 mr-1" />
              Módulo
            </Button>
          </div>

          {hasUnsavedChanges && (
            <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              Guardando cambios...
            </div>
          )}
        </div>

        {/* Modules */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredModules.map((module) => (
            <div key={module.id} className="mb-2">
              {/* Module */}
              <div
                className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer ${
                  selectedModule === module.id ? "bg-blue-100" : ""
                }`}
                onClick={() => {
                  setSelectedModule(module.id)
                  setSelectedSubmodule(null)
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {module.grade_level ? `${module.grade_level}°` : "Sin grado"}
                    </Badge>
                    <span className="text-sm font-medium truncate">{module.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        {selectedModule ? (
          <CMSModuleEditor
            key={String(selectedModule)}
            module={cmsData.modules.find((m) => m.id === selectedModule)!}
            onSave={async (updatedModule) => {
              const newData = {
                ...cmsData,
                modules: cmsData.modules.map((module) => (module.id === selectedModule ? updatedModule : module)),
                lastUpdated: new Date().toISOString(),
              }
              setCMSData(newData)
              
              try {
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 2000)
                
                setTimeout(async () => {
                  await refreshCMSData();
                }, 1000);
                
              } catch (err) {
                alert("Error al guardar en el servidor")
                console.error(err)
              }
            }}
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
                  <div className="font-semibold">{cmsData.modules.length}</div>
                  <div>Módulos</div>
                </div>
                <div>
                  <div className="font-semibold">
                    {cmsData.modules.reduce(
                      (acc, m) => acc + (Array.isArray(m.topics) ? m.topics.length : 0),
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
          ¡Módulo guardado exitosamente!
        </div>
      )}
    </div>
  )
}

export default CMSPage