import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import type { CMSModule } from "../../types/cms"
import * as LucideIcons from "lucide-react" // Import all icons
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css" // Import Quill styles

interface CMSModuleEditorProps {
  module: CMSModule
  onSave: (module: CMSModule) => void
}

export function CMSModuleEditor({ module, onSave }: CMSModuleEditorProps) {
  const [editedModule, setEditedModule] = useState<CMSModule>({
    ...module,
    icon: typeof module.icon === "string" ? module.icon : "BookOpen",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [newFeature, setNewFeature] = useState("")
  const [newTool, setNewTool] = useState("")
  const [showIconModal, setShowIconModal] = useState(false)

  const handleSave = () => {
    onSave(editedModule)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedModule(module)
    setIsEditing(false)
  }

  // Inside your CMSModuleEditor function, after color options and before return:
  const addTopic = () => {
    setEditedModule({
      ...editedModule,
      topics: [
        ...(editedModule.topics || []),
        { title: "", content: "" }
      ]
    })
  }

  const removeTopic = (idx: number) => {
    setEditedModule({
      ...editedModule,
      topics: editedModule.topics.filter((_, i) => i !== idx)
    })
  }

  const colorOptions = [
    {
      value: "from-purple-500 to-purple-600",
      label: "Púrpura",
      preview: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    { value: "from-blue-500 to-blue-600", label: "Azul", preview: "bg-gradient-to-r from-blue-500 to-blue-600" },
    { value: "from-green-500 to-green-600", label: "Verde", preview: "bg-gradient-to-r from-green-500 to-green-600" },
    {
      value: "from-orange-500 to-orange-600",
      label: "Naranja",
      preview: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
    { value: "from-teal-500 to-teal-600", label: "Teal", preview: "bg-gradient-to-r from-teal-500 to-teal-600" },
    { value: "from-pink-500 to-pink-600", label: "Rosa", preview: "bg-gradient-to-r from-pink-500 to-pink-600" },
    {
      value: "from-indigo-500 to-indigo-600",
      label: "Índigo",
      preview: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    },
    {
      value: "from-emerald-500 to-emerald-600",
      label: "Esmeralda",
      preview: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    },
  ]

  return (
    <div className="h-full overflow-y-auto">

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-gradient-to-r ${editedModule.color} rounded-xl`}>

            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{isEditing ? "Editando Módulo" : "Vista de Módulo"}</h1>
              <p className="text-gray-600">
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* The Switch for module active state */}
            <div className="flex items-center gap-2 mr-4">
              <Label htmlFor="module-active">Activo</Label>
              {/* Switch icon */}
              <Switch
                id="module-active"
                checked={editedModule.isActive}
                onCheckedChange={(checked) => setEditedModule({ ...editedModule, isActive: checked })}
                disabled={!isEditing}
              />
            </div>

            {/* If the module is being edited or not */}
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button variant="black" onClick={handleSave}>
                  <LucideIcons.Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </>
            ) : (
              <Button variant="black" onClick={() => setIsEditing(true)}>
                <LucideIcons.Edit3 className="h-4 w-4 mr-2" />Editar
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* HEADER */}

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideIcons.Target className="h-5 w-5" />
                Información Básica
            </CardTitle>
          </CardHeader>

          {/* CARD OF THE MODULE */}
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título del Módulo</Label>
                <Input
                  id="title"
                  value={editedModule.title}
                  onChange={(e) => setEditedModule({ ...editedModule, title: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="icon">Icono</Label>
                <div className="relative">
                  <Input
                    id="icon"
                    value={editedModule.icon}
                    onChange={(e) => setEditedModule({ ...editedModule, icon: e.target.value })}
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
                
                {/* Modal to select the icon */}
                {showIconModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
                      {/* HEADER */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Selecciona un icono</h2>
                        <Button variant="ghost" onClick={() => setShowIconModal(false)}>
                          <LucideIcons.X className="h-5 w-5" />
                        </Button>
  
                      </div>
                      {/* HEADER */}

                      {/* IFRAME */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Busca y copia el nombre del icono en <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">lucide.dev/icons</a> y pégalo abajo.
                        </p>
                        <iframe
                          src="https://lucide.dev/icons/"
                          title="Lucide Icon Browser"
                          className="w-full h-96 border rounded"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Haz clic en el icono en la web de Lucide para copiar el nombre, luego pégalo aquí abajo.
                        </p>
                      </div>
                      {/* IFRAME */}

                      {/* ICON NAME REFRACT */}
                      <div className="mt-4">
                        <Label htmlFor="iconName" className="mb-1 block">Nombre del icono</Label>
                        <div className="flex gap-2">
                          <Input
                            id="iconName"
                            value={editedModule.icon}
                            onChange={(e) => setEditedModule({ ...editedModule, icon: e.target.value })}
                            placeholder="Ejemplo: BookOpen"
                            autoFocus
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={async () => {
                              try {
                                const text = await navigator.clipboard.readText()
                                setEditedModule({ ...editedModule, icon: text })
                              } catch {
                                alert("No se pudo acceder al portapapeles. Pega manualmente el nombre del icono.")
                              }
                            }}
                            title="Pegar nombre del icono"
                          >
                            <LucideIcons.ClipboardPaste className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          className="bg-black text-white block w-1/4 m-auto mt-2.5"
                          onClick={() => setShowIconModal(false)}
                        >
                          Usar este icono
                        </Button>
                      </div>
                      {/* ICON NAME */}

                    </div>
                  </div>
                )}
                {/* Modal to select the icon */}
              </div>
              
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={editedModule.description}
                onChange={(e) => setEditedModule({ ...editedModule, description: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="grade">Grado</Label>
                <Select
                  value={editedModule.grade}
                  onValueChange={(value: "10" | "11") => setEditedModule({ ...editedModule, grade: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10° Grado</SelectItem>
                    <SelectItem value="11">11° Grado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* MODULE COLOR */}
            <div>
              <Label>Color del Módulo</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => isEditing && setEditedModule({ ...editedModule, color: color.value })}
                    disabled={!isEditing}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      editedModule.color === color.value
                        ? "border-gray-800 scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    } ${!isEditing ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  >
                    <div className={`w-full h-8 rounded ${color.preview}`} />
                    <div className="text-xs mt-1 text-center">{color.label}</div>
                  </button>
                ))}
              </div>
            </div>
            {/* MODULE COLOR */}

            {/* TOPICS SECTION */}
            <div>
              <Label>Tópicos</Label>
              <Button
                type="button"
                variant="outline"
                className="ml-2 mb-2"
                onClick={addTopic}
                disabled={!isEditing}
              >
                + Añadir tópico
              </Button>
              {(editedModule.topics || []).map((topic, idx) => (
                <div key={idx} className="mb-6 border rounded p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      placeholder="Título del tópico"
                      value={topic.title}
                      onChange={e => {
                        const topics = [...editedModule.topics]
                        topics[idx].title = e.target.value
                        setEditedModule({ ...editedModule, topics })
                      }}
                      disabled={!isEditing}
                    />
                    {isEditing && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeTopic(idx)}
                        title="Eliminar tópico"
                      >
                        <LucideIcons.Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <ReactQuill
                    theme="snow"
                    value={topic.content}
                    onChange={value => {
                      const topics = [...editedModule.topics]
                      topics[idx].content = value
                      setEditedModule({ ...editedModule, topics })
                    }}
                    readOnly={!isEditing}
                    style={{ background: isEditing ? "white" : "#f9fafb" }}
                  />
                </div>
              ))}
            </div>
            {/* TOPICS SECTION */}

          </CardContent>
          {/* CARD OF THE MODULE */}
        </Card>
      </div>
    </div>
  )
}