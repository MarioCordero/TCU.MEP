import { useState, useMemo } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import type { CMSModuleEditorProps, IconModalProps, ConfirmModalProps, SuccessModalProps } from "../../types/cms"
import { AllowedGrade, COLOR_OPTIONS } from "../../lib/constants"
import * as LucideIcons from "lucide-react"
import { API } from "../../lib/api"
import { useModuleEditor } from "../../hooks/useModuleEditor"

// Icon modal (Choose an icon from lucide.dev)
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

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[80vh]">

        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Galería de Iconos</h2>
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
              placeholder="Buscar icono (ej: user, chart, atom, wifi...)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg py-6 border-2 focus:border-blue-500"
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
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 group ${
                    currentIcon === iconName
                      ? "bg-blue-600 text-white shadow-lg scale-105 border-blue-600"
                      : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-1 text-gray-600"
                  }`}
                  title={iconName}
                >
                  <div className="mb-2 transition-transform group-hover:scale-110">
                    {renderIcon(iconName, 28)}
                  </div>
                  <span className={`text-[10px] truncate w-full text-center ${currentIcon === iconName ? "text-blue-100" : "text-gray-400 group-hover:text-blue-600"}`}>
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

        <div className="p-4 border-t bg-white flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                Icono actual: 
                <span className="font-bold flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                    {currentIcon && renderIcon(currentIcon, 16)} {currentIcon || "Ninguno"}
                </span>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>Cancelar</Button>
                <Button className="bg-black text-white hover:bg-gray-800" onClick={onClose}>
                    Listo
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

// Confirm save modal (asks for password TODO: Check password before saving)
function ConfirmModal({ show, onClose, onConfirm, password, onPasswordChange }: ConfirmModalProps) {
  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirmar guardado</h2>
        <p className="mb-4 text-gray-700">
          Por favor, ingresa tu contraseña para confirmar el guardado del módulo.
        </p>
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="black" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  )
}

// Success modal (shows after successful save)
function SuccessModal({ show, onClose }: SuccessModalProps) {
  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-4 text-green-700">¡Guardado exitoso!</h2>
        <p className="mb-4 text-gray-700">El módulo fue actualizado correctamente.</p>
        <Button variant="black" onClick={onClose} className="mx-auto">
          Cerrar
        </Button>
      </div>
    </div>
  )
}

// Main CMSModuleEditor component
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
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [password, setPassword] = useState("")

  const handleSave = async () => {
    try {
      if (!editedModule.id) {
        throw new Error("Module ID is missing")
      }
      await API.UpdateModule(editedModule.id, editedModule)
      setIsEditing(false)
      setShowSuccessModal(true)
      onSave?.(editedModule)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      console.error("Save error:", error)
      alert(`Error al guardar: ${errorMessage}`)
    }
  }

  const handleCancel = () => {
    resetToOriginal()
  }

  const handleConfirmSave = () => {
    setShowConfirmModal(false)
    setPassword("")
    handleSave()
  }

    return (
    <div className="overflow-y-auto bg-white">
      {/* HEADER - Enhanced styling */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 border-b-4 border-blue-500 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`p-4 bg-gradient-to-br ${editedModule.color} rounded-2xl shadow-lg transform hover:scale-105 transition-transform`}>
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
              <h1 className="text-3xl font-bold">
                {isEditing ? "✏️ Editando Módulo" : "👁️ Vista de Módulo"}
              </h1>
              <p className="text-gray-300 mt-1">{editedModule.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Module Active State Switch */}
            <div className="flex items-center gap-3 bg-slate-700 px-4 py-2 rounded-lg">
              <Label htmlFor="module-active" className="text-white font-medium">
                {editedModule.active ? "🟢 Activo" : "🔴 Inactivo"}
              </Label>
              <Switch
                id="module-active"
                checked={editedModule.active}
                onCheckedChange={(checked) => {
                  setEditedModule({ ...editedModule, active: checked })
                }}
                disabled={!isEditing}
              />
            </div>

            {/* Edit/Save Controls */}
            {isEditing ? (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white border-0"
                >
                  <LucideIcons.X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button
                  variant="black"
                  onClick={() => setShowConfirmModal(true)}
                  disabled={!hasChanges}
                  title={!hasChanges ? "No hay cambios para guardar" : ""}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  <LucideIcons.Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </div>
            ) : (
              <Button 
                variant="black" 
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <LucideIcons.Edit3 className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* END HEADER */}

      {/* CONTENT */}
      <div className="p-8 space-y-6">
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
            <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
              <div className="p-2 bg-blue-600 rounded-lg">
                <LucideIcons.Settings className="h-5 w-5 text-white" />
              </div>
              Configuración del Módulo
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Title and Icon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                  📝 Título del Módulo
                </Label>
                <Input
                  id="title"
                  value={editedModule.title}
                  onChange={(e) =>
                    setEditedModule({ ...editedModule, title: e.target.value })
                  }
                  disabled={!isEditing}
                  className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                  placeholder="Ej: Estructura Atómica"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon" className="text-sm font-semibold text-gray-700">
                  🎨 Icono
                </Label>
                
                <div className="relative mt-1">
                  <Input
                    id="icon"
                    value={editedModule.icon || ""}
                    onChange={(e) =>
                      setEditedModule({ ...editedModule, icon: e.target.value })
                    }
                    disabled={!isEditing}
                    className="border-2 border-gray-200 focus:border-blue-500 rounded-lg pr-12" 
                    placeholder="Nombre del icono (ej: Atom, BookOpen)"
                  />
                  
                  {isEditing && (
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md"
                      onClick={() => setShowIconModal(true)}
                      title="Buscar icono"
                    >
                      <LucideIcons.Search className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <IconModal
                  show={showIconModal}
                  onClose={() => setShowIconModal(false)}
                  currentIcon={editedModule.icon || ""}
                  onIconChange={(icon) =>
                    setEditedModule({ ...editedModule, icon })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                📄 Descripción
              </Label>
              <Textarea
                id="description"
                value={editedModule.description || ""}
                onChange={(e) =>
                  setEditedModule({
                    ...editedModule,
                    description: e.target.value,
                  })
                }
                disabled={!isEditing}
                className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                rows={3}
                placeholder="Descripción breve del módulo"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Grade Selector */}
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-sm font-semibold text-gray-700">
                  🎓 Grado
                </Label>
                <Select
                  value={editedModule.grade_level}
                  onValueChange={(value: AllowedGrade) =>
                    setEditedModule({ ...editedModule, grade_level: value })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger className="mt-1 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                    <SelectValue placeholder="Selecciona el grado" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-lg">                    <SelectItem value="10">10° Grado</SelectItem>
                    <SelectItem value="11">11° Grado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">
                🎨 Color del Módulo
              </Label>
              <div className="grid grid-cols-4 gap-3">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() =>
                      isEditing &&
                      setEditedModule({ ...editedModule, color: color.value })
                    }
                    disabled={!isEditing}
                    className={`p-4 rounded-xl border-3 transition-all transform hover:scale-110 ${
                      editedModule.color === color.value
                        ? "border-gray-900 shadow-lg scale-105 ring-2 ring-blue-400"
                        : "border-gray-300 hover:border-gray-400 shadow-sm"
                    } ${
                      !isEditing
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer"
                    }`}
                    title={color.label}
                  >
                    <div className={`w-full h-10 rounded-lg ${color.preview} shadow-md`} />
                    <div className="text-xs mt-2 text-center font-medium text-gray-700">
                      {color.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* END CONTENT */}

      {/* MODALS */}
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSave}
        password={password}
        onPasswordChange={setPassword}
      />

      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  )
}