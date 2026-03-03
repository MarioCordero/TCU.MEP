import { Modal } from '../ui/modal'
import { Button } from '../ui/button'
import * as LucideIcons from 'lucide-react'
import { SuccessModalProps } from '../../types/modals'

export default function SuccessModal({
  show,
  onClose,
  title = "¡Operación Exitosa!",
  message = "La acción se completó correctamente."
}: SuccessModalProps) {
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title=""
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce-once">
            <LucideIcons.CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-200 opacity-30 animate-ping" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500">{message}</p>
        </div>

        <Button
          onClick={onClose}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-11 shadow-lg shadow-emerald-200 transition-all active:scale-95"
        >
          <LucideIcons.Check className="h-4 w-4 mr-2" />
          Aceptar
        </Button>
      </div>
    </Modal>
  )
}