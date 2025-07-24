# 🧪 ChemMaster - Química Interactiva

Una aplicación educativa moderna e interactiva para el aprendizaje de química en educación secundaria, diseñada específicamente para estudiantes de 10° y 11° grado.

## 🚀 Características Principales

- **Interfaz Moderna**: Diseño responsivo con Tailwind CSS y componentes UI elegantes
- **Simuladores 3D**: Visualización interactiva de estructuras atómicas y moleculares
- **Calculadoras Especializadas**: Herramientas avanzadas para cálculos químicos
- **Tabla Periódica Interactiva**: Explorador completo con datos actualizados
- **Laboratorios Virtuales**: Experimentación segura y educativa
- **Sistema de Progreso**: Seguimiento del avance por módulos
- **Contenido Curricular**: Alineado con los estándares educativos

## 📚 Módulos Incluidos

### 10° Grado
- Tabla Periódica Interactiva
- Estructura Atómica
- Configuración Electrónica
- Enlaces Químicos
- Nomenclatura Inorgánica
- Reacciones Químicas
- Estequiometría

### 11° Grado
- Disoluciones Avanzadas
- Propiedades Coligativas
- Química Orgánica Fundamental
- Nomenclatura Orgánica
- Isomería

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Estilos**: Tailwind CSS 4.1.10
- **UI Components**: Componentes personalizados con shadcn/ui
- **Iconos**: Lucide React
- **Utilidades**: clsx, tailwind-merge

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/MarioCordero/TCU.MEP.git
cd TCU.MEP/quimica-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Verificar la instalación

```bash
npm run dev
```

La aplicación debería estar disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
quimica-app/
├── public/                 # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── components/         # Componentes UI reutilizables
│   │   └── ui/            # Componentes base (botones, cards, etc.)
│   ├── screens/           # Pantallas específicas de módulos
│   │   ├── clasificacion-materia.tsx
│   │   ├── configuracion-electronica.tsx
│   │   ├── estructura-atomica.tsx
│   │   └── tabla-periodica.tsx
│   ├── grade-10/          # Módulos de décimo grado
│   │   └── page.tsx
│   ├── grade-11/          # Módulos de undécimo grado
│   │   └── page.tsx
│   ├── lib/               # Utilidades
│   │   └── utils.ts
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Punto de entrada
│   ├── page.tsx           # Página principal
│   ├── globals.css        # Estilos globales
│   └── manifest.ts        # Configuración PWA
├── package.json
├── tailwind.config.js     # Configuración de Tailwind
├── vite.config.js         # Configuración de Vite
└── README.md
```

## 🎯 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta el linter ESLint |

## 🔧 Configuración de Desarrollo

### Variables de Entorno
Actualmente no se requieren variables de entorno específicas.

### Configuración de Tailwind
El proyecto usa Tailwind CSS v4 con configuración personalizada para:
- Colores del sistema de diseño
- Variables CSS personalizadas
- Animaciones específicas
- Tema claro/oscuro

### Configuración de TypeScript
Se incluyen archivos de configuración para TypeScript:
- `tsconfig.json` - Configuración principal
- `tsconfig.node.json` - Configuración para Node.js

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Previsualización Local
```bash
npm run preview
```

Los archivos se generarán en la carpeta `dist/` listos para ser desplegados en cualquier servidor web estático.

## 🎨 Guía de Desarrollo

### Agregando Nuevos Módulos

1. Crear un nuevo archivo en `src/screens/`
2. Implementar el componente siguiendo la estructura existente
3. Agregar la navegación en `src/page.tsx`
4. Incluir en el módulo correspondiente (`grade-10` o `grade-11`)

### Estructura de Componentes
```tsx
interface ModuleProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export default function NewModule({ onBack }: ModuleProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header con botón de regreso */}
      {/* Contenido del módulo */}
    </div>
  );
}
```

### Estilos y Theming
- Utilizar las variables CSS definidas en `globals.css`
- Seguir la paleta de colores establecida
- Mantener consistencia en gradientes y sombras
- Usar componentes UI existentes cuando sea posible

## 🧪 Testing

Actualmente no hay tests configurados. Se recomienda agregar:
- Tests unitarios con Jest + React Testing Library
- Tests de integración
- Tests E2E con Playwright o Cypress

## 📚 Recursos Adicionales

### Documentación de Dependencias
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

### Estándares de Código
- Usar TypeScript para nuevos componentes
- Seguir las convenciones de React Hooks
- Mantener componentes pequeños y reutilizables
- Documentar componentes complejos

## 📄 Licencia

Este proyecto es parte del TCU (Trabajo Comunal Universitario) del MEP (Ministerio de Educación Pública).

## 👥 Autores

- **Mario Cordero** - Desarrollo principal
- **Fabian** -