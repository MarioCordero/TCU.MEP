import { Module } from '../../../types/cms'
import { Button } from '../../ui/button'
import { Modal, AlertModal } from '../../ui/modal'
import * as LucideIcons from 'lucide-react'
import { useModuleDelete } from '../../../hooks/useModuleDelete'
import SuccessModal from '../../common/modals/SuccessModal'

interface DeleteModuleModalProps {
  module: Module | undefined
  onClose: () => void
  onModuleDeleted: (moduleId: number) => void
}

export default function DeleteModuleModal({
  module,
  onClose,
  onModuleDeleted
}: DeleteModuleModalProps) {

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
  } = useModuleDelete(onModuleDeleted)

  const handleOpen = () => {
    if (module?.id) requestDelete(module.id, module.title)
  }

  const handleSuccessClose = () => {
    clearDeleteSuccess()
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={deleteConfirmation.show}
        onClose={cancelDelete}
        maxWidth="max-w-md"
      >
        <div className="p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 mb-6 ring-8 ring-white shadow-xl shadow-red-100">
            <LucideIcons.Trash2 className="h-10 w-10 text-red-600" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">¿Eliminar Módulo?</h3>

          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4 text-left">
            <div className="flex gap-3">
              <LucideIcons.AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">
                Esta acción es <b>irreversible</b>. Se eliminará el módulo{" "}
                <b>"{deleteConfirmation.moduleTitle}"</b> y todo su contenido permanentemente.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-center w-full">
            <Button
              variant="ghost"
              onClick={cancelDelete}
              disabled={isDeleting}
              className="flex-1 h-12 text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200"
            >
              {isDeleting ? (
                <LucideIcons.Loader2 className="h-4 w-4 animate-spin" />
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

      <SuccessModal
        show={showDeleteSuccess}
        onClose={handleSuccessClose}
        title="¡Módulo Eliminado!"
        message={`El módulo "${deleteConfirmation.moduleTitle || ''}" fue eliminado correctamente.`}
      />

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