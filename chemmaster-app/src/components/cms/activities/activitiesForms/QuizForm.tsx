import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'
import { QuizOption } from '../../../../types/activities'

interface QuizFormProps {
  question: string
  onQuestionChange: (v: string) => void
  content: string
  onContentChange: (v: string) => void
  disabled?: boolean
}

export default function QuizForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
  disabled = false,
}: QuizFormProps) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content)
      return {
        options: Array.isArray(p?.options) && p.options.length > 0
          ? p.options
          : [{ id: '1', text: '', isCorrect: false }, { id: '2', text: '', isCorrect: false }]
      }
    } catch {
      return { options: [{ id: '1', text: '', isCorrect: false }, { id: '2', text: '', isCorrect: false }] }
    }
  })()

  const [options, setOptions] = useState<QuizOption[]>(parsed.options)

  useEffect(() => {
    try {
      const p = JSON.parse(content)
      if (Array.isArray(p?.options) && p.options.length > 0) {
        setOptions(p.options)
      }
    } catch {
      // Keep current state on parse error
    }
  }, [content])

  const update = (newOptions: QuizOption[]) => {
    setOptions(newOptions)
    const jsonContent = JSON.stringify({ options: newOptions })
    onContentChange(jsonContent)
  }

  const handleOptionText = (id: string, text: string) => {
    update(options.map(o => o.id === id ? { ...o, text } : o))
  }

  const handleCorrect = (id: string) => {
    update(options.map(o => ({ ...o, isCorrect: o.id === id })))
  }

  const addOption = () => {
    update([...options, { id: Date.now().toString(), text: '', isCorrect: false }])
  }

  const removeOption = (id: string) => {
    if (options.length <= 2) return
    update(options.filter(o => o.id !== id))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Pregunta</label>
        <textarea
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none disabled:bg-slate-50 disabled:text-slate-500"
          rows={3}
          placeholder="Escribe la pregunta aquí..."
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Opciones <span className="text-slate-400 font-normal">(marca la correcta)</span>
        </label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <div key={opt.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCorrect(opt.id)}
                disabled={disabled}
                className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  opt.isCorrect
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-300 hover:border-emerald-400'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title="Marcar como correcta"
              >
                {opt.isCorrect && <LucideIcons.Check className="h-3 w-3" />}
              </button>
              <span className="shrink-0 text-xs text-slate-400 w-5">{String.fromCharCode(65 + i)}.</span>
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-slate-50 disabled:text-slate-500"
                placeholder={`Opción ${String.fromCharCode(65 + i)}`}
                value={opt.text}
                onChange={e => handleOptionText(opt.id, e.target.value)}
                disabled={disabled}
              />
              <button
                type="button"
                onClick={() => removeOption(opt.id)}
                disabled={disabled || options.length <= 2}
                className="shrink-0 text-slate-300 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LucideIcons.X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addOption}
          disabled={disabled}
          className="mt-3 flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LucideIcons.Plus className="h-4 w-4" />
          Agregar opción
        </button>
      </div>
    </div>
  )
}