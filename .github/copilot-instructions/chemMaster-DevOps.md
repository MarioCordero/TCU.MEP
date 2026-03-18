# ChemMaster DevOps & Development Instructions

## 🏗️ Architecture Context

**This repository is a sub-application of SpectCR.com, a multi-tenant platform.**

### SpectCR.com Infrastructure

```
spectcr.com
├── Domain: Cloudflare (DNS, WAF, SSL/TLS)
├── Host: Hostinger (Main server)
├── VPS: Private server (Backend services)
│
└── Applications:
    ├── SPECT (Main landing page & portal)
    ├── ChemMaster (Educational chemistry platform) ← THIS REPO
    ├── Outlet90 (E-commerce app)
    └── SpectApps (URL Shortener, etc.)
```

---

## 📊 ChemMaster Architecture

### Frontend (This Repository)

**Location**: `/home/mario/Desktop/JOB/TCU.MEP/chemmaster-app/`

```
chemmaster-app/
├── React 18+ (with Vite)
├── TypeScript
├── Tailwind CSS
├── ESLint configured
│
└── src/
    ├── App.tsx (Main ChemMaster component)
    ├── main.tsx (Entry point with Router)
    ├── pages/ (Main page components)
    ├── components/ (Reusable UI components)
    ├── hooks/ (Custom React hooks)
    ├── context/ (State management)
    ├── lib/ (API client & utilities)
    ├── types/ (TypeScript definitions)
    └── utils/ (Helper functions)
```

**Key Files**:
- `src/main.tsx`: Defines React Router with `basename="/ChemMaster"`
- `src/lib/api.ts`: API client for backend communication
- `src/context/`: Navigation & Progress context management

### Backend API (Separate from Frontend)

**Location**: `/home/mario/Desktop/JOB/TCU.MEP/API/ChemMaster/`

```
API/ChemMaster/
├── addActivity.php
├── addModule.php
├── addTopic.php
├── deleteActivity.php
├── deleteModule.php
├── deleteTopic.php
├── getActivities.php
├── getAllContent.php
├── getModules.php
├── getTopics.php
├── updateActivity.php
├── updateModule.php
├── updateTopic.php
├── login.php
├── check_auth.php
├── cors.php
├── dbhandler.php
├── upload.php
│
└── Config/
    ├── config.ini.txt (Configuration)
    ├── development.ini (Dev settings)
    └── readme.md
```

**Important**: The ChemMaster backend API is **SEPARATE** from other APIs (Outlet90, SpectApps). This allows:
- Independent scaling
- Isolated database
- Separate deployment cycle
- Dedicated error handling

---

## 🔗 Integration with Main App

### Router Integration

The main app (`SPECT-Website/src/router/AppRouter.jsx`) mounts ChemMaster at the `/ChemMaster/*` route:

```javascript
<Route path="/ChemMaster/*" element={
  <ChemMaster 
    isLoaderComplete={!isLoading} 
    currentPage={currentPage} 
    basePath="/ChemMaster" 
  />
} />
```

### URL Mapping

| User navigates to | Routes to | Handler |
|------------------|-----------|---------|
| `spectcr.com/ChemMaster` | `/ChemMaster/*` | `ChemMaster App.tsx` |
| `spectcr.com/ChemMaster/grades` | `/ChemMaster/grades` | `GradeSelectorPage.tsx` |
| `spectcr.com/ChemMaster/topics` | `/ChemMaster/topics` | `TopicPage.tsx` |

### API Communication

**Frontend API calls**:
```typescript
// API client in: src/lib/api.ts
const API_BASE = process.env.VITE_API_URL || 'https://spectcr.com/API/ChemMaster'

// Example endpoint
GET https://spectcr.com/API/ChemMaster/getModules.php
POST https://spectcr.com/API/ChemMaster/addActivity.php
```

**CORS Handling**:
- Backend implements CORS at `API/ChemMaster/cors.php`
- Configure allowed origins for development vs production
- Frontend requests include credentials when needed

---

## 🔑 Key Configuration Files

### Frontend Configuration

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite bundler configuration |
| `tailwind.config.js` | Tailwind CSS theming |
| `tsconfig.json` | TypeScript compilation settings |
| `eslint.config.js` | Linting rules |
| `package.json` | Dependencies & scripts |

### Backend Configuration

| File | Purpose |
|------|---------|
| `API/ChemMaster/Config/development.ini` | Development environment vars |
| `API/ChemMaster/Config/config.ini.txt` | Production environment vars |
| `API/ChemMaster/dbhandler.php` | Database connection & queries |
| `API/ChemMaster/cors.php` | CORS headers & origin validation |

