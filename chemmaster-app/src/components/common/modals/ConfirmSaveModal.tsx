import { useState } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Modal } from '../../ui/modal'
import * as LucideIcons from 'lucide-react'
import { ConfirmSaveModalProps } from '../../../types/modals'
import SuccessModal from './SuccessModal'

export default function ConfirmSaveModal({
  show,
  onClose,
  onConfirm,
  title = "Confirmar Cambios",
  description = "Estás a punto de guardar cambios sensibles en la estructura del módulo.",
  hint = "Por favor, ingresa tu contraseña de administrador para continuar.",
  successTitle = "¡Guardado Exitoso!",
  successMessage = "Los cambios fueron guardados correctamente."
}: ConfirmSaveModalProps) {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConfirm = async () => {
    if (!password) return
    setIsLoading(true)
    setError("")

    try {
      await onConfirm(password)
      setPassword("")
      setShowSuccess(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al confirmar"
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setPassword("")
    setError("")
    onClose()
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onClose()
  }

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={handleClose} disabled={isLoading}>
        Cancelar
      </Button>
      <Button
        onClick={handleConfirm}
        disabled={!password || isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
      >
        {isLoading
          ? <LucideIcons.Loader2 className="h-4 w-4 animate-spin" />
          : "Confirmar"
        }
      </Button>
    </>
  )

  return (
    <>
      <Modal
        isOpen={show && !showSuccess}
        onClose={handleClose}
        title={title}
        maxWidth="max-w-md"
        footer={modalFooter}
      >
        <div className="p-8 flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center ring-8 ring-blue-50/50">
            <LucideIcons.LockKeyhole className="h-8 w-8 text-blue-600" />
          </div>

          <div className="space-y-2">
            <p className="text-slate-600">{description}</p>
            <p className="text-sm text-slate-400">{hint}</p>
          </div>

          <div className="w-full space-y-2">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")   // clear error on type
              }}
              onKeyDown={(e) => e.key === "Enter" && password && handleConfirm()}
              className={`h-11 focus:border-blue-500 transition-colors ${
                error ? "border-red-400 focus:border-red-400 bg-red-50" : "border-slate-200"
              }`}
              autoFocus
            />
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <LucideIcons.AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <SuccessModal
        show={showSuccess}
        onClose={handleSuccessClose}
        title={successTitle}
        message={successMessage}
      />
    </>
  )
}