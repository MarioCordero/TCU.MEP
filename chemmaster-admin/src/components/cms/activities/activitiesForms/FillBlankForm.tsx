import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'

interface FillBlankFormProps {
  question: string
  onQuestionChange: (v: string) => void
  content: string
  onContentChange: (v: string) => void
  disabled?: boolean
}

export default function FillBlankForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
  disabled = false,
}: FillBlankFormProps) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content)
      return {
        text: typeof p?.text === 'string' ? p.text : '',
        answers: Array.isArray(p?.answers) ? p.answers : []
      }
    } catch {
      return { text: '', answers: [] }
    }
  })()

  const [text, setText] = useState(parsed.text)

  useEffect(() => {
    try {
      const p = JSON.parse(content)
      if (typeof p?.text === 'string') {
        setText(p.text)
      }
    } catch {
      // Keep current state on parse error
    }
  }, [content])

  const handleTextChange = (val: string) => {
    setText(val)
    const answers = [...val.matchAll(/\{\{(.+?)\}\}/g)].map(m => m[1].trim())
    onContentChange(JSON.stringify({ text: val, answers }))
  }

  const blanks = [...text.matchAll(/\{\{(.+?)\}\}/g)].map(m => m[1].trim())

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Instrucción</label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:bg-slate-50 disabled:text-slate-500"
          placeholder="Ej: Completa el espacio en blanco"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Texto con espacios{' '}
          <span className="text-slate-400 font-normal">
            — usa <code className="bg-slate-100 px-1 rounded text-emerald-600">{`{{respuesta}}`}</code>
          </span>
        </label>
        <textarea
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 font-mono resize-none disabled:bg-slate-50 disabled:text-slate-500"
          rows={5}
          placeholder={`Ej: El agua tiene fórmula {{H2O}} y es un {{líquido}} a temperatura ambiente.`}
          value={text}
          onChange={e => handleTextChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      {blanks.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
          <p className="text-xs font-semibold text-emerald-700 mb-2">
            <LucideIcons.CheckCircle2 className="h-3.5 w-3.5 inline mr-1" />
            {blanks.length} respuesta(s) detectada(s):
          </p>
          <div className="flex flex-wrap gap-2">
            {blanks.map((b, i) => (
              <span key={i} className="bg-white border border-emerald-200 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">
                {i + 1}. {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}