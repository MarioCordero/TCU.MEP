import { useState } from "react"
import ChemistryApp from './page'

type AppName = "chemistry" | "physics" | "math" | "biology";
type CurrentView = "app-selector" | AppName;

interface AppCardProps {
  title: string;
  icon: string;
  onClick: () => void;
  disabled?: boolean;
}

function quimicaApp() {
  const [currentView, setCurrentView] = useState<CurrentView>("chemistry")

  // App Selector (for multiple subjects)
  if (currentView === "app-selector") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          <AppCard 
            title="Química" 
            icon="⚛️" 
            onClick={() => setCurrentView("chemistry")}
          />
          <AppCard 
            title="Física" 
            icon="🔬" 
            onClick={() => setCurrentView("physics")}
            disabled 
          />
          <AppCard 
            title="Matemáticas" 
            icon="📐" 
            onClick={() => setCurrentView("math")}
            disabled 
          />
          <AppCard 
            title="Biología" 
            icon="🧬" 
            onClick={() => setCurrentView("biology")}
            disabled 
          />
        </div>
      </div>
    )
  }

  // Route to specific apps
  switch (currentView) {
    case "chemistry":
      return <ChemistryApp />
    case "physics":
      return <div>Physics App (Coming Soon)</div>
    case "math":
      return <div>Math App (Coming Soon)</div>
    case "biology":
      return <div>Biology App (Coming Soon)</div>
    default:
      return <ChemistryApp />
  }
}

function AppCard({ title, icon, onClick, disabled = false }: AppCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-8 rounded-xl border-2 transition-all ${
        disabled 
          ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50' 
          : 'bg-white border-purple-200 hover:border-purple-400 hover:shadow-lg'
      }`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </button>
  )
}

export default quimicaApp