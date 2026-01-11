import { useState, useMemo } from 'react'
import { Module } from '../../types/cms'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
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

// Icon picker modal
function IconPickerModal({ show, onClose, currentIcon, onIconChange }: {
  show: boolean
  onClose: () => void
  currentIcon: string
  onIconChange: (icon: string) => void
}) {
  const [searchTerm, setSearchTerm] = useState("")
  
  const allIconNames = useMemo(() => {
    return Object.keys(LucideIcons).filter((key) => {
      return key !== "icons" && key !== "createLucideIcon" && /^[A-Z]/.test(key)
    })
  }, [])

  const filteredIcons = allIconNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderIcon = (iconName: string, size = 24) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent ? <IconComponent size={size} /> : null
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[80vh]">

        <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-indigo-50 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-800">🎨 Galería de Iconos</h2>
            <p className="text-xs text-gray-500">
              {allIconNames.length} iconos disponibles
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600">
            <LucideIcons.X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 border-b bg-white sticky top-0 z-10">
          <div className="relative">
            <LucideIcons.Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
            <Input 
              autoFocus
              placeholder="Buscar icono (ej: atom, book, chart, wifi...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg py-6 border-2 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {filteredIcons.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <LucideIcons.Frown className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No se encontraron iconos para "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
              {filteredIcons.slice(0, 100).map((iconName) => (
                <button
                  key={iconName}
                  onClick={() => {
                    onIconChange(iconName)
                    onClose()
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 group ${
                    currentIcon === iconName
                      ? "bg-purple-600 text-white shadow-lg scale-105 border-purple-600"
                      : "bg-white border-gray-200 hover:border-purple-400 hover:shadow-md hover:-translate-y-1 text-gray-600"
                  }`}
                  title={iconName}
                >
                  <div className="mb-2 transition-transform group-hover:scale-110">
                    {renderIcon(iconName, 28)}
                  </div>
                  <span className={`text-[10px] truncate w-full text-center ${currentIcon === iconName ? "text-purple-100" : "text-gray-400 group-hover:text-purple-600"}`}>
                    {iconName}
                  </span>
                </button>
              ))}
            </div>
          )}

          {filteredIcons.length > 100 && (
            <div className="mt-6 text-center text-xs text-gray-400 italic">
              Mostrando 100 de {filteredIcons.length} resultados. Sigue escribiendo para filtrar mejor.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AddModuleModal({ show, onClose, onModuleAdded }: AddModuleModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState(false)
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
    setShowIconPicker(false)
    onClose()
  }

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <LucideIcons.Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Nuevo Módulo</h2>
              <p className="text-xs text-gray-500">Crea un nuevo módulo de contenido</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="rounded-full h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 transition"
          >
            <LucideIcons.X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <LucideIcons.FileText className="h-5 w-5 text-blue-600" />
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Slug */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    📝 Slug
                  </Label>
                  <Input
                    placeholder="ej: quantum-mechanics"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  />
                  <p className="text-xs text-gray-500">Identificador único (sin espacios)</p>
                </div>

                {/* Grade */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    🎓 Grado
                  </Label>
                  <Select value={formData.grade_level} onValueChange={(value) => setFormData({ ...formData, grade_level: value })}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                      <SelectItem value="10">Décimo Grado (10)</SelectItem>
                      <SelectItem value="11">Undécimo Grado (11)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  📖 Título
                </Label>
                <Input
                  placeholder="Título del módulo"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  📄 Descripción
                </Label>
                <Textarea
                  placeholder="Descripción breve del módulo"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-purple-200">
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <LucideIcons.Palette className="h-5 w-5 text-purple-600" />
                Apariencia
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              {/* Icon */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  🎨 Icono
                </Label>
                <div className="flex items-center gap-3">
                  <div className={`p-4 rounded-lg bg-gradient-to-br ${formData.color} flex items-center justify-center`}>
                    {renderIcon(formData.icon) && <div className="text-white">{renderIcon(formData.icon)}</div>}
                  </div>
                  <Button
                    type="button"
                    onClick={() => setShowIconPicker(true)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
                  >
                    <LucideIcons.Search className="h-4 w-4" />
                    Buscar Icono
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Icono actual: {formData.icon}</p>
              </div>

              {/* Color */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  🌈 Color del Módulo
                </Label>
                <div className="grid grid-cols-4 gap-3">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`p-3 rounded-xl border-3 transition-all transform hover:scale-105 ${
                        formData.color === color.value
                          ? "border-gray-900 shadow-lg scale-105 ring-2 ring-purple-400"
                          : "border-gray-300 hover:border-gray-400 shadow-sm"
                      }`}
                      title={color.label}
                    >
                      <div className={`w-full h-8 rounded-lg bg-gradient-to-br ${color.value}`} />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 shrink-0">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            onClick={handleAddModule}
            disabled={isLoading || !formData.slug || !formData.title}
          >
            {isLoading ? (
              <>
                <LucideIcons.Loader className="h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <LucideIcons.Plus className="h-4 w-4" />
                Crear Módulo
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Icon Picker Modal */}
      <IconPickerModal 
        show={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        currentIcon={formData.icon}
        onIconChange={(icon) => setFormData({ ...formData, icon })}
      />
    </div>
  )
}