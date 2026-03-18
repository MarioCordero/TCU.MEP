---
name: Project Map
description: High-level overview of the TCU.MEP repository
---
# ChemMaster Project Map

## 📋 Project Overview
**ChemMaster** is an educational chemistry platform module for the **SPECT** ecosystem. It provides interactive learning paths, modular content management, and progress tracking for chemistry students across multiple grade levels.

## 🏗️ Monorepo Structure

### `/API/ChemMaster` - PHP Backend
Stateless micro-service architecture. All endpoints return strict JSON: `{ "success": bool, "message": string, "data": mixed }`.

**Core Infrastructure:**
- `dbhandler.php` - MySQLi connection singleton, environment detection, config parsing
- `cors.php` - CORS headers + Content-Type setup (required by all endpoints)
- `check_auth.php` - Bearer token validation via `cms_sessions` table

**Main Endpoints:**
| Action | File | Method | Auth Required |
|--------|------|--------|---------------|
| User Login | `login.php` | POST | ❌ |
| Get Modules | `getModules.php` | GET | ❌ |
| Get Topics | `getTopics.php` | GET | ❌ |
| Get Activities | `getActivities.php` | GET | ❌ |
| Get All Content | `getAllContent.php` | GET | ❌ |
| Add Module | `addModule.php` | POST | ✅ |
| Update Module | `updateModule.php` | POST | ✅ |
| Delete Module | `deleteModule.php` | POST | ✅ |
| Add Topic | `addTopic.php` | POST | ✅ |
| Update Topic | `updateTopic.php` | POST | ✅ |
| Delete Topic | `deleteTopic.php` | POST | ✅ |
| Add Activity | `addActivity.php` | POST | ✅ |
| Upload File | `upload.php` | POST | ✅ |
| Delete File | `deleteFile.php` | POST | ✅ |

**Directory Structure:**
```
API/ChemMaster/
├── Config/
│   ├── development.ini      # Dev DB creds (localhost)
│   ├── production.ini       # Prod DB creds (optional)
│   └── .htaccess           # Protect config files
├── uploads/                # User-uploaded files (media)
├── dbhandler.php           # [CRITICAL] DB connection & config
├── cors.php                # [CRITICAL] CORS headers
├── check_auth.php          # [CRITICAL] Token validation
├── login.php               # Authentication entry point
├── *Module.php             # CRUD endpoints for modules
├── *Topic.php              # CRUD endpoints for topics
├── *Activity.php           # Activity management
└── upload.php              # File upload handler
```

**Database Schema (Key Tables):**
- `cms_users` - User accounts (id, username, password_hash, full_name)
- `cms_sessions` - Active sessions (user_id, token, expires_at)
- `modules` - Content modules (id, slug, title, grade_level, icon, color)
- `topics` - Topics within modules (id, module_id, title, description, order)
- `activities` - Interactive exercises (id, topic_id, type, config)
- `files` - Uploaded media references

---

### `/chemmaster-app` - React Frontend
Single-Page Application (SPA) built with Vite + TypeScript + Tailwind CSS.

**Technology Stack:**
- **Framework:** React 18+
- **Build Tool:** Vite
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3+
- **Animation:** Framer Motion
- **Routing:** React Router v6+
- **Icons:** Lucide React
- **Text Editor:** TipTap (for rich content)

**Directory Structure:**
```
chemmaster-app/src/
├── pages/                  # Route-level components
│   ├── LandingPage.tsx
│   ├── GradeSelectorPage.tsx
│   ├── GradePage.tsx
│   ├── TopicLearningPage.tsx
│   ├── CMSLoginPage.tsx
│   ├── CMSPage.tsx         # Admin dashboard
│   └── cms/                # CMS sub-routes
│       ├── ModuleEditor.tsx
│       └── TopicEditor.tsx
├── components/             # Reusable UI components
│   ├── activities/         # Quiz types (Quiz, DragDrop, FillBlank, Match, WordSoup)
│   ├── cms/                # Admin components (Sidebar, Editor modals)
│   ├── common/             # Shared (Header, modals)
│   ├── grade-selection/    # Grade selector UI (StairStep, CompletionModal)
│   ├── topic-selection/    # Topic list UI (TopicRow, TopicListOverlay)
│   └── ui/                 # Radix/Shadcn style primitives (Button, Input, Modal, etc)
├── context/                # Global state (Progress, Navigation)
├── hooks/                  # Custom hooks (useApi, useAuthGuard, useModuleEditor)
├── lib/
│   ├── api.ts              # [CRITICAL] Centralized API client
│   ├── constants.ts        # App-wide constants
│   ├── iconMap.ts          # Icon name mappings
│   └── utils.ts            # Utility functions (cn(), etc)
├── types/                  # TypeScript interfaces organized by domain
├── utils/                  # Utilities (progressCookie.tsx)
└── App.tsx                 # Root component + routing
```

---

## 🔄 Data Flow Architecture

```
Frontend (React/Vite/TS)
    ↓ [API calls via src/lib/api.ts]
    ↓ (Bearer token in Authorization header)
Backend (PHP Micro-services)
    ↓ [dbhandler.php connection]
    ↓ [Prepared Statements for all queries]
Database (MySQL)
    ↓ [JSON response: {success, message, data}]
    ↑
Frontend (State via Context/Hooks)
```

