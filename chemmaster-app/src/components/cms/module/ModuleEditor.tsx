import { useState } from "react"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { Label } from "../../ui/label"
import type { CMSModuleEditorProps } from "../../../types/cms"
import { AllowedGrade, COLOR_OPTIONS } from "../../../lib/constants"
import * as LucideIcons from "lucide-react"
import { API } from "../../../lib/api"
import { useModuleEditor } from "../../../hooks/useModuleEditor"
import IconPickerModal from "../../common/modals/IconPickerModal"
import ConfirmSaveModal from '../../common/modals/ConfirmSaveModal'

export function CMSModuleEditor({ module, onSave }: CMSModuleEditorProps) {
  const {
    editedModule,
    setEditedModule,
    isEditing,
    setIsEditing,
    resetToOriginal,
    hasChanges,
  } = useModuleEditor(module)

  const [showIconModal, setShowIconModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleSave = async (password: string) => {
    // TODO: validate password via API
    if (!editedModule.id) throw new Error("Falta el ID del módulo")  // 👈 throw so ConfirmSaveModal catches it
    await API.UpdateModule(editedModule.id, editedModule)  // 👈 throw on failure too
    setIsEditing(false)
    onSave?.(editedModule)
  }

  return (
    <div className="overflow-y-auto bg-white h-full custom-scrollbar">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 border-b-4 border-blue-500 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`p-4 bg-gradient-to-br ${editedModule.color} rounded-2xl shadow-lg transform hover:scale-105 transition-transform ring-4 ring-white/10`}>
              {editedModule.icon ? (
                (() => {
                  const IconComponent = (LucideIcons as any)[editedModule.icon]
                  return IconComponent ? <IconComponent className="h-8 w-8 text-white" /> : <LucideIcons.BookOpen className="h-8 w-8 text-white" />
                })()
              ) : (
                <LucideIcons.BookOpen className="h-8 w-8 text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold">
                  {isEditing ? "Edición de Módulo" : "Detalles del Módulo"}
                </h1>
                {isEditing && <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30 font-mono">MODO EDITOR</span>}
              </div>
              <p className="text-slate-400 text-lg">{editedModule.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border transition-all ${isEditing ? 'bg-slate-800 border-slate-600' : 'bg-transparent border-transparent opacity-80'}`}>
              <Label htmlFor="module-active" className="text-slate-300 font-medium cursor-pointer">
                {editedModule.active ? "Estado: Activo" : "Estado: Inactivo"}
              </Label>
              <Switch
                id="module-active"
                checked={editedModule.active}
                onCheckedChange={(checked) => setEditedModule({ ...editedModule, active: checked })}
                disabled={!isEditing}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            {isEditing ? (
              <div className="flex gap-3 pl-4 border-l border-slate-700">
                <Button
                  variant="ghost"
                  onClick={() => resetToOriginal()}
                  className="text-slate-300 hover:text-white hover:bg-slate-700"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={!hasChanges}
                  className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 px-6"
                >
                  <LucideIcons.Save className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6"
              >
                <LucideIcons.Edit3 className="h-4 w-4 mr-2" />
                Editar Módulo
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* CONTENT FORM */}
      <div className="p-8 space-y-8 max-w-5xl mx-auto">
        <Card className="border shadow-sm rounded-xl overflow-hidden bg-white">
          <CardHeader className="bg-slate-50 border-b border-slate-100 px-8 py-6">
            <CardTitle className="flex items-center gap-3 text-xl text-slate-800">
              <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-sm">
                <LucideIcons.Settings2 className="h-5 w-5 text-blue-600" />
              </div>
              Configuración General
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Título del Módulo</Label>
                  <Input
                    value={editedModule.title}
                    onChange={(e) => setEditedModule({ ...editedModule, title: e.target.value })}
                    disabled={!isEditing}
                    className="h-12 text-lg border-slate-200 focus:border-blue-500 rounded-lg bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Descripción</Label>
                  <Textarea
                    value={editedModule.description || ""}
                    onChange={(e) => setEditedModule({ ...editedModule, description: e.target.value })}
                    disabled={!isEditing}
                    className="min-h-[120px] resize-none border-slate-200 focus:border-blue-500 rounded-lg bg-slate-50 focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-slate-700">Nivel Académico</Label>
                  <Select
                    value={editedModule.grade_level}
                    onValueChange={(value: AllowedGrade) => setEditedModule({ ...editedModule, grade_level: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 rounded-lg bg-white cursor-pointer w-full">
                      <SelectValue placeholder="Selecciona el grado" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-100">
                      <SelectItem className="cursor-pointer" value="10">Décimo Grado (10°)</SelectItem>
                      <SelectItem className="cursor-pointer" value="11">Undécimo Grado (11°)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="lg:col-span-1 space-y-3">
                <Label className="text-sm font-semibold text-slate-700">Icono Representativo</Label>
                <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-colors ${isEditing ? 'border-slate-300 bg-slate-50 hover:bg-slate-100' : 'border-slate-200 bg-slate-50 opacity-70'}`}>
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${editedModule.color} flex items-center justify-center shadow-md`}>
                    {editedModule.icon && (() => {
                      const Icon = (LucideIcons as any)[editedModule.icon!];
                      return Icon ? <Icon className="text-white w-10 h-10" /> : <LucideIcons.Box className="text-white w-10 h-10" />
                    })()}
                  </div>
                  <div className="text-center w-full">
                    <p className="text-sm font-medium text-slate-600 mb-2">{editedModule.icon || "Sin icono"}</p>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-white hover:text-blue-600 hover:border-blue-200"
                        onClick={() => setShowIconModal(true)}
                      >
                        <LucideIcons.Search className="h-4 w-4 mr-2" /> Cambiar
                      </Button>
                    )}
                  </div>
                </div>
                <IconPickerModal
                  show={showIconModal}
                  onClose={() => setShowIconModal(false)}
                  currentIcon={editedModule.icon || ""}
                  onIconChange={(icon) => setEditedModule({ ...editedModule, icon })}
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-4">
              <Label className="text-sm font-semibold text-slate-700 block">Tema de Color</Label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => isEditing && setEditedModule({ ...editedModule, color: color.value })}
                    disabled={!isEditing}
                    className={`
                        group relative w-full aspect-square rounded-full transition-all duration-300 focus:outline-none cursor-pointer
                        ${editedModule.color === color.value
                        ? 'scale-110 ring-4 ring-slate-100 shadow-lg'
                        : 'hover:scale-110 hover:shadow-md opacity-90 hover:opacity-100'}
                        ${!isEditing && 'cursor-not-allowed opacity-50 hover:scale-100'}
                    `}
                    title={color.label}
                  >
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${color.value}`} />
                    {editedModule.color === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ConfirmSaveModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleSave}
        description={`Estás a punto de guardar cambios en el módulo "${editedModule.title}".`}
        successTitle="¡Módulo Actualizado!"
        successMessage={`El módulo "${editedModule.title}" fue guardado correctamente.`}
      />
    </div>
  )
}