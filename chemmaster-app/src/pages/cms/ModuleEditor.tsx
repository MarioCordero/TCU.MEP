import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import * as LucideIcons from "lucide-react";
import { getApiUrl } from "../../config/api";
import type { CMSModuleEditorProps, CMSModule } from "../../types/cms";
import { IconModal, ConfirmModal, SuccessModal } from "./Modals";

const COLOR_OPTIONS = [
  { value: "from-purple-500 to-purple-600", label: "Púrpura" },
  { value: "from-blue-500 to-blue-600", label: "Azul" },
  { value: "from-green-500 to-green-600", label: "Verde" },
  { value: "from-orange-500 to-orange-600", label: "Naranja" },
  { value: "from-teal-500 to-teal-600", label: "Teal" },
  { value: "from-pink-500 to-pink-600", label: "Rosa" },
  { value: "from-indigo-500 to-indigo-600", label: "Índigo" },
  { value: "from-emerald-500 to-emerald-600", label: "Esmeralda" },
];

const GRADE_OPTIONS = [
  { value: "10", label: "10°" },
  { value: "11", label: "11°" },
];

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

export function CMSModuleEditor({
  module,
  editedModule,
  setEditedModule,
  isEditing,
  showIconModal,
  setShowIconModal,
  selectedModuleId,
}: {
  module: CMSModule;
  editedModule: CMSModule;
  setEditedModule: (mod: CMSModule) => void;
  isEditing: boolean;
  showIconModal: boolean;
  setShowIconModal: (show: boolean) => void;
  selectedModuleId: number | null;
}) {
  
  const handleChange = (field: keyof CMSModule, value: any) => {
    setEditedModule({ ...editedModule, [field]: value });
  };

  useEffect(() => {
    setEditedModule(module);
  }, [module, setEditedModule]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 bg-gradient-to-r ${editedModule.color} rounded-xl cursor-pointer`}
            onClick={() => setShowIconModal(true)}
            title="Cambiar ícono"
          >
            <LucideIcons.BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{editedModule.title}</h1>
            <p className="text-gray-600">{editedModule.description}</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Target className="h-5 w-5" /> Información del Módulo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={editedModule.title}
                  onChange={e => handleChange("title", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Título del módulo"
                />
              </div>
              <div>
                <Label htmlFor="grade_level">Grado</Label>
                <select
                  id="grade_level"
                  value={editedModule.grade_level}
                  onChange={e => handleChange("grade_level", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 w-full border rounded px-2 py-1"
                >
                  {GRADE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <select
                  id="color"
                  value={editedModule.color}
                  onChange={e => handleChange("color", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1 w-full border rounded px-2 py-1"
                >
                  {COLOR_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="icon">Ícono</Label>
                <Input
                  id="icon"
                  value={editedModule.icon}
                  onChange={e => handleChange("icon", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Ícono"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={editedModule.description}
                onChange={e => handleChange("description", e.target.value)}
                disabled={!isEditing}
                className="mt-1"
                rows={3}
                placeholder="Descripción del módulo"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <IconModal
        show={showIconModal}
        onClose={() => setShowIconModal(false)}
        currentIcon={editedModule.icon || ""}
        onIconChange={iconName => handleChange("icon", iconName)}
      />
    </div>
  );
}