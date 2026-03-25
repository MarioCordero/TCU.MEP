import { API } from '../../../lib/api'
import { Button } from '../../ui/button'
import * as LucideIcons from 'lucide-react'
import { useState, useEffect } from 'react'
import { Modal, AlertModal } from '../../ui/modal'
import SuccessModal from '../../common/modals/SuccessModal'
import { Activity, ActivityType } from '../../../types/activities'
import { ActivityEditorModalProps } from '../../../types/activities'
import { QuizForm, MatchForm, FillBlankForm, DragDropForm, WordSoupForm } from './activitiesForms'

// ─── Activity Type Config ─────────────────────────────────────────────────────

const ACTIVITY_TYPES: {
  type: ActivityType
  label: string
  icon: keyof typeof LucideIcons
  color: string
  bgColor: string
  borderColor: string
}[] = [
  {
    type: 'quiz',
    label: 'Quiz',
    icon: 'HelpCircle',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    type: 'match',
    label: 'Relacionar',
    icon: 'GitMerge',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    type: 'fill_blank',
    label: 'Completar',
    icon: 'PenLine',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    type: 'drag_drop',
    label: 'Arrastrar',
    icon: 'GripVertical',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    type: 'word_soup',
    label: 'Sopa de Letras',
    icon: 'Grid3x3',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
]

export default function ActivityEditorModal({
  show,
  activity,
  onClose,
  onSave,
}: ActivityEditorModalProps) {
  const [editedActivity, setEditedActivity] = useState<Activity>(activity)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setEditedActivity(activity)
    setHasChanges(false)
    setSaveError("")
  }, [activity, show])

  const handleFieldChange = (field: keyof Activity, value: any) => {
    setEditedActivity(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    if (!editedActivity.id) {
      setSaveError("ID de la actividad no encontrado")
      return
    }

    if (!editedActivity.question?.trim()) {
      setSaveError("La pregunta es obligatoria")
      return
    }

    setIsSaving(true)
    setSaveError("")

    try {
      const contentStr = typeof editedActivity.content === 'string'
        ? editedActivity.content
        : JSON.stringify(editedActivity.content)

      await API.Activity.Update(editedActivity.id, {
        type: editedActivity.type as ActivityType,
        question: editedActivity.question,
        content: contentStr,
        order_in_topic: editedActivity.order_in_topic,
      })

      onSave(editedActivity)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
      setSaveError("No se pudo guardar: " + errorMsg)
    } finally {
      setIsSaving(false)
    }
  }

  const selectedConfig = ACTIVITY_TYPES.find(a => a.type === editedActivity.type)
  const Icon = selectedConfig ? (LucideIcons[selectedConfig.icon] as React.ComponentType<{ className?: string }>) : null

  const renderForm = () => {
    const formProps = {
      question: editedActivity.question || "",
      onQuestionChange: (q: string) => handleFieldChange('question', q),
      content: typeof editedActivity.content === 'string' ? editedActivity.content : JSON.stringify(editedActivity.content),
      onContentChange: (c: string) => handleFieldChange('content', c),
      disabled: isSaving,
    }

    switch (editedActivity.type) {
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

  const footerContent = (
    <>
      <Button
        variant="ghost"
        onClick={onClose}
        disabled={isSaving}
        className="text-slate-500 hover:text-slate-800"
      >
        Cancelar
      </Button>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
        onClick={handleSave}
        disabled={isSaving || !hasChanges}
      >
        {isSaving ? (
          <>
            <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Guardando...
          </>
        ) : (
          <>
            <LucideIcons.Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </>
        )}
      </Button>
    </>
  )

  return (
    <>
      <Modal
        isOpen={show}
        onClose={onClose}
        title={`Editar Actividad`}
        maxWidth="max-w-2xl"
        footer={footerContent}
      >
        <div className="flex flex-col max-h-[80vh]">
          {/* ── Header Visual ── */}
          <div className="p-6 border-b border-slate-100 shrink-0 flex items-center gap-3">
            {selectedConfig && Icon && (
              <>
                <div className={`${selectedConfig.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${selectedConfig.color}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Tipo de Actividad</p>
                  <p className={`text-sm font-bold ${selectedConfig.color}`}>{selectedConfig.label}</p>
                </div>
              </>
            )}
          </div>

          {/* ── Content ── */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Error Alert */}
            {saveError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <LucideIcons.AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-red-800">Error al guardar</p>
                  <p className="text-sm text-red-700">{saveError}</p>
                </div>
              </div>
            )}

            {/* Form Content */}
            {renderForm()}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
              <LucideIcons.Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Consejos:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>No se puede cambiar el tipo de actividad</li>
                  <li>Los cambios se guardan automáticamente</li>
                  <li>Puedes editar todos los campos de la actividad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Error Alert Modal */}
      <AlertModal
        isOpen={!!saveError}
        onClose={() => setSaveError("")}
        title="Error al guardar"
        message={saveError}
        variant="destructive"
      />
    </>
  )
}