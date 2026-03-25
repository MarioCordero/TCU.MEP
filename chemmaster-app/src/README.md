# ChemMaster Frontend - Documentación del Directorio `src/`

Este directorio contiene la aplicación completa React/TypeScript para ChemMaster, diseñada para funcionar **como una aplicación independiente** o **integrada en una aplicación padre**.

---

## 📋 Estructura del Directorio

```
src/
├── App.tsx                 # Componente raíz con lógica de enrutamiento
├── main.tsx                # Punto de entrada para modo independiente
├── main.css                # Estilos globales
├── vite-env.d.ts           # Tipos de ambiente de Vite
├── assets/                 # Archivos estáticos (imágenes, fuentes, etc.)
├── components/             # Componentes React reutilizables
├── context/                # Gestión de estado global (React Context)
├── hooks/                  # Hooks personalizados de React
├── lib/                    # Utilidades principales y cliente API
├── pages/                  # Componentes de página (rutas)
├── types/                  # Definiciones de interfaces TypeScript
└── utils/                  # Funciones de utilidad
```

---

## 🔧 Archivos Principales

### `App.tsx` - Componente Raíz
**Propósito:** Componente principal del enrutamiento y disposición de la aplicación

**Características:**
- Define todas las rutas de la aplicación
- Envuelve la app con proveedores de Context (ProgressContext, NavigationContext)
- Maneja la navegación entre páginas
- Base path configurable para integración con app padre

**Estructura:**
```typescript
export default function App() {
  return (
    <ProgressProvider>
      <NavigationProvider basePath="/chemistry">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/grades" element={<GradeSelectorPage />} />
          <Route path="/grade/:gradeId/modules" element={<GradePage />} />
          <Route path="/topic/:topicId" element={<TopicPage />} />
          <Route path="/cms" element={<CMSPage />} />
          {/* ... otras rutas */}
        </Routes>
      </NavigationProvider>
    </ProgressProvider>
  )
}
```

### `main.tsx` - Punto de Entrada
**Propósito:** Bootstrap de la aplicación (solo en modo independiente)

**Uso:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### `main.css` - Estilos Globales
**Contiene:**
- Importaciones de Tailwind CSS
- Estilos globales personalizados
- Definición de variables CSS
- Estilos personalizados de scrollbar

---

## 📁 Documentación de Carpetas

### **`components/`** - Componentes React Reutilizables

Organizados por característica/dominio. Cada componente es independiente y reutilizable.

#### **`activities/`** - Componentes de Aprendizaje Interactivo
Componentes que renderizan diferentes tipos de interfaces de cuiz/actividades para estudiantes.

| Componente | Propósito |
|-----------|---------|
| `QuizActivity.tsx` | Renderizador de cuiz de opción múltiple |
| `FillBlankActivity.tsx` | Ejercicio de completar espacios en blanco |
| `DragDropActivity.tsx` | Interacción de arrastrar y soltar |
| `MatchActivity.tsx` | Ejercicio de emparejar pares |
| `WordSoupActivity.tsx` | Sopa de letras (búsqueda de palabras) |
| `TopicActivitiesRenderer.tsx` | Orquestador que muestra todas las actividades de un tópico |

**Ejemplo de Uso:**
```typescript
import QuizActivity from '@/components/activities/QuizActivity'

<QuizActivity 
  topicId={1}
  onComplete={() => console.log('Cuiz completado')}
/>
```

#### **`cms/`** - Componentes del Sistema de Gestión de Contenidos
Componentes del panel de administración para gestionar módulos, tópicos y actividades.

**Subcarpetas:**
- **`module/`** - Creación/edición de módulos
  - `AddModuleModal.tsx` - Diálogo para crear nuevo módulo
  - `ModuleEditor.tsx` - Editar contenido de módulo existente
  
- **`topic/`** - Creación/edición de tópicos
  - `AddTopicModal.tsx` - Diálogo para crear nuevo tópico
  - `TopicEditor.tsx` - Editar contenido de tópico y actividades
  - `TopicEditorModal.tsx` - Envoltorio modal para editar tópicos
  
- **`activities/`** - Creación/edición de actividades
  - `ActivityEditorModal.tsx` - Editor genérico de actividades
  - `ActivityManagerModal.tsx` - Listar y gestionar actividades
  - **`activitiesForms/`** - Formularios específicos por tipo de actividad
    - `QuizForm.tsx` - Configuración de cuiz
    - `FillBlankForm.tsx` - Configuración de espacios en blanco
    - `DragDropForm.tsx` - Configuración de arrastrar y soltar
    - `MatchForm.tsx` - Configuración de emparejamiento
    - `WordSoupForm.tsx` - Configuración de sopa de letras
    - `index.ts` - Exporta todos los formularios

