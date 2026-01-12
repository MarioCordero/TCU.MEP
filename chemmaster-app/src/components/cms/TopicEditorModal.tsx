import { useState, useEffect } from "react"
import { Topic } from "../../types/cms"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import * as LucideIcons from "lucide-react"
import { API } from "../../lib/api"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface TopicEditorModalProps {
  show: boolean
  topic: Topic | null
  onClose: () => void
  onSave: (topic: Topic) => void
}

export default function TopicEditorModal({ 
  show, 
  topic, 
  onClose, 
  onSave 
}: TopicEditorModalProps) {
  const [editedTopic, setEditedTopic] = useState<Topic | null>(topic)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setEditedTopic(topic)
  }, [topic])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'link', 'image', 'video'
  ]

  const handleSave = async () => {
    if (!editedTopic || !editedTopic.id) return
    
    setIsSaving(true)
    try {
      await API.UpdateTopic(editedTopic.id, {
        title: editedTopic.title,
        description: editedTopic.description,
        content: editedTopic.content,
        order_in_module: editedTopic.order_in_module
      })
      onSave(editedTopic)
      onClose()
    } catch (error) {
      alert("Error al guardar: " + error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!show || !editedTopic) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-gray-800">Editar Tópico</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="rounded-full h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <LucideIcons.X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <Label htmlFor="modal-title" className="text-sm font-semibold text-gray-700">
                📝 Título
              </Label>
              <Input
                id="modal-title"
                value={editedTopic.title}
                onChange={(e) => setEditedTopic({ ...editedTopic, title: e.target.value })}
                className="mt-2"
                placeholder="Título del tópico"
              />
            </div>

            {/* Order */}
            <div>
              <Label htmlFor="modal-order" className="text-sm font-semibold text-gray-700">
                🔢 Orden
              </Label>
              <Input
                id="modal-order"
                type="number"
                value={editedTopic.order_in_module}
                onChange={(e) => setEditedTopic({ ...editedTopic, order_in_module: parseInt(e.target.value) })}
                className="mt-2"
                min={0}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="modal-description" className="text-sm font-semibold text-gray-700">
              📄 Descripción Corta
            </Label>
            <Textarea
              id="modal-description"
              value={editedTopic.description || ""}
              onChange={(e) => setEditedTopic({ ...editedTopic, description: e.target.value })}
              className="mt-2"
              placeholder="Descripción breve..."
              rows={2}
            />
          </div>

          {/* RICH TEXT EDITOR */}
          <div className="flex flex-col h-[400px]">
            <Label className="text-sm font-semibold text-gray-700 mb-2">
              💻 Contenido Multimedia
            </Label>
            <div className="flex-1 bg-white">
              <ReactQuill 
                theme="snow"
                value={editedTopic.content}
                onChange={(content: string) => setEditedTopic({ ...editedTopic, content: content })}
                modules={modules}
                formats={formats}
                className="h-[350px] mb-12"
                placeholder="Escribe aquí... puedes pegar imágenes directamente."
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <LucideIcons.Loader className="h-4 w-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <LucideIcons.Save className="h-4 w-4 mr-2" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}