# ChemMaster - Educational Chemistry Platform

**ChemMaster** is an interactive educational chemistry platform designed as a module for the **SPECT** ecosystem. It provides comprehensive learning paths, content management, and progress tracking for chemistry students across multiple grade levels (10, 11).

---

## 📚 Table of Contents
- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Quick Start Guide](#-quick-start-guide)
- [Development & Setup](#-development--setup)
- [Architecture Overview](#-architecture-overview)
- [API Documentation](#-api-documentation)
- [Development Guidelines](#-development-guidelines)
- [Common Tasks](#-common-tasks)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📋 Project Overview

ChemMaster provides:

### 🎓 For Students
- **Interactive Learning:** Structured chemistry modules by grade level
- **Progress Tracking:** Visual module completion percentages
- **Diverse Activities:** 6 types of interactive exercises:
  - Multiple-choice quizzes
  - Fill-in-the-blank exercises
  - Drag-and-drop interactions
  - Matching pairs
  - Word soup (scrambled letters)
  - Text responses
- **Rich Content:** Support for images, videos, PDFs, and formatted text

### 👨‍💼 For Administrators
- **Content Management:** Create, edit, and delete modules and topics
- **Media Management:** Upload and organize educational resources
- **Activity Builder:** Create and configure interactive exercises
- **Real-time Publishing:** Changes instantly visible to students

---

## 🛠 Technology Stack

### Backend
- **Language:** PHP 7.4+
- **Database:** MySQL 5.7+
- **Connection:** MySQLi (prepared statements for security)
- **Architecture:** Stateless micro-services
- **Configuration:** Environment-based INI files

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript (strict mode)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 3+
- **Animation:** Framer Motion
- **Routing:** React Router v6+
- **Icons:** Lucide React
- **Rich Editor:** TipTap

---

## 📁 Project Structure

```
TCU.MEP/
├── API/
│   └── ChemMaster/                 # PHP Backend
│       ├── Config/
│       │   ├── development.ini     # Dev DB credentials
│       │   └── production.ini      # Prod DB credentials
│       ├── uploads/                # User-uploaded files
│       ├── dbhandler.php           # [CRITICAL] DB connection
│       ├── cors.php                # [CRITICAL] CORS headers
│       ├── check_auth.php          # [CRITICAL] Auth validation
│       ├── login.php               # Authentication endpoint
│       ├── *Module.php             # Module CRUD operations
│       ├── *Topic.php              # Topic CRUD operations
│       ├── *Activity.php           # Activity management
│       └── README.md               # Backend documentation
│
├── chemmaster-app/                 # React/Vite Frontend
│   ├── src/
│   │   ├── pages/                  # Route views
│   │   ├── components/             # Reusable UI components
│   │   │   ├── activities/         # Quiz components
│   │   │   ├── cms/                # Admin panel components
│   │   │   ├── common/             # Shared components
│   │   │   └── ui/                 # UI primitives
│   │   ├── context/                # Global state (Progress, Navigation)
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/
│   │   │   ├── api.ts              # [CRITICAL] API client
│   │   │   ├── constants.ts        # App constants
│   │   │   └── utils.ts            # Utility functions
│   │   ├── types/                  # TypeScript interfaces
│   │   ├── App.tsx                 # Root component
│   │   └── main.tsx                # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── vite.config.js
│   └── README.md
│
├── .github/
│   └── copilot-instructions/       # Development guidelines
│       ├── backend-php.md          # PHP backend standards
│       ├── frontend-react.md       # React/TypeScript standards
│       └── project-map.md          # Architecture reference
│
├── ChemMaster.sql                  # Database schema
└── README.md                        # This file
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Backend:** PHP 7.4+, MySQL 5.7+, Apache/Nginx
- **Frontend:** Node.js 16+, npm 8+
- **Development:** Git, VS Code (recommended with PHP Intelephense, ESLint extensions)

### Frontend Setup (React/Vite)

1. **Navigate to frontend directory:**
   ```bash
   cd chemmaster-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   - Development server runs at `http://localhost:5173`
   - API calls route to `http://chemmaster.com/API/` (dev)

4. **Build for production:**
   ```bash
   npm run build
   ```
   - Output in `dist/` folder
   - For production, API calls route to `https://spectcr.com/API/ChemMaster/`

5. **Lint & type-check:**
   ```bash
   npm run lint
   ```

### Backend Setup (PHP)

1. **Database Setup:**
   - Create MySQL database (e.g., `chemmaster_db`)
   - Import schema: `mysql -u user -p database < ChemMaster.sql`
   - **OR** Run migrations/setup scripts if available

2. **Configure Environment:**
   - Copy `API/ChemMaster/Config/development.ini.example` → `development.ini` (if not present)
   - Edit with your local MySQL credentials:
     ```ini
     [database]
     host = localhost
     username = root
     password = your_password
     database = chemmaster_db
     ```

3. **Web Server:**
   - Configure virtual host pointing to `API/ChemMaster/`
   - OR use PHP built-in server:
     ```bash
     cd API/ChemMaster
     php -S chemmaster.com:8000
     ```

4. **Permissions:**
   - Ensure `uploads/` directory is writable: `chmod 755 API/ChemMaster/uploads/`

---

## 🏗 Development & Setup

### Directory Navigation

```bash
# Frontend development
cd chemmaster-app
npm install
npm run dev

# Backend (PHP local testing)
cd API/ChemMaster
# Configure Config/development.ini with your DB credentials
# Access via http://chemmaster.com/API/ (or localhost with PHP server)
```

### Available Scripts

**Frontend (`chemmaster-app/`):**
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (localhost:5173) |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build locally |

**Backend (`API/ChemMaster/`):**
- No build step required; runs directly with PHP
- Ensure `Config/development.ini` is configured
- Use PHP's built-in server or Apache/Nginx for local development

### Environment Configuration

**Frontend:**
- **Development:** `http://chemmaster.com/API/`
- **Production:** `https://spectcr.com/API/ChemMaster/`
- Configured automatically via `import.meta.env.PROD` in `src/lib/api.ts`

**Backend:**
- **Development:** `Config/development.ini` (localhost MySQL)
- **Production:** `Config/production.ini` (remote MySQL)
- Auto-detected by server name in `dbhandler.php`

---

## 🔄 Architecture Overview

### Data Flow

```
User Browser
    ↓
React Frontend (src/lib/api.ts)
    ↓ [HTTP/CORS]
PHP Backend (API/ChemMaster/)
    ↓ [Prepared Statements]
MySQL Database
    ↓
JSON Response: { success, message, data }
    ↑
Context/Hooks (ProgressContext, NavigationContext)
```

### Authentication Flow

1. User submits credentials → `login.php`
2. Server validates → Returns Bearer token (32-byte hex)
3. Frontend stores token in `localStorage`
4. Subsequent requests include: `Authorization: Bearer <token>`
5. Backend validates via `check_auth.php`
6. Token expires after 24 hours

### Global State Management

**Context Providers:**
- **ProgressContext:** Tracks topic completion per grade/module, persists to cookies
- **NavigationContext:** Manages app navigation and back button behavior

### Key Files (CRITICAL - Do Not Modify Without Testing)

| File | Purpose | Critical For |
|------|---------|--------------|
| `API/ChemMaster/dbhandler.php` | DB connection singleton | Database connectivity |
| `API/ChemMaster/cors.php` | CORS headers setup | Frontend-backend communication |
| `API/ChemMaster/check_auth.php` | Token validation | Admin authentication |
| `chemmaster-app/src/lib/api.ts` | API client | All API calls |
| `chemmaster-app/src/context/ProgressContext.tsx` | Progress tracking | Student progress |

---

## 📡 API Documentation

### Base URLs
- **Development:** `http://chemmaster.com/API/`
- **Production:** `https://spectcr.com/API/ChemMaster/`

### Response Format (Standard)
```json
{
  "success": true,
  "message": "Human-readable status message",
  "data": null
}
```

### Public Endpoints (No Auth Required)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `login.php` | POST | Authenticate user, return token |
| `getModules.php?grade=10` | GET | Fetch modules for a grade |
| `getTopics.php?module_id=1` | GET | Fetch topics for a module |
| `getActivities.php?topic_id=1` | GET | Fetch activities for a topic |
| `getAllContent.php` | GET | Fetch complete content structure |

### Protected Endpoints (Bearer Token Required)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `addModule.php` | POST | Create new module |
| `updateModule.php` | POST | Modify existing module |
| `deleteModule.php` | POST | Remove module |
| `addTopic.php` | POST | Create new topic |
| `updateTopic.php` | POST | Modify existing topic |
| `deleteTopic.php` | POST | Remove topic |
| `addActivity.php` | POST | Create new activity |
| `upload.php` | POST | Upload media file |
| `deleteFile.php` | POST | Remove uploaded file |

### Using the API from Frontend

```typescript
import { API } from '../lib/api';

// Public endpoint
const modules = await API.getModules('10');

// Protected endpoint (auth handled automatically)
await API.addModule({
  title: 'New Module',
  slug: 'new-module',
  grade_level: '10',
  // ... other fields
});
```

**Full API reference:** See `chemmaster-app/src/lib/api.ts`

---

## 📖 Development Guidelines

### Code Standards

You **MUST** follow the development guidelines defined in [`.github/copilot-instructions/`](.github/copilot-instructions/):

1. **[backend-php.md](.github/copilot-instructions/backend-php.md)**
   - PHP security practices
   - Prepared statements mandatory
   - JSON response format
   - Input validation patterns
   - Error handling

2. **[frontend-react.md](.github/copilot-instructions/frontend-react.md)**
   - NO `any` types allowed
   - Component organization
   - Hook patterns
   - Context usage rules
   - Tailwind styling standards

3. **[project-map.md](.github/copilot-instructions/project-map.md)**
   - Architecture overview
   - Critical paths
   - File organization
   - Common development tasks

### Key Rules Summary

**Backend (PHP):**
- ✅ Every endpoint: `require_once 'dbhandler.php'; require_once 'cors.php';`
- ✅ All queries: Prepared Statements **ONLY**
- ✅ Response format: Strict JSON with `{ success, message, data }`
- ✅ Authentication: Bearer token via `check_auth.php`
- ✅ Config: Never hardcode credentials

**Frontend (React/TypeScript):**
- ✅ **NO `any` types** - Use explicit interfaces
- ✅ All types in `src/types/` organized by domain
- ✅ Custom hooks in `src/hooks/` (one per file)
- ✅ Global state in `src/context/` (only for Progress/Navigation)
- ✅ UI components from `src/components/ui/`
- ✅ Styling: Tailwind CSS only, use `cn()` utility

---

## 🧭 Common Development Tasks

### Adding a New Backend Endpoint

1. Create `API/ChemMaster/newFeature.php`
2. Start with required imports:
   ```php
   <?php
   require_once 'dbhandler.php';
   require_once 'cors.php';
   ```
3. Validate HTTP method and input
4. Use Prepared Statements for all queries
5. Return strict JSON format
6. Register in `chemmaster-app/src/lib/api.ts`

Full example: See [backend-php.md](.github/copilot-instructions/backend-php.md#-error-handling-pattern)

### Adding a New Frontend Component

1. Create in `chemmaster-app/src/components/{feature}/NewComponent.tsx`
2. Define interface in `src/types/` ending with `Props`
3. Use Tailwind for styling, compose with `cn()`
4. Extract logic to custom hooks if needed
5. Example: See [frontend-react.md](.github/copilot-instructions/frontend-react.md#-component-organization)

### Modifying Database Schema

1. Test changes locally in `development.ini` database
2. Create SQL migration script
3. Update affected endpoints and frontend types
4. Document changes in schema comments

---

## 📝 File Naming Conventions

- **React Components:** PascalCase (`TopicRow.tsx`, `ModuleEditor.tsx`)
- **Custom Hooks:** `use*` prefix (`useApi.ts`, `useProgressContext.ts`)
- **TypeScript Interfaces:** Domain-specific files (`cms.ts`, `activities.ts`)
- **PHP Endpoints:** Verb + Noun (`addModule.php`, `getTopics.php`)
- **Constants:** UPPER_SNAKE_CASE (`BASE_URL`, `MAX_FILE_SIZE`)

---

## 🔐 Security Notes

- ✅ CORS headers configured for secure cross-origin requests
- ✅ Bearer tokens validated for sensitive operations
- ✅ File uploads restricted by extension and size
- ✅ No credentials in version control (use config files)
- ✅ Error details hidden in production environment

---

## 🐛 Troubleshooting

### Frontend Issues

**Issue:** `Cannot find module 'src/lib/api'`
- **Solution:** Ensure `tsconfig.json` path mapping is correct

**Issue:** `Tailwind classes not applying`
- **Solution:** Rebuild CSS with `npm run dev` or rebuild production build

**Issue:** API 401 errors
- **Solution:** Check token in `localStorage`, ensure `Authorization` header is set

### Backend Issues

**Issue:** Database connection fails
- **Solution:** Verify `Config/development.ini` credentials and MySQL is running

**Issue:** CORS errors
- **Solution:** Verify `cors.php` is required in all endpoints

**Issue:** 405 Method Not Allowed
- **Solution:** Verify endpoint accepts HTTP method (POST, GET, etc.)

---

## 📚 Additional Resources

- **Architecture Details:** [project-map.md](.github/copilot-instructions/project-map.md)
- **Database Schema:** `ChemMaster.sql`
- **Backend Documentation:** `API/ChemMaster/README.md`
- **Frontend Documentation:** `chemmaster-app/readme.md`

---

## 🤝 Contributing

When contributing to ChemMaster:

1. **Review Standards:** Read `.github/copilot-instructions/` (all 3 files)
2. **Follow Code Style:** Adhere to backend PHP and frontend React guidelines
3. **Type Safety:** No `any` types in TypeScript
4. **Security:** Always use Prepared Statements in PHP
5. **Testing:** Test locally before committing
6. **Documentation:** Update comments if changing architecture

---

## 📞 Quick Reference

| Need | Location |
|------|----------|
| **Start frontend** | `cd chemmaster-app && npm run dev` |
| **Start backend** | Configure `Config/development.ini` then access via PHP server |
| **Add API endpoint** | Create `API/ChemMaster/newEndpoint.php` |
| **Add React component** | Create `chemmaster-app/src/components/{feature}/Name.tsx` |
| **Type definitions** | `chemmaster-app/src/types/` |
| **Development rules** | `.github/copilot-instructions/backend-php.md` & `frontend-react.md` |
| **Architecture reference** | `.github/copilot-instructions/project-map.md` |

---

**Last Updated:** March 17, 2026
**Project:** ChemMaster Educational Chemistry Platform
**Status:** Active Development