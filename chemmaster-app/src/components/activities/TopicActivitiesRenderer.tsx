import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { API } from '../../lib/api'
import QuizActivity from './QuizActivity'
import MatchActivity from './MatchActivity'
import FillBlankActivity from './FillBlankActivity'
import DragDropActivity from './DragDropActivity'
import WordSoupActivity from './WordSoupActivity'

import { Activity, TopicActivitiesRendererProps, ActivityResult  } from '../../types/activities'

export default function TopicActivitiesRenderer({
  moduleId,
  topicId,
  topicTitle,
  onBack,
  onPassed,
}: TopicActivitiesRendererProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<Record<number, ActivityResult>>({})
  const hasNotifiedPassRef = useRef(false)
  const totalEarned = useMemo(
    () => Object.values(results).reduce((acc, r) => acc + r.earned, 0),
    [results]
  )

  const totalPossible = useMemo(
    () => Object.values(results).reduce((acc, r) => acc + r.total, 0),
    [results]
  )

  const answeredCount = Object.keys(results).length
  const allAnswered = activities.length > 0 && answeredCount === activities.length
  const passThreshold = 0.6
  const passed = totalPossible > 0 && totalEarned / totalPossible >= passThreshold

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await API.GetActivities(moduleId, topicId)
        setActivities(Array.isArray(data) ? data : [])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al cargar actividades')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [moduleId, topicId])

  useEffect(() => {
    hasNotifiedPassRef.current = false
    setResults({})
  }, [moduleId, topicId])

  useEffect(() => {
    if (allAnswered && passed && !hasNotifiedPassRef.current) {
      hasNotifiedPassRef.current = true
      onPassed?.()
    }
  }, [allAnswered, passed, onPassed])

  const handleActivityResult = (activityId: number, earned: number, total: number) => {
    setResults((prev) => ({
      ...prev,
      [activityId]: { earned, total },
    }))
  }


  const renderActivity = (activity: Activity) => {
    if (activity.id == null) return null;
    
    const onResult = (earned: number, total: number) =>
      handleActivityResult(activity.id, earned, total)

    switch (activity.type) {
      case 'quiz':
        return <QuizActivity key={activity.id} activity={activity} onResult={onResult} />
      case 'match':
        return <MatchActivity key={activity.id} activity={activity} onResult={onResult} />
      case 'fill_blank':
        return <FillBlankActivity key={activity.id} activity={activity} onResult={onResult} />
      case 'drag_drop':
        return <DragDropActivity key={activity.id} activity={activity} onResult={onResult} />
      case 'word_soup':
        return <WordSoupActivity key={activity.id} activity={activity} onResult={onResult} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 max-w-3xl flex items-center justify-between gap-4">
          <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div className="text-right">
            <p className="text-xs text-white/50 uppercase tracking-wide">Actividades</p>
            <h2 className="text-white font-bold">{topicTitle}</h2>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-3xl space-y-6">
          {loading && (
            <div className="flex items-center justify-center text-white/70 py-12">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Cargando actividades...
            </div>
          )}

          {!loading && !error && activities.length > 0 && (
            <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4 text-white">
              <p className="text-sm">
                Respondidas: <span className="font-semibold">{answeredCount}/{activities.length}</span>
              </p>
              <p className="text-sm">
                Puntaje acumulado: <span className="font-semibold">{totalEarned}/{totalPossible}</span>
              </p>
            </div>
          )}

          {!loading && !error && activities.map(renderActivity)}
        </div>
      </main>
    </div>
  )
}