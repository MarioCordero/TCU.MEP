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
  "data": { }
}
```

### Authentication

**Bearer Token Flow:**
1. Call `login.php` with username/password
2. Receive Bearer token (32-byte hex string)
3. Include in all protected endpoints: `Authorization: Bearer <token>`
4. Token expires after 24 hours

**Example:**
```bash
curl -X POST http://chemmaster.com/API/login.php \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
}
```

---

### Public Endpoints (No Auth Required)

#### 1. **Login**
- **POST** `/login.php`
- **Fields:** `username`, `password`
- **Returns:** Bearer token for subsequent authenticated requests
- **Usage in Frontend:**
  ```typescript
  const response = await API.login(username, password);
  localStorage.setItem('cms_token', response.token);
  ```

#### 2. **Get Modules by Grade**
- **GET** `/getModules.php?grade=10`
- **Query Params:** `grade` (required: "10", "11", etc.)
- **Returns:** Array of modules for the specified grade level
- **Example:**
  ```bash
  curl http://chemmaster.com/API/getModules.php?grade=10
  ```
- **Response:**
  ```json
  {
    "success": true,
    "modules": [
      {
        "id": 1,
        "slug": "atomic-structure",
        "title": "Atomic Structure",
        "grade_level": "10",
        "description": "Introduction to atomic structure",
        "icon": "Atom",
        "color": "from-blue-500 to-blue-600",
        "active": true,
        "features": [],
        "tools": []
      }
    ]
  }
  ```

#### 3. **Get Topics for Module**
- **GET** `/getTopics.php?module_id=1`
- **Query Params:** `module_id` (required)
- **Returns:** Array of topics for the specified module
- **Example:**
  ```bash
  curl http://chemmaster.com/API/getTopics.php?module_id=1
  ```
- **Response:**
  ```json
  {
    "success": true,
    "topics": [
      {
        "id": 1,
        "module_id": 1,
        "title": "Subatomic Particles",
        "description": "Understanding protons, neutrons, and electrons",
        "content": "<p>Rich HTML content here</p>",
        "order_in_module": 0,
        "active": true
      }
    ]
  }
  ```

#### 4. **Get Activities for Topic**
- **GET** `/getActivities.php?topic_id=1`
- **Query Params:** `topic_id` (required)
- **Returns:** Array of interactive activities for the topic
- **Activity Types:** `quiz`, `fill-blank`, `drag-drop`, `match`, `word-soup`, `text-response`

#### 5. **Get All Content (Nested)**
- **GET** `/getAllContent.php`
- **Returns:** Complete hierarchical structure (modules → topics → activities)
- **Use Case:** Initial page load, full content tree
- **Example:**
  ```bash
  curl http://chemmaster.com/API/getAllContent.php
  ```

---

### Protected Endpoints (Bearer Token Required)

Include header: `Authorization: Bearer <token>`

#### **Modules Management**

##### Create Module
- **POST** `/addModule.php`
- **Required Fields:**
  - `slug` (string): Unique identifier
  - `title` (string): Module name
  - `grade_level` (string): "10", "11", or "12"
- **Optional Fields:**
  - `description` (string)
  - `icon` (string): Icon name from Lucide (default: "Book")
  - `color` (string): Gradient class (default: "from-blue-500 to-blue-600")
  - `active` (boolean): Default 1
- **Example:**
  ```bash
  curl -X POST http://chemmaster.com/API/addModule.php \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc123..." \
    -d '{
      "slug": "electrochemistry",
      "title": "Electrochemistry",
      "grade_level": "12",
      "description": "Study of electron transfer reactions",
      "icon": "Zap",
      "color": "from-yellow-500 to-orange-600"
    }'
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Módulo creado exitosamente",
    "module_id": 5
  }
  ```

##### Update Module
- **POST/PUT** `/updateModule.php`
- **Required Fields:** `id` (integer)
- **Optional Fields:** Any module field (slug, title, description, icon, color, active, etc.)
- **Example:**
  ```bash
  curl -X POST http://chemmaster.com/API/updateModule.php \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc123..." \
    -d '{
      "id": 1,
      "title": "Advanced Atomic Structure",
      "description": "Updated description"
    }'
  ```

##### Delete Module
- **POST** `/deleteModule.php`
- **Required Fields:** `id` (integer)
- **⚠️ WARNING:** Deletes module AND all associated topics
- **Example:**
  ```bash
  curl -X POST http://chemmaster.com/API/deleteModule.php \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc123..." \
    -d '{"id": 1}'
  ```

#### **Topics Management**

##### Create Topic
- **POST** `/addTopic.php`
- **Required Fields:**
  - `module_id` (integer)
  - `title` (string)
- **Optional Fields:**
  - `description` (string)
  - `content` (string/object): HTML content or JSON structure
  - `order_in_module` (integer)
- **Example:**
  ```bash
  curl -X POST http://chemmaster.com/API/addTopic.php \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc123..." \
    -d '{
      "module_id": 1,
      "title": "Electron Configuration",
      "description": "How electrons are arranged in atoms",
      "content": "<h2>Introduction</h2><p>Electrons follow specific rules...</p>",
      "order_in_module": 1
    }'
  ```

##### Update Topic
- **POST/PUT** `/updateTopic.php`
- **Required Fields:** `id` (integer)
- **Optional Fields:** title, description, content, order_in_module, active
- **Example:**
  ```bash
  curl -X POST http://chemmaster.com/API/updateTopic.php \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc123..." \
    -d '{
      "id": 1,
      "title": "Updated Topic Title",
      "content": "<p>Updated content</p>"
    }'
  ```

##### Delete Topic
- **POST** `/deleteTopic.php`
- **Required Fields:** `id` (integer)
- **Example:**
  ```bash
  curl -X POST http://chemmaster.com/API/deleteTopic.php \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc123..." \
    -d '{"id": 1}'
  ```

#### **Activities Management**

##### Create Activity
- **POST** `/addActivity.php`
- **Required Fields:**
  - `topic_id` (integer)
  - `title` (string)
  - `type` (string): One of `quiz`, `fill-blank`, `drag-drop`, `match`, `word-soup`, `text-response`
  - `activity_data` (object): Type-specific configuration
- **Example (Quiz):**
  ```bash
  curl -X POST http://chemmaster.com/API/addActivity.php \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc123..." \
    -d '{
      "topic_id": 1,
      "title": "Atomic Structure Quiz",
      "type": "quiz",
      "activity_data": {
        "questions": [
          {
            "question": "What is the center of an atom called?",
            "options": ["Nucleus", "Electron", "Proton"];
            "correct_answer": 0
          }
        ]
      }
    }'
  ```

##### Update Activity
- **POST/PUT** `/updateActivity.php`
- **Required Fields:** `id` (integer)
- **Optional Fields:** title, type, activity_data, active

##### Delete Activity
- **POST** `/deleteActivity.php`
- **Required Fields:** `id` (integer)

#### **File Management**

##### Upload File
- **POST** `/upload.php` (multipart form data)
- **Form Field:** `file` (required)
- **Allowed Types:** 
  - Images: jpg, jpeg, png, gif, webp, svg
  - Videos: mp4, webm
  - Audio: mp3, wav, ogg
  - Documents: pdf, docx, doc, xlsx, xls, pptx, ppt, txt, zip, rar
- **Max Size:** 50MB
- **Example:**
  ```bash
  curl -X POST http://chemmaster.com/API/upload.php \
    -H "Authorization: Bearer abc123..." \
    -F "file=@/path/to/image.png"
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Archivo subido exitosamente",
    "filename": "image_1708345123.png",
    "path": "uploads/image_1708345123.png"
  }
  ```

##### Delete File
- **POST** `/deleteFile.php`
- **Required Fields:** `filename` (string, from uploads folder)
- **Example:**
  ```bash
  curl -X POST http://chemmaster.com/API/deleteFile.php \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer abc123..." \
    -d '{"filename": "image_1708345123.png"}'
  ```

---

### Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Descripción del error en español"
}
```

