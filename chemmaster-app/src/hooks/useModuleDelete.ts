import { useState } from 'react'
import { API } from '../lib/api'

export function useModuleDelete(onSuccess: (moduleId: number) => void) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean
    moduleId: number | null
    moduleTitle?: string
  }>({ show: false, moduleId: null, moduleTitle: "" })

  const requestDelete = (id: number, title?: string) => {
    setDeleteConfirmation({ show: true, moduleId: id, moduleTitle: title })
  }

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, moduleId: null, moduleTitle: "" })
  }

  const confirmDelete = async () => {
    const id = deleteConfirmation.moduleId
    if (!id) return

    setIsDeleting(true)
    setDeleteConfirmation({ show: false, moduleId: null, moduleTitle: deleteConfirmation.moduleTitle })

    try {
      await API.DeleteModule(id)
      onSuccess(id)
      setShowDeleteSuccess(true)
    } catch (error) {
      setDeleteError("No se pudo eliminar el módulo: " + String(error))
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    isDeleting,
    deleteConfirmation,
    deleteError,
    showDeleteSuccess,
    clearDeleteSuccess: () => setShowDeleteSuccess(false),
    clearError: () => setDeleteError(""),
    requestDelete,
    confirmDelete,
    cancelDelete,
  }
}