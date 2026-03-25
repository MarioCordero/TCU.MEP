import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'
import { WordSoupRow } from '../../../../types/activities'

interface WordSoupFormProps {
  question: string
  onQuestionChange: (v: string) => void
  content: string
  onContentChange: (v: string) => void
  disabled?: boolean
}

export default function WordSoupForm({
  question,
  onQuestionChange,
  content,
  onContentChange,
  disabled = false,
}: WordSoupFormProps) {
  const parsed = (() => {
    try {
      const p = JSON.parse(content)
      return {
        words: Array.isArray(p?.words) ? p.words : [],
        clues: Array.isArray(p?.clues) ? p.clues : []
      }
    } catch {
      return { words: [], clues: [] }
    }
  })()

  const [rows, setRows] = useState<WordSoupRow[]>(
    parsed.words.length > 0
      ? parsed.words.map((w: string, i: number) => ({ id: String(i + 1), word: w, clue: parsed.clues[i] || '' }))
      : [{ id: '1', word: '', clue: '' }, { id: '2', word: '', clue: '' }]
  )

  useEffect(() => {
    try {
      const p = JSON.parse(content)
      if (Array.isArray(p?.words) && p.words.length > 0) {
        setRows(p.words.map((w: string, i: number) => ({ id: String(i + 1), word: w, clue: p.clues?.[i] || '' })))
      }
    } catch {
      // Keep current state on parse error
    }
  }, [content])

  const update = (newRows: WordSoupRow[]) => {
    setRows(newRows)
    onContentChange(JSON.stringify({
      words: newRows.map((r: WordSoupRow) => r.word.toUpperCase()),
      clues: newRows.map((r: WordSoupRow) => r.clue)
    }))
  }

  const handleRow = (id: string, field: 'word' | 'clue', value: string) => {
    update(rows.map((row: WordSoupRow) => row.id === id ? { ...row, [field]: value } : row))
  }

  const addRow = () => update([...rows, { id: Date.now().toString(), word: '', clue: '' }])

  const removeRow = (id: string) => {
    if (rows.length > 2) update(rows.filter((r: WordSoupRow) => r.id !== id))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Instrucción</label>
        <input
          type="text"
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-slate-50 disabled:text-slate-500"
          placeholder="Ej: Encuentra las palabras relacionadas con los elementos químicos"
          value={question}
          onChange={e => onQuestionChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div>
        <div className="grid grid-cols-2 gap-2 mb-2 px-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Palabra</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pista (opcional)</span>
        </div>
        <div className="space-y-2">
          {rows.map((row, i) => (
            <div key={row.id} className="flex items-center gap-2">
              <span className="shrink-0 text-xs text-slate-400 w-5">{i + 1}.</span>
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 uppercase font-mono disabled:bg-slate-50 disabled:text-slate-500"
                placeholder="PALABRA"
                value={row.word}
                onChange={e => handleRow(row.id, 'word', e.target.value.toUpperCase())}
                disabled={disabled}
              />
              <input
                type="text"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:bg-slate-50 disabled:text-slate-500"
                placeholder="Ej: Símbolo del Oro"
                value={row.clue}
                onChange={e => handleRow(row.id, 'clue', e.target.value)}
                disabled={disabled}
              />
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                disabled={disabled || rows.length <= 2}
                className="shrink-0 text-slate-300 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LucideIcons.X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          disabled={disabled}
          className="mt-3 flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LucideIcons.Plus className="h-4 w-4" />
          Agregar palabra
        </button>
      </div>
    </div>
  )
}