import { useState } from 'react'
import { Module } from '../../types/cms'
import { Button } from '../ui/button'
import * as LucideIcons from 'lucide-react'
import AddModuleModal from './AddModuleModal'
import DeleteModuleModal from './DeleteModuleModal'

interface Props {
  modules: Module[]
  selectedModule: Module | null
  onSelect: (module: Module) => void
  onModuleAdded?: (module: Module) => void
  onModuleDeleted?: (moduleId: number) => void
}

export default function CMSSidebar({ 
  modules, 
  selectedModule, 
  onSelect,
  onModuleAdded,
  onModuleDeleted
}: Props) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const renderModuleList = (grade: "10" | "11") => {
    const filtered = modules.filter(m => m.grade_level === grade)
    
    if (filtered.length === 0) return <p className="px-3 py-2 text-xs text-gray-400 italic">No hay módulos.</p>

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
          <span className={`w-1.5 h-1.5 rounded-full ${selectedModule?.id === module.id ? 'bg-white' : 'bg-gray-300'}`} />
          {module.title}
        </button>
        
        {/* Delete button appears on hover */}
        <button
          onClick={() => module.id && setShowDeleteConfirm(module.id)}
          disabled={!module.id}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
          title="Eliminar módulo"
        >
          <LucideIcons.Trash2 className="h-4 w-4 text-red-600" />
        </button>
      </div>
    ))
  }

  const selectedDeleteModule = modules.find(m => m.id === showDeleteConfirm)

  return (
    <>
      <aside className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col h-full shadow-sm">
        <div className="p-5 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚗</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">ChemMaster CMS</h1>
          </div>
          <p className="text-xs text-gray-500 ml-10">Gestor de Contenido</p>
        </div>
        
        {/* Add Module Button */}
        <div className="p-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <Button 
            onClick={() => setShowAddModal(true)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center justify-center gap-2"
            size="sm"
          >
            <LucideIcons.Plus className="h-4 w-4" />
            Agregar Módulo
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-7">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📚</span>
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Décimo Grado</h3>
              <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{modules.filter(m => m.grade_level === "10").length}</span>
            </div>
            <div className="space-y-1.5">
              {renderModuleList("10")}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔬</span>
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Undécimo Grado</h3>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{modules.filter(m => m.grade_level === "11").length}</span>
            </div>
            <div className="space-y-1.5">
              {renderModuleList("11")}
            </div>
          </div>
        </div>
      </aside>

      {/* Modals */}
      <AddModuleModal 
        show={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onModuleAdded={(module) => {
          onModuleAdded?.(module)
        }}
      />

      <DeleteModuleModal 
        show={showDeleteConfirm !== null}
        moduleId={showDeleteConfirm}
        module={selectedDeleteModule}
        onClose={() => setShowDeleteConfirm(null)}
        onModuleDeleted={(moduleId) => {
          onModuleDeleted?.(moduleId)
        }}
      />
    </>
  )
}