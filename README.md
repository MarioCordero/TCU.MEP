# ChemMaster - Plataforma Educativa Interactiva de Química

**ChemMaster** es una plataforma educativa interactiva de química diseñada como módulo para el ecosistema **SPECT**. Proporciona rutas de aprendizaje estructuradas, gestión de contenidos y seguimiento de progreso para estudiantes de química en múltiples niveles de grado (10, 11).

---

## 📚 Tabla de Contenidos
- [Descripción General](#-descripción-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Guía Rápida de Inicio](#-guía-rápida-de-inicio)
- [Documentación Detallada](#-documentación-detallada)

---

## 📋 Descripción General

### 🎓 Para Estudiantes
- 📚 **Aprendizaje Interactivo:** Módulos de química estructurados por nivel de grado
- 📊 **Seguimiento de Progreso:** Porcentajes visuales de completación
- 🎮 **6 Tipos de Actividades Interactivas:**
  - Cuiz de opción múltiple
  - Completar espacios en blanco
  - Arrastrar y soltar
  - Sopa de letras (En desarrollo)
  - Respuestas de texto
- 🖼️ **Contenido Enriquecido:** Imágenes, videos, PDFs y texto formateado

### 👨‍💼 Para Administradores
- 📝 **Gestión de Contenidos:** Crear, editar y eliminar módulos y tópicos
- 📤 **Gestión de Medios:** Subir y organizar recursos educativos
- ⚙️ **Constructor de Actividades:** Crear y configurar ejercicios interactivos
- 📡 **Publicación en Tiempo Real:** Los cambios se ven instantáneamente

---

## 🛠 Stack Tecnológico

| Capa | Tecnologías |
|------|-------------|
| **Backend** | PHP 7.4+, MySQL 5.7+, MySQLi (prepared statements) |
| **Frontend** | React 18+, TypeScript, Vite, Tailwind CSS 3+, React Router v6+ |
| **Herramientas** | Lucide React (iconos), TipTap (editor de texto), Framer Motion (animaciones) |

---

## 📁 Estructura del Proyecto

```
TCU.MEP/
├── API/ChemMaster/           # Backend en PHP (ver API/ChemMaster/README.md)
│   ├── Config/               # Configuración de ambiente
│   ├── uploads/              # Archivos subidos por usuarios
│   ├── *.php                 # Endpoints de la API
│   └── README.md             # Documentación completa de la API
│
├── chemmaster-app/           # Frontend React/Vite
│   ├── src/                  # Código fuente (ver chemmaster-app/src/README.md)
│   │   ├── components/       # Componentes React reutilizables
│   │   ├── context/          # Gestión de estado global
│   │   ├── hooks/            # Hooks personalizados
│   │   ├── lib/              # Cliente API y utilidades
│   │   ├── pages/            # Componentes de página
│   │   └── types/            # Interfaces TypeScript
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│
├── ChemMaster.sql            # Schema de la base de datos
├── .github/copilot-instructions/  # Guías de desarrollo
└── README.md                 # Este archivo
```

---

## 🚀 Guía Rápida de Inicio

**Ver documentación completa:** 
- Backend: [API/ChemMaster/README.md](API/ChemMaster/README.md)
- Frontend: [chemmaster-app/src/README.md](chemmaster-app/src/README.md)

---

## 📡 API

- **URLs Base:**
  - Desarrollo: `http://chemmaster.com/API/` (Ajustar para usar XAMPP)
  - Producción: `https://spectcr.com/API/ChemMaster/`

- **Endpoints Principales:**
  - Públicos: `login`, `getModules`, `getTopics`, `getActivities`, `getAllContent`
  - Protegidos: `addModule`, `updateModule`, `deleteModule`, `addTopic`, etc.
  - Archivos: `upload`, `deleteFile`

**Documentación completa:** [API/ChemMaster/README.md](API/ChemMaster/README.md)

---

## 📚 Documentación Detallada

| Documento | Descripción |
|-----------|-------------|
| [API/ChemMaster/README.md](API/ChemMaster/README.md) | Endpoints, parámetros, ejemplos de curl, autenticación |
| [chemmaster-app/src/README.md](chemmaster-app/src/README.md) | Estructura de carpetas, componentes, hooks, integración |
| [.github/copilot-instructions/](./github/copilot-instructions/) | Estándares de código y mejores prácticas |

---

## 🎯 Desarrollo

### Comando Rápidos

```bash
# Frontend
cd chemmaster-app && npm run dev      # Desarrollo
npm run build                          # Producción
npm run lint                           # Validación

# Backend
php -S localhost:8000                 # Servidor de desarrollo
```

### Agregar Nuevo Endpoint

1. Crear `API/ChemMaster/newFeature.php`
2. Usar Prepared Statements para todas las consultas
3. Registrar en `chemmaster-app/src/lib/api.ts`

### Crear Nuevo Componente

1. Crear en `chemmaster-app/src/components/{feature}/NewComponent.tsx`
2. Definir tipo en `chemmaster-app/src/types/`
3. Usar UI components de `components/ui/`

Ver más detalles: [chemmaster-app/src/README.md](chemmaster-app/src/README.md)

---

**Última Actualización:** 25 de Marzo, 2026  
**Proyecto:** ChemMaster - Plataforma Educativa de Química  
**Estado:** Desarrollo Activo