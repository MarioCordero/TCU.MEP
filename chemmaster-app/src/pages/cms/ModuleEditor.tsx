import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import * as LucideIcons from "lucide-react";

import { getApiUrl } from "../../config/api";
import type { CMSModule } from "../../types/cms";
import { IconModal, ConfirmModal, SuccessModal } from "./Modals";
import type { CMSModuleEditorProps } from "../../types/cms";
import { TipTapEditor } from "../../components/ui/TipTapEditor";

const ALLOWED_GRADES = ["10", "11"] as const;
type AllowedGrade = typeof ALLOWED_GRADES[number];

const COLOR_OPTIONS = [
  { value: "from-purple-500 to-purple-600", label: "Púrpura", preview: "bg-gradient-to-r from-purple-500 to-purple-600" },
  { value: "from-blue-500 to-blue-600", label: "Azul", preview: "bg-gradient-to-r from-blue-500 to-blue-600" },
  { value: "from-green-500 to-green-600", label: "Verde", preview: "bg-gradient-to-r from-green-500 to-green-600" },
  { value: "from-orange-500 to-orange-600", label: "Naranja", preview: "bg-gradient-to-r from-orange-500 to-orange-600" },
  { value: "from-teal-500 to-teal-600", label: "Teal", preview: "bg-gradient-to-r from-teal-500 to-teal-600" },
  { value: "from-pink-500 to-pink-600", label: "Rosa", preview: "bg-gradient-to-r from-pink-500 to-pink-600" },
  { value: "from-indigo-500 to-indigo-600", label: "Índigo", preview: "bg-gradient-to-r from-indigo-500 to-indigo-600" },
  { value: "from-emerald-500 to-emerald-600", label: "Esmeralda", preview: "bg-gradient-to-r from-emerald-500 to-emerald-600" },
];

export type Topic = {
  title: string;
  description?: string;
  content: any;
  order_in_module?: number;
  id?: number;
};

