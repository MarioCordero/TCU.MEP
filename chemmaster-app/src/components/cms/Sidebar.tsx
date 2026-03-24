import { useState } from 'react'
import { Button } from '../ui/button'
import * as LucideIcons from 'lucide-react'
import AddModuleModal from './module/AddModuleModal'
import { Modal, AlertModal } from '../ui/modal'
import { useModuleDelete } from '../../hooks/useModuleDelete'
import SuccessModal from '../common/modals/SuccessModal'
import { SidebarProps } from '../../types/cms'
import { useNavigate } from 'react-router-dom'

export default function CMSSidebar({
  modules,
  selectedModule,
  onSelect,
  onModuleAdded,
  onModuleDeleted
}: SidebarProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("cms_token")
    localStorage.removeItem("cms_user")
    navigate(-1)
  }

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
  } = useModuleDelete((moduleId) => onModuleDeleted?.(moduleId))

  const handleSuccessClose = () => {
    clearDeleteSuccess()
  }

  const renderModuleList = (grade: "10" | "11") => {
    const filtered = modules.filter(m => m.grade_level === grade)

    if (filtered.length === 0) return (
      <p className="px-3 py-2 text-xs text-gray-400 italic">No hay módulos.</p>
    )

    return filtered.map(module => (
      <div key={module.id} className="relative group">
        <button
          onClick={() => onSelect(module)}
          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            selectedModule?.id === module.id
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105'
              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            selectedModule?.id === module.id ? 'bg-white' : 'bg-gray-300'
          }`} />
          <span className="truncate">{module.title}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            requestDelete(module.id!, module.title)
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-100 hover:text-red-600 text-gray-400 rounded-md"
          title="Eliminar módulo"
        >
          <LucideIcons.Trash2 className="h-4 w-4" />
        </button>
      </div>
    ))
  }

  return (
    <>
      <aside className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col h-full shadow-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <LucideIcons.FlaskConical className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              ChemMaster
            </h1>
          </div>
          <p className="text-xs text-blue-600/70 ml-10 font-medium">CMS & Content Manager</p>
        </div>

        {/* Add Module Button */}
        <div className="p-3 border-b border-gray-200 bg-white">
          <Button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
            size="sm"
          >
            <LucideIcons.Plus className="h-4 w-4 mr-2" />
            Nuevo Módulo
          </Button>
        </div>

        {/* Lists */}
        <div className="flex-1 overflow-y-auto p-3 space-y-7 custom-scrollbar">
          <div>
            <div className="flex items-center gap-2 mb-3 px-2">
              <span className="text-lg">📚</span>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Décimo Grado</h3>
              <span className="ml-auto text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-bold">
                {modules.filter(m => m.grade_level === "10").length}
              </span>
            </div>
            <div className="space-y-1">
              {renderModuleList("10")}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2 mb-3 px-2">
              <span className="text-lg">🔬</span>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Undécimo Grado</h3>
              <span className="ml-auto text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-bold">
                {modules.filter(m => m.grade_level === "11").length}
              </span>
            </div>
            <div className="space-y-1">
              {renderModuleList("11")}
            </div>
          </div>
        </div>

        {/* Footer - Logout */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white transition-all"
            size="sm"
          >
            <LucideIcons.LogOut className="h-4 w-4 mr-2" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Add Module Modal */}
      <AddModuleModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onModuleAdded={(module) => onModuleAdded?.(module)}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirmation.show}
        onClose={cancelDelete}
        maxWidth="max-w-md"
      >
        <div className="p-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6 ring-8 ring-white shadow-lg">
            <LucideIcons.Trash2 className="h-8 w-8 text-red-600" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            ¿Eliminar "{deleteConfirmation.moduleTitle}"?
          </h3>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 text-left">
            <p className="text-sm text-amber-800 flex gap-2">
              <LucideIcons.AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span>
                <b>¡Cuidado!</b> Al eliminar este módulo, también borrarás{" "}
                <u>todos los tópicos</u> que contiene.
              </span>
            </p>
          </div>

          <div className="flex gap-3 justify-center w-full">
            <Button
              variant="outline"
              onClick={cancelDelete}
              disabled={isDeleting}
              className="flex-1 py-3"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-200"
            >
              {isDeleting ? (
                <>
                  <LucideIcons.Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Borrando...
                </>
              ) : (
                "Sí, eliminar todo"
              )}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <SuccessModal
        show={showDeleteSuccess}
        onClose={handleSuccessClose}
        title="¡Módulo Eliminado!"
        message={`El módulo "${deleteConfirmation.moduleTitle || ''}" fue eliminado correctamente.`}
      />

      {/* Error Modal */}
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