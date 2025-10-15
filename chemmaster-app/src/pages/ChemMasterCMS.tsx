import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { X, Plus, Trash2, Search, Settings, ChevronDown, ChevronRight, Download, Upload } from "lucide-react"
import type { CMSData, CMSModule, CMSEditMode } from "../types/cms"
import { getApiUrl } from "../config/api"

// Components
import { ModuleSidebar } from "./cms/ModuleSidebar"
import { ModuleEditor } from "./cms/ModuleEditor"
import { TopicEditor } from "./cms/TopicEditor"

interface CMSPageProps {
  onClose: () => void
}

type EditorView = "module" | "topic"

const CMSPage = ({ onClose }: CMSPageProps) => {
  const [selectedModule, setSelectedModule] = useState<string | number | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | number | null>(null)
  const [editorView, setEditorView] = useState<EditorView>("module")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [cmsData, setCMSData] = useState<CMSData>({
    modules: [],
    lastUpdated: new Date().toISOString(),
  })

  useEffect(() => {
    fetch(getApiUrl("cmsData.php"))
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCMSData(data.cmsData);
      })
      .catch(error => {
        console.error('Error fetching CMS data:', error);
      });
  }, []);

  // Handler to switch to topic editor
  const handleTopicSelect = (topicId: string | number) => {
    setSelectedTopic(topicId)
    setEditorView("topic")
  }

  // Handler to switch back to module editor
  const handleBackToModule = () => {
    setEditorView("module")
    setSelectedTopic(null)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">CMS ChemMaster</h1>
          </div>
        </div>
        <ModuleSidebar
          modules={cmsData.modules}
          onModuleSelect={id => {
            setSelectedModule(id)
            setEditorView("module")
          }}
          showAddModule={true}
          showSaving={hasUnsavedChanges}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        {selectedModule ? (
          editorView === "module" ? (
            <ModuleEditor
              module={cmsData.modules.find((m) => m.id === selectedModule)!}
              onEditTopic={handleTopicSelect}
              onSave={async (updatedModule: CMSModule) => {
                const newData = {
                  ...cmsData,
                  modules: cmsData.modules.map((module) => (module.id === selectedModule ? updatedModule : module)),
                  lastUpdated: new Date().toISOString(),
                }
                setCMSData(newData)
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 2000)
              }}
            />
          ) : (
            <TopicEditor
              topic={cmsData.modules
                .find((m) => m.id === selectedModule)
                ?.topics.find((t) => t.id === selectedTopic)}
              onBack={handleBackToModule}
              onSave={async (updatedTopic) => {
                const updatedModules = cmsData.modules.map((module) => {
                  if (module.id === selectedModule) {
                    return {
                      ...module,
                      topics: module.topics.map((topic) =>
                        topic.id === updatedTopic.id ? updatedTopic : topic
                      ),
                    }
                  }
                  return module
                })
                setCMSData({
                  ...cmsData,
                  modules: updatedModules,
                  lastUpdated: new Date().toISOString(),
                })
                setShowSuccess(true)
                setTimeout(() => setShowSuccess(false), 2000)
                setEditorView("module")
              }}
            />
          )
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Sistema de Gestión de Contenido</h2>
              <p className="text-gray-500 max-w-md">
                Selecciona un módulo del panel izquierdo para comenzar a editar el contenido y sus temas.
              </p>
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