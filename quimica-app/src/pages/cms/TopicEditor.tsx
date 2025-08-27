"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Edit3, Eye, FileText, Clock, Target, BookOpen, Lightbulb, CheckCircle, AlertCircle } from "lucide-react"
import type { CMSTopic } from "../../types/cms"

interface CMSTopicEditorProps {
  topic: CMSTopic
  onSave: (topic: CMSTopic) => void
}

export function CMSTopicEditor({ topic, onSave }: CMSTopicEditorProps) {
  const [editedTopic, setEditedTopic] = useState<CMSTopic>(topic)
  const [isEditing, setIsEditing] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const handleSave = () => {
    const updatedTopic = {
      ...editedTopic,
      updatedAt: new Date().toISOString(),
    }
    onSave(updatedTopic)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTopic(topic)
    setIsEditing(false)
  }

  const iconOptions = [
    "FileText",
    "BookOpen",
    "Atom",
    "Beaker",
    "Calculator",
    "Target",
    "Lightbulb",
    "Zap",
    "Flame",
    "Droplet",
    "Wind",
    "Snowflake",
    "Sun",
    "Moon",
    "Star",
    "Heart",
    "Shield",
    "Key",
    "Lock",
    "Eye",
    "Search",
    "Plus",
    "Minus",
  ]

  const wordCount = editedTopic.content.split(/\s+/).filter((word) => word.length > 0).length
  const readingTime = Math.ceil(wordCount / 200) // Assuming 200 words per minute

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{isEditing ? "Editando Tema" : "Vista de Tema"}</h1>
              <div className="flex items-center gap-4 mt-1">
                <Badge variant="outline">{editedTopic.difficulty}</Badge>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {editedTopic.estimatedTime}
                </span>
                <span className="text-sm text-gray-600">
                  {wordCount} palabras • ~{readingTime} min lectura
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <Label htmlFor="topic-active">Activo</Label>
              <Switch
                id="topic-active"
                checked={editedTopic.isActive}
                onCheckedChange={(checked: boolean) => setEditedTopic({ ...editedTopic, isActive: checked })}
                disabled={!isEditing}
              />
            </div>

            <Button variant="outline" onClick={() => setPreviewMode(!previewMode)} className="mr-2">
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? "Editor" : "Vista Previa"}
            </Button>

            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {previewMode ? (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{editedTopic.title}</CardTitle>
                    <p className="text-purple-100 mt-1">{editedTopic.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Badge className="bg-white/20 text-white border-0">{editedTopic.difficulty}</Badge>
                  <span className="text-purple-100 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {editedTopic.estimatedTime}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  {editedTopic.content.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Edit Mode */
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Contenido</TabsTrigger>
              <TabsTrigger value="metadata">Metadatos</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Información del Tema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="topic-title">Título del Tema</Label>
                    <Input
                      id="topic-title"
                      value={editedTopic.title}
                      onChange={(e) => setEditedTopic({ ...editedTopic, title: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1 text-lg font-semibold"
                    />
                  </div>

                  <div>
                    <Label htmlFor="topic-description">Descripción Breve</Label>
                    <Textarea
                      id="topic-description"
                      value={editedTopic.description}
                      onChange={(e) => setEditedTopic({ ...editedTopic, description: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                      rows={2}
                      placeholder="Descripción concisa del tema..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Content Editor */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Contenido Principal
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{wordCount} palabras</span>
                    <span>~{readingTime} min lectura</span>
                    {wordCount < 100 && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <AlertCircle className="h-4 w-4" />
                        Contenido muy corto
                      </div>
                    )}
                    {wordCount >= 100 && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Longitud adecuada
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={editedTopic.content}
                    onChange={(e) => setEditedTopic({ ...editedTopic, content: e.target.value })}
                    disabled={!isEditing}
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Escribe el contenido del tema aquí...

Puedes usar párrafos separados por líneas en blanco.

Incluye ejemplos, explicaciones detalladas y conceptos clave."
                  />

                  {isEditing && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-1">Consejos para el contenido:</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Usa párrafos cortos y claros</li>
                            <li>• Incluye ejemplos prácticos</li>
                            <li>• Define términos técnicos</li>
                            <li>• Estructura la información de forma lógica</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metadata" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Metadatos del Tema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="topic-difficulty">Nivel de Dificultad</Label>
                      <Select
                        value={editedTopic.difficulty}
                        onValueChange={(value: "Básico" | "Intermedio" | "Avanzado") =>
                          setEditedTopic({ ...editedTopic, difficulty: value })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Básico">Básico</SelectItem>
                          <SelectItem value="Intermedio">Intermedio</SelectItem>
                          <SelectItem value="Avanzado">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="topic-time">Tiempo Estimado</Label>
                      <Input
                        id="topic-time"
                        value={editedTopic.estimatedTime}
                        onChange={(e) => setEditedTopic({ ...editedTopic, estimatedTime: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                        placeholder="ej: 30 min, 1 hora"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="topic-icon">Icono del Tema</Label>
                    <Select
                      value={editedTopic.icon}
                      onValueChange={(value) => setEditedTopic({ ...editedTopic, icon: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <Label>Fecha de Creación</Label>
                      <div className="mt-1 p-2 bg-gray-50 rounded">
                        {new Date(editedTopic.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div>
                      <Label>Última Actualización</Label>
                      <div className="mt-1 p-2 bg-gray-50 rounded">
                        {new Date(editedTopic.updatedAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Configuración del Tema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label htmlFor="topic-active-setting">Estado del Tema</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Controla si este tema es visible para los estudiantes
                      </p>
                    </div>
                    <Switch
                      id="topic-active-setting"
                      checked={editedTopic.isActive}
                      onCheckedChange={(checked) => setEditedTopic({ ...editedTopic, isActive: checked })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <Label>Orden del Tema</Label>
                    <p className="text-sm text-gray-600 mt-1 mb-3">Posición de este tema dentro del submódulo</p>
                    <Input
                      type="number"
                      value={editedTopic.order}
                      onChange={(e) => setEditedTopic({ ...editedTopic, order: Number.parseInt(e.target.value) || 1 })}
                      disabled={!isEditing}
                      min="1"
                      className="w-24"
                    />
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-1">Nota Importante</h4>
                        <p className="text-sm text-amber-700">
                          Los cambios en la configuración afectarán inmediatamente la experiencia del estudiante.
                          Asegúrate de revisar el contenido antes de activar el tema.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}