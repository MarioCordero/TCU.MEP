import { useState } from 'react'
import { API } from '../lib/api'

export function useTopicDelete(onSuccess: () => void) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState("")
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean
    topicId: number | null
    topicTitle?: string
  }>({ show: false, topicId: null, topicTitle: "" })

  const requestDelete = (id: number, title?: string) => {
    setDeleteConfirmation({ show: true, topicId: id, topicTitle: title })
  }

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, topicId: null, topicTitle: "" })
  }

  const confirmDelete = async () => {
    const id = deleteConfirmation.topicId
    if (!id) return

    setIsDeleting(id)
    setDeleteConfirmation({ show: false, topicId: null, topicTitle: "" })

    try {
      await API.DeleteTopic(id)
      onSuccess()
      setShowDeleteSuccess(true)
    } catch (error) {
      setDeleteError("No se pudo eliminar el tópico: " + String(error))
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