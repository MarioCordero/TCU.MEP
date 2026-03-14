import { useState } from 'react';
import { Topic } from '../../../types/cms';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import * as LucideIcons from 'lucide-react';
import TopicEditorModal from './TopicEditorModal';
import { Modal, AlertModal } from '../../ui/modal';
import AddTopicModal from './AddTopicModal';
import { CMSTopicEditorProps } from '../../../types/cms';
import { useTopicDelete } from '../../../hooks/useTopicDelete';
import SuccessModal from '../../common/modals/SuccessModal'
import ActivityManagerModal from './ActivityManagerModal';

export default function TopicEditor({ moduleId, topics, onUpdate }: CMSTopicEditorProps) {
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activityTopic, setActivityTopic] = useState<Topic | null>(null);

  const {
    isDeleting,
    deleteConfirmation,
    deleteError,
    showDeleteSuccess,
    clearDeleteSuccess,
    clearError,
    requestDelete,
    confirmDelete,
    cancelDelete,
  } = useTopicDelete(onUpdate)

  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedTopic: Topic) => {
    onUpdate();
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

                    {/* BADGES */}
                    <div className="flex items-center gap-4 mt-2">
                      {/* Topic ID */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        <LucideIcons.Hash className="h-3 w-3" />
                        <span>ID: {topic.id}</span>
                      </div>
                      {/* Content Badge */}
                      {topic.content && topic.content.length > 50 && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                          <LucideIcons.FileJson className="h-3 w-3" />
                          <span>Contenido cargado</span>
                        </div>
                      )}
                      {/* Activities Badge */}
                      <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100">
                        <LucideIcons.Gamepad2 className="h-3 w-3" />
                        {/* TODO: Implement activity count display */}
                        <span>{topic.activities_count || 0} Actividades</span> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Actions */}
              <div className="flex items-center gap-2 self-center">
                {/* EDIT BUTTON */}
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => topic.id && handleEdit(topic)}
                >
                  <LucideIcons.FileEdit className="h-4 w-4 mr-2" />
                  Editar Contenido
                </Button>
                {/* NUEVO BOTÓN DE ACTIVIDADES */}
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:border-purple-300 hover:bg-purple-50"
                  onClick={() => setActivityTopic(topic)}
                >
                  <LucideIcons.Trophy className="h-4 w-4 mr-2" />
                  Actividades
                </Button>
                {/* DELETE BUTTON */}
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isDeleting === topic.id || !topic.id}
                  className="text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => topic.id && requestDelete(topic.id, topic.title)}
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

      {showEditModal && editingTopic && (
        <TopicEditorModal
          show={true}
          topic={editingTopic}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}

      {activityTopic && activityTopic.id && (
        <ActivityManagerModal
          show={!!activityTopic}
          onClose={() => setActivityTopic(null)}
          topicId={activityTopic.id}
          topicTitle={activityTopic.title}
        />
      )}

      <Modal
        isOpen = {deleteConfirmation.show}
        onClose = {cancelDelete}
        maxWidth = "max-w-md"
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
              onClick={cancelDelete}
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

      <SuccessModal
        show={showDeleteSuccess}
        onClose={clearDeleteSuccess}
        title="¡Tópico Eliminado!"
        message={`El tópico "${deleteConfirmation.topicTitle || ''}" fue eliminado correctamente.`}
      />

      <AlertModal
        isOpen={!!deleteError}
        onClose={clearError}
        title="Ocurrió un error"
        message={deleteError}
        variant="destructive"
      />
    </div>
  );
}