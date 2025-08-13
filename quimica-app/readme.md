# 🧪 ChemMaster - Química Interactiva

**Una aplicación educativa interactiva para estudiantes de 10° y 11° grado del sistema educativo costarricense.**

---

## 📚 Módulos Incluidos

### 10° Grado
- ✅ **Tabla Periódica Interactiva** - Exploración completa de elementos
- ✅ **Estructura Atómica** - Modelos atómicos y partículas subatómicas  
- ✅ **Configuración Electrónica** - Distribución de electrones
- ✅ **Clasificación de la Materia** - Estados y propiedades
- 🚧 **Enlaces Químicos** - Iónico, covalente y metálico
- 🚧 **Nomenclatura Inorgánica** - Reglas de nomenclatura
- 🚧 **Reacciones Químicas** - Balanceo y tipos
- 🚧 **Estequiometría** - Cálculos químicos

### 11° Grado
- 🚧 **Disoluciones Avanzadas** - Concentraciones y propiedades
- 🚧 **Propiedades Coligativas** - Efectos de los solutos
- 🚧 **Química Orgánica Fundamental** - Hidrocarburos y grupos funcionales
- 🚧 **Nomenclatura Orgánica** - Reglas IUPAC
- 🚧 **Isomería** - Tipos y aplicaciones

**Leyenda:** ✅ Implementado | 🚧 En desarrollo | 📋 Planificado

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Estilos**: Tailwind CSS 4.1.10
- **UI Components**: Componentes personalizados con shadcn/ui
- **Iconos**: Lucide React
- **Utilidades**: clsx, tailwind-merge
- **Navegación**: React Router
- **Animations**: Framer Motion (planificado)

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/MarioCordero/TCU.MEP.git
cd TCU.MEP/quimica-app

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
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

## 📁 Estructura del Proyecto

```
quimica-app/
├── public/                 # Archivos estáticos
│   └── vite.svg
├── src/
│   ├── components/         # Componentes UI reutilizables
│   │   └── ui/            # Componentes base (botones, cards, etc.)
│   │       ├── button.tsx
│   │       ├── buttondescripted.tsx
│   │       ├── card.tsx
│   │       ├── header.tsx
│   │       ├── highlight.tsx
│   │       └── searchbar.tsx
│   ├── screens/           # Pantallas específicas de módulos
│   │   ├── clasificacion-materia.tsx
│   │   ├── configuracion-electronica.tsx
│   │   ├── estructura-atomica.tsx
│   │   └── tabla-periodica.tsx
│   ├── pages/             # Páginas principales
│   │   ├── GradeSelector.tsx
│   │   ├── InfoPage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── grade-10/
│   │   │   └── page.tsx
│   │   └── grade-11/
│   │       └── page.tsx
│   ├── lib/               # Utilidades
│   │   └── utils.ts
│   ├── assets/            # Recursos estáticos
│   │   ├── ChemMasterIso.svg
│   │   └── ChemMasterLogo.svg
│   ├── main.jsx           # Punto de entrada
│   ├── quimicaApp.tsx     # Componente principal
│   └── main.css           # Estilos globales
├── package.json
├── tailwind.config.js     # Configuración de Tailwind
├── vite.config.js         # Configuración de Vite
├── DEVELOPER_GUIDE.md     # Guía para desarrolladores
├── TODO.md                # Lista de tareas pendientes
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
- Colores del sistema de diseño por grado
- Variables CSS personalizadas
- Gradientes específicos por módulo
- Tema responsivo

### Configuración de TypeScript
Se incluyen archivos de configuración para TypeScript:
- `tsconfig.json` - Configuración principal
- `tsconfig.node.json` - Configuración para Node.js

## 🎨 Guía de Desarrollo

### Agregando Nuevos Módulos

1. **Crear archivo de pantalla** en `/src/screens/nuevo-modulo.tsx`
2. **Usar template del DEVELOPER_GUIDE.md** para consistencia
3. **Agregar navegación** en el hub del grado correspondiente
4. **Actualizar colores** según la paleta establecida

### Estructura de Componentes

- **`/src/components/ui/`** - Componentes base reutilizables
- **`/src/screens/`** - Pantallas específicas de módulos
- **`/src/pages/`** - Páginas principales y hubs
- **`/src/lib/`** - Utilidades y helpers

### Estilos y Theming

- Utilizar las variables CSS definidas en `main.css`
- Seguir la paleta de colores establecida por grado
- Mantener consistencia en gradientes y sombras
- Usar el componente `ButtonDescripted` para navegación

### Componentes Principales

#### ButtonDescripted
Botón con título, subtítulo e icono, ideal para navegación:

```tsx
<ButtonDescripted 
  title="Tabla Periódica" 
  subtitle="Explorar elementos químicos" 
  icon="star"
  gradient="purple-pink"
  onClick={() => navigate('/tabla-periodica')}
/>
```

#### Highlight
Tarjeta destacada para información importante:

```tsx
<Highlight 
  title="¡Bienvenido!" 
  subtitle="Explora la química de forma interactiva"
  icon={<TestTube className="w-6 h-6" />}
  gradient="bg-gradient-to-r from-purple-500 to-blue-500"
/>
```

## 🧪 Testing

Actualmente no hay tests configurados. Se recomienda agregar:
- Tests unitarios con Jest + React Testing Library
- Tests de integración
- Tests E2E con Playwright o Cypress

## 🚀 Estado del Proyecto

### ✅ Completado
- Estructura base del proyecto
- Sistema de navegación
- Componentes UI principales
- 4 módulos de 10° grado implementados
- Diseño responsivo básico

### 🚧 En Desarrollo
- Módulos restantes de 10° grado
- Todos los módulos de 11° grado
- Optimizaciones de UX/UI
- Testing automático

### 📋 Planificado
- Sistema de progreso de usuario
- Modo oscuro
- Calculadoras químicas
- Simuladores 3D
- PWA (Progressive Web App)

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

### Guías del Proyecto
- **DEVELOPER_GUIDE.md** - Guía completa para desarrolladores
- **TODO.md** - Lista de tareas pendientes y prioridades

## 📄 Licencia

Este proyecto es parte del TCU (Trabajo Comunal Universitario) del MEP (Ministerio de Educación Pública) de Costa Rica.

## 👥 Autores

- **Mario Cordero** - Desarrollo principal
- **Fabian** - Colaborador

---

## 🤝 Contribución

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Issues y Bugs

Si encuentras algún problema:
1. Revisa primero el archivo `TODO.md`
2. Busca en issues existentes
3. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Screenshots si aplica
   - Información del sistema/navegador

---

**Estado del proyecto**: 🚧 En desarrollo activo  
**Última actualización**: Agosto 2025  
**Versión**: 1.0.0-beta

*Para más información técnica, consulta [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)*