// API functions
const apiRequest = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorDetails = "";
      try {
        const errorText = await response.text();
        errorDetails = errorText ? ` - ${errorText}` : "";
      } catch (e) {}
      throw new Error(`API request failed: ${response.status} ${response.statusText}${errorDetails}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Expected JSON response, got: ${contentType}. Response: ${text.substring(0, 200)}`);
    }
    const text = await response.text();
    if (!text.trim()) {
      return { success: true };
    }
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Invalid JSON response: ${text.substring(0, 200)}`);
    }
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
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
      grade_level: module.grade || module.grade_level,
      active: module.isActive ? 1 : 0,
    };
    return apiRequest("updateModule.php", moduleData);
  },
  addTopic: (moduleId: string, topic: Topic) =>
    apiRequest("addTopic.php", {
      module_id: moduleId,
      title: topic.title || "",
      description: topic.description || "",
      content: typeof topic.content === "string" ? topic.content : JSON.stringify(topic.content || ""),
      order_in_module: topic.order_in_module || 0,
    }),
  updateTopic: (topic: Topic) => {
    if (!topic.id) throw new Error("Topic ID is required for updates");
    const payload = {
      id: topic.id,
      title: topic.title || "",
      description: topic.description || "",
      content: typeof topic.content === "string" ? topic.content : JSON.stringify(topic.content || ""),
      order_in_module: topic.order_in_module || 0,
    };
    return apiRequest("updateTopic.php", payload);
  },
  deleteTopic: (topicId: number) => apiRequest("deleteTopic.php", { id: topicId }),
};

// Hook para edición
function useModuleEditor(initialModule: CMSModule) {
  const [editedModule, setEditedModule] = useState<CMSModule>(initialModule);
  const [deletedTopicIds, setDeletedTopicIds] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const addTopic = (topic: Topic) => {
    setEditedModule((prev) => ({
      ...prev,
      topics: [...(prev.topics || []), topic],
    }));
  };

  const updateTopic = (idx: number, field: string, value: any) => {
    setEditedModule((prev) => ({
      ...prev,
      topics: prev.topics?.map((t, i) =>
        i === idx ? { ...t, [field]: value } : t
      ),
    }));
  };

  const removeTopic = (idx: number) => {
    setEditedModule((prev) => {
      const topic = prev.topics?.[idx];
      if (topic?.id) setDeletedTopicIds((ids) => [...ids, topic.id!]);
      return {
        ...prev,
        topics: prev.topics?.filter((_, i) => i !== idx),
      };
    });
  };

  const resetToOriginal = () => {
    setEditedModule(initialModule);
    setDeletedTopicIds([]);
    setIsEditing(false);
  };

  return {
    editedModule,
    setEditedModule,
    deletedTopicIds,
    isEditing,
    setIsEditing,
    addTopic,
    updateTopic,
    removeTopic,
    resetToOriginal,
  };
}

// Editor de tópicos
function TopicEditor({
  topics,
  isEditing,
  updateTopic,
  removeTopic,
}: {
  topics: Topic[];
  isEditing: boolean;
  updateTopic: (idx: number, field: string, value: any) => void;
  removeTopic: (idx: number) => void;
}) {
  return (
    <div className="space-y-6">
      {(topics || []).map((topic, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.BookOpen className="h-5 w-5" /> Tópico {idx + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={topic.title}
              onChange={(e) => updateTopic(idx, "title", e.target.value)}
              disabled={!isEditing}
              placeholder="Título del tópico"
            />
            <Textarea
              value={topic.description || ""}
              onChange={(e) => updateTopic(idx, "description", e.target.value)}
              disabled={!isEditing}
              placeholder="Descripción"
              rows={2}
            />
            <TipTapEditor
              content={topic.content || ""}
              onChange={(value) => updateTopic(idx, "content", value)}
              disabled={!isEditing}
              placeholder="Contenido del tópico..."
            />
            {isEditing && (
              <Button variant="outline" onClick={() => removeTopic(idx)}>
                <LucideIcons.Trash2 className="h-4 w-4 mr-2" />Eliminar
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
      {(!topics || topics.length === 0) && (
        <div className="text-gray-500 text-center py-8">No hay tópicos agregados.</div>
      )}
    </div>
  );
}

// Main component
export function CMSModuleEditor({ module, onSave }: CMSModuleEditorProps) {
  const {
    editedModule,
    setEditedModule,
    deletedTopicIds,
    isEditing,
    setIsEditing,
    addTopic,
    updateTopic,
    removeTopic,
    resetToOriginal,
  } = useModuleEditor(module);

  // useEffect(() => {
  //   fetch(getApiUrl(`getModule.php?id=${module.module_id}`))
  //     .then(res => res.json())
  //     .then(data => {
  //       setEditedModule(data) // Make sure 'data' includes topics and their content
  //     })
  //     .catch(err => {
  //       console.error("Error fetching module/topics:", err)
  //     })
  // }, [module.module_id])

  // Modal states
  const [showIconModal, setShowIconModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [password, setPassword] = useState("");

  // LOOK
  const handleSave = async () => {
    
    try {
      const { topics, ...moduleWithoutTopics } = editedModule;
      await moduleAPI.update(moduleWithoutTopics as CMSModule);
      const operations: Promise<any>[] = [];
      const newTopics = editedModule.topics?.filter(topic => !topic.id) || [];
      newTopics.forEach(topic => {
        operations.push(moduleAPI.addTopic(editedModule.module_id, topic));
      });
      const existingTopics = editedModule.topics?.filter(topic => topic.id) || [];
      existingTopics.forEach(topic => {
        operations.push(moduleAPI.updateTopic(topic));
      });
      deletedTopicIds.forEach(topicId => {
        operations.push(moduleAPI.deleteTopic(topicId));
      });
      await Promise.all(operations);
      setIsEditing(false);
      setShowSuccessModal(true);
      onSave?.(editedModule);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      alert(`Error al guardar: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    resetToOriginal();
  };

  const handleConfirmSave = () => {
    setShowConfirmModal(false);
    setPassword("");
    handleSave();
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-r ${editedModule.color} rounded-xl`}>{/* icon here */}</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{editedModule.title}</h1>
              <p className="text-gray-600">{editedModule.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <Label htmlFor="module-active">Activo</Label>
              <Switch
                id="module-active"
                checked={Boolean(editedModule.isActive)}
                onCheckedChange={(checked) => {
                  setEditedModule({ ...editedModule, isActive: checked });
                }}
                disabled={!isEditing}
              />
            </div>
            {isEditing ? null : (
              <Button variant="black" onClick={() => setIsEditing(true)}>
                <LucideIcons.Edit3 className="h-4 w-4 mr-2" />Editar
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Target className="h-5 w-5" /> Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  id="title"
                  value={editedModule.title}
                  onChange={(e) => setEditedModule({ ...editedModule, title: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Textarea
                id="description"
                value={editedModule.description}
                onChange={(e) => setEditedModule({ ...editedModule, description: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
        {/* Tópicos */}
        <TopicEditor
          topics={editedModule.topics || []}
          isEditing={isEditing}
          updateTopic={updateTopic}
          removeTopic={removeTopic}
        />
        {isEditing && (
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
            <Button variant="black" onClick={() => setShowConfirmModal(true)}>Guardar</Button>
            <Button
              variant="outline"
              onClick={() => addTopic({ title: "", description: "", content: "" })}
            >
              <LucideIcons.Plus className="h-4 w-4 mr-2" />Agregar tópico
            </Button>
          </div>
        )}
      </div>
      {/* MODALS */}
      <IconModal
        show={showIconModal}
        onClose={() => setShowIconModal(false)}
        currentIcon={editedModule.icon || ""}
        onIconChange={(iconName) => setEditedModule({ ...editedModule, icon: iconName })}
      />
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
}