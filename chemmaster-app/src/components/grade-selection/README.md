# Grade Selection Components - Refactoring Documentation

## Architecture Overview

This directory contains a refactored, modular implementation of the grade learning page using the **Smart vs. Dumb Component** architecture pattern.

### Component Structure

```
grade-selection/
├── types.ts                    # Shared TypeScript interfaces and types
├── iconMap.ts                  # Icon mapping utility
├── StairStep.tsx              # Presentational component for individual module step
├── ModuleDetailModal.tsx       # Modal showing module topics and learning path
├── CompletionModal.tsx         # Celebration modal shown when all modules complete
├── GradeModulePath.tsx        # Main dumb/presentational component
└── README.md                   # This file
```

### Parent Smart Component

- **Location:** `src/pages/GradePage.tsx`
- **Role:** Container/Smart component that manages all state and logic
- **Responsibilities:**
  - State management (selected module, selected topic, completion state)
  - Progress calculation using `useProgressContext`
  - Topic selection and navigation logic
  - Rendering of `TopicLearningPage` when viewing a topic
  - Passing all calculated data to the dumb component

## Component Details

### 1. **types.ts**
Centralized TypeScript definitions for the grade selection feature.

**Key Interfaces:**
- `StairStepProps` - Props for the StairStep component
- `ModuleDetailModalProps` - Props for the module detail modal
- `CompletionModalProps` - Props for the completion celebration modal
- `GradeModulePathProps` - Props for the main presentational component
- `SelectedTopic` - Type for the selected topic object

### 2. **iconMap.ts**
Utility for mapping icon names to Lucide React icon components.

```typescript
import { getIconComponent } from "@/components/grade-selection/iconMap"

const IconComponent = getIconComponent(module.icon) // Returns icon component with fallback
```

### 3. **StairStep.tsx**
Presentational component that renders a single module in the stair-step layout.

**Props:**
- `module` - Module data
- `index` - Step number (0-based)
- `totalSteps` - Total number of steps
- `onSelect` - Callback when module is clicked
- `isReversed` - Whether to reverse flex direction
- `progress` - Module progress percentage (0-100)
- `gradeId` - Current grade ID

**Features:**
- 3D animated step blocks
- Progress ring visualization
- Completion checkmark
- Connector lines between steps
- Content card with module info

### 4. **ModuleDetailModal.tsx**
Modal component displaying all topics within a module.

**Props:**
- `module` - Module with topics array
- `onClose` - Callback to close modal
- `gradeId` - Current grade ID
- `onSelectTopic` - Callback when a topic is selected

**Features:**
- Mobile-responsive design (cards on mobile, timeline on desktop)
- Progress tracking per topic
- Completion status indicators
- Study/Review action buttons

### 5. **CompletionModal.tsx**
Celebration modal shown when all modules are completed.

**Props:**
- `gradeTitle` - Title of the completed grade
- `onClose` - Callback to close modal
- `onReset` - Callback to reset progress

**Features:**
- Animated star icon with celebration animation
- Continue and Reset buttons

### 6. **GradeModulePath.tsx**
Main presentational/"dumb" component that orchestrates the UI.

**Props:**
```typescript
interface GradeModulePathProps {
  gradeId: string
  gradeTitle: string
  gradeSubtitle: string
  modules: Module[]
  onBack: () => void
  onSelectTopic: (topic: SelectedTopic) => void
  selectedModule: string | null
  onSelectModule: (moduleId: string | null) => void
  overallProgress: number
  showCompletion: boolean
  onCloseCompletion: () => void
  onResetProgress: () => void
  moduleProgress: Record<string | number, number> // Progress for each module
}
```

**Responsibilities:**
- Render animated background
- Display header with progress
- Render module stair-step path
- Show module detail modal
- Show completion celebration modal
- Display floating explore button

**Key Feature:** This component ONLY renders - it doesn't fetch data, calculate progress, or manage complex logic. All that comes from the Smart component.

## Data Flow

```
GradePage (Smart/Container)
├── Manages state: selectedModule, selectedTopic, showCompletion
├── Calculates: moduleProgress, overallProgress
├── Uses: useProgressContext hook
└── Renders GradeModulePath (Dumb Component)
    ├── Renders StairStep (for each module)
    │   └── Displays module with progress
    ├── ModuleDetailModal (when module selected)
    │   └── Shows topics list
    └── CompletionModal (when all complete)
        └── Shows celebration
```

## Smart Component (GradePage.tsx) Example Usage

```typescript
<GradePage
  gradeId="10"
  gradeTitle="Décimo Grado"
  gradeSubtitle="Química Fundamental"
  modules={modulesArray}
  onBack={() => navigate('/grades')}
/>
```

## TypeScript Best Practices

All components use:
- ✅ TypeScript interfaces for all props
- ✅ Named exports for components
- ✅ Type-safe callbacks
- ✅ Proper typing for React hooks (useState, useRef, etc.)

## Animation & Styling

All original Framer Motion animations and Tailwind CSS classes are preserved:
- SVG progress rings
- Spring animations
- Stagger delays
- 3D perspective effects
- Gradient backgrounds
- Mobile-responsive design

## Adding Features

### To add a new prop to GradeModulePath:
1. Update `GradeModulePathProps` in `types.ts`
2. Update `GradeModulePath.tsx` function signature
3. Update `GradePage.tsx` to pass the new prop

### To add a new sub-component:
1. Create new file in `grade-selection/` directory
2. Define props interface in `types.ts`
3. Import and use in `GradeModulePath.tsx`

## IMPORTANT: TopicLearningPage Component

The current implementation references a `TopicLearningPage` component that needs to be created separately. This component should:

1. **Location:** Create at `src/pages/` or `src/components/`
2. **Props Expected:**
   - `topicId: string`
   - `topicTitle: string`
   - `moduleId: string`
   - `moduleColor: string`
   - `gradeId: string`
   - `totalTopicsInModule: number`
   - `onBack: () => void`
   - `htmlContent: string` (HTML content to display)

3. **Implementation Notes:**
   - Should display HTML content with the TipTapEditor or similar
   - Should handle topic completion marking
   - Should provide navigation between topics
   - Should call `onBack()` when returning to grade page

## File Locations Summary

```
src/
├── pages/
│   └── GradePage.tsx              # Smart/Container component
├── components/
│   └── grade-selection/
│       ├── types.ts                # Type definitions
│       ├── iconMap.ts              # Icon utilities
│       ├── StairStep.tsx            # Step component
│       ├── ModuleDetailModal.tsx    # Modal component
│       ├── CompletionModal.tsx      # Celebration component
│       └── GradeModulePath.tsx      # Main dumb component
└── types/
    └── cms.ts                       # Module and Topic interfaces
```

## Testing Recommendations

1. **Component Isolation:** Test each component independently with mock props
2. **Integration:** Test GradeModulePath with different data scenarios
3. **Smart Component:** Test GradePage state management and callbacks
4. **Progress Calculation:** Verify module progress calculations
5. **Responsive Design:** Test on mobile, tablet, and desktop viewports

## Future Enhancements

- [ ] Extract progress calculation logic to a custom hook
- [ ] Add error boundary for better error handling
- [ ] Add loading states for async operations
- [ ] Implement keyboard navigation
- [ ] Add animations configuration object
- [ ] Create Storybook stories for components
