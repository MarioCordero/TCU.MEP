import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { X, Plus, Trash2, Search, Settings, ChevronDown, ChevronRight, Download, Upload } from "lucide-react"
import type { CMSData, CMSModule, CMSSubmodule, CMSTopic, CMSEditMode } from "../types/cms"
import { CMSModuleEditor } from "./cms/ModuleEditor"
import { CMSTopicEditor } from "./cms/[ ]TopicEditor"

interface CMSPageProps {
  onClose: () => void
}

const CMSPage = ({ onClose }: CMSPageProps) => {

  // ---------------------------- CONSTANTS & STATES ----------------------------
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
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

  // Toggle module expansion
  const toggleModuleExpansion = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  // Toggle submodule expansion
  const toggleSubmoduleExpansion = (submoduleId: string) => {
    const newExpanded = new Set(expandedSubmodules)
    if (newExpanded.has(submoduleId)) {
      newExpanded.delete(submoduleId)
    } else {
      newExpanded.add(submoduleId)
    }
    setExpandedSubmodules(newExpanded)
  }

    // Add a new module
  const addNewModule = () => {
    const newModule: CMSModule = {
      id: `module-${Date.now()}`,
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

  // ---------------------------- CONSTANTS & STATES ----------------------------

  // ---------------------------- EFFECTS & HELPERS ----------------------------
  useEffect(() => {
    fetch("http://chemmaster.com/API/cmsData.php")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.cmsData) {
          // Normalize modules
          const normalizedModules = data.cmsData.modules.map(normalizeModule)
          setCMSData({ ...data.cmsData, modules: normalizedModules })
        }
      })
      .catch(() => {
        // Handle error (optional)
      })
  }, [])

  // Auto-save functionality (simulated)
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        console.log("Auto-saving changes...", cmsData)
        setHasUnsavedChanges(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [cmsData, hasUnsavedChanges])

  // ---------------------------- EFFECTS & HELPERS ----------------------------

  // Helper to normalize modules
  function normalizeModule(module: CMSModule): CMSModule {
    return {
      ...module,
      features: Array.isArray(module.features) ? module.features : [],
      tools: Array.isArray(module.tools) ? module.tools : [],
      submodules: Array.isArray(module.submodules) ? module.submodules : [],
      grade: module.grade_level || module.grade,
      // FIX: Proper normalization that handles all cases
      isActive: Boolean(
        module.isActive !== undefined ? module.isActive : 
        (module.active === 1 || module.active === "1" || module.active === true)
      )
    }
  }

  const refreshCMSData = async () => {
    try {
      const response = await fetch("http://chemmaster.com/API/cmsData.php");
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
                  setSelectedTopic(null)
                }}
              >
                {/* Removed arrow and + button */}
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
      {/* SIDEBAR */}

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        {selectedTopic ? (
          <CMSTopicEditor
            topic={
              cmsData.modules
                .flatMap((m) => m.submodules)
                .flatMap((s) => s.topics)
                .find((t) => t.id === selectedTopic)!
            }
            onSave={(updatedTopic) => {
              const newData = {
                ...cmsData,
                modules: cmsData.modules.map((module) => ({
                  ...module,
                  submodules: module.submodules.map((submodule) => ({
                    ...submodule,
                    topics: submodule.topics.map((topic) => (topic.id === selectedTopic ? updatedTopic : topic)),
                  })),
                })),
              }
              handleDataChange(newData)
            }}
          />
        ) : selectedModule ? (
          // Module Editor
          <CMSModuleEditor
            key={selectedModule} // Remove timestamp from key
            module={cmsData.modules.find((m) => m.id === selectedModule)!}
            onSave={async (updatedModule) => {
              // Update local state immediately
              const newData = {
                ...cmsData,
                modules: cmsData.modules.map((module) => (module.id === selectedModule ? updatedModule : module)),
                lastUpdated: new Date().toISOString(),
              }
              setCMSData(newData) // Don't use handleDataChange to avoid the hasUnsavedChanges flag
              
              // Save to server but don't refresh immediately
              try {
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 2000)
                
                // Optional: Refresh after a delay to ensure DB consistency
                setTimeout(async () => {
                  await refreshCMSData();
                }, 1000);
                
              } catch (err) {
                alert("Error al guardar en el servidor")
                console.error(err)
              }
            }}
          />
          // Module Editor
        ) : (
          // When nothing is selected
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Sistema de Gestión de Contenido</h2>
              <p className="text-gray-500 max-w-md">
                Selecciona un módulo, submódulo o tema del panel izquierdo para comenzar a editar el contenido.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <div className="font-semibold">{cmsData.modules.length}</div>
                  <div>Módulos</div>
                </div>
                <div>
                  <div className="font-semibold">
                    {cmsData.modules.reduce(
                      (acc, m) => acc + (Array.isArray(m.submodules) ? m.submodules.length : 0),
                      0
                    )}
                  </div>
                  <div>Submódulos</div>
                </div>
                <div>
                  <div className="font-semibold">
                    {cmsData.modules.reduce(
                      (acc, m) =>
                        acc +
                        (Array.isArray(m.submodules)
                          ? m.submodules.reduce(
                              (subAcc, s) =>
                                subAcc + (Array.isArray(s.topics) ? s.topics.length : 0),
                              0
                            )
                          : 0),
                      0
                    )}
                  </div>
                  <div>Temas</div>
                </div>
              </div>
            </div>
          </div>
          // When nothing is selected
        )}
      </div>
      {/* MAIN CONTENT */}

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