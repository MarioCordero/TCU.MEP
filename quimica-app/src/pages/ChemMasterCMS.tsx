"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { X, Plus, Trash2, Search, Settings, ChevronDown, ChevronRight, Download, Upload } from "lucide-react"
import type { CMSData, CMSModule, CMSSubmodule, CMSTopic, CMSEditMode } from "../types/cms"
import { CMSModuleEditor } from "./cms/ModuleEditor"
import { CMSTopicEditor } from "./cms/TopicEditor"

interface CMSPageProps {
  onClose: () => void
}

const CMSPage = ({ onClose }: CMSPageProps) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedSubmodule, setSelectedSubmodule] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<CMSEditMode>("view")
  const [searchQuery, setSearchQuery] = useState("")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())
  const [expandedSubmodules, setExpandedSubmodules] = useState<Set<string>>(new Set())

  const [cmsData, setCMSData] = useState<CMSData>({
    modules: [],
    lastUpdated: new Date().toISOString(),
  })

  useEffect(() => {
  fetch("http://chemmaster.com/API/cmsData.php") // LOCAL
    .then(res => res.json())
    .then(data => {
      if (data.success && data.cmsData) {
        console.log("CMS data loaded:", data.cmsData)
        setCMSData(data.cmsData)
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

  const handleDataChange = (newData: CMSData) => {
    setCMSData(newData)
    setHasUnsavedChanges(true)
  }

  const toggleModuleExpansion = (moduleId: string) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const toggleSubmoduleExpansion = (submoduleId: string) => {
    const newExpanded = new Set(expandedSubmodules)
    if (newExpanded.has(submoduleId)) {
      newExpanded.delete(submoduleId)
    } else {
      newExpanded.add(submoduleId)
    }
    setExpandedSubmodules(newExpanded)
  }

  const addNewModule = () => {
    const newModule: CMSModule = {
      id: `module-${Date.now()}`,
      title: "Nuevo Módulo",
      description: "Descripción del nuevo módulo",
      icon: "BookOpen",
      color: "from-gray-500 to-gray-600",
      grade: "10",
      difficulty: "Básico",
      estimatedTime: "1-2 horas",
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

  const addNewSubmodule = (moduleId: string) => {
    const newSubmodule: CMSSubmodule = {
      id: `submodule-${Date.now()}`,
      title: "Nuevo Submódulo",
      description: "Descripción del nuevo submódulo",
      icon: "Folder",
      order: 1,
      isActive: true,
      topics: [],
    }

    const newData = {
      ...cmsData,
      modules: cmsData.modules.map((module) =>
        module.id === moduleId ? { ...module, submodules: [...module.submodules, newSubmodule] } : module,
      ),
      lastUpdated: new Date().toISOString(),
    }
    handleDataChange(newData)
    setSelectedSubmodule(newSubmodule.id)
    setEditMode("edit")
  }

  const addNewTopic = (moduleId: string, submoduleId: string) => {
    const newTopic: CMSTopic = {
      id: `topic-${Date.now()}`,
      title: "Nuevo Tema",
      description: "Descripción del nuevo tema",
      content: "Contenido del nuevo tema...",
      icon: "FileText",
      difficulty: "Básico",
      estimatedTime: "15 min",
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const newData = {
      ...cmsData,
      modules: cmsData.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              submodules: module.submodules.map((submodule) =>
                submodule.id === submoduleId ? { ...submodule, topics: [...submodule.topics, newTopic] } : submodule,
              ),
            }
          : module,
      ),
      lastUpdated: new Date().toISOString(),
    }
    handleDataChange(newData)
    setSelectedTopic(newTopic.id)
    setEditMode("edit")
  }

  const deleteModule = (moduleId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este módulo?")) {
      const newData = {
        ...cmsData,
        modules: cmsData.modules.filter((module) => module.id !== moduleId),
        lastUpdated: new Date().toISOString(),
      }
      handleDataChange(newData)
      if (selectedModule === moduleId) {
        setSelectedModule(null)
      }
    }
  }

  const deleteSubmodule = (moduleId: string, submoduleId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este submódulo?")) {
      const newData = {
        ...cmsData,
        modules: cmsData.modules.map((module) =>
          module.id === moduleId
            ? { ...module, submodules: module.submodules.filter((sub) => sub.id !== submoduleId) }
            : module,
        ),
        lastUpdated: new Date().toISOString(),
      }
      handleDataChange(newData)
      if (selectedSubmodule === submoduleId) {
        setSelectedSubmodule(null)
      }
    }
  }

  const deleteTopic = (moduleId: string, submoduleId: string, topicId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este tema?")) {
      const newData = {
        ...cmsData,
        modules: cmsData.modules.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                submodules: module.submodules.map((submodule) =>
                  submodule.id === submoduleId
                    ? { ...submodule, topics: submodule.topics.filter((topic) => topic.id !== topicId) }
                    : submodule,
                ),
              }
            : module,
        ),
        lastUpdated: new Date().toISOString(),
      }
      handleDataChange(newData)
      if (selectedTopic === topicId) {
        setSelectedTopic(null)
      }
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(cmsData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `chemmaster-cms-data-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string)
          setCMSData(importedData)
          setHasUnsavedChanges(true)
        } catch (error) {
          alert("Error al importar el archivo. Verifica que sea un JSON válido.")
        }
      }
      reader.readAsText(file)
    }
  }

  const filteredModules = cmsData.modules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">

      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">CMS ChemMaster</h1>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
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
          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={addNewModule} className="flex-1">
              <Plus className="h-4 w-4 mr-1" />
              Módulo
            </Button>
            <Button size="sm" variant="outline" onClick={exportData}>
              <Download className="h-4 w-4" />
            </Button>
            <label className="cursor-pointer">
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4" />
              </Button>
              <input type="file" accept=".json" onChange={importData} className="hidden" />
            </label>
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
          <CMSModuleEditor
            module={cmsData.modules.find((m) => m.id === selectedModule)!}
            onSave={(updatedModule) => {
              const newData = {
                ...cmsData,
                modules: cmsData.modules.map((module) => (module.id === selectedModule ? updatedModule : module)),
                lastUpdated: new Date().toISOString(),
              }
              handleDataChange(newData)
            }}
          />
        ) : (
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
        )}
      </div>
      {/* MAIN CONTENT */}
      
    </div>
  )
}

export default CMSPage