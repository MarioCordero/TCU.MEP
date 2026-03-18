import { useState } from 'react'
import { API } from '../../../lib/api'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Button } from '../../ui/button'
import * as LucideIcons from 'lucide-react'
import { Textarea } from '../../ui/textarea'
import { Modal, AlertModal } from '../../ui/modal'
import SuccessModal from '../../common/modals/SuccessModal'
import { CMSAddTopicModalProps, Topic } from '../../../types/cms'

export default function AddTopicModal({
  show,
  onClose,
  onSave,
  moduleId,
  topicsCount
}: CMSAddTopicModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [createdTitle, setCreatedTitle] = useState("")

  const [alertConfig, setAlertConfig] = useState<{
    show: boolean
    title: string
    msg: string
    variant: "destructive" | "warning" | "default"
  }>({ show: false, title: "", msg: "", variant: "default" })

  const handleClose = () => {
    setTitle("")
    setDescription("")
    setAlertConfig({ show: false, title: "", msg: "", variant: "default" })
    onClose()
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    handleClose()
  }

  const handleAdd = async () => {
    if (!title.trim()) {
      setAlertConfig({
        show: true,
        title: "Título Requerido",
        msg: "El tópico necesita un título para ser creado.",
        variant: "warning"
      })
      return
    }

    setIsAdding(true)
    
    try {
      const result = await API.Topic.Add({
        module_id: moduleId,
        title: title.trim(),
        description: description.trim() || undefined,
        content: "<p>Contenido inicial...</p>",
        order_in_module: topicsCount + 1
      })

      const newTopic: Topic = {
        id: result.id,
        module_id: moduleId,
        title: title,
        description: description || undefined,
        content: "<p>Contenido inicial...</p>",
        order_in_module: topicsCount + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      setCreatedTitle(title)
      setTitle("")
      setDescription("")
      onSave(newTopic)
      setShowSuccess(true)

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
      console.error('Add topic error:', errorMsg)
      
      setAlertConfig({
        show: true,
        title: "Error al crear",
        msg: `No se pudo crear el tópico: ${errorMsg}`,
        variant: "destructive"
      })
    } finally {
      setIsAdding(false)
    }
  }

  const footerContent = (
    <>
      <Button 
        variant="ghost" 
        onClick={handleClose} 
        disabled={isAdding}
        className="text-slate-500 hover:text-slate-800"
      >
        Cancelar
      </Button>
      <Button
        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px] shadow-lg shadow-emerald-200 transition-all active:scale-95"
        onClick={handleAdd}
        disabled={isAdding || !title.trim()}
      >
        {isAdding ? (
          <>
            <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Creando...
          </>
        ) : (
          <>
            <LucideIcons.Plus className="h-4 w-4 mr-2" />
            Crear Tópico
          </>
        )}
      </Button>
    </>
  )

  return (
    <>
      <Modal
        isOpen={show && !showSuccess}
        onClose={handleClose}
        title="Nuevo Tópico"
        maxWidth="max-w-xl"
        footer={footerContent}
      >
        <div className="p-8 space-y-6">
          {/* Info Box */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 shrink-0 mt-0.5">
              <LucideIcons.Lightbulb className="h-5 w-5" />
            </div>
            <div className="text-sm text-emerald-800">
              <p className="font-semibold mb-1">Consejo:</p>
              <p>Estás creando la estructura del tema. Podrás editar el contenido rico (imágenes, texto, videos) en el siguiente paso.</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="add-title" className="text-sm font-semibold text-slate-700">
                Título del Tópico <span className="text-red-500 font-bold">*</span>
              </Label>
              <div className="relative">
                <LucideIcons.Type className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                <Input
                  id="add-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && title.trim() && !isAdding) {
                      handleAdd()
                    }
                  }}
                  disabled={isAdding}
                  className="pl-10 h-11 border-slate-200 focus:border-emerald-500 bg-slate-50 focus:bg-white transition-colors placeholder:text-slate-400"
                  placeholder="Ej: Estructura de la materia"
                  autoFocus
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {title.length} / 255 caracteres
              </p>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="add-description" className="text-sm font-semibold text-slate-700">
                Descripción <span className="text-slate-400 font-normal text-xs">(Opcional)</span>
              </Label>
              <Textarea
                id="add-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isAdding}
                className="min-h-[100px] border-slate-200 focus:border-emerald-500 bg-slate-50 focus:bg-white resize-none placeholder:text-slate-400 transition-colors"
                placeholder="Breve resumen de lo que tratará este tópico..."
              />
              <p className="text-xs text-slate-500 mt-1">
                {description.length} / 1000 caracteres
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <SuccessModal
        show={showSuccess}
        onClose={handleSuccessClose}
        title="¡Tópico Creado!"
        message={`El tópico "${createdTitle}" fue creado exitosamente y está listo para editar.`}
      />

      {/* Error Alert Modal */}
      <AlertModal
        isOpen={alertConfig.show}
        onClose={() => setAlertConfig({ ...alertConfig, show: false })}
        title={alertConfig.title}
        message={alertConfig.msg}
        variant={alertConfig.variant}
      />
    </>
  )
}