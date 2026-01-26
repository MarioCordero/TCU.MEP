import { useState, useMemo } from 'react'
import { Module } from '../../types/cms'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Label } from '../ui/label'
import { Card } from '../ui/card'
import { API } from '../../lib/api'
import { Modal, AlertModal } from '../ui/modal'
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

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Galería de Iconos"
      maxWidth="max-w-5xl"
    >
      <div className="flex flex-col h-[70vh]">
        <div className="p-6 border-b bg-white sticky top-0 z-10 shadow-sm">
          <div className="relative">
            <LucideIcons.Search className="absolute left-4 top-4 text-slate-400 h-5 w-5" />
            <Input
              autoFocus
              placeholder="Buscar icono (ej: atom, book, chart...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 text-lg h-14 border-slate-200 focus:border-purple-500 bg-slate-50 focus:bg-white transition-all rounded-xl"
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 ml-1 font-medium">
            {filteredIcons.length} iconos encontrados
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 custom-scrollbar">
          {filteredIcons.length === 0 ? (
            <div className="text-center py-20 text-slate-300">
              <LucideIcons.Frown className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No encontramos iconos para "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {filteredIcons.slice(0, 100).map((iconName) => (
                <button
                  key={iconName}
                  onClick={() => {
                    onIconChange(iconName)
                    onClose()
                  }}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 group h-28 ${currentIcon === iconName
                      ? "bg-purple-600 text-white shadow-xl shadow-purple-200 scale-105 border-purple-600 ring-2 ring-purple-200 ring-offset-2"
                      : "bg-white border-slate-100 hover:border-purple-300 hover:shadow-lg hover:-translate-y-1 text-slate-500"
                    }`}
                  title={iconName}
                >
                  <div className="mb-3 transition-transform group-hover:scale-110">
                    {renderIcon(iconName, 26)}
                  </div>
                  <span className={`text-[10px] font-medium truncate w-full text-center ${currentIcon === iconName ? "text-purple-100" : "text-slate-400 group-hover:text-purple-600"}`}>
                    {iconName}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
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

  const [alertConfig, setAlertConfig] = useState<{
    show: boolean;
    title: string;
    msg: string;
    variant: "destructive" | "warning" | "default";
  }>({
    show: false,
    title: "",
    msg: "",
    variant: "default"
  });

  const handleAddModule = async () => {
    if (!formData.slug || !formData.title) {
      setAlertConfig({
        show: true,
        title: "Faltan datos",
        msg: "El título y el slug son obligatorios para crear el módulo.",
        variant: "warning"
      });
      return;
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
      setAlertConfig({
        show: true,
        title: "Error del Servidor",
        msg: "No se pudo crear el módulo. Detalles: " + String(error),
        variant: "destructive"
      });
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
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null
  }

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={handleClose} disabled={isLoading} className="text-slate-500 hover:text-slate-800">
        Cancelar
      </Button>
      <Button
        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-6 h-11 shadow-lg shadow-emerald-200 transition-all active:scale-95"
        onClick={handleAddModule}
        disabled={isLoading}
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
    </>
  );

  return (
    <>
      <Modal
        isOpen={show}
        onClose={handleClose}
        title="Crear Nuevo Módulo"
        maxWidth="max-w-3xl"
        footer={modalFooter}
      >
        <div className="flex flex-col max-h-[75vh] overflow-y-auto bg-slate-50/30">

          <div className="p-8 space-y-8">

            <Card className="border border-slate-200 shadow-sm overflow-hidden bg-white">
              <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg border border-slate-100 text-blue-600 shadow-sm">
                  <LucideIcons.FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-base">Información General</h4>
                  <p className="text-xs text-slate-500">Configuración básica del contenido</p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Slug (URL)</Label>
                    <Input
                      placeholder="ej: quimica-organica"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="font-mono text-sm bg-slate-50 h-11 border-slate-200 focus:bg-white transition-colors"
                    />
                    <p className="text-[11px] text-slate-400">Identificador único sin espacios ni tildes.</p>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-slate-700">Nivel Académico</Label>
                    <Select value={formData.grade_level} onValueChange={(value) => setFormData({ ...formData, grade_level: value })}>
                      <SelectTrigger className="bg-white h-11 border-slate-200 cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-white border-slate-200 shadow-xl">
                        <SelectItem className="cursor-pointer" value="10">Décimo Grado (10°)</SelectItem>
                        <SelectItem className="cursor-pointer" value="11">Undécimo Grado (11°)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Título del Módulo</Label>
                  <Input
                    placeholder="Ej: Introducción a la Estequiometría"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-lg font-medium h-12 border-slate-200"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Descripción Breve</Label>
                  <Textarea
                    placeholder="¿De qué trata este módulo? Esta descripción aparecerá en el dashboard."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="resize-none border-slate-200 focus:border-blue-500 min-h-[80px]"
                  />
                </div>
              </div>
            </Card>

            <Card className="border border-slate-200 shadow-sm overflow-hidden bg-white">
              <div className="bg-slate-50 px-8 py-5 border-b border-slate-100 flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg border border-slate-100 text-purple-600 shadow-sm">
                  <LucideIcons.Palette className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-base">Personalización Visual</h4>
                  <p className="text-xs text-slate-500">Cómo verán los estudiantes este módulo</p>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Icono Representativo</Label>
                  <div className="flex items-center gap-6 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${formData.color} flex items-center justify-center shadow-lg shadow-black/5 shrink-0 transition-all duration-300 ring-4 ring-white`}>
                      <span className="text-white drop-shadow-sm">
                        {renderIcon(formData.icon)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-slate-500 mb-3">Elige un icono que represente el tema del módulo.</p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowIconPicker(true)}
                        className="bg-white hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all group border-slate-200"
                      >
                        <LucideIcons.Search className="h-4 w-4 mr-2 text-slate-400 group-hover:text-purple-500" />
                        Cambiar icono "{formData.icon}"
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-slate-700">Tema de Color</Label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`
                          group relative w-full aspect-square rounded-full transition-all duration-300 focus:outline-none
                          ${formData.color === color.value
                            ? 'scale-110 ring-4 ring-slate-100 shadow-lg'
                            : 'hover:scale-110 hover:shadow-md opacity-90 hover:opacity-100'}
                        `}
                        title={color.label}
                      >
                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${color.value}`} />
                        {formData.color === color.value && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Modal>

      <IconPickerModal
        show={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        currentIcon={formData.icon}
        onIconChange={(icon) => setFormData({ ...formData, icon })}
      />

      <AlertModal
        isOpen={alertConfig.show}
        onClose={() => setAlertConfig({ ...alertConfig, show: false })}
        title={alertConfig.title}
        message={alertConfig.msg}
        variant={alertConfig.variant}
      />
    </>
  )
}