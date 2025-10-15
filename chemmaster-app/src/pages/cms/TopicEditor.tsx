import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import * as LucideIcons from "lucide-react"
import { TipTapEditor } from "./ModuleEditor" // Or import from its own file if separated

export function TopicEditor({
  topics,
  isEditing,
  updateTopic,
  removeTopic,
}: {
  topics: Array<{
    id?: number
    title: string
    description?: string
    content: string
  }>
  isEditing: boolean
  updateTopic: (idx: number, field: string, value: any) => void
  removeTopic: (idx: number) => void
}) {
  return (
    <div>
      {/* Topics List */}
      {(topics || []).map((topic, idx) => (
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
      {(!topics || topics.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          <LucideIcons.FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No hay tópicos en este módulo</p>
          {isEditing && (
            <p className="text-sm">Haz clic en "Añadir tópico" para crear uno</p>
          )}
        </div>
      )}
    </div>
  )
}