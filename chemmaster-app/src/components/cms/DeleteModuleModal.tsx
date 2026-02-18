import { useState } from 'react'
import { Module } from '../../types/cms'
import { Button } from '../ui/button'
import { API } from '../../lib/api'
import * as LucideIcons from 'lucide-react'

interface DeleteModuleModalProps {
  show: boolean
  moduleId: number | null
  module: Module | undefined
  onClose: () => void
  onModuleDeleted: (moduleId: number) => void
}

export default function DeleteModuleModal({ 
  show, 
  moduleId, 
  module, 
  onClose, 
  onModuleDeleted 
}: DeleteModuleModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteModule = async () => {
    if (!moduleId) return

    setIsLoading(true)
    try {
      await API.DeleteModule(moduleId)
      onModuleDeleted(moduleId)
      onClose()
    } catch (error) {
      alert('Error al eliminar: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!show || !moduleId) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
        
        <div className="p-6 border-b bg-gradient-to-r from-red-50 to-pink-50">
          <h2 className="text-xl font-bold text-gray-800">⚠️ Confirmar Eliminación</h2>
        </div>

        <div className="p-6">
          <p className="text-gray-700">
            ¿Está seguro de que desea eliminar este módulo? Esta acción no se puede deshacer.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Módulo: <strong>{module?.title}</strong>
          </p>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDeleteModule}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LucideIcons.Loader className="h-4 w-4 mr-2 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <LucideIcons.Trash2 className="h-4 w-4 mr-2" />
                Eliminar Módulo
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}