import { useState } from 'react'
import { API } from '../lib/api'

export function useTopicDelete(onSuccess: () => void) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean
    topicId: number | null
  }>({ show: false, topicId: null })

  const requestDelete = (id: number) => {
    setDeleteConfirmation({ show: true, topicId: id })
  }

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, topicId: null })
  }

  const confirmDelete = async () => {
    const id = deleteConfirmation.topicId
    if (!id) return

    setIsDeleting(id)
    setDeleteConfirmation({ show: false, topicId: null })

    try {
      await API.DeleteTopic(id)
      onSuccess()
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
    clearError: () => setDeleteError(""),
    requestDelete,
    confirmDelete,
    cancelDelete,
  }
}