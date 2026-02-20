import { useState, useMemo } from "react"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Plus, Search, Settings } from "lucide-react"
import type { CMSModule } from "../../types/cms"

interface ModuleSidebarProps {
  modules: CMSModule[]
  onModuleSelect?: (id: number) => void
  showAddModule?: boolean
  onAddModule?: () => void
  showSaving?: boolean
}

export function ModuleSidebar({
  modules = [],
  onModuleSelect,
  showAddModule = true,
  onAddModule,
  showSaving = false,
}: ModuleSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const selectedModuleId = localStorage.getItem("selectedModuleId")

  const filteredModules = useMemo(
    () =>
      modules.filter(
        (module) =>
          module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [modules, searchQuery]
  )

  const handleSelect = (id: string | number) => {
    localStorage.setItem("selectedModuleId", String(id));
    if (onModuleSelect) onModuleSelect(Number(id));
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar módulos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {showAddModule && onAddModule && (
          <div className="flex gap-2 mt-4 bg-black rounded text-white">
            <Button size="sm" onClick={onAddModule} className="flex-1 cursor-pointer">
              <Plus className="h-4 w-4 mr-1" />
              Módulo
            </Button>
          </div>
        )}
        {showSaving && (
          <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Guardando cambios...
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {filteredModules.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <Settings className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <div className="font-semibold">{modules.length} Módulos</div>
            <div>
              {modules.reduce(
                (acc, m) => acc + (Array.isArray(m.topics) ? m.topics.length : 0),
                0
              )} Temas
            </div>
            <div className="mt-2">No hay módulos para mostrar.</div>
          </div>
        ) : (
          filteredModules.map((module) => (
            <div key={module.id} className="mb-2">
              <div
                className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 group cursor-pointer ${
                  String(module.id) === selectedModuleId ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelect(module.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {module.grade_level ? `${module.grade_level}°` : "Sin grado"}
                    </Badge>
                    <span className="text-sm font-medium truncate">{module.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}