import React from "react"
import {
  Table2,
  Atom,
  Orbit,
  Link,
  FileText,
  FlaskRound,
  Scale,
  Hexagon,
  Droplets,
  Thermometer,
  GitBranch,
  Box,
  Layers,
  Waves,
  Pencil,
} from "lucide-react"

// Icon mapping - extended with more icons
export const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Table2,
  Atom,
  Orbit,
  Link,
  FileText,
  FlaskRound,
  Scale,
  Hexagon,
  Droplets,
  Thermometer,
  GitBranch,
  Box,
  Layers,
  Waves,
  Droplet: Droplets,
  LucidePencil: Pencil,
}

// Get icon component with fallback
export const getIconComponent = (iconName?: string) => {
  if (!iconName) return Atom
  return iconMap[iconName] || Atom
}
