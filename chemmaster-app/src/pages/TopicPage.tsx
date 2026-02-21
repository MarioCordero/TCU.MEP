import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from '../lib/api'
import { Topic, Module } from '../types/cms'
import TopicLearningPage from '../components/topic-selection/TopicLearningPage'

export default function TopicPage() {
  const { gradeId, moduleId, topicId } = useParams<{
    gradeId: string
    moduleId: string
    topicId: string
  }>()
  const navigate = useNavigate()

  const [topic, setTopic] = useState<Topic | null>(null)
  const [module, setModule] = useState<Module | null>(null)
  const [totalTopics, setTotalTopics] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!moduleId || !topicId || !gradeId) return

      try {
        setLoading(true)
        setError(null)

        // Fetch all topics for the module
        const topics = await API.GetTopics(parseInt(moduleId))
        setTotalTopics(topics.length)

        // Find the specific topic
        const foundTopic = topics.find((t) => t.id === parseInt(topicId))
        if (!foundTopic) {
          throw new Error('Topic not found')
        }
        setTopic(foundTopic)

        // Fetch module details (you may need to add this API call)
        // For now, we'll use default values
        setModule({
          id: parseInt(moduleId),
          title: 'Module',
          color: 'from-violet-500 to-purple-600',
        } as Module)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading topic')
        console.error('Error fetching topic:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [gradeId, moduleId, topicId])

  const handleBack = () => {
    navigate(`/grade/${gradeId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white/60">Cargando tema...</div>
      </div>
    )
  }

  if (error || !topic || !module) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-red-400">{error || 'No se pudo cargar el tema'}</div>
      </div>
    )
  }

  return (
    <TopicLearningPage
      topic={topic}
      moduleId={parseInt(moduleId!)}
      moduleColor={module.color || 'from-gray-500 to-gray-400'}
      gradeId={gradeId!}
      totalTopicsInModule={totalTopics}
      onBack={handleBack}
    />
  )
}