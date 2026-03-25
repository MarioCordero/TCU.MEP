import { Card } from '../../ui/card'
import { API } from '../../../lib/api'
import { Button } from '../../ui/button'
import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'
import { Modal, AlertModal } from '../../ui/modal'
import ActivityEditorModal from './ActivityEditorModal'
import SuccessModal from '../../common/modals/SuccessModal'
import { useActivityDelete } from '../../../hooks/useActivityDelete'
import { Activity, ActivityManagerModalProps, ActivityType } from '../../../types/activities'
import { QuizForm, MatchForm, FillBlankForm, DragDropForm, WordSoupForm } from './activitiesForms'

// ─── Activity Type Config ─────────────────────────────────────────────────────

const ACTIVITY_TYPES: {
  type: ActivityType
  label: string
  icon: keyof typeof LucideIcons
  description: string
  color: string
  bgColor: string
  borderColor: string
}[] = [
  {
    type: 'quiz',
    label: 'Quiz',
    icon: 'HelpCircle',
    description: 'Pregunta con opciones múltiples y una respuesta correcta.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    type: 'match',
    label: 'Relacionar',
    icon: 'GitMerge',
    description: 'Relacionar columnas entre conceptos y definiciones.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    type: 'fill_blank',
    label: 'Completar',
    icon: 'PenLine',
    description: 'Completar espacios en blanco dentro de un texto.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    type: 'drag_drop',
    label: 'Arrastrar',
    icon: 'GripVertical',
    description: 'Arrastrar y soltar elementos en el orden correcto.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    type: 'word_soup',
    label: 'Sopa de Letras',
    icon: 'Grid3x3',
    description: 'Encontrar palabras ocultas en una sopa de letras.',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
]

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function ActivityManagerModal({
  show,
  onClose,
  topicId,
  topicTitle,
}: ActivityManagerModalProps) {
  const [step, setStep] = useState<'list' | 'select' | 'create'>('list')
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState("")
  const [selectedType, setSelectedType] = useState<ActivityType | null>(null)
  const [question, setQuestion] = useState('')
  const [content, setContent] = useState('{}')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCreateSuccess, setShowCreateSuccess] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEditSuccess, setShowEditSuccess] = useState(false)
  const [editSuccessTitle, setEditSuccessTitle] = useState("")

  const {
    isDeleting,
    deleteConfirmation,
    deleteError,
    showDeleteSuccess,
    clearDeleteSuccess,
    clearError,
    requestDelete,
    confirmDelete,
    cancelDelete,
  } = useActivityDelete(() => {
    loadActivities()
  })

  const loadActivities = async () => {
    setIsLoading(true)
    setLoadError("")

    try {
      const data = await API.Activity.GetByTopic(topicId)
      setActivities(data || [])
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
      setLoadError("No se pudieron cargar las actividades: " + errorMsg)
      setActivities([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (show) {
      setStep('list')
      loadActivities()
    }
  }, [show, topicId])

  const handleSelectType = (type: ActivityType) => {
    setSelectedType(type)
    setQuestion('')
    setContent('{}')
    setError(null)
    setStep('create')
  }

  const handleBackToList = () => {
    setStep('list')
    setSelectedType(null)
    setError(null)
  }

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity)
    setShowEditModal(true)
  }

  const handleSaveEdit = (updatedActivity: Activity) => {
    setEditSuccessTitle(updatedActivity.question || "Actividad")
    setShowEditSuccess(true)

    setActivities(activities.map(a =>
      a.id === updatedActivity.id ? updatedActivity : a
    ))

    setTimeout(() => {
      setShowEditSuccess(false)
      setShowEditModal(false)
      setEditingActivity(null)
    }, 2000)
  }

  const handleClose = () => {
    setStep('list')
    setSelectedType(null)
    setQuestion('')
    setContent('{}')
    setError(null)
    setShowCreateSuccess(false)
    onClose()
  }

  const handleSuccessClose = () => {
    setShowCreateSuccess(false)
    handleBackToList()
  }

  const handleSave = async () => {
    if (!selectedType) return
    if (!question.trim()) {
      setError('La pregunta o instrucción es requerida.')
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      let contentToSave = content
      try {
        // Validate JSON
        JSON.parse(contentToSave)
      } catch {
        contentToSave = '{}'
      }

      if (!question.trim()) {
        throw new Error('La pregunta es requerida')
      }

      const payload: Omit<Activity, 'id' | 'created_at' | 'updated_at'> = {
        topic_id: topicId,
        type: selectedType,
        question: question.trim(),
        content: contentToSave,
        order_in_topic: activities.length + 1,
      }

      const newActivity = await API.Activity.Add(payload)

      const typedActivity: Activity = {
        ...newActivity,
        type: newActivity.type as ActivityType,
      }
      
      setActivities([...activities, typedActivity])
      setShowCreateSuccess(true)
      setQuestion('')
      setContent('{}')
      setSelectedType(null)
      
    } catch (err: unknown) {
      console.error('Save error details:', err)
      
      let errorMessage = 'Error inesperado.'
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      }
      
      if (errorMessage.includes('HTML')) {
        errorMessage = 'Error del servidor: El servidor respondió con un error. Revisa la consola del navegador.'
      }
      
      setError(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  const selectedConfig = ACTIVITY_TYPES.find(a => a.type === selectedType)
  const getActivityTypeConfig = (type: ActivityType) => ACTIVITY_TYPES.find(a => a.type === type)

  const renderForm = () => {
    const formProps = {
      question,
      onQuestionChange: setQuestion,
      content,
      onContentChange: setContent,
    }

    switch (selectedType) {
      case 'quiz':
        return <QuizForm {...formProps} />
      case 'match':
        return <MatchForm {...formProps} />
      case 'fill_blank':
        return <FillBlankForm {...formProps} />
      case 'drag_drop':
        return <DragDropForm {...formProps} />
      case 'word_soup':
        return <WordSoupForm {...formProps} />
      default:
        return null
    }
  }

  return (
    <>
      <Modal isOpen={show} onClose={handleClose} maxWidth="max-w-4xl">
        <div className="flex flex-col max-h-[85vh]">
          {/* ── Header ── */}
          <div className="p-6 border-b border-slate-100 shrink-0">
            <div className="flex items-center gap-3">
              {(step === 'create' || step === 'select') && (
                <button
                  onClick={handleBackToList}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <LucideIcons.ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <LucideIcons.Trophy className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-slate-800">
                  {step === 'list' && 'Actividades del Tópico'}
                  {step === 'select' && 'Nueva Actividad'}
                  {step === 'create' && `Crear: ${selectedConfig?.label}`}
                </h2>
                <p className="text-xs text-slate-400 truncate">
                  Tópico: <span className="font-medium text-slate-500">{topicTitle}</span>
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <LucideIcons.X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="flex-1 overflow-y-auto p-6">

            {/* Step 1: List Activities */}
            {step === 'list' && (
              <div className="space-y-4">
                {isLoading && (
                  <div className="flex items-center justify-center py-12">
                    <LucideIcons.Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                )}

                {loadError && !isLoading && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <LucideIcons.AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-red-800">Error al cargar</p>
                      <p className="text-sm text-red-700">{loadError}</p>
                    </div>
                  </div>
                )}

                {!isLoading && activities.length === 0 && !loadError && (
                  <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                    <LucideIcons.Gamepad2 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-lg font-medium text-slate-600">No hay actividades</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Este tópico aún no tiene actividades asignadas.
                    </p>
                  </div>
                )}

                {!isLoading && activities.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">
                        {activities.length} {activities.length === 1 ? 'Actividad' : 'Actividades'}
                      </h3>
                    </div>

                    {activities.map((activity, index) => {
                      const config = getActivityTypeConfig(activity.type)
                      const Icon = config ? (LucideIcons[config.icon] as React.ComponentType<{ className?: string }>) : null

                      return (
                        <Card
                          key={activity.id}
                          className="p-4 border border-slate-200 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <div className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">
                                  #{index + 1}
                                </div>
                                {config && (
                                  <div className={`flex items-center gap-1 px-2 py-1 rounded ${config.bgColor}`}>
                                    {Icon && <Icon className="h-3.5 w-3.5" />}
                                    <span className="text-xs font-medium">{config.label}</span>
                                  </div>
                                )}
                              </div>
                              <p className="font-medium text-slate-800 mb-1 line-clamp-2">
                                {activity.question || "Sin pregunta"}
                              </p>
                              <p className="text-xs text-slate-500">
                                ID: {activity.id} | Orden: {activity.order_in_topic || '-'}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                                onClick={() => handleEdit(activity)}
                              >
                                <LucideIcons.FileEdit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={isDeleting === activity.id}
                                className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                                onClick={() => requestDelete(activity.id, activity.question)}
                              >
                                {isDeleting === activity.id ? (
                                  <LucideIcons.Loader2 className="h-4 w-4 animate-spin text-red-500" />
                                ) : (
                                  <LucideIcons.Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Select Activity Type */}
            {step === 'select' && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ACTIVITY_TYPES.map(({ type, label, icon, description, color, bgColor, borderColor }) => {
                  const Icon = LucideIcons[icon] as React.ComponentType<{ className?: string }>
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSelectType(type)}
                      className={`group text-left p-4 rounded-xl border-2 ${borderColor} ${bgColor} hover:shadow-md transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-300`}
                    >
                      <div className={`${color} mb-3`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="font-bold text-slate-800 text-sm mb-1">{label}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{description}</div>
                      <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                        Seleccionar <LucideIcons.ArrowRight className="h-3 w-3" />
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Step 3: Create Form */}
            {step === 'create' && selectedConfig && (
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 ${selectedConfig.bgColor} ${selectedConfig.color} border ${selectedConfig.borderColor}`}>
                  {(() => {
                    const Icon = LucideIcons[selectedConfig.icon] as React.ComponentType<{ className?: string }>
                    return <Icon className="h-3.5 w-3.5" />
                  })()}
                  {selectedConfig.label}
                </div>

                {renderForm()}

                {error && (
                  <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg p-3">
                    <LucideIcons.AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          {step === 'list' && !isLoading && (
            <div className="p-6 border-t border-slate-100 shrink-0 flex justify-end gap-3">
              <Button variant="ghost" onClick={handleClose} className="text-slate-600">
                Cerrar
              </Button>
              <Button
                onClick={() => setStep('select')}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200"
              >
                <LucideIcons.Plus className="h-4 w-4 mr-2" />
                Nueva Actividad
              </Button>
            </div>
          )}

          {step === 'create' && (
            <div className="p-6 border-t border-slate-100 shrink-0 flex gap-3 justify-end">
              <Button variant="ghost" onClick={handleBackToList} className="text-slate-600">
                Atrás
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200"
              >
                {isSaving ? (
                  <>
                    <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <LucideIcons.Save className="h-4 w-4 mr-2" />
                    Guardar Actividad
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Edit Activity Modal */}
      {showEditModal && editingActivity && (
        <ActivityEditorModal
          show={true}
          activity={editingActivity}
          onClose={() => {
            setShowEditModal(false)
            setEditingActivity(null)
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* Success Modal - Create */}
      <SuccessModal
        show={showCreateSuccess}
        onClose={handleSuccessClose}
        title="¡Actividad creada!"
        message="La actividad se creó correctamente."
      />

      {/* Success Modal - Edit */}
      <SuccessModal
        show={showEditSuccess}
        onClose={() => setShowEditSuccess(false)}
        title="¡Actividad Guardada!"
        message={`La actividad "${editSuccessTitle}" fue actualizada correctamente.`}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmation.show}
        onClose={cancelDelete}
        maxWidth="max-w-md"
      >
        <div className="p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6 ring-8 ring-white shadow-xl shadow-red-100">
            <LucideIcons.Trash2 className="h-10 w-10 text-red-600" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">¿Eliminar Actividad?</h3>

          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8 text-left">
            <div className="flex gap-3">
              <LucideIcons.AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm text-red-800">
                <p>
                  Se eliminará la actividad <b>"{deleteConfirmation.activityTitle}"</b> permanentemente.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center w-full">
            <Button
              variant="ghost"
              onClick={cancelDelete}
              disabled={isDeleting !== null}
              className="flex-1 h-12 text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting !== null}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200"
            >
              {isDeleting ? (
                <>
                  <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Eliminando...
                </>
              ) : (
                <>
                  <LucideIcons.Trash2 className="h-4 w-4 mr-2" />
                  Sí, eliminar
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal - Delete */}
      <SuccessModal
        show={showDeleteSuccess}
        onClose={clearDeleteSuccess}
        title="¡Actividad Eliminada!"
        message={`La actividad "${deleteConfirmation.activityTitle || ''}" fue eliminada correctamente.`}
      />

      {/* Error Alert Modal */}
      <AlertModal
        isOpen={!!deleteError}
        onClose={clearError}
        title="Ocurrió un error"
        message={deleteError}
        variant="destructive"
      />
    </>
  )
}