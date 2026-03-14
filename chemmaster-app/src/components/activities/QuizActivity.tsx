import { useState } from 'react'
import { Brain, CheckCircle2, XCircle } from 'lucide-react'
import { QuizOption, QuizActivityProps } from '../../types/activities'
import { ActivityComponentProps } from '../../types/activities'

export default function QuizActivity({ activity, onResult }: ActivityComponentProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  let options: QuizOption[] = []
  try {
    const parsed = JSON.parse(activity.content)
    options = Array.isArray(parsed?.options) ? parsed.options : []
  } catch {
    options = []
  }

  const correctIndex = options.findIndex((o) => o.isCorrect)

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    onResult?.(selected === correctIndex ? 1 : 0, 1)
  }

  const isCorrect = submitted && selected === correctIndex

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-violet-500/20 text-violet-300">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-violet-300 font-semibold">Quiz</p>
          <h3 className="text-white font-bold text-lg">{activity.question || 'Pregunta sin título'}</h3>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {options.map((option, index) => {
          const picked = selected === index
          const showCorrect = submitted && index === correctIndex
          const showWrong = submitted && picked && index !== correctIndex

          return (
            <button
              key={option.id || `${activity.id}-${index}`}
              type="button"
              onClick={() => !submitted && setSelected(index)}
              className={`w-full text-left rounded-xl border px-4 py-3 transition ${
                showCorrect
                  ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                  : showWrong
                  ? 'border-red-400 bg-red-500/20 text-red-100'
                  : picked
                  ? 'border-violet-400 bg-violet-500/20 text-white'
                  : 'border-white/10 bg-white/5 text-white/90 hover:bg-white/10'
              }`}
            >
              <span className="font-semibold text-violet-300 mr-2">{String.fromCharCode(65 + index)}.</span>
              {option.text}
            </button>
          )
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected === null}
          className="rounded-xl px-4 py-2 bg-violet-600 text-white disabled:opacity-50"
        >
          Revisar respuesta
        </button>
      ) : (
        <div className={`flex items-center gap-2 text-sm ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
          {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {isCorrect ? '¡Correcto!' : 'Incorrecto.'}
        </div>
      )}
    </div>
  )
}