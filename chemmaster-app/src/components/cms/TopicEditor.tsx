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

interface Props {
  moduleId: number;
  topics: Topic[];
  onUpdate: () => void;
}

// Add Topic Modal Component
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

  const handleAdd = async () => {
    if (!title.trim()) {
      alert("El título es requerido");
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
      alert("Error al crear: " + error);
    } finally {
      setIsAdding(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Nuevo Tópico</h2>
            <p className="text-sm text-gray-500 mt-1">Agrega un nuevo tema al módulo</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="rounded-full h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
            disabled={isAdding}
          >
            <LucideIcons.X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Title */}
          <div>
            <Label htmlFor="add-title" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <LucideIcons.Type className="h-4 w-4 text-green-600" />
              Título *
            </Label>
            <Input
              id="add-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isAdding}
              className="mt-2 border-2 border-gray-200 focus:border-green-500 rounded-lg"
              placeholder="Ej: Estructura de la materia"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="add-description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <LucideIcons.FileText className="h-4 w-4 text-green-600" />
              Descripción (opcional)
            </Label>
            <Textarea
              id="add-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isAdding}
              className="mt-2 border-2 border-gray-200 focus:border-green-500 rounded-lg"
              placeholder="Descripción breve del tópico"
              rows={2}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded text-sm text-blue-700">
            <LucideIcons.Info className="h-4 w-4 inline mr-2" />
            Podrás editar el contenido HTML después de crear el tópico.
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isAdding}
          >
            Cancelar
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleAdd}
            disabled={isAdding || !title.trim()}
          >
            {isAdding ? (
              <>
                <LucideIcons.Loader className="h-4 w-4 mr-2 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <LucideIcons.Plus className="h-4 w-4 mr-2" />
                Crear Tópico
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function TopicEditor({ moduleId, topics, onUpdate }: Props) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // --- DELETE ---
  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que quieres borrar este tema?")) return;
    
    setIsDeleting(id);
    try {
      await API.DeleteTopic(id);
      onUpdate();
    } catch (error) {
      alert("Error al borrar: " + error);
    } finally {
      setIsDeleting(null);
    }
  };

  // --- EDIT ---
  const handleEdit = (topic: Topic) => {
    setEditingTopic(topic);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedTopic: Topic) => {
    onUpdate();
    setShowEditModal(false);
  };

  // --- ADD ---
  const handleAddComplete = () => {
    onUpdate();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <LucideIcons.BookMarked className="h-6 w-6 text-white" />
            </div>
            Tópicos del Módulo
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {topics.length} {topics.length === 1 ? 'tema' : 'temas'} disponible{topics.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transform transition hover:scale-105"
        >
          <LucideIcons.Plus className="h-4 w-4 mr-2" />
          Agregar Tópico
        </Button>
      </div>

      {/* Topics Grid */}
      <div className="grid gap-4">
        {topics.length === 0 && (
          <div className="text-center py-12">
            <LucideIcons.BookOpen className="h-16 w-16 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-400 text-lg">No hay tópicos en este módulo todavía.</p>
            <p className="text-sm text-gray-500 mt-2">Agrega tu primer tópico para comenzar.</p>
          </div>
        )}

        {topics.map((topic, index) => (
          <Card 
            key={topic.id} 
            className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 bg-white"
          >
            <div className="p-5 flex justify-between items-start gap-6">
              {/* Left Side - Topic Info */}
              <div className="flex gap-5 items-start flex-1">
                {/* Number Badge */}
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md flex-shrink-0 mt-1">
                  {index + 1}
                </div>

                {/* Topic Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-gray-800 mb-2 break-words">
                    {topic.title}
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <LucideIcons.Tag className="h-3 w-3 text-gray-400" />
                      <span>ID: {topic.id}</span>
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-2 rounded">
                      {topic.content.substring(0, 100).replace(/<[^>]*>?/gm, '') || 'Sin contenido'}
                      {topic.content.length > 100 && '...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 transition"
                  onClick={() => topic.id && handleEdit(topic)}
                >
                  <LucideIcons.Edit2 className="h-4 w-4 mr-1" />
                  Editar
                </Button>

                <Button 
                  variant="destructive" 
                  size="sm"
                  disabled={isDeleting === topic.id || !topic.id}
                  className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-70 transition"
                  onClick={() => topic.id && handleDelete(topic.id)}
                >
                  <LucideIcons.Trash2 className="h-4 w-4 mr-1" />
                  {isDeleting === topic.id ? 'Borrando...' : 'Borrar'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Topic Modal */}
      <AddTopicModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddComplete}
        moduleId={moduleId}
        topicsCount={topics.length}
      />

      {/* Edit Topic Modal */}
      <TopicEditorModal
        show={showEditModal}
        topic={editingTopic}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}