import { useState } from 'react'
import { Module } from '../../types/cms'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select } from '../ui/select'
import { API } from '../../lib/api'
import * as LucideIcons from 'lucide-react'

interface AddModuleModalProps {
  show: boolean
  onClose: () => void
  onModuleAdded: (module: Module) => void
}

const COLOR_OPTIONS = [
  { value: 'from-blue-500 to-blue-600', label: 'Azul' },
  { value: 'from-green-500 to-green-600', label: 'Verde' },
  { value: 'from-purple-500 to-purple-600', label: 'Púrpura' },
  { value: 'from-orange-500 to-orange-600', label: 'Naranja' },
  { value: 'from-pink-500 to-pink-600', label: 'Rosa' },
  { value: 'from-red-500 to-red-600', label: 'Rojo' },
  { value: 'from-indigo-500 to-indigo-600', label: 'Índigo' },
  { value: 'from-teal-500 to-teal-600', label: 'Verde Azulado' },
]

const ICON_OPTIONS = [
  'Book', 'BookOpen', 'Atom', 'Table2', 'Link', 'FileText', 'FlaskRound',
  'Scale', 'Droplet', 'Waves', 'Hexagon', 'Box', 'Layers', 'Zap'
]

export default function AddModuleModal({ show, onClose, onModuleAdded }: AddModuleModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    grade_level: '10',
    description: '',
    icon: 'Book',
    color: 'from-blue-500 to-blue-600',
  })

  const handleAddModule = async () => {
    if (!formData.slug || !formData.title) {
      alert('Por favor completa slug y título')
      return
    }

    setIsLoading(true)
    try {
      const result = await API.AddModule({
        slug: formData.slug,
        grade_level: formData.grade_level,
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        color: formData.color,
        active: 1
      })

      const newModule: Module = {
        id: result.id,
        slug: result.slug,
        grade_level: formData.grade_level as '10' | '11',
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        color: formData.color,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      onModuleAdded(newModule)
      handleClose()
    } catch (error) {
      alert('Error al crear módulo: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      slug: '',
      title: '',
      grade_level: '10',
      description: '',
      icon: 'Book',
      color: 'from-blue-500 to-blue-600',
    })
    onClose()
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">➕ Nuevo Módulo</h2>
          <button 
            onClick={handleClose}
            className="rounded-full h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 transition"
          >
            <LucideIcons.X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          
          <div className="grid grid-cols-2 gap-4">
            {/* Slug */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                📝 Slug (ej: quantum-mechanics)
              </label>
              <Input
                placeholder="slug-del-modulo"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            {/* Grade */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                🎓 Grado
              </label>
              <Select value={formData.grade_level} onValueChange={(value) => setFormData({ ...formData, grade_level: value })}>
                <option value="10">Décimo (10)</option>
                <option value="11">Undécimo (11)</option>
              </Select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              📖 Título
            </label>
            <Input
              placeholder="Título del módulo"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              📄 Descripción
            </label>
            <Textarea
              placeholder="Descripción breve del módulo"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          {/* Icon */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              🎨 Icono
            </label>
            <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
              {ICON_OPTIONS.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </Select>
          </div>

          {/* Color */}
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              🎨 Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, color: option.value })}
                  className={`h-12 rounded-lg bg-gradient-to-br ${option.value} border-2 transition ${
                    formData.color === option.value 
                      ? 'border-gray-800 shadow-lg scale-110' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  title={option.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleAddModule}
            disabled={isLoading || !formData.slug || !formData.title}
          >
            {isLoading ? (
              <>
                <LucideIcons.Loader className="h-4 w-4 mr-2 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <LucideIcons.Plus className="h-4 w-4 mr-2" />
                Crear Módulo
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}