- **`mathBlock/`** - Editor de ecuaciones matemáticas
  - `MathBlock.tsx` - Renderizar ecuaciones matemáticas
  - `MathBlockContext.tsx` - Context para edición de matemáticas
  - `MathEditorModal.tsx` - Editar expresiones LaTeX/matemáticas

- **`Sidebar.tsx`** - Navegación de la barra lateral del administrador

**Ejemplo - Crear un Módulo:**
```typescript
import AddModuleModal from '@/components/cms/module/AddModuleModal'

<AddModuleModal 
  show={true}
  onClose={() => setShowModal(false)}
  onModuleAdded={(module) => {
    console.log('Módulo creado:', module)
  }}
/>
```

#### **`common/`** - Componentes Compartidos
Componentes de UI comunes utilizados en toda la app.

| Componente | Propósito |
|-----------|---------|
| `Header.tsx` | Encabezado de página con navegación |
| **`modals/`** | Variantes de diálogos modales |
| | `ConfirmSaveModal.tsx` - Confirmación de guardado |
| | `IconPickerModal.tsx` - Selector de iconos |
| | `SuccessModal.tsx` - Notificación de éxito |

#### **`grade-selection/`** - UI de Selección de Grado
Componentes para el flujo de selección de grado.

| Componente | Propósito |
|-----------|---------|
| `GradeModulePath.tsx` | Ruta de navegación grado → módulos |
| `GradeModulePathHeader.tsx` | Visualización del encabezado de ruta |
| `StairStep.tsx` | Indicador visual de pasos |
| `CompletionModal.tsx` | Celebración de completación de módulo |

#### **`topic-selection/`** - UI de Tópicos/Aprendizaje
Componentes para examinar tópicos y actividades.

| Componente | Propósito |
|-----------|---------|
| `TopicListOverlay.tsx` | Modal mostrando todos los tópicos del módulo |
| `TopicRow.tsx` | Elemento de lista de tópico individual |
| `TopicLearningHeader.tsx` | Encabezado de página de tópico |
| `TopicQuiz.tsx` | Contenedor de actividades/cuiz de tópico |

#### **`ui/`** - Primitivos de UI
Componentes de UI de bajo nivel (botones, entradas, tarjetas, etc.). Construidos con Tailwind CSS y utilidad `cn()` composable.

| Componente | Propósito |
|-----------|---------|
| `button.tsx` | Variantes de botón (primario, secundario, destructivo) |
| `input.tsx` | Campo de entrada de texto |
| `textarea.tsx` | Área de texto multilínea |
| `select.tsx` | Desplegable de selección |
| `modal.tsx` | Envoltorio de diálogo modal |
| `card.tsx` | Componente contenedor |
| `badge.tsx` | Insignia de estado/etiqueta |
| `switch.tsx` | Interruptor de toggle |
| `tabs.tsx` | Navegación con pestañas |
| `accordion.tsx` | Secciones contraíbles |
| `progress.tsx` | Barra de progreso |
| `searchbar.tsx` | Entrada de búsqueda con autocompletado |
| `header.tsx` | Componente de encabezado |
| `label.tsx` | Etiqueta de formulario |
| `highlight.tsx` | Resaltado de texto |
| `TipTapEditor.tsx` | Editor WYSIWYG de texto enriquecido |
| `buttondescripted.tsx` | Botón con descripción |

**Ejemplo - Usando Componentes de UI:**
```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'

<Modal isOpen={isOpen} onClose={closeModal}>
  <Input 
    type="text" 
    placeholder="Ingresa texto..."
    onChange={(e) => setValue(e.target.value)}
  />
  <Button 
    type="primary"
    onClick={() => handleSubmit()}
  >
    Enviar
  </Button>
</Modal>
```

---

### **`context/`** - Gestión del Estado Global

Proveedores de React Context para estado compartido en toda la app. NO usar Context para cada estado - solo para datos compartidos globalmente.

#### **`ProgressContext.tsx`**
**Gestiona:** Seguimiento del progreso del estudiante entre módulos/tópicos

**Exporta:**
- `ProgressProvider` - Componente envoltorio
- `useProgressContext()` - Hook para acceder al estado de progreso

