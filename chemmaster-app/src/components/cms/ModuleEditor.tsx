import { useState } from "react"
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

function IconModal({ show, onClose, currentIcon, onIconChange }: IconModalProps) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Selecciona un icono</h2>
          <Button variant="ghost" onClick={onClose}>
            <LucideIcons.X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Busca y copia el nombre del icono en{" "}
            <a
              href="https://lucide.dev/icons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              lucide.dev/icons
            </a>{" "}
            y pégalo abajo.
          </p>
          <iframe
            src="https://lucide.dev/icons/"
            title="Lucide Icon Browser"
            className="w-full h-96 border rounded"
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="iconName" className="mb-1 block">
            Nombre del icono
          </Label>
          <div className="flex gap-2">
            <Input
              id="iconName"
              value={currentIcon}
              onChange={(e) => onIconChange(e.target.value)}
              placeholder="Ejemplo: BookOpen"
              autoFocus
            />
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText()
                  onIconChange(text)
                } catch {
                  alert("No se pudo acceder al portapapeles. Pega manualmente el nombre del icono.")
                }
              }}
              title="Pegar nombre del icono"
            >
              <LucideIcons.ClipboardPaste className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-black text-white block w-1/4 m-auto mt-2.5" onClick={onClose}>
            Usar este icono
          </Button>
        </div>
      </div>
    </div>
  )
}

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
    <div className="overflow-y-auto">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-r ${editedModule.color} rounded-xl`}>
              {/* Icon placeholder */}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isEditing ? "Editando Módulo" : "Vista de Módulo"}
              </h1>
              <p className="text-gray-600">{editedModule.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Module Active State Switch */}
            <div className="flex items-center gap-2 mr-4">
              <Label htmlFor="module-active">Activo</Label>
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
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button
                  variant="black"
                  onClick={() => setShowConfirmModal(true)}
                  disabled={!hasChanges}
                  title={!hasChanges ? "No hay cambios para guardar" : ""}
                >
                  <LucideIcons.Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </>
            ) : (
              <Button variant="black" onClick={() => setIsEditing(true)}>
                <LucideIcons.Edit3 className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* END HEADER */}

      {/* CONTENT */}
      <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Target className="h-5 w-5" />
              Información del Módulo
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Title and Icon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título del Módulo</Label>
                <Input
                  id="title"
                  value={editedModule.title}
                  onChange={(e) =>
                    setEditedModule({ ...editedModule, title: e.target.value })
                  }
                  disabled={!isEditing}
                  className="mt-1"
                  placeholder="Ej: Estructura Atómica"
                />
              </div>

              <div>
                <Label htmlFor="icon">Icono</Label>
                <div className="relative">
                  <Input
                    id="icon"
                    value={editedModule.icon || ""}
                    onChange={(e) =>
                      setEditedModule({ ...editedModule, icon: e.target.value })
                    }
                    disabled={!isEditing}
                    className="mt-1"
                    placeholder="Nombre del icono (ej: Atom, BookOpen)"
                  />
                  {isEditing && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="absolute right-2 top-2"
                      onClick={() => setShowIconModal(true)}
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
            <div>
              <Label htmlFor="description">Descripción</Label>
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
                className="mt-1"
                rows={3}
                placeholder="Descripción breve del módulo"
              />
            </div>

            {/* Grade Selector */}
            <div>
              <Label htmlFor="grade">Grado</Label>
              <Select
                value={editedModule.grade_level}
                onValueChange={(value: AllowedGrade) =>
                  setEditedModule({ ...editedModule, grade_level: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona el grado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10° Grado</SelectItem>
                  <SelectItem value="11">11° Grado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Color Selector */}
            <div>
              <Label>Color del Módulo</Label>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() =>
                      isEditing &&
                      setEditedModule({ ...editedModule, color: color.value })
                    }
                    disabled={!isEditing}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      editedModule.color === color.value
                        ? "border-gray-800 scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    } ${
                      !isEditing
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                    title={color.label}
                  >
                    <div className={`w-full h-8 rounded ${color.preview}`} />
                    <div className="text-xs mt-1 text-center text-gray-700">
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