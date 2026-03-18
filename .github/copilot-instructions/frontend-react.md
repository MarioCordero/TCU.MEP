---
name: React Frontend Rules
applyTo: "chemmaster-app/src/**/*.{ts,tsx}"
---
# React & TypeScript Guidelines

## 🎯 Project Structure & Architecture
- **Monorepo role:** ChemMaster module within SPECT platform
- **Framework:** React 18+ with Vite, TypeScript (strict mode)
- **Styling:** Tailwind CSS 3+ with custom UI component library
- **Routing:** React Router v6+
- **Animations:** Framer Motion for transitions
- **Build:** Vite (dev: `npm run dev`, prod: `http://spectcr.com` or `http://chemmaster.com`)

## 📦 Type Safety (CRITICAL - NO `any`!)
**Every file must have explicit types:**
```typescript
// ✅ Correct: Explicit interface
interface ComponentProps {
  title: string;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

// ❌ Wrong: any is forbidden
const MyComponent = (props: any) => { }

// ✅ Correct: Generic typing
function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  // ...
}
```
**All interfaces go in `src/types/` organized by domain:**
- `app.ts` - Global app types
- `cms.ts` - Module/Topic data
- `activities.ts` - Quiz/activity types
- `login.ts` - Auth types
- `progress.ts` - Progress tracking types
- etc.

## 🔗 API Integration Pattern
**All API calls centralized in `src/lib/api.ts`:**
```typescript
// api.ts structure:
const BASE_URL = import.meta.env.PROD 
  ? 'https://spectcr.com/API/ChemMaster/' 
  : 'http://chemmaster.com/API/';

const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers }
  });
  const json = await response.json();
  if (!json.success) throw new Error(json.message);
  return json.data ?? json; // Extract data or return whole response
};

export const API = {
  getModules: (grade: string) => request<Module[]>(`getModules.php?grade=${grade}`),
  addModule: (data: any) => request('addModule.php', { method: 'POST', body: JSON.stringify(data) }),
  // ... all endpoints here
};
```

## 🪝 Custom Hooks Pattern
**Keep hooks focused. File per hook. Export hook name in `src/hooks/`:**
```typescript
// useApi.ts - Generic data fetching
export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (apiPromise: Promise<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiPromise;
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, request, setData };
}

// useAuthGuard.ts - Check authentication
export function useAuthGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);
}

// useModuleEditor.ts / useTopicDelete.ts - Domain-specific logic
export function useModuleEditor() {
  // Complex state logic for module editing
}
```

## 🎨 UI Components (`components/ui/`)
**Radix/Shadcn-style components, fully typed with variants:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    // Use cn() utility to merge Tailwind classes
    return <button className={cn(baseStyles, variantStyles[variant], ...)} {...props} />;
  }
);

// Usage in components
<Button variant="destructive" size="sm" onClick={handleDelete}>
  Delete
</Button>
```

## 🏗️ Component Organization
**Rules for organizing components:**

### Page Components (`src/pages/`)
- Top-level route views
- Handle navigation context
- Compose domain-specific components
- No inline business logic

### Feature Components (`src/components/{feature}/`)
- Grouped by feature: `activities/`, `cms/`, `topic-selection/`, `grade-selection/`
- Large, self-contained features
- May contain sub-components
- Example: `TopicRow.tsx` (renders single topic in a list)

### Common Components (`src/components/common/`)
- Shared across features: `Header.tsx`, `modals/`
- Reusable, not specific to one domain

### Example Component Structure:
```typescript
// components/topic-selection/TopicRow.tsx
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { useProgressContext } from '../../hooks/useProgressContext';
import { TopicRowProps } from '../../types/topicSelector';

