import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'
import { DragItem } from '../../../../types/activities'

interface DragDropFormProps {
  question: string
  onQuestionChange: (v: string) => void
  content: string
  onContentChange: (v: string) => void
  disabled?: boolean
}

export default function DragDropForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
  disabled = false,
}: DragDropFormProps) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content)
      return {
        items: Array.isArray(p?.items) && p.items.length > 0
          ? p.items
          : [{ id: '1', text: '', order: 1 }, { id: '2', text: '', order: 2 }]
      }
    } catch {
      return { items: [{ id: '1', text: '', order: 1 }, { id: '2', text: '', order: 2 }] }
    }
  })()

  const [items, setItems] = useState<DragItem[]>(parsed.items)

  useEffect(() => {
    try {
      const p = JSON.parse(content)
      if (Array.isArray(p?.items) && p.items.length > 0) {
        setItems(p.items)
      }
    } catch {
      // Keep current state on parse error
    }
  }, [content])

  const update = (newItems: DragItem[]) => {
    setItems(newItems)
    onContentChange(JSON.stringify({ items: newItems }))
  }

  const handleItem = (id: string, text: string) => {
    update(items.map(item => item.id === id ? { ...item, text } : item))
  }

  const addItem = () => {
    const newOrder = items.length + 1
    update([...items, { id: Date.now().toString(), text: '', order: newOrder }])
  }

  const removeItem = (id: string) => {
    if (items.length <= 2) return
    const filtered = items.filter(i => i.id !== id).map((item, index) => ({ ...item, order: index + 1 }))
    update(filtered)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Instrucción</label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:bg-slate-50 disabled:text-slate-500"
          placeholder="Ej: Ordena los pasos del procedimiento"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Elementos en orden correcto
        </label>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-lg text-xs font-bold">
                {item.order}
              </div>
              <LucideIcons.GripVertical className="h-4 w-4 text-slate-300 shrink-0" />
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:bg-slate-50 disabled:text-slate-500"
                placeholder={`Elemento ${item.order}`}
                value={item.text}
                onChange={e => handleItem(item.id, e.target.value)}
                disabled={disabled}
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                disabled={disabled || items.length <= 2}
                className="shrink-0 text-slate-300 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LucideIcons.X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItem}
          disabled={disabled}
          className="mt-3 flex items-center gap-1.5 text-sm text-orange-500 hover:text-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LucideIcons.Plus className="h-4 w-4" />
          Agregar elemento
        </button>
      </div>
    </div>
  )
}