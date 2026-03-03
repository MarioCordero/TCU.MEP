import React from "react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ArrowLeft, Star, Sparkles } from "lucide-react"
import { useNavigationBase } from "../../context/NavigationContext"

interface GradeModulePathHeaderProps {
  gradeTitle: string
  gradeSubtitle: string
  overallProgress: number
  moduleCount: number
  onBack: () => void
}

export default function GradeModulePathHeader({
  gradeTitle,
  gradeSubtitle,
  overallProgress,
  moduleCount,
}: GradeModulePathHeaderProps) {
  const { navigateBack } = useNavigationBase()

  return (
    <header className="relative z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-xl sticky top-0">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateBack}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-white">{gradeTitle}</h1>
              <p className="text-xs text-white/50">{gradeSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Overall Progress */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-white/70 font-medium">{overallProgress}%</span>
            </div>

            {/* Module count */}
            <Badge className="bg-white/10 text-white/70 hidden sm:flex">
              <Sparkles className="h-3 w-3 mr-1" />
              {moduleCount} Modulos
            </Badge>
          </div>
        </div>
      </div>
    </header>
  )
}