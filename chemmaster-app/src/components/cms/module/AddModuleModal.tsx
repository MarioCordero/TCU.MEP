import { useState } from 'react'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Textarea } from '../../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Label } from '../../ui/label'
import { Card } from '../../ui/card'
import { API } from '../../../lib/api'
import { Modal, AlertModal } from '../../ui/modal'
import * as LucideIcons from 'lucide-react'
import { AddModuleModalProps, Module } from '../../../types/moduleProps'
import IconPickerModal from '../../common/modals/IconPickerModal'
import SuccessModal from '../../common/modals/SuccessModal'

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

export default function AddModuleModal({ show, onClose, onModuleAdded }: AddModuleModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [createdModuleTitle, setCreatedModuleTitle] = useState('')

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
      setCreatedModuleTitle(formData.title)
      handleClose()
      setShowSuccess(true)
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

      <SuccessModal
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="¡Módulo Creado!"
        message={`El módulo "${createdModuleTitle}" fue creado exitosamente.`}
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