import { useMemo, useState } from 'react'
import { PenLine } from 'lucide-react'
import { Activity } from '../../types/activities'
import { ActivityComponentProps } from '../../types/activities'

export default function FillBlankActivity({ activity, onResult }: ActivityComponentProps) {
  let text = ''
  try {
    const parsed = JSON.parse(activity.content)
    text = typeof parsed?.text === 'string' ? parsed.text : ''
  } catch {
    text = ''
  }

  const answers = useMemo(() => [...text.matchAll(/\{\{(.+?)\}\}/g)].map((m) => m[1].trim()), [text])
  const [inputs, setInputs] = useState<string[]>(Array(answers.length).fill(''))
  const [submitted, setSubmitted] = useState(false)

  const setInputAt = (idx: number, value: string) => {
    if (submitted) return
    setInputs((prev) => prev.map((v, i) => (i === idx ? value : v)))
  }

  const normalize = (s: string) => s.trim().toLowerCase()
  const correctCount = answers.filter((a, i) => normalize(a) === normalize(inputs[i] || '')).length

  const parts = text.split(/\{\{.+?\}\}/g)

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
          <PenLine className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-300 font-semibold">Completar</p>
          <h3 className="text-white font-bold text-lg">{activity.question || 'Completa los espacios'}</h3>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/90 leading-8">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < answers.length && (
              <input
                value={inputs[i] || ''}
                onChange={(e) => setInputAt(i, e.target.value)}
                disabled={submitted}
                className="mx-2 w-32 rounded-md border border-white/20 bg-gray-900 px-2 py-1 text-white"
              />
            )}
          </span>
        ))}
      </div>

      <div className="mt-4">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="rounded-xl px-4 py-2 bg-emerald-600 text-white"
          >
            Revisar
          </button>
        ) : (
          <p className="text-sm text-emerald-200">
            Resultado: {correctCount}/{answers.length}
          </p>
        )}
      </div>
    </div>
  )
}