import { useState, useMemo } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import type { CMSModuleEditorProps, IconModalProps } from "../../types/cms"
import { AllowedGrade, COLOR_OPTIONS } from "../../lib/constants"
import * as LucideIcons from "lucide-react"
import { API } from "../../lib/api"
import { useModuleEditor } from "../../hooks/useModuleEditor"
import { Modal, AlertModal } from "../../components/ui/modal"

function IconModal({ show, onClose, currentIcon, onIconChange }: IconModalProps) {
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
              placeholder="Buscar icono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 text-lg h-14 border-slate-200 focus:border-blue-500 bg-slate-50 focus:bg-white rounded-xl"
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 ml-1 font-medium">
            {filteredIcons.length} iconos disponibles
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 custom-scrollbar">
          {filteredIcons.length === 0 ? (
            <div className="text-center py-20 text-slate-300">
              <LucideIcons.Frown className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No encontramos resultados</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {filteredIcons.slice(0, 100).map((iconName) => (
                <button
                  key={iconName}
                  onClick={() => { onIconChange(iconName); onClose(); }}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 group h-28 ${currentIcon === iconName
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105 border-blue-600 ring-2 ring-blue-200 ring-offset-2"
                      : "bg-white border-slate-100 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 text-slate-500"
                    }`}
                  title={iconName}
                >
                  <div className="mb-3 transition-transform group-hover:scale-110">
                    {renderIcon(iconName, 26)}
                  </div>
                  <span className={`text-[10px] font-medium truncate w-full text-center ${currentIcon === iconName ? "text-blue-100" : "text-slate-400 group-hover:text-blue-600"}`}>
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

function ConfirmSaveModal({ show, onClose, onConfirm }: { show: boolean, onClose: () => void, onConfirm: (pass: string) => void }) {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = () => {
    setIsLoading(true);
    onConfirm(password);
    setPassword("");
    setIsLoading(false);
  }

  const modalFooter = (
    <>
      <Button variant="ghost" onClick={onClose} disabled={isLoading}>Cancelar</Button>
      <Button
        onClick={handleConfirm}
        disabled={!password || isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
      >
        {isLoading ? <LucideIcons.Loader2 className="h-4 w-4 animate-spin" /> : "Confirmar"}
      </Button>
    </>
  )

  return (
    <Modal isOpen={show} onClose={onClose} title="Confirmar Cambios" maxWidth="max-w-md" footer={modalFooter}>
      <div className="p-8 flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center ring-8 ring-blue-50/50">
          <LucideIcons.LockKeyhole className="h-8 w-8 text-blue-600" />
        </div>

        <div className="space-y-2">
          <p className="text-slate-600">
            Estás a punto de guardar cambios sensibles en la estructura del módulo.
          </p>
          <p className="text-sm text-slate-400">
            Por favor, ingresa tu contraseña de administrador para continuar.
          </p>
        </div>

        <div className="w-full">
          <Label className="sr-only">Contraseña</Label>
          <div className="relative">
            <LucideIcons.Key className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <Input
              type="password"
              placeholder="Contraseña..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 h-12 text-lg border-slate-200 focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
              autoFocus
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

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

  const [alertConfig, setAlertConfig] = useState<{
    show: boolean;
    title: string;
    msg: string;
    variant: "success" | "destructive" | "default";
  }>({ show: false, title: "", msg: "", variant: "default" });

  const handleSave = async (password: string) => {
    // TODO: Aquí validar la contraseña contra una API si fuera necesario
    // if (password !== "admin") { ... mostrar error ... return; }
    setShowConfirmModal(false);
    try {
      if (!editedModule.id) throw new Error("Falta el ID del módulo");

      await API.UpdateModule(editedModule.id, editedModule);

      setIsEditing(false);
      onSave?.(editedModule);

      setAlertConfig({
        show: true,
        title: "¡Guardado Exitoso!",
        msg: `El módulo "${editedModule.title}" ha sido actualizado correctamente en la base de datos.`,
        variant: "success"
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setAlertConfig({
        show: true,
        title: "Error al Guardar",
        msg: `No pudimos guardar los cambios: ${errorMessage}`,
        variant: "destructive"
      });
    }
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
                <IconModal
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
      />

      <AlertModal
        isOpen={alertConfig.show}
        onClose={() => setAlertConfig({ ...alertConfig, show: false })}
        title={alertConfig.title}
        message={alertConfig.msg}
        variant={alertConfig.variant as any}
      />

    </div>
  )
}