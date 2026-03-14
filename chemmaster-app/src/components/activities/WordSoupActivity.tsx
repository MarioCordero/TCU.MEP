import { useState } from 'react'
import { Grid3x3 } from 'lucide-react'
import { Activity } from '../../types/activities'
import { ActivityComponentProps } from '../../types/activities'

export default function WordSoupActivity({ activity, onResult }: ActivityComponentProps) {
  let words: string[] = []
  let clues: string[] = []

  try {
    const parsed = JSON.parse(activity.content)
    words = Array.isArray(parsed?.words) ? parsed.words : []
    clues = Array.isArray(parsed?.clues) ? parsed.clues : []
  } catch {
    words = []
    clues = []
  }

  const [inputs, setInputs] = useState<string[]>(Array(words.length).fill(''))
  const [submitted, setSubmitted] = useState(false)

  const normalize = (s: string) => s.trim().toUpperCase()
  const correctCount = words.filter((w, i) => normalize(w) === normalize(inputs[i] || '')).length

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300">
          <Grid3x3 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-rose-300 font-semibold">Sopa de letras</p>
          <h3 className="text-white font-bold text-lg">{activity.question || 'Encuentra las palabras'}</h3>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {words.map((_, idx) => (
          <div key={`${activity.id}-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p className="text-white/80 text-sm">
              {clues[idx] ? `${idx + 1}. ${clues[idx]}` : `Palabra ${idx + 1}`}
            </p>
            <input
              value={inputs[idx] || ''}
              onChange={(e) =>
                setInputs((prev) => prev.map((v, i) => (i === idx ? e.target.value : v)))
              }
              disabled={submitted}
              className="rounded-md border border-white/20 bg-gray-900 px-3 py-2 text-white"
              placeholder="Escribe la palabra"
            />
          </div>
        ))}
      </div>

      {!submitted ? (
        <button type="button" onClick={() => setSubmitted(true)} className="rounded-xl px-4 py-2 bg-rose-600 text-white">
          Revisar
        </button>
      ) : (
        <p className="text-sm text-rose-200">
          Resultado: {correctCount}/{words.length}
        </p>
      )}
    </div>
  )
}