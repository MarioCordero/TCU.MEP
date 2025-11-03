import { useState, useEffect } from "react";
import { Settings, Save, Edit3, RotateCcw } from "lucide-react";
import type { CMSData, CMSModule } from "../types/cms";
import { getApiUrl } from "../config/api";
import { ModuleSidebar } from "./cms/ModuleSidebar";
import { CMSModuleEditor } from "./cms/ModuleEditor";
import { ConfirmModal, SuccessModal } from "./cms/Modals";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";

type EditorView = "module";

const ChemMasterCMS = ({ onClose }: { onClose: () => void }) => {
  const [cmsData, setCMSData] = useState<CMSData>({
    modules: [],
    lastUpdated: new Date().toISOString(),
  });
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(() => {
    const stored = localStorage.getItem("selectedModuleId");
    return stored && stored !== "" ? Number(stored) : null;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedModule, setEditedModule] = useState<CMSModule | null>(null);
  const [showIconModal, setShowIconModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("selectedModuleId", "");
    fetch(getApiUrl("cmsData.php"))
      .then(response => response.json())
      .then(data => setCMSData(data.cmsData))
      .catch(error => console.error('Error fetching CMS data:', error));
  }, []);

  const selectedModule = cmsData.modules.find(m => Number(m.id) === Number(selectedModuleId)) || null;

  useEffect(() => {
    if (selectedModule) setEditedModule(selectedModule);
    else setEditedModule(null);
    setIsEditing(false);
  }, [selectedModule]);

  const apiRequest = async (endpoint: string, data: any) => {
    const response = await fetch(getApiUrl(endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al guardar módulo");
    return response.json();
  };

  const moduleAPI = {
    update: (module: CMSModule) => {
      const moduleData = {
        id: module.id,
        module_id: module.module_id,
        title: module.title,
        description: module.description,
        icon: module.icon,
        color: module.color,
        grade_level: module.grade_level,
        active: module.active ? 1 : 0,
      };
      return apiRequest("updateModule.php", moduleData);
    },
  };

  const handleSaveModule = async () => {
    if (!editedModule) return;
    try {
      await moduleAPI.update(editedModule);
      setCMSData(prev => ({
        ...prev,
        modules: prev.modules.map(m => m.id === editedModule.id ? editedModule : m),
        lastUpdated: new Date().toISOString(),
      }));
      setIsEditing(false);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch (error) {
      alert("Error al guardar el módulo");
    }
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false);
    setPassword("");
    handleSaveModule();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">CMS ChemMaster</h1>
        </div>
        <ModuleSidebar
          modules={cmsData.modules}
          onModuleSelect={id => {
            localStorage.setItem("selectedModuleId", String(id));
            setSelectedModuleId(Number(id));
          }}
          showAddModule={true}
        />
      </div>

      <div className="flex-1 bg-gray-50 overflow-hidden">
        {selectedModule && editedModule ? (
          <>
            <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-2 mr-4">
                <Label htmlFor="module-active">Activo</Label>
                <Switch
                  id="module-active"
                  checked={Boolean(editedModule.active)}
                  onCheckedChange={checked =>
                    setEditedModule({ ...editedModule, active: checked ? 1 : 0 })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Button variant="default" onClick={() => setShowConfirmModal(true)}>
                    <Save className="h-4 w-4 mr-2" />Guardar
                  </Button>
                ) : (
                  <Button variant="black" onClick={() => setIsEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-2" />Editar
                  </Button>
                )}
                {isEditing && (
                  <Button variant="outline" onClick={() => setEditedModule(selectedModule)}>
                    <RotateCcw className="h-4 w-4 mr-2" />Deshacer
                  </Button>
                )}
              </div>
            </div>
            <CMSModuleEditor
              key={selectedModuleId}
              module={selectedModule}
              editedModule={editedModule}
              setEditedModule={setEditedModule}
              isEditing={isEditing}
              showIconModal={showIconModal}
              setShowIconModal={setShowIconModal}
              selectedModuleId={selectedModuleId}
            />
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Sistema de Gestión de Contenido</h2>
              <p className="text-gray-500 max-w-md">
                Selecciona un módulo del panel izquierdo para comenzar a editar el contenido.
              </p>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        password={password}
        onPasswordChange={setPassword}
      />
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default ChemMasterCMS;