**Forma del Estado:**
```typescript
{
  grades: {
    "10": {
      modules: {
        moduleId: {
          totalTopics: number,
          completedTopics: number,
          progressPercent: number,
          topics: { topicId: true }
        }
      }
    }
  },
  saveProgress: (grade, moduleId, topicId) => void,
  getModuleProgress: (grade, moduleId) => ProgressData,
  getGradeProgress: (grade) => GradeProgress
}
```

**Uso:**
```typescript
import { useProgressContext } from '@/context/ProgressContext'

function MyComponent() {
  const { getModuleProgress, saveProgress } = useProgressContext()
  
  const progress = getModuleProgress('10', 1)
  console.log(`Completación del módulo: ${progress.progressPercent}%`)
  
  const handleTopicComplete = () => {
    saveProgress('10', 1, 5)  // Guardar tópico 5 como completado
  }
}
```

#### **`NavigationContext.tsx`**
**Gestiona:** Estado de navegación de la app y configuración de base path

**Exporta:**
- `NavigationProvider` - Componente envoltorio con prop `basePath`
- `useNavigationBase()` - Hook para acceder al estado de navegación

**Forma del Estado:**
```typescript
{
  basePath: string,        // p.ej., '/chemistry' o '/'
  goBack: () => void,
  navigateTo: (path: string) => void
}
```

**Uso:**
```typescript
import { useNavigationBase } from '@/context/NavigationContext'

function MyComponent() {
  const { basePath, navigateTo } = useNavigationBase()
  
  // Navegar con prefijo basePath
  const handleNavigate = () => {
    navigateTo(`${basePath}/grades`)
  }
}
```

---

### **`hooks/`** - Hooks Personalizados de React

Lógica reutilizable encapsulada como hooks. Un hook por archivo.

#### **`useProgressContext.ts`**
Hook conveniente para acceder al contexto de progreso con manejo de errores.

```typescript
const { getModuleProgress, saveProgress } = useProgressContext()
```

#### **`useAuthGuard.ts`**
Protege rutas validando el token de autenticación.

```typescript
useAuthGuard()  // Redirige a login si no está autenticado
```

#### **`useApi.ts`**
Maneja llamadas a API con estados de carga/error.

```typescript
const { data, loading, error } = useApi(apiCall, dependencies)
```

#### **`useModuleDelete.ts`**
Encapsula la lógica de eliminación de módulos con modal de confirmación.

```typescript
const { 
  requestDelete,  // Iniciar eliminación
  confirmDelete,  // Confirmar y ejecutar
  cancelDelete,   // Cancelar eliminación
  isDeleting,
  deleteError,
  showDeleteSuccess
} = useModuleDelete(onSuccess)
```

#### **`useModuleEditor.ts`**
Gestiona el estado de edición de módulos y validación.

```typescript
const { 
  formData,
  errors,
  updateField,
  validateForm,
  submitForm
} = useModuleEditor(initialData, onSubmit)
```

#### **`useTopicDelete.ts` & `useActivityDelete.ts`**
Similar a `useModuleDelete` para tópicos y actividades respectivamente.

---

### **`lib/`** - Utilidades Principales

Archivos de biblioteca de funcionalidad central.

#### **`api.ts`** - [CRÍTICO] Cliente API
**Propósito:** Comunicación centralizada con el backend de ChemMaster

**Características:**
- Inyección automática de token Bearer
- Interceptores de solicitud/respuesta
- Manejo de errores
- Cambio automático entre URLs de desarrollo/producción
- Configuración de URL base

**Exporta:** Objeto `API` con métodos

**Métodos Principales:**
```typescript
// Autenticación
API.login(username, password): Promise<{ token: string }>

// Endpoints públicos
API.getModules(grade): Promise<Module[]>
API.getTopics(moduleId): Promise<Topic[]>
API.getActivities(topicId): Promise<Activity[]>
API.getAllContent(): Promise<Content>

// Endpoints protegidos (auto-token)
API.addModule(moduleData): Promise<{ module_id: number }>
API.updateModule(id, data): Promise<void>
API.deleteModule(id): Promise<void>

// Tópicos
API.addTopic(moduleId, data): Promise<Topic>
API.updateTopic(id, data): Promise<void>
API.deleteTopic(id): Promise<void>

// Actividades
API.addActivity(topicId, data): Promise<Activity>
API.updateActivity(id, data): Promise<void>
API.deleteActivity(id): Promise<void>

// Archivos
API.uploadFile(formData): Promise<{ filename, path }>
API.deleteFile(filename): Promise<void>
```

**Uso:**
```typescript
import { API } from '@/lib/api'

// En componentes
const modules = await API.getModules('10')

// En hooks
const { token } = await API.login('user', 'pass')
localStorage.setItem('cms_token', token)
```