### Authentication Flow
1. **Login:** User submits credentials → `login.php` validates → Returns Bearer token
2. **Token Storage:** Frontend saves to `localStorage`
3. **Protected Requests:** Frontend includes `Authorization: Bearer <token>` header
4. **Validation:** `check_auth.php` verifies token in `cms_sessions` table
5. **Session Expiry:** 24 hours from creation

---

## 🎯 Critical Paths (Must Know)

### Backend Critical Files
- **`API/ChemMaster/dbhandler.php`** 
  - Singleton connection pattern
  - Environment detection (development vs production)
  - Config parsing from INI files
  - **NEVER modify DB connection logic without testing**

- **`API/ChemMaster/cors.php`** 
  - Must be required by EVERY endpoint
  - Handles OPTIONS requests
  - Sets Content-Type: application/json

- **`API/ChemMaster/check_auth.php`**
  - Validates Bearer tokens
  - Returns 401 if invalid/expired
  - Called by protected endpoints (CMS operations)

### Frontend Critical Files
- **`chemmaster-app/src/lib/api.ts`**
  - Single source of truth for all API calls
  - Handles BASE_URL routing (dev vs prod)
  - Automatic Bearer token injection
  - Error parsing and throwing

- **`chemmaster-app/src/context/NavigationContext.tsx`**
  - Manages app navigation logic
  - Extracts route parameters
  - Back button behavior per route

- **`chemmaster-app/src/context/ProgressContext.tsx`**
  - Tracks topic completion per grade/module
  - Persists to cookies via `progressCookie.tsx`
  - Calculated module progress percentages

- **`chemmaster-app/src/hooks/useAuthGuard.ts`**
  - Protects CMS routes
  - Redirects unauthenticated users to login

---

## 🚀 Feature Map

### Student Features
- **Grade Selection** → Displays available grades (10, 11, 12)
- **Module Browsing** → View chemistry modules per grade
- **Topic Learning** → Interactive topic content with media
- **Activities** → 6 activity types:
  - Quiz (multiple choice)
  - Fill-in-the-blank
  - Drag & drop
  - Matching pairs
  - Word soup (scrambled letters)
  - Text response
- **Progress Tracking** → Module completion % per grade (cookie-based)

### Admin Features (CMS)
- **Module Management** → CRUD modules, set icons/colors, grade levels
- **Topic Management** → CRUD topics, associate activities, upload media
- **Activity Configuration** → Create & edit interactive exercises
- **File Upload** → Upload media (images, videos, PDFs) with validation
- **Content Publishing** → Instantly visible to students

---

## 🔗 Environment Configuration

### Development
- **Backend URL:** `http://chemmaster.com/API/`
- **Config File:** `API/ChemMaster/Config/development.ini`
- **DB:** Local MySQL instance
- **Frontend:** `npm run dev` (localhost:5173)

### Production
- **Backend URL:** `https://spectcr.com/API/ChemMaster/`
- **Config File:** `API/ChemMaster/Config/production.ini`
- **DB:** Remote MySQL (SPECT infrastructure)
- **Frontend:** Built & deployed as SPA

---

## 📚 Key Dependencies & Technologies

**Backend:**
- PHP 7.4+, MySQLi extension
- Environment detection via `$_SERVER['SERVER_NAME']`
- JSON encoding/decoding (built-in)

**Frontend:**
- Node.js 16+ for build tools
- npm workspaces (if monorepo setup)
- React 18+, TypeScript 5+, Tailwind 3+

---

## 🧭 Common Development Tasks

### Adding a New Endpoint
1. Create `API/ChemMaster/newFeature.php`
2. Start with: `require_once 'dbhandler.php'; require_once 'cors.php';`
3. Validate HTTP method, parse input (trim, null-check)
4. Use Prepared Statements for queries
5. Return JSON: `{ success, message, data }`
6. Reference in `chemmaster-app/src/lib/api.ts`

### Adding a New Component
1. Create in appropriate folder: `components/{feature}/NewComponent.tsx`
2. Define full TypeScript interface in `src/types/`
3. Keep lean; extract logic to hooks if needed
4. Use Tailwind classes only; compose with `cn()` from `lib/utils.ts`
5. Import UI primitives from `components/ui/`

### Modifying Database Schema
1. Test changes locally in `development.ini` DB
2. Create migration script
3. Update table references in all affected endpoints
4. Test API responses match frontend types

---

## 📞 Quick Reference

| What | Where |
|------|-------|
| **API Endpoints** | `chemmaster-app/src/lib/api.ts` |
| **Response Format** | See `backend-php.md` |
| **Global State** | `src/context/` (Progress, Navigation) |
| **Type Definitions** | `src/types/` (organized by domain) |
| **Custom Hooks** | `src/hooks/` (one hook per file) |
| **DB Connection** | `API/ChemMaster/dbhandler.php` |
| **Auth Token** | Bearer via `Authorization` header, validated in `check_auth.php` |
| **File Uploads** | `API/ChemMaster/upload.php`, stored in `uploads/` dir |
| **Styling** | Tailwind CSS + `cn()` utility |

---

## 🔐 Security Checklist
- ✅ All DB queries use Prepared Statements
- ✅ CORS headers set by all endpoints
- ✅ Auth tokens validated before CMS operations
- ✅ File uploads restricted by extension + size
- ✅ No hardcoded credentials
- ✅ Error details hidden in production
- ✅ Token expiry enforced (24 hours)
- ✅ Environment-aware config loading