# 👨‍💻 Guía para Desarrolladores - ChemMaster

## 🚀 Setup Rápido

### Primeros Pasos
```bash
# 1. Clonar y navegar
git clone https://github.com/MarioCordero/TCU.MEP.git
cd TCU.MEP/quimica-app

# 2. Instalar dependencias
npm install

# 3. Iniciar desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

### Verificación de Instalación
Si todo está correcto, deberías ver:
- ✅ La pantalla principal de ChemMaster
- ✅ Navegación entre grados funcional
- ✅ Estilos de Tailwind aplicados correctamente
- ✅ Sin errores en la consola del navegador

## 🏗️ Arquitectura del Proyecto

### Estructura de Componentes
```
src/
├── App.jsx                 # Punto de entrada principal
├── page.tsx                # Landing page y navegación principal
├── grade-10/page.tsx       # Hub de módulos 10° grado
├── grade-11/page.tsx       # Hub de módulos 11° grado
├── screens/                # Módulos específicos
│   ├── tabla-periodica.tsx
│   ├── estructura-atomica.tsx
│   └── configuracion-electronica.tsx
└── components/ui/          # Componentes base reutilizables
```

### Flujo de Navegación
```
Landing Page (page.tsx)
    ├── Grade 10 Hub (grade-10/page.tsx)
    │   ├── Tabla Periódica (screens/tabla-periodica.tsx)
    │   ├── Estructura Atómica (screens/estructura-atomica.tsx)
    │   └── Configuración Electrónica (screens/configuracion-electronica.tsx)
    ├── Grade 11 Hub (grade-11/page.tsx)
    │   └── [Módulos por implementar]
    └── Info Page (integrada en page.tsx)
```

## 🎯 Tareas Prioritarias

### 🚨 URGENTE - Corregir Primero
1. **Error de Tailwind CSS** (Ya resuelto)
   - Error: `border-border` utility class
   - Solución aplicada: Reemplazado por CSS directo
   
2. **Navegación Rota**
   - Verificar que `onNavigate` funcione correctamente
   - Probar transiciones entre pantallas

3. **Imports Faltantes**
   - Revisar todos los imports de componentes
   - Verificar rutas de archivos

### 🎨 Implementar Pantallas Faltantes

#### Para Décimo Grado:
- [ ] **Enlaces Químicos** (`screens/enlaces-quimicos.tsx`)
- [ ] **Nomenclatura Inorgánica** (`screens/nomenclatura-inorganica.tsx`)
- [ ] **Reacciones Químicas** (`screens/reacciones-quimicas.tsx`)
- [ ] **Estequiometría** (`screens/estequiometria.tsx`)

#### Para Undécimo Grado:
- [ ] **Disoluciones Avanzadas** (`screens/disoluciones-avanzadas.tsx`)
- [ ] **Propiedades Coligativas** (`screens/propiedades-coligativas.tsx`)
- [ ] **Química Orgánica** (`screens/quimica-organica.tsx`)
- [ ] **Nomenclatura Orgánica** (`screens/nomenclatura-organica.tsx`)
- [ ] **Isomería** (`screens/isomeria.tsx`)

## 🛠️ Plantillas de Código

### Template para Nueva Pantalla de Módulo
```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, [IconName] } from "lucide-react"

interface [ModuleName]Props {
  onBack: () => void;
}

export default function [ModuleName]({ onBack }: [ModuleName]Props) {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color-50] via-white to-[color-50]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[color-100] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-[color-100]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[color-500] to-[color-600] rounded-xl">
                <[IconName] className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">[Título del Módulo]</h1>
                <p className="text-xs text-gray-600">[Descripción breve]</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>[Título de la Sección]</CardTitle>
            <CardDescription>[Descripción de la funcionalidad]</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Contenido del módulo */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### Template para Componente UI
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { [IconName] } from "lucide-react"

interface [ComponentName]Props {
  title: string;
  description?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function [ComponentName]({ 
  title, 
  description, 
  onClick, 
  disabled = false 
}: [ComponentName]Props) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
            <[IconName] className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

## 🎨 Guía de Diseño

### Paleta de Colores por Grado
```css
/* 10° Grado - Púrpura/Azul */
--grade-10-primary: from-purple-500 to-blue-500
--grade-10-light: from-purple-50 to-blue-50
--grade-10-accent: purple-100

/* 11° Grado - Esmeralda/Teal */
--grade-11-primary: from-emerald-500 to-teal-500
--grade-11-light: from-emerald-50 to-teal-50
--grade-11-accent: emerald-100
```

### Módulos por Color
```css
/* Tabla Periódica */ --purple-500 to purple-600
/* Estructura Atómica */ --blue-500 to blue-600
/* Enlaces Químicos */ --orange-500 to orange-600
/* Nomenclatura */ --teal-500 to teal-600
/* Reacciones */ --pink-500 to pink-600
/* Estequiometría */ --indigo-500 to indigo-600
```

### Espaciado Estándar
- **Padding contenedores**: `p-4` o `p-6` o `p-8`
- **Márgenes secciones**: `mb-6` o `mb-8`
- **Gap grids**: `gap-4` o `gap-6`
- **Radius consistente**: `rounded-xl` para cards, `rounded-lg` para elementos

## 🔧 Configuración de Desarrollo

### ESLint Rules (Agregar)
```json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
```

### Prettier Config (Agregar)
```json
{
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## 📱 Testing Guidelines

### Checklist de Testing Manual
- [ ] **Desktop**: Chrome, Firefox, Safari
- [ ] **Mobile**: iOS Safari, Android Chrome
- [ ] **Tablet**: iPad, Android tablets
- [ ] **Navegación**: Todas las rutas funcionan
- [ ] **Responsive**: Breakpoints md, lg, xl
- [ ] **Performance**: Lighthouse score >90

### Casos de Prueba Prioritarios
1. **Flujo principal**: Landing → Grado → Módulo → Regresar
2. **Responsive**: Redimensionar ventana en cada pantalla
3. **Touch**: Interacciones táctiles en móvil
4. **Performance**: Tiempo de carga inicial < 3s

## 🚀 Deployment

### Build de Producción
```bash
# Construir
npm run build

# Preview local
npm run preview

# Los archivos estarán en dist/
```

### Checklist Pre-Deploy
- [ ] `npm run build` sin errores
- [ ] `npm run lint` sin warnings críticos
- [ ] Todas las rutas funcionan en build
- [ ] Assets optimizados (imágenes, iconos)
- [ ] Manifest.json configurado correctamente

## 🎯 Métricas de Éxito

### Performance Goals
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 4s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 5s

### UX Goals
- **Navigation**: < 2 clicks para cualquier contenido
- **Mobile-first**: Funcional en 320px width
- **Accessibility**: WCAG 2.1 AA compliance
- **Browser support**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)

## 📞 Contacto y Ayuda

### Para Issues Técnicos
1. Verificar en TODO.md si ya está listado
2. Revisar README.md para configuración
3. Crear issue en GitHub con:
   - Pasos para reproducir
   - Screenshot/video si aplica
   - Información del sistema

### Recursos Útiles
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [Lucide Icons](https://lucide.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

**¡Feliz coding! 🚀**  
*Recuerda: calidad sobre cantidad, funcionalidad sobre features.*
