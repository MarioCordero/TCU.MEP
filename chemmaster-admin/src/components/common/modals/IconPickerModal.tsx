import { useState, useMemo } from 'react'
import { Input } from '../../ui/input'
import { Modal } from '../../ui/modal'
import * as LucideIcons from 'lucide-react'
import { IconPickerModalProps } from '../../../types/iconPicker'

export default function IconPickerModal({ show, onClose, currentIcon, onIconChange }: IconPickerModalProps) {
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