import { useState } from 'react'
import { Card } from '../../ui/card'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { API } from '../../../lib/api'
import { Button } from '../../ui/button'
import * as LucideIcons from 'lucide-react'
import { Module } from '../../../types/cms'
import { Textarea } from '../../ui/textarea'
import { Modal, AlertModal } from '../../ui/modal'
import { COLOR_OPTIONS } from '../../../lib/constants'
import IconPickerModal from '../../common/modals/IconPickerModal'
import SuccessModal from '../../common/modals/SuccessModal'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface AddModuleModalProps {
  show: boolean
  onClose: () => void
  onModuleAdded: (module: Module) => void
}

export default function AddModuleModal({ show, onClose, onModuleAdded }: AddModuleModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [createdModuleTitle, setCreatedModuleTitle] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    grade_level: '10' as '10' | '11',
    description: '',
    icon: 'Book',
    color: 'from-blue-500 to-blue-600',
  })

  const [alertConfig, setAlertConfig] = useState<{
    show: boolean
    title: string
    msg: string
    variant: 'destructive' | 'warning' | 'default'
  }>({
    show: false,
    title: '',
    msg: '',
    variant: 'default'
  })

  const handleAddModule = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      setAlertConfig({
        show: true,
        title: 'Faltan datos',
        msg: 'El título del módulo es obligatorio.',
        variant: 'warning'
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await API.Module.Add({
        grade_level: formData.grade_level,
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        color: formData.color,
        active: 1
      })

      const newModule: Module = {
        id: result.id,
        grade_level: formData.grade_level,
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        color: formData.color,
        active: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      onModuleAdded(newModule)
      setCreatedModuleTitle(formData.title)
      handleClose()
      setShowSuccess(true)
    } catch (error) {
      setAlertConfig({
        show: true,
        title: 'Error del Servidor',
        msg: 'No se pudo crear el módulo. ' + (error instanceof Error ? error.message : 'Error desconocido'),
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
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
      <Button 
        variant="ghost" 
        onClick={handleClose} 
        disabled={isLoading} 
        className="text-slate-500 hover:text-slate-800"
      >
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
  )

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

            {/* General Information Card */}
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
                    <Label className="text-sm font-semibold text-slate-700">Nivel Académico</Label>
                    <Select 
                      value={formData.grade_level} 
                      onValueChange={(value: '10' | '11') => setFormData({ ...formData, grade_level: value })}
                    >
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
                  <Label className="text-sm font-semibold text-slate-700">Título del Módulo *</Label>
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

            {/* Visual Customization Card */}
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
                {/* Icon Selection */}
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

                {/* Color Selection */}
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

      {/* Icon Picker Modal */}
      <IconPickerModal
        show={showIconPicker}
        onClose={() => setShowIconPicker(false)}
        currentIcon={formData.icon}
        onIconChange={(icon) => setFormData({ ...formData, icon })}
      />

      {/* Success Modal */}
      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="¡Módulo Creado!"
        message={`El módulo "${createdModuleTitle}" fue creado exitosamente.`}
      />

      {/* Alert Modal */}
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