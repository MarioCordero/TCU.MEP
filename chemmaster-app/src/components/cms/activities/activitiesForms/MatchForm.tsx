import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'
import { MatchPair } from '../../../../types/activities'

interface MatchFormProps {
  question: string
  onQuestionChange: (v: string) => void
  content: string
  onContentChange: (v: string) => void
  disabled?: boolean
}

export default function MatchForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
  disabled = false,
}: MatchFormProps) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content)
      return {
        pairs: Array.isArray(p?.pairs) && p.pairs.length > 0
          ? p.pairs
          : [{ id: '1', left: '', right: '' }, { id: '2', left: '', right: '' }]
      }
    } catch {
      return { pairs: [{ id: '1', left: '', right: '' }, { id: '2', left: '', right: '' }] }
    }
  })()

  const [pairs, setPairs] = useState<MatchPair[]>(parsed.pairs)

  useEffect(() => {
    try {
      const p = JSON.parse(content)
      if (Array.isArray(p?.pairs) && p.pairs.length > 0) {
        setPairs(p.pairs)
      }
    } catch {
      // Keep current state on parse error
    }
  }, [content])

  const update = (newPairs: MatchPair[]) => {
    setPairs(newPairs)
    onContentChange(JSON.stringify({ pairs: newPairs }))
  }

  const handlePair = (id: string, side: 'left' | 'right', value: string) => {
    update(pairs.map(p => p.id === id ? { ...p, [side]: value } : p))
  }

  const addPair = () => {
    update([...pairs, { id: Date.now().toString(), left: '', right: '' }])
  }

  const removePair = (id: string) => {
    if (pairs.length <= 2) return
    update(pairs.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Instrucción</label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:bg-slate-50 disabled:text-slate-500"
          placeholder="Ej: Relaciona cada elemento con su definición"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">Columna A</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">Columna B</span>
        </div>
        <div className="space-y-2">
          {pairs.map((pair, i) => (
            <div key={pair.id} className="flex items-center gap-2">
              <span className="shrink-0 text-xs text-slate-400 w-5">{i + 1}.</span>
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:bg-slate-50 disabled:text-slate-500"
                placeholder="Concepto"
                value={pair.left}
                onChange={e => handlePair(pair.id, 'left', e.target.value)}
                disabled={disabled}
              />
              <LucideIcons.ArrowRight className="h-4 w-4 text-slate-300 shrink-0" />
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:bg-slate-50 disabled:text-slate-500"
                placeholder="Definición"
                value={pair.right}
                onChange={e => handlePair(pair.id, 'right', e.target.value)}
                disabled={disabled}
              />
              <button
                type="button"
                onClick={() => removePair(pair.id)}
                disabled={disabled || pairs.length <= 2}
                className="shrink-0 text-slate-300 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LucideIcons.X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPair}
          disabled={disabled}
          className="mt-3 flex items-center gap-1.5 text-sm text-purple-500 hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LucideIcons.Plus className="h-4 w-4" />
          Agregar par
        </button>
      </div>
    </div>
  )
}