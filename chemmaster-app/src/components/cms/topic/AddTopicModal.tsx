import { useState } from 'react'
import { API } from '../../../lib/api'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import { Label } from '../../ui/label'
import { Modal, AlertModal } from '../../ui/modal'
import * as LucideIcons from 'lucide-react'
import { CMSAddTopicModalProps } from '../../../types/cms'
import SuccessModal from '../../common/modals/SuccessModal'

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
    onClose()
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
      await API.AddTopic({
        module_id: moduleId,
        title: title,
        description: description,
        content: "<p>Contenido inicial...</p>",
        order_in_module: topicsCount
      })

      setCreatedTitle(title)
      setTitle("")
      setDescription("")
      onSave()
      setShowSuccess(true)
    } catch (error) {
      // TODO: USE MODAL ERROR
      setAlertConfig({
        show: true,
        title: "Error al crear",
        msg: "No se pudo crear el tópico: " + String(error),
        variant: "destructive"
      })
    } finally {
      setIsAdding(false)
    }
  }

  const footerContent = (
    <>
      <Button variant="ghost" onClick={handleClose} disabled={isAdding}>
        Cancelar
      </Button>
      <Button
        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]"
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
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600 shrink-0">
              <LucideIcons.Lightbulb className="h-5 w-5" />
            </div>
            <div className="text-sm text-emerald-800">
              <p className="font-semibold">Tip:</p>
              <p>Estás creando la estructura del tema. Podrás editar el contenido rico (imágenes, texto, videos) en el siguiente paso.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-title" className="text-sm font-semibold text-gray-700">
                Título del Tópico <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <LucideIcons.Type className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="add-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && title.trim() && handleAdd()}
                  disabled={isAdding}
                  className="pl-10 h-11 border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Ej: Estructura de la materia"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-description" className="text-sm font-semibold text-gray-700">
                Descripción <span className="text-slate-400 font-normal">(Opcional)</span>
              </Label>
              <Textarea
                id="add-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isAdding}
                className="min-h-[100px] border-gray-200 focus:border-emerald-500 bg-gray-50 focus:bg-white resize-none"
                placeholder="Breve resumen de lo que tratará este tópico..."
              />
            </div>
          </div>
        </div>
      </Modal>

      <SuccessModal
        show={showSuccess}
        onClose={handleSuccessClose}
        title="¡Tópico Creado!"
        message={`El tópico "${createdTitle}" fue creado exitosamente.`}
      />

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