---

## 📦 Development Workflow

### 1. Local Development

```bash
# Frontend
cd chemmaster-app/
npm install
npm run dev          # Runs on http://localhost:5173
                     # With basename="/ChemMaster"

# Backend (via local server or Hostinger dev environment)
# Ensure API/ChemMaster endpoints are accessible
```

### 2. Environment Setup

**Frontend Variables** (`.env.local` or `.env.production`):
```
VITE_API_URL=http://localhost:8000/API/ChemMaster        # Dev
VITE_API_URL=https://spectcr.com/API/ChemMaster          # Prod
```

**Backend Variables** (`API/ChemMaster/Config/development.ini`):
```
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=chemmaster
ALLOWED_ORIGINS=http://localhost:5173,https://spectcr.com
```

### 3. Database

**Main database**: ChemMaster.sql (in repo root)

Tables (inferred from API endpoints):
- `modules` - Course modules
- `topics` - Topics within modules
- `activities` - Learning activities
- `users` - User accounts & authentication
- `progress` - User activity progress
- `files` - User uploads

---

## 🚀 Deployment & Release Process

### Frontend Deployment

1. **Build**: `npm run build` → outputs to `dist/`
2. **Upload** to Hostinger via FTP/Git
3. **Server path**: `/public_html/chemmaster-app/` or similar
4. **Access**: Browser requests routed via main app

### Backend Deployment

1. **API files** uploaded to: `/public_html/API/ChemMaster/`
2. **Config files** (.ini) uploaded separately for security
3. **Database**: Run migrations/updates to ChemMaster database
4. **CORS verification**: Ensure allowed origins are correct

### Database Migrations

1. Backup current database: `ChemMaster.sql`
2. Review changes in SQL migration files
3. Test in development environment
4. Apply to production database
5. Keep backup copy for rollback

---

## ⚠️ Important Considerations

### URL Routing
- **Do NOT** hard-code absolute paths in components
- Use relative paths or `useNavigate()` hook
- ChemMaster routes must start with `/` (relative to app's basename)

### API Endpoints
- Always use `VITE_API_URL` environment variable
- Never hard-code `spectcr.com` URLs
- Support both `/ChemMaster` and standalone routes

### Authentication
- Session handling via `check_auth.php`
- Auth state managed in `NavigationContext`
- Ensure CORS credentials are enabled

### File Uploads
- Handler: `API/ChemMaster/upload.php`
- Storage: `API/ChemMaster/uploads/`
- Validate file types server-side

### Performance
- Lazy load components where possible
- Use React.memo for expensive renders
- Optimize API calls (debounce, cache)
- Monitor bundle size with `npm run build`

### Error Handling
- API errors logged in browser console (dev)
- User-friendly error messages in UI
- Backend errors logged in server logs

---

## 🔄 CI/CD Considerations

When setting up automated deployments:

1. **Frontend Pipeline**:
   - Run `npm install`
   - Run `npm run build`
   - Run linting: `npm run lint`
   - Upload dist/ to correct directory

2. **Backend Pipeline**:
   - Copy PHP files to API/ChemMaster/
   - Copy config files (with secrets from CI/CD variables)
   - Run database migrations if needed
   - Test endpoints with smoke tests

3. **Environment Secrets**:
   - Store DB credentials in CI/CD vars (not in repo)
   - Rotate API keys regularly
   - Use separate secrets for dev/prod

---

## 📝 Notes for Future Development

- **Monorepo consideration**: If more sub-apps are added, consider converting to Nx/Lerna
- **Shared components**: Extract common UI components to shared library
- **API versioning**: Consider `/API/ChemMaster/v1/` route structure
- **Testing**: Add unit tests (Jest/Vitest), E2E tests (Cypress/Playwright)
- **Documentation**: Keep API documentation updated (Swagger/OpenAPI)
- **Logging**: Implement structured logging for production monitoring
- **Database backups**: Automate daily backups to secure storage

---

## 🔗 Related Resources

- **Main App Router**: `SPECT-Website/src/router/AppRouter.jsx`
- **Database Schema**: `./ChemMaster.sql`
- **API README**: `./API/ChemMaster/README.md`
- **Frontend README**: `./chemmaster-app/readme.md`
- **Infrastructure Diagram**: Referenced in main SpectCR.com documentation

---

**Last Updated**: 2026-03-18  
**Repository**: SpectCR.com / ChemMaster  
**Status**: Active Development