export default function TopicRow({ topic, gradeId, moduleId, onSelectTopic }: TopicRowProps) {
  const { isTopicCompleted } = useProgressContext(); // Use hook for state
  const completed = isTopicCompleted(gradeId, moduleId, topic.id);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Responsive Tailwind design */}
      <div className="md:hidden">Mobile layout</div>
      <div className="hidden md:block">Desktop layout</div>
    </motion.div>
  );
}
```

## 🌍 Context Providers (`src/context/`)
**For global state only (Progress, Navigation). Keep lean:**

### NavigationContext
- Manages app navigation paths
- Handles back button logic
- Extracts params from routes
- **Usage:**
  ```typescript
  const { basePath, navigateBack, navigate } = useContext(NavigationContext);
  ```

### ProgressContext
- Tracks topic completion per module per grade
- Reads/writes to cookies (`progressCookie.tsx`)
- Methods: `completeTopic()`, `isTopicCompleted()`, `getModuleProgress()`
- **Usage:**
  ```typescript
  const { isTopicCompleted, completeTopic } = useProgressContext();
  ```

**Do NOT use Context for:**
- Form state (use local useState)
- API data (use hooks + API layer)
- UI state like modals (use local useState)

## 🎬 Styling & Tailwind
- **Every style is Tailwind:** No CSS modules, no styled-components
- **Responsive:** Mobile-first. Use `md:`, `lg:` prefixes
- **Utility function:** Use `cn()` from `src/lib/utils.ts` to merge classes
- **Colors:** Extend in `tailwind.config.js`
- **Components:** Use Tailwind, never inline `<style>`

```typescript
// ✅ Correct
className={cn(
  'p-4 rounded-lg',
  completed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5',
  'md:p-6 lg:text-lg'
)}

// ❌ Wrong
<div style={{ padding: '16px' }}>
```

## 🔑 Authentication & Tokens
- **Token storage:** `localStorage.getItem('token')` for Bearer token
- **Protected endpoints:** Pass token in headers (handled by API layer)
- **Session:** 24-hour expiry (server-side)
- **Guard component:** `useAuthGuard.ts` hook for protected routes
- **Login flow:** CMSLoginPage → get token → store → redirect

## 📊 Forms & Input Validation
**Patterns for form state (local, not Context):**
```typescript
const [formData, setFormData] = useState<FormData>({ title: '', slug: '' });
const [errors, setErrors] = useState<Record<string, string>>({});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

const validate = (): boolean => {
  const newErrors: Record<string, string> = {};
  if (!formData.title) newErrors.title = 'Title is required';
  if (!formData.slug) newErrors.slug = 'Slug is required';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;
  try {
    await API.addModule(formData);
    // Success handling
  } catch (err) {
    setErrors({ submit: err.message });
  }
};
```

## ♿ Accessibility & Standards
- **Semantic HTML:** `<button>`, `<form>`, `<label>` for form inputs
- **ARIA attributes:** `aria-label`, `aria-expanded`, `role` where needed
- **Focus management:** Proper tab order, focus trap in modals
- **Keyboard navigation:** Modals close on Escape, buttons accessible via Tab+Enter

## 🧪 Testing & Development
- **ESLint config:** `eslint.config.js` enforces rules
- **TypeScript:** `tsconfig.json` in strict mode
- **Env vars:** `import.meta.env.PROD` to detect production vs dev
- **Console:** Use `console.log()` for debugging, remove before commit

## ⚙️ Performance Best Practices
- **Lazy loading:** Use `React.lazy()` for heavy components
- **Memoization:** `React.memo()` for expensive renders
- **useCallback:** Wrap function props in hooks
- **useMemo:** Expensive calculations in component tree
- **Array keys:** Always use stable key in `.map()`, never index
- **Image optimization:** Use responsive images in Tailwind

## 📝 Naming Conventions
- **Components:** PascalCase, descriptive names (`TopicRow.tsx`, `ModuleEditor.tsx`)
- **Hooks:** `use*` prefix (`useApi.ts`, `useProgressContext.ts`)
- **Context:** `*Context.tsx` and `*Provider` component
- **Types/Interfaces:** Postfix with `Props` for component types (`TopicRowProps`)
- **Functions:** camelCase (`handleSubmit`, `navigateBack`)
- **Constants:** UPPER_SNAKE_CASE (`BASE_URL`, `MAX_FILE_SIZE`)