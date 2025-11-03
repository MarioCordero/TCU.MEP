import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import type { CMSData, CMSModule, Topic } from "../types/cms";
import { getApiUrl } from "../config/api";
import { ModuleSidebar } from "./cms/ModuleSidebar";
import { CMSModuleEditor } from "./cms/ModuleEditor";
import { TopicEditor } from "./cms/TopicEditor";

type EditorView = "module" | "topic";

const ChemMasterCMS = ({ onClose }: { onClose: () => void }) => {
  const [cmsData, setCMSData] = useState<CMSData>({
    modules: [],
    lastUpdated: new Date().toISOString(),
  });
  const [selectedModuleId, setSelectedModuleId] = useState<string | number | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [editorView, setEditorView] = useState<EditorView>("module");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch(getApiUrl("cmsData.php"))
      .then(response => response.json())
      .then(data => setCMSData(data.cmsData))
      .catch(error => console.error('Error fetching CMS data:', error));
  }, []);

  // Orquestador: decide qué editor mostrar
  const selectedModule = cmsData.modules.find(m => m.id === selectedModuleId) || null;
  const selectedTopic = selectedModule?.topics?.find(t => t.id === selectedTopicId) || null;

  // Guardar módulo
  const handleSaveModule = (updatedModule: CMSModule) => {
    setCMSData(prev => ({
      ...prev,
      modules: prev.modules.map(m => m.id === updatedModule.id ? updatedModule : m),
      lastUpdated: new Date().toISOString(),
    }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Guardar tópico
  const handleSaveTopic = (updatedTopic: Topic) => {
    setCMSData(prev => ({
      ...prev,
      modules: prev.modules.map(module => {
        if (module.id !== selectedModuleId) return module;
        return {
          ...module,
          topics: module.topics?.map(topic =>
            topic.id === updatedTopic.id ? updatedTopic : topic
          ),
        };
      }),
      lastUpdated: new Date().toISOString(),
    }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    setEditorView("module");
    setSelectedTopicId(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
      {/* SIDEBAR */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">CMS ChemMaster</h1>
        </div>
        <ModuleSidebar
          modules={cmsData.modules}
          onModuleSelect={id => {
            setSelectedModuleId(id);
            setEditorView("module");
            setSelectedTopicId(null);
          }}
          showAddModule={true}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-50 overflow-hidden">
        {selectedModule ? (
          editorView === "module" ? (
            <CMSModuleEditor
              module={selectedModule}
              onSave={handleSaveModule}
              onEditTopic={topicId => {
                setSelectedTopicId(topicId);
                setEditorView("topic");
              }}
            />
          ) : (
            selectedTopic && (
              <TopicEditor
                topics={[selectedTopic]}
                isEditing={true}
                updateTopic={(idx, field, value) => {
                  // Solo hay un tópico, idx siempre 0
                  handleSaveTopic({ ...selectedTopic, [field]: value });
                }}
                removeTopic={() => {
                  // Implementa lógica de eliminación si lo necesitas
                }}
                onBack={() => {
                  setEditorView("module");
                  setSelectedTopicId(null);
                }}
              />
            )
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
          ¡Guardado exitosamente!
        </div>
      )}
    </div>
  );
};

export default ChemMasterCMS;