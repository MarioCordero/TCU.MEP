import { useState, useEffect } from "react"
import { Topic } from "../../types/cms"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import * as LucideIcons from "lucide-react"
import { API } from "../../lib/api"
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

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

  // Inicializar BlockNote con lógica de subida de imágenes
  const editor: BlockNoteEditor = useCreateBlockNote({
    uploadFile: async (file: File) => {
      const response = await API.UploadImage(file);
      return response.url; // Retorna la URL para que BlockNote la inserte
    }
  });

  useEffect(() => {
    if (!topic) return;
    setEditedTopic(topic);
    
    async function loadContent() {
      try {
        // Intentar parsear como bloques (JSON)
        const blocks = JSON.parse(topic.content);
        editor.replaceBlocks(editor.document, blocks);
      } catch (e) {
        // Si falla, convertir el HTML viejo a bloques automáticamente
        const blocks = await editor.tryParseHTMLToBlocks(topic.content);
        editor.replaceBlocks(editor.document, blocks);
      }
    }
    
    loadContent();
  }, [topic, editor]);

  const handleSave = async () => {
    if (!editedTopic || !editedTopic.id) return
    setIsSaving(true)
    
    // Serializar los bloques a string para guardar en la base de datos
    const jsonContent = JSON.stringify(editor.document);
    
    try {
      await API.UpdateTopic(editedTopic.id, {
        title: editedTopic.title,
        description: editedTopic.description,
        content: jsonContent,
        order_in_module: editedTopic.order_in_module
      })
      
      onSave({ ...editedTopic, content: jsonContent });
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <LucideIcons.Layout className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Editor de Contenido Avanzado</h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="rounded-full h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
          >
            <LucideIcons.X className="h-5 w-5" />
          </Button>
        </div>

        {/* Formulario y Editor */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="modal-title" className="text-sm font-semibold text-gray-700">📝 Título</Label>
              <Input
                id="modal-title"
                value={editedTopic.title}
                onChange={(e) => setEditedTopic({ ...editedTopic, title: e.target.value })}
                className="mt-2 bg-white"
              />
            </div>

            <div>
              <Label htmlFor="modal-order" className="text-sm font-semibold text-gray-700">🔢 Orden</Label>
              <Input
                id="modal-order"
                type="number"
                value={editedTopic.order_in_module}
                onChange={(e) => setEditedTopic({ ...editedTopic, order_in_module: parseInt(e.target.value) })}
                className="mt-2 bg-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="modal-description" className="text-sm font-semibold text-gray-700">📄 Resumen</Label>
            <Textarea
              id="modal-description"
              value={editedTopic.description || ""}
              onChange={(e) => setEditedTopic({ ...editedTopic, description: e.target.value })}
              className="mt-2 bg-white"
              rows={2}
            />
          </div>

          <div className="flex flex-col flex-1 min-h-[500px]">
            <Label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <LucideIcons.FileJson className="h-4 w-4" /> 
              Cuerpo del Tópico (Estilo Notion)
            </Label>
            <div className="flex-1 bg-white border rounded-xl shadow-inner p-2 overflow-hidden">
              <BlockNoteView editor={editor} theme="light" className="h-full min-h-[450px]" />
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">Tip: Arrastra imágenes directamente o escribe "/" para comandos.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-white flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>Cancelar</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <LucideIcons.Loader className="h-4 w-4 mr-2 animate-spin" /> : <LucideIcons.Save className="h-4 w-4 mr-2" />}
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  )
}