**Common HTTP Status Codes:**
- `200 OK`: Successful request
- `400 Bad Request`: Missing or invalid parameters
- `401 Unauthorized`: Invalid or missing Bearer token
- `404 Not Found`: Resource does not exist
- `500 Internal Server Error`: Database or server error

---

### Using the API from Frontend

The frontend has a pre-configured API client that handles authentication automatically:

```typescript
import { API } from '../lib/api';

// Public endpoints - no token needed
const modules = await API.getModules('10');
const topics = await API.getTopics(moduleId);
const allContent = await API.getAllContent();

// Protected endpoints - token automatically included from localStorage
await API.addModule({
  title: 'New Module',
  slug: 'new-module',
  grade_level: '10',
  description: 'Module description',
  icon: 'Atom',
  color: 'from-blue-500 to-blue-600'
});

// Update
await API.updateModule(1, {
  title: 'Updated Title'
});

// Delete
await API.deleteModule(1);

// Topics
await API.addTopic(moduleId, {
  title: 'New Topic',
  description: 'Topic description',
  content: '<p>HTML content</p>'
});

// File operations
const formData = new FormData();
formData.append('file', fileInput.files[0]);
const response = await API.uploadFile(formData);

await API.deleteFile(filename);
```

**Full implementation:** See [src/lib/api.ts](chemmaster-app/src/lib/api.ts)

---

### Rate Limiting & Best Practices

- ✅ Reuse API responses where possible to reduce requests
- ✅ Use `getAllContent.php` instead of multiple individual requests during initial load
- ✅ Cache module/topic data in React Context for navigation
- ✅ Batch file uploads when possible
- ⚠️ Do not store sensitive data in localStorage except Bearer token
- ⚠️ Token should be removed on logout

---

### CORS Configuration

CORS headers are configured in `cors.php` to allow:
- Origin: Configured domains (development & production)
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization

Ensure the frontend origin is registered in `cors.php` to avoid CORS errors.

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