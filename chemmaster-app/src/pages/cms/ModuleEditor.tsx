import { useCallback, useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import type { CMSModule } from "../../types/cms"
import * as LucideIcons from "lucide-react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getApiUrl } from "../../config/api"

// ================================ TYPES & CONSTANTS ================================
const ALLOWED_GRADES = ["10", "11"] as const
type AllowedGrade = typeof ALLOWED_GRADES[number]

const COLOR_OPTIONS = [
  {
    value: "from-purple-500 to-purple-600",
    label: "Púrpura",
    preview: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  { value: "from-blue-500 to-blue-600", label: "Azul", preview: "bg-gradient-to-r from-blue-500 to-blue-600" },
  { value: "from-green-500 to-green-600", label: "Verde", preview: "bg-gradient-to-r from-green-500 to-green-600" },
  {
    value: "from-orange-500 to-orange-600",
    label: "Naranja",
    preview: "bg-gradient-to-r from-orange-500 to-orange-600",
  },
  { value: "from-teal-500 to-teal-600", label: "Teal", preview: "bg-gradient-to-r from-teal-500 to-teal-600" },
  { value: "from-pink-500 to-pink-600", label: "Rosa", preview: "bg-gradient-to-r from-pink-500 to-pink-600" },
  {
    value: "from-indigo-500 to-indigo-600",
    label: "Índigo",
    preview: "bg-gradient-to-r from-indigo-500 to-indigo-600",
  },
  {
    value: "from-emerald-500 to-emerald-600",
    label: "Esmeralda",
    preview: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  },
]

export type Topic = {
  title: string
  description?: string
  content: any
  order_in_module?: number
  id?: number
}

interface CMSModuleEditorProps {
  module: CMSModule
  onSave: (module: CMSModule) => void
}

// ================================ UTILITY FUNCTIONS ================================
function toAllowedGrade(value: any): AllowedGrade | undefined {
  return ALLOWED_GRADES.includes(value) ? value : undefined
}

// ================================ API FUNCTIONS ================================
const apiRequest = async (endpoint: string, data: any) => {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      let errorDetails = "";
      try {
        const errorText = await response.text();
        errorDetails = errorText ? ` - ${errorText}` : "";
      } catch (e) {
        // Silent error handling
      }
      
      throw new Error(`API request failed: ${response.status} ${response.statusText}${errorDetails}`)
    }
    
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text()
      throw new Error(`Expected JSON response, got: ${contentType}. Response: ${text.substring(0, 200)}`)
    }
    
    const text = await response.text()
    if (!text.trim()) {
      return { success: true }
    }
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error(`Invalid JSON response: ${text.substring(0, 200)}`)
    }
    
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

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
      content: typeof topic.content === 'string' ? topic.content : JSON.stringify(topic.content || ""),
      order_in_module: topic.order_in_module || 0,
    }),
  updateTopic: (topic: Topic) => {
    // Ensure all required fields are present
    if (!topic.id) {
      throw new Error("Topic ID is required for updates");
    }
    
    const payload = {
      id: topic.id,
      title: topic.title || "",
      description: topic.description || "",
      content: typeof topic.content === 'string' ? topic.content : JSON.stringify(topic.content || ""),
      order_in_module: topic.order_in_module || 0,
    };
    
    console.log("Sending topic update payload:", payload);
    return apiRequest("updateTopic.php", payload);
  },
  deleteTopic: (topicId: number) => apiRequest("deleteTopic.php", { id: topicId }),
}

// ================================ TIPTAP EDITOR COMPONENT ================================
interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  disabled?: boolean
  placeholder?: string
}

function TipTapEditor({ content, onChange, disabled = false, placeholder = "Escribe aquí..." }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-3 ${
          disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
        }`
      }
    }
  })

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '')
    }
  }, [content, editor])

  // Update editor editable state when disabled prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!disabled)
    }
  }, [disabled, editor])

  if (!editor) {
    return (
      <div className="border rounded-md min-h-[200px] bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Cargando editor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      {!disabled && (
        <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
            title="Negrita"
          >
            <LucideIcons.Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
            title="Cursiva"
          >
            <LucideIcons.Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}
            title="Tachado"
          >
            <LucideIcons.Strikethrough className="h-4 w-4" />
          </button>
          <div className="w-px bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''}`}
            title="Título 1"
          >
            <LucideIcons.Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''}`}
            title="Título 2"
          >
            <LucideIcons.Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('paragraph') ? 'bg-gray-300' : ''}`}
            title="Párrafo"
          >
            <LucideIcons.Pilcrow className="h-4 w-4" />
          </button>
          <div className="w-px bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
            title="Lista con viñetas"
          >
            <LucideIcons.List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
            title="Lista numerada"
          >
            <LucideIcons.ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-300' : ''}`}
            title="Cita"
          >
            <LucideIcons.Quote className="h-4 w-4" />
          </button>
          <div className="w-px bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Deshacer"
          >
            <LucideIcons.Undo className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
            title="Rehacer"
          >
            <LucideIcons.Redo className="h-4 w-4" />
          </button>
        </div>
      )}
      
      {/* Editor Content */}
      <div className={`border rounded-md ${!disabled ? 'border-t-0 rounded-t-none' : ''} min-h-[200px] ${disabled ? 'bg-gray-50' : 'bg-white'}`}>
        <EditorContent editor={editor} />
        {!content && !disabled && (
          <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  )
}

// ================================ CUSTOM HOOKS ================================
function useModuleEditor(initialModule: CMSModule) {
  const [editedModule, setEditedModule] = useState<CMSModule>(initialModule)
  const [originalTopics, setOriginalTopics] = useState<Topic[]>([])
  const [deletedTopicIds, setDeletedTopicIds] = useState<number[]>([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setEditedModule(initialModule)
    setOriginalTopics(initialModule.topics || [])
    setDeletedTopicIds([])
  }, [initialModule])

  const addTopic = useCallback(() => {
    const newTopic: Topic = {
      title: "",
      content: "",
      description: "",
      order_in_module: (editedModule.topics?.length || 0)
    }
    
    setEditedModule(prev => ({
      ...prev,
      topics: [...(prev.topics || []), newTopic]
    }))
  }, [editedModule.topics?.length])

  const updateTopic = useCallback((index: number, field: keyof Topic, value: any) => {
    setEditedModule(prev => {
      const updatedTopics = [...(prev.topics || [])]
      updatedTopics[index] = { ...updatedTopics[index], [field]: value }
      return { ...prev, topics: updatedTopics }
    })
  }, [])

  const removeTopic = useCallback((index: number) => {
    const topic = editedModule.topics?.[index]
    
    if (topic?.id) {
      setDeletedTopicIds(prev => [...prev, topic.id!])
    }
    
    setEditedModule(prev => ({
      ...prev,
      topics: prev.topics?.filter((_, i) => i !== index) || []
    }))
  }, [editedModule.topics])

  const resetToOriginal = useCallback(() => {
    setEditedModule(initialModule)
    setOriginalTopics(initialModule.topics || [])
    setDeletedTopicIds([])
    setIsEditing(false)
  }, [initialModule])

  return {
    editedModule,
    setEditedModule,
    originalTopics,
    deletedTopicIds,
    isEditing,
    setIsEditing,
    addTopic,
    updateTopic,
    removeTopic,
    resetToOriginal,
  }
}

// ================================ MODAL COMPONENTS ================================
interface IconModalProps {
  show: boolean
  onClose: () => void
  currentIcon: string
  onIconChange: (icon: string) => void
  disabled: boolean
}

function IconModal({ show, onClose, currentIcon, onIconChange }: IconModalProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Selecciona un icono</h2>
          <Button variant="ghost" onClick={onClose}>
            <LucideIcons.X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Busca y copia el nombre del icono en{" "}
            <a
              href="https://lucide.dev/icons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              lucide.dev/icons
            </a>{" "}
            y pégalo abajo.
          </p>
          <iframe
            src="https://lucide.dev/icons/"
            title="Lucide Icon Browser"
            className="w-full h-96 border rounded"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="iconName" className="mb-1 block">
            Nombre del icono
          </Label>
          <div className="flex gap-2">
            <Input
              id="iconName"
              value={currentIcon}
              onChange={(e) => onIconChange(e.target.value)}
              placeholder="Ejemplo: BookOpen"
              autoFocus
            />
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText()
                  onIconChange(text)
                } catch {
                  alert("No se pudo acceder al portapapeles. Pega manualmente el nombre del icono.")
                }
              }}
              title="Pegar nombre del icono"
            >
              <LucideIcons.ClipboardPaste className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-black text-white block w-1/4 m-auto mt-2.5" onClick={onClose}>
            Usar este icono
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ConfirmModalProps {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  password: string
  onPasswordChange: (password: string) => void
}

function ConfirmModal({ show, onClose, onConfirm, password, onPasswordChange }: ConfirmModalProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirmar guardado</h2>
        <p className="mb-4 text-gray-700">
          Por favor, ingresa tu contraseña para confirmar el guardado del módulo.
        </p>
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="black" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  )
}

interface SuccessModalProps {
  show: boolean
  onClose: () => void
}

function SuccessModal({ show, onClose }: SuccessModalProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-4 text-green-700">¡Guardado exitoso!</h2>
        <p className="mb-4 text-gray-700">El módulo y los tópicos fueron actualizados correctamente.</p>
        <Button variant="black" onClick={onClose} className="mx-auto">
          Cerrar
        </Button>
      </div>
    </div>
  )
}

// ================================ MAIN COMPONENT ================================
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
  } = useModuleEditor(module)

  // Modal states
  const [showIconModal, setShowIconModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [password, setPassword] = useState("")

  const handleSave = async () => {
    
    try {
      // Update module info
      const { topics, ...moduleWithoutTopics } = editedModule
      await moduleAPI.update(moduleWithoutTopics as CMSModule)

      // Handle topic operations in parallel
      const operations: Promise<any>[] = []

      // Add new topics
      const newTopics = editedModule.topics?.filter(topic => !topic.id) || []
      newTopics.forEach(topic => {
        operations.push(moduleAPI.addTopic(editedModule.module_id, topic))
      })
      debugger;

      // Update existing topics
      const existingTopics = editedModule.topics?.filter(topic => topic.id) || []
      existingTopics.forEach(topic => {
        operations.push(moduleAPI.updateTopic(topic))
      })

      // Delete removed topics
      deletedTopicIds.forEach(topicId => {
        operations.push(moduleAPI.deleteTopic(topicId))
      })

      await Promise.all(operations)

      setIsEditing(false)
      setShowSuccessModal(true)
      onSave?.(editedModule)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      console.error("Save error:", error)
      alert(`Error al guardar: ${errorMessage}`)
    }
  }

  const handleCancel = () => {
    resetToOriginal()
  }

  const handleConfirmSave = () => {
    setShowConfirmModal(false)
    setPassword("")
    handleSave()
  }

  return (
    <div className="h-full overflow-y-auto">

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-r ${editedModule.color} rounded-xl`}>
              {/* Icon placeholder */}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{isEditing ? "Editando Módulo" : "Vista de Módulo"}</h1>
              <p className="text-gray-600">
                {/* Module description */}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* The Switch for module active state */}
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

            {/* If the module is being edited or not */}
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button variant="black" onClick={() => setShowConfirmModal(true)}>
                  <LucideIcons.Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </>
            ) : (
              <Button variant="black" onClick={() => setIsEditing(true)}>
                <LucideIcons.Edit3 className="h-4 w-4 mr-2" />Editar
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* HEADER */}

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Target className="h-5 w-5" />
                Información Básica
            </CardTitle>
          </CardHeader>

          {/* CARD OF THE MODULE */}
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título del Módulo</Label>
                <Input
                  id="title"
                  value={editedModule.title}
                  onChange={(e) => setEditedModule({ ...editedModule, title: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="icon">Icono</Label>
                <div className="relative">
                  <Input
                    id="icon"
                    value={editedModule.icon}
                    onChange={(e) => setEditedModule({ ...editedModule, icon: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Nombre del icono (ej: Atom, BookOpen)"
                  />
                  {isEditing && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="absolute right-2 top-2"
                      onClick={() => setShowIconModal(true)}
                    >
                      <LucideIcons.Search className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <IconModal
                  show={showIconModal}
                  onClose={() => setShowIconModal(false)}
                  currentIcon={editedModule.icon}
                  onIconChange={(icon) => setEditedModule({ ...editedModule, icon })}
                  disabled={!isEditing}
                />
              </div>
              
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={editedModule.description}
                onChange={(e) => setEditedModule({ ...editedModule, description: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                rows={3}
              />
            </div>

            {/* GRADE SELECTOR */}
            <div>
              <Label htmlFor="grade">Grado</Label>
              <Select
                value={editedModule.grade}
                onValueChange={(value: AllowedGrade) => setEditedModule({ ...editedModule, grade: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="mt-1 bg-gray-100">
                  <SelectValue placeholder="Selecciona el grado" />
                </SelectTrigger>
                <SelectContent className="bg-gray-50">
                  <SelectItem value="10">10° Grado</SelectItem>
                  <SelectItem value="11">11° Grado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* GRADE SELECTOR */}

            {/* MODULE COLOR */}
            <div>
              <Label>Color del Módulo</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => isEditing && setEditedModule({ ...editedModule, color: color.value })}
                    disabled={!isEditing}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      editedModule.color === color.value
                        ? "border-gray-800 scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    } ${!isEditing ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  >
                    <div className={`w-full h-8 rounded ${color.preview}`} />
                    <div className="text-xs mt-1 text-center">{color.label}</div>
                  </button>
                ))}
              </div>
            </div>
            {/* MODULE COLOR */}

            {/* TOPICS SECTION */}
            <div>
              <Label>Tópicos ({editedModule.topics?.length || 0})</Label>
              
              {/* Add Topic Button */}
              <Button
                type="button"
                variant="outline"
                className="ml-2 mb-2"
                onClick={addTopic}
                disabled={!isEditing}
              >
                + Añadir tópico
              </Button>
              
              {/* Topics List */}
              {(editedModule.topics || []).map((topic, idx) => (
                <div key={`topic-${idx}-${topic.id || 'new'}`} className="mb-6 border rounded p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-4">
                    <Input
                      placeholder="Título del tópico"
                      value={topic.title}
                      onChange={e => updateTopic(idx, 'title', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      placeholder="Descripción (opcional)"
                      value={topic.description || ''}
                      onChange={e => updateTopic(idx, 'description', e.target.value)}
                      disabled={!isEditing}
                      className="flex-1"
                    />
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeTopic(idx)}
                        title="Eliminar tópico"
                      >
                        <LucideIcons.Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <TipTapEditor
                    content={topic.content || ''}
                    onChange={(value) => updateTopic(idx, 'content', value)}
                    disabled={!isEditing}
                    placeholder="Contenido del tópico..."
                  />
                  
                  {/* Show topic status */}
                  {isEditing && (
                    <div className="mt-2 text-xs text-gray-500">
                      {topic.id ? `Tópico existente (ID: ${topic.id})` : 'Tópico nuevo - se guardará al confirmar'}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Empty state */}
              {(!editedModule.topics || editedModule.topics.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <LucideIcons.FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No hay tópicos en este módulo</p>
                  {isEditing && (
                    <p className="text-sm">Haz clic en "Añadir tópico" para crear uno</p>
                  )}
                </div>
              )}
            </div>
            {/* TOPICS SECTION */}

          </CardContent>
          {/* CARD OF THE MODULE */}
        </Card>
      </div>

      {/* MODALS */}
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
  )
}