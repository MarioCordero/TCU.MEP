import type { ColorOption } from "../types/cms"

export const COLOR_OPTIONS: ColorOption[] = [
  {
    value: "from-purple-500 to-purple-600",
    label: "Púrpura",
    preview: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  { 
    value: "from-blue-500 to-blue-600", 
    label: "Azul", 
    preview: "bg-gradient-to-r from-blue-500 to-blue-600" 
  },
  { 
    value: "from-green-500 to-green-600", 
    label: "Verde", 
    preview: "bg-gradient-to-r from-green-500 to-green-600" 
  },
  {
    value: "from-orange-500 to-orange-600",
    label: "Naranja",
    preview: "bg-gradient-to-r from-orange-500 to-orange-600",
  },
  { 
    value: "from-teal-500 to-teal-600", 
    label: "Teal", 
    preview: "bg-gradient-to-r from-teal-500 to-teal-600" 
  },
  { 
    value: "from-pink-500 to-pink-600", 
    label: "Rosa", 
    preview: "bg-gradient-to-r from-pink-500 to-pink-600" 
  },
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

export const ALLOWED_GRADES = ["10", "11"] as const
export type AllowedGrade = typeof ALLOWED_GRADES[number]
