import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import * as LucideIcons from "lucide-react";
import { API } from "../../lib/api";
import type { Module } from "../../types/cms";
import { IconModal } from "./Modals";

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

const getIconComponent = (iconName: string) => {
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as any;
  return Icon ? <Icon className="h-8 w-8 text-white" /> : <LucideIcons.BookOpen className="h-8 w-8 text-white" />;
};

export function CMSModuleEditor({
  module,
  editedModule,
  setEditedModule,
  isEditing,
  showIconModal,
  setShowIconModal,
}: {
  module: Module;
  editedModule: Module;
  setEditedModule: (mod: Module) => void;
  isEditing: boolean;
  showIconModal: boolean;
  setShowIconModal: (show: boolean) => void;
}) {
  
  const handleChange = (field: keyof Module, value: any) => {
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
            onClick={() => isEditing && setShowIconModal(true)}
            title={isEditing ? "Cambiar ícono" : ""}
          >
            {getIconComponent(editedModule.icon || "BookOpen")}
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
                  value={editedModule.icon || ""}
                  onChange={e => handleChange("icon", e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="BookOpen"
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
            <div className="flex items-center gap-2">
              <Label htmlFor="active">Activo</Label>
              <Switch
                id="active"
                checked={editedModule.active}
                onCheckedChange={checked => handleChange("active", checked)}
                disabled={!isEditing}
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
        disabled={!isEditing}
      />
    </div>
  );
}