#### **`constants.ts`**
Constantes de toda la aplicación.

**Define:**
- URLs base de la API (dev/prod)
- Niveles de grado
- Tipos de actividades
- Nombres de iconos
- Gradientes de color
- Reglas de validación

```typescript
export const GRADES = ['10', '11', '12']
export const ACTIVITY_TYPES = [
  'quiz',
  'fill-blank',
  'drag-drop',
  'match',
  'word-soup',
  'text-response'
]
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://spectcr.com/API/ChemMaster/'
  : 'http://chemmaster.com/API/'
```

#### **`iconMap.ts`**
Mapea nombres de iconos a componentes de Lucide React.

```typescript
const iconMap: Record<string, ReactNode> = {
  'Atom': <Atom />,
  'Book': <Book />,
  'Flask': <Flask />,
  // ... etc
}

export const getIcon = (name: string) => iconMap[name]
```

#### **`utils.ts`**
Funciones de utilidad general.

**Utilidades Comunes:**
```typescript
// Composidor de nombres de clase (Tailwind)
cn('px-4', condition && 'text-blue-500')

// Formato de fecha/hora
formatDate(date)
formatTime(time)

// Validación
isEmail(email): boolean
validatePassword(password): { valid, errors }

// Helpers de localStorage
getFromStorage(key): any
saveToStorage(key, value): void

// Helpers de arreglos/objetos
groupBy(array, key)
unique(array)
```

---

### **`pages/`** - Componentes de Página (Rutas)

Componentes de página completa que representan rutas en la aplicación.

| Página | Ruta | Propósito |
|------|-------|---------|
| `LandingPage.tsx` | `/` | Página de bienvenida/inicio |
| `GradeSelectorPage.tsx` | `/grades` | Seleccionar nivel de grado |
| `GradePage.tsx` | `/grade/:gradeId/modules` | Ver módulos de grado |
| `TopicPage.tsx` | `/topic/:topicId` | Ver tópico con actividades |
| `CMSLoginPage.tsx` | `/cms/login` | Login de administrador |
| `CMSPage.tsx` | `/cms` | Panel de administración (protegido) |
| `InfoPage.tsx` | `/info` | Página de información/ayuda |
| `Resources.tsx` | `/resources` | Recursos de aprendizaje |

**Subcarpetas:** `cms/` - Disposiciones de página específicas del CMS
- `ModuleEditor.tsx` - Editar contenido de módulo
- `TopicEditor.tsx` - Editar contenido de tópico
- `ModuleSidebar.tsx` - Disposición de barra lateral CMS
- `Modals.tsx` - Coordinación de modales CMS

**Ejemplo de Estructura de Página:**
```typescript
export default function GradePage() {
  const { gradeId } = useParams()
  const [modules, setModules] = useState([])
  
  useEffect(() => {
    API.getModules(gradeId).then(setModules)
  }, [gradeId])
  
  return (
    <div>
      <Header title={`Grado ${gradeId}`} />
      <ModuleList modules={modules} />
    </div>
  )
}
```

---

### **`types/`** - Interfaces de TypeScript

Definiciones de tipos de TypeScript organizadas por dominio. Cada archivo agrupa tipos relacionados.

| Archivo | Contiene |
|------|----------|
| `app.ts` | Tipos generales de la app (rutas, config) |
| `cms.ts` | Tipos del CMS/admin |
| `activities.ts` | Estructuras de datos de actividades |
| `login.ts` | Tipos de autenticación |
| `modals.ts` | Tipos de props de modales |
| `moduleProps.ts` | Tipos relacionados a módulos |
| `progress.ts` | Tipos de seguimiento de progreso |
| `gradeSelector.ts` | Tipos de flujo de selección de grado |
| `topicSelector.ts` | Tipos de selección de tópicos |
| `iconPicker.ts` | Tipos del selector de iconos |
| `landing.ts` | Tipos de página de inicio |

**Ejemplo - activities.ts:**
```typescript
export interface Activity {
  id: number
  topic_id: number
  title: string
  type: ActivityType
  activity_data: ActivityData
  active: boolean
}

export type ActivityType = 
  | 'quiz'
  | 'fill-blank'
  | 'drag-drop'
  | 'match'
  | 'word-soup'
  | 'text-response'

export interface ActivityData {
  questions?: Question[]
  pairs?: MatchPair[]
  // ... campos específicos de tipo
}
```

**Uso en Componentes:**
```typescript
import { Activity, ActivityType } from '@/types/activities'

interface ActivityRendererProps {
  activity: Activity
  onComplete: (score: number) => void
}

export default function ActivityRenderer({ activity }: ActivityRendererProps) {
  // Implementación del componente
}
```

---

### **`utils/`** - Funciones de Ayuda y Utilidades

Archivos de utilidad misceláneos.

#### **`progressCookie.tsx`**
Gestiona la persistencia del progreso del estudiante en cookies/localStorage del navegador.

```typescript
export const saveProgressToCookie = (grade, moduleId, topicId)
export const loadProgressFromCookie = (grade): Progress
export const clearProgressCookie = ()
```

---

## 🔗 Guías de Integración

### **Modo Independiente** (Configuración Actual)

Ejecutar como una aplicación completamente independiente:

```bash
cd chemmaster-app
npm install
npm run dev
```

La app carga `main.tsx` → `App.tsx` → Rutas con `/` como base path.

---

### **Integración en Aplicación Padre**

Integrar ChemMaster como módulo en una aplicación SPECT/LMS más grande:

#### **1. Instalar Dependencias**
```bash
# En la raíz de la app padre
npm install  # O instalar desde chemmaster-app/package.json
```

#### **2. Importar Componente App**
```typescript
// En la configuración del enrutador de la app padre
import ChemMasterApp from '@/chemmaster-app/src/App'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      {/* ChemMaster como sub-ruta */}
      <Route path="/chemistry/*" element={<ChemMasterApp />} />
      
      {/* Otras rutas */}
    </Routes>
  )
}
```

#### **3. Configurar Base Path**
El componente `App.tsx` acepta `basePath` a través de `NavigationContext`:

```typescript
import ChemMasterApp from '@/chemmaster-app/src/App'
import { NavigationProvider } from '@/chemmaster-app/src/context/NavigationContext'

function ParentComponent() {
  return (
    <NavigationProvider basePath="/chemistry">
      <ChemMasterApp />
    </NavigationProvider>
  )
}
```

Ahora todas las rutas de ChemMaster estarán bajo `/chemistry` en la app padre.

#### **4. Compartir Estado Global (Opcional)**
Si la app padre necesita compartir estado de progreso o navegación:

```typescript
// Crear envoltorio que proporciona ambos contextos
import ChemMasterApp from '@/chemmaster-app/src/App'
import { ProgressProvider } from '@/chemmaster-app/src/context/ProgressContext'
import { NavigationProvider } from '@/chemmaster-app/src/context/NavigationContext'

export function ChemMasterModule() {
  return (
    <ProgressProvider>
      <NavigationProvider basePath="/chemistry">
        <ChemMasterApp />
      </NavigationProvider>
    </ProgressProvider>
  )
}
```

---

## 🎯 Flujo de Trabajo de Desarrollo

### **Crear una Nueva Página**

1. Crear componente en `pages/NewPage.tsx`:
```typescript
import { useNavigationBase } from '@/context/NavigationContext'

export default function NewPage() {
  const { basePath } = useNavigationBase()
  
  return <div>Contenido de Nueva Página</div>
}
```

2. Agregar ruta en `App.tsx`:
```typescript
<Route path="/new-page" element={<NewPage />} />
```

### **Crear un Nuevo Componente**

1. Crear en carpeta apropiada `components/{feature}/NewComponent.tsx`
2. Definir interfaz de props en `types/{domain}.ts`
3. Usar componentes de UI de `components/ui/`
4. Estilizar con Tailwind CSS usando utilidad `cn()`

### **Crear un Hook Personalizado**

1. Crear `hooks/useNewHook.ts`
2. Exportar función de hook simple
3. Usar en componentes: `const { } = useNewHook()`

### **Agregar Endpoint de API**

1. Agregar método a `lib/api.ts`
2. Usar en componentes/hooks: `const data = await API.methodName()`
3. Agregar interfaz TypeScript en `types/`

---

## 📦 Gestión de Dependencias

Dependencias clave (ver `package.json`):
- **React 18+** - Framework de UI
- **React Router v6** - Enrutamiento
- **TypeScript** - Seguridad de tipos
- **Tailwind CSS 3** - Estilizado
- **TipTap** - Editor de texto enriquecido
- **Lucide React** - Iconos
- **Framer Motion** - Animaciones

Todas las dependencias están en `chemmaster-app/package.json`. Al integrar en la app padre, asegurar que las versiones sean compatibles.

---

## 📚 Documentación Relacionada

- README Principal: `../../README.md`
- API del Backend: `../../API/ChemMaster/README.md`
- Directrices de Desarrollo: `../../.github/copilot-instructions/`
