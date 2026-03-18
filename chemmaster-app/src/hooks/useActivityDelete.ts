import { useState } from 'react'
import { API } from '../lib/api'

export function useActivityDelete(onSuccess?: () => void) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState("")
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean
    activityId: number | null
    activityTitle?: string
  }>({ show: false, activityId: null, activityTitle: "" })

  const requestDelete = (id: number, title?: string) => {
    setDeleteConfirmation({ show: true, activityId: id, activityTitle: title })
  }

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, activityId: null, activityTitle: "" })
    setDeleteError("")
  }

  const confirmDelete = async () => {
    const id = deleteConfirmation.activityId
    if (!id) return

    setIsDeleting(id)
    setDeleteError("")

    try {
      await API.Activity.Delete(id)
      setShowDeleteSuccess(true)
      setDeleteConfirmation({ show: false, activityId: null, activityTitle: "" })
      onSuccess?.()
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error desconocido'
      setDeleteError("No se pudo eliminar la actividad: " + errorMsg)
    } finally {
      setIsDeleting(null)
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