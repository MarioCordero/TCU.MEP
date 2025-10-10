import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import * as LucideIcons from "lucide-react"

// ================================ TYPES ================================
export type Topic = {
  title: string
  description?: string
  content: any
  order_in_module?: number
  id?: number
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

// ================================ TOPIC EDITOR COMPONENT ================================
interface TopicEditorProps {
  topic: Topic
  index: number
  isEditing: boolean
  onUpdate: (index: number, field: keyof Topic, value: any) => void
  onRemove: (index: number) => void
}

export function TopicEditor({ topic, index, isEditing, onUpdate, onRemove }: TopicEditorProps) {
  return (
    <div className="mb-6 border rounded p-4 bg-gray-50">
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Título del tópico"
          value={topic.title}
          onChange={e => onUpdate(index, 'title', e.target.value)}
          disabled={!isEditing}
        />
        <Input
          placeholder="Descripción (opcional)"
          value={topic.description || ''}
          onChange={e => onUpdate(index, 'description', e.target.value)}
          disabled={!isEditing}
          className="flex-1"
        />
        {isEditing && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => onRemove(index)}
            title="Eliminar tópico"
          >
            <LucideIcons.Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <TipTapEditor
          content={topic.content || ''}
          onChange={(value) => onUpdate(index, 'content', value)}
          disabled={!isEditing}
          placeholder="Contenido del tópico..."
        />
      ) : (
        <div className="prose bg-white p-3 rounded min-h-[100px]">
          <div dangerouslySetInnerHTML={{ __html: topic.content || '<em>Sin contenido</em>' }} />
        </div>
      )}
      
      {/* Show topic status */}
      {isEditing && (
        <div className="mt-2 text-xs text-gray-500">
          {topic.id ? `Tópico existente (ID: ${topic.id})` : 'Tópico nuevo - se guardará al confirmar'}
        </div>
      )}
    </div>
  )
}