import { useState } from 'react';
import { API } from '../../lib/api';
import { Topic } from '../../types/cms';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import * as LucideIcons from 'lucide-react';
import TopicEditorModal from './TopicEditorModal';
import { Modal, AlertModal } from '../../components/ui/modal';

interface Props {
  moduleId: number;
  topics: Topic[];
  onUpdate: () => void;
}

function AddTopicModal({
  show,
  onClose,
  onSave,
  moduleId,
  topicsCount
}: {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  moduleId: number;
  topicsCount: number;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [alertConfig, setAlertConfig] = useState<{
    show: boolean;
    title: string;
    msg: string;
    variant: "destructive" | "warning" | "default";
  }>({ show: false, title: "", msg: "", variant: "default" });

  const handleAdd = async () => {
    if (!title.trim()) {
      setAlertConfig({
        show: true,
        title: "Título Requerido",
        msg: "El tópico necesita un título para ser creado.",
        variant: "warning"
      });
      return;
    }

    setIsAdding(true);
    try {
      await API.AddTopic({
        module_id: moduleId,
        title: title,
        description: description,
        content: "<p>Contenido inicial...</p>",
        order_in_module: topicsCount
      });

      setTitle("");
      setDescription("");
      onSave();
      onClose();

    } catch (error) {
      setAlertConfig({
        show: true,
        title: "Error al crear",
        msg: "No se pudo crear el tópico: " + String(error),
        variant: "destructive"
      });
    } finally {
      setIsAdding(false);
    }
  };

  const footerContent = (
    <>
      <Button variant="ghost" onClick={onClose} disabled={isAdding}>
        Cancelar
      </Button>
      <Button
        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]"
        onClick={handleAdd}
        disabled={isAdding || !title.trim()}
      >
        {isAdding ? (
          <>
            <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Creando...
          </>
        ) : (
          <>
            <LucideIcons.Plus className="h-4 w-4 mr-2" />
            Crear Tópico
          </>
        )}
      </Button>
    </>
  );

  return (
    <>
      <Modal
        isOpen={show}
        onClose={onClose}
        title="Nuevo Tópico"
        maxWidth="max-w-xl"
        footer={footerContent}
      >
        <div className="p-8 space-y-6">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 shrink-0">
              <LucideIcons.Lightbulb className="h-5 w-5" />
            </div>
            <div className="text-sm text-emerald-800">
              <p className="font-semibold">Tip:</p>
              <p>Estás creando la estructura del tema. Podrás editar el contenido rico (imágenes, texto, videos) en el siguiente paso.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-title" className="text-sm font-semibold text-gray-700">
                Título del Tópico <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <LucideIcons.Type className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="add-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isAdding}
                  className="pl-10 h-11 border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Ej: Estructura de la materia"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-description" className="text-sm font-semibold text-gray-700">
                Descripción (Opcional)
              </Label>
              <Textarea
                id="add-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isAdding}
                className="min-h-[100px] border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white resize-none"
                placeholder="Breve resumen de lo que tratará este tópico..."
              />
            </div>
          </div>
        </div>
      </Modal>

      <AlertModal
        isOpen={alertConfig.show}
        onClose={() => setAlertConfig({ ...alertConfig, show: false })}
        title={alertConfig.title}
        message={alertConfig.msg}
        variant={alertConfig.variant}
      />
    </>
  );
}

export default function TopicEditor({ moduleId, topics, onUpdate }: Props) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ show: boolean, topicId: number | null }>({
    show: false,
    topicId: null
  });

  const [globalAlert, setGlobalAlert] = useState<{ show: boolean, msg: string }>({
    show: false, msg: ""
  });

  const requestDelete = (id: number) => {
    setDeleteConfirmation({ show: true, topicId: id });
  };

  const confirmDelete = async () => {
    const id = deleteConfirmation.topicId;
    if (!id) return;

    setIsDeleting(id);
    setDeleteConfirmation({ show: false, topicId: null });

    try {
      await API.DeleteTopic(id);
      onUpdate();
    } catch (error) {
      setGlobalAlert({
        show: true,
        msg: "No se pudo eliminar el tópico: " + String(error)
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedTopic: Topic) => {
    onUpdate();
    setShowEditModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <LucideIcons.Layers className="h-6 w-6" />
            </div>
            Contenido del Módulo
          </h2>
          <p className="text-sm text-slate-500 mt-1 ml-1">
            Gestionando {topics.length} {topics.length === 1 ? 'tópico' : 'tópicos'} en este módulo
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 transition-all hover:-translate-y-0.5"
        >
          <LucideIcons.Plus className="h-4 w-4 mr-2" />
          Agregar Tópico
        </Button>
      </div>

      {/* Topics Grid */}
      <div className="grid gap-4">
        {topics.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
              <LucideIcons.BookOpen className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-600">Módulo vacío</h3>
            <p className="text-sm text-slate-400 mt-1 mb-4">No hay tópicos creados todavía.</p>
            <Button variant="outline" onClick={() => setShowAddModal(true)}>
              Crear el primer tópico
            </Button>
          </div>
        )}

        {topics.map((topic, index) => (
          <Card
            key={topic.id}
            className="group overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="p-5 flex justify-between items-start gap-6">
              {/* Left Side - Topic Info */}
              <div className="flex gap-5 items-start flex-1">
                {/* Number Badge */}
                <div className="bg-slate-100 text-slate-500 w-12 h-12 flex items-center justify-center rounded-xl font-bold text-lg shrink-0 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                  {index + 1}
                </div>

                {/* Topic Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="font-bold text-lg text-slate-800 mb-2 truncate">
                    {topic.title}
                  </h4>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {topic.description || "Sin descripción"}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <LucideIcons.Hash className="h-3 w-3" />
                        <span>ID: {topic.id}</span>
                      </div>
                      {topic.content && topic.content.length > 50 && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                          <LucideIcons.FileJson className="h-3 w-3" />
                          <span>Contenido cargado</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Actions */}
              <div className="flex items-center gap-2 self-center">
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => topic.id && handleEdit(topic)}
                >
                  <LucideIcons.FileEdit className="h-4 w-4 mr-2" />
                  Editar Contenido
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isDeleting === topic.id || !topic.id}
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => topic.id && requestDelete(topic.id)}
                  title="Eliminar tópico"
                >
                  {isDeleting === topic.id ? (
                    <LucideIcons.Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LucideIcons.Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddTopicModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={onUpdate}
        moduleId={moduleId}
        topicsCount={topics.length}
      />

      <TopicEditorModal
        show={showEditModal}
        topic={editingTopic}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
      />

      <Modal
        isOpen={deleteConfirmation.show}
        onClose={() => setDeleteConfirmation({ show: false, topicId: null })}
        maxWidth="max-w-md"
      >
        <div className="p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6 ring-8 ring-white shadow-xl shadow-red-100">
            <LucideIcons.Trash2 className="h-10 w-10 text-red-600" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">¿Eliminar Tópico?</h3>

          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8 text-left">
            <div className="flex gap-3">
              <LucideIcons.AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">
                Esta acción es <b>irreversible</b>. Se eliminará el tópico y todo su contenido (texto, imágenes, ejercicios) permanentemente.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-center w-full">
            <Button
              variant="ghost"
              onClick={() => setDeleteConfirmation({ show: false, topicId: null })}
              className="flex-1 h-12 text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200"
            >
              Sí, eliminar
            </Button>
          </div>
        </div>
      </Modal>

      <AlertModal
        isOpen={globalAlert.show}
        onClose={() => setGlobalAlert({ show: false, msg: "" })}
        title="Ocurrió un error"
        message={globalAlert.msg}
        variant="destructive"
      />
    </div>
  );
}