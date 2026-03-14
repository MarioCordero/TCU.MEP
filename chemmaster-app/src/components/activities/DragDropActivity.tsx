import { useState } from 'react'
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react'
import { Activity } from '../../types/activities'
import { ActivityComponentProps, DragItem } from '../../types/activities'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function DragDropActivity({ activity, onResult }: ActivityComponentProps) {
  let items: DragItem[] = []
  try {
    const parsed = JSON.parse(activity.content)
    items = Array.isArray(parsed?.items) ? parsed.items : []
  } catch {
    items = []
  }

  const correctOrder = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((i) => i.id)
  const [current, setCurrent] = useState<DragItem[]>(() => shuffle([...items]))
  const [submitted, setSubmitted] = useState(false)
  const currentIsCorrect = current.map((i) => i.id).join('|') === correctOrder.join('|')

  const move = (index: number, dir: -1 | 1) => {
    if (submitted) return
    const next = index + dir
    if (next < 0 || next >= current.length) return
    setCurrent((prev) => {
      const copy = [...prev]
      ;[copy[index], copy[next]] = [copy[next], copy[index]]
      return copy
    })
  }

  const isCorrect =
    submitted && current.map((i) => i.id).join('|') === correctOrder.join('|')

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-orange-500/20 text-orange-300">
          <GripVertical className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-orange-300 font-semibold">Ordenar</p>
          <h3 className="text-white font-bold text-lg">{activity.question || 'Ordena los elementos'}</h3>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {current.map((item, idx) => (
          <div key={item.id || `${activity.id}-${idx}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-orange-300 font-semibold w-6">{idx + 1}.</span>
            <span className="flex-1 text-white/90">{item.text}</span>
            <button type="button" onClick={() => move(idx, -1)} className="p-1 rounded bg-white/10 text-white">
              <ArrowUp className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => move(idx, 1)} className="p-1 rounded bg-white/10 text-white">
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button type="button" onClick={() => setSubmitted(true)} className="rounded-xl px-4 py-2 bg-orange-600 text-white">
          Revisar orden
        </button>
      ) : (
        <p className={`text-sm ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
          {isCorrect ? '¡Orden correcto!' : 'El orden no es correcto.'}
        </p>
      )}
    </div>
  )
}