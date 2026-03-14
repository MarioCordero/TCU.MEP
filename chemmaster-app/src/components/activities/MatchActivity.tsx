import { useMemo, useState } from 'react'
import { Link2 } from 'lucide-react'
import { Activity } from '../../types/activities'
import { ActivityComponentProps, MatchPair } from '../../types/activities'

export default function MatchActivity({ activity, onResult }: ActivityComponentProps) {
  let pairs: MatchPair[] = []
  try {
    const parsed = JSON.parse(activity.content)
    pairs = Array.isArray(parsed?.pairs) ? parsed.pairs : []
  } catch {
    pairs = []
  }

  const rightOptions = useMemo(() => [...pairs].sort(() => Math.random() - 0.5), [activity.id])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (leftId: string, rightId: string) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [leftId]: rightId }))
  }

  const allAnswered = pairs.every((p) => answers[p.id])
  const correctCount = pairs.filter((p) => answers[p.id] === p.id).length

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
          <Link2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-purple-300 font-semibold">Relacionar</p>
          <h3 className="text-white font-bold text-lg">{activity.question || 'Actividad de relación'}</h3>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {pairs.map((pair, idx) => {
          const picked = answers[pair.id] || ''
          const ok = submitted && picked === pair.id
          const bad = submitted && picked && picked !== pair.id

          return (
            <div key={pair.id || `${activity.id}-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/90">{pair.left}</div>
              <select
                value={picked}
                onChange={(e) => handleChange(pair.id, e.target.value)}
                disabled={submitted}
                className={`rounded-xl border px-4 py-3 bg-gray-900 text-white ${
                  ok ? 'border-emerald-400' : bad ? 'border-red-400' : 'border-white/10'
                }`}
              >
                <option value="">Selecciona...</option>
                {rightOptions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.right}
                  </option>
                ))}
              </select>
            </div>
          )
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="rounded-xl px-4 py-2 bg-purple-600 text-white disabled:opacity-50"
        >
          Revisar respuestas
        </button>
      ) : (
        <p className="text-sm text-purple-200">
          Resultado: {correctCount}/{pairs.length}
        </p>
      )}
    </div>
  )
}