import { useCallback, useEffect, useMemo, useState } from "react"
import type { Module, Topic, UseModuleEditorReturn } from "../types/cms"

export function useModuleEditor(initialModule: Module): UseModuleEditorReturn {
  const [editedModule, setEditedModule] = useState<Module>(initialModule)
  const [deletedTopicIds, setDeletedTopicIds] = useState<number[]>([])
  const [isEditing, setIsEditing] = useState(false)

  // Track if content has changed
  const hasChanges = useMemo(() => {
    const moduleChanged = JSON.stringify(editedModule) !== JSON.stringify(initialModule)
    const topicsDeleted = deletedTopicIds.length > 0
    return moduleChanged || topicsDeleted
  }, [editedModule, initialModule, deletedTopicIds])

  useEffect(() => {
    setEditedModule(initialModule)
    setDeletedTopicIds([])
  }, [initialModule])

  const addTopic = useCallback(() => {
    const newTopic: Topic = {
      id: undefined,
      module_id: initialModule.id!,
      title: "",
      content: "",
      description: "",
      order_in_module: (editedModule.topics?.length || 0) + 1
    }
    
    setEditedModule(prev => ({
      ...prev,
      topics: [...(prev.topics || []), newTopic]
    }))
  }, [editedModule.topics?.length, initialModule.id])

  const updateTopic = useCallback((index: number, field: keyof Topic, value: any) => {
    setEditedModule(prev => {
      const updatedTopics = [...(prev.topics || [])]
      updatedTopics[index] = { ...updatedTopics[index], [field]: value }
      return { ...prev, topics: updatedTopics }
    })
  }, [])

  const removeTopic = useCallback((index: number) => {
    const topic = editedModule.topics?.[index]
    
    if (topic?.id) {
      setDeletedTopicIds(prev => [...prev, topic.id!])
    }
    
    setEditedModule(prev => ({
      ...prev,
      topics: prev.topics?.filter((_, i) => i !== index) || []
    }))
  }, [editedModule.topics])

  const resetToOriginal = useCallback(() => {
    setEditedModule(initialModule)
    setDeletedTopicIds([])
    setIsEditing(false)
  }, [initialModule])

  return {
    editedModule,
    setEditedModule,
    deletedTopicIds,
    isEditing,
    setIsEditing,
    addTopic,
    updateTopic,
    removeTopic,
    resetToOriginal,
    hasChanges,
  }
}