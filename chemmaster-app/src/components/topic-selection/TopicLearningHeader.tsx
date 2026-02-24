import React from "react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { ArrowLeft, BookOpen, CheckCircle2, Target, Clock } from "lucide-react"
import { useNavigationBase } from "../../context/NavigationContext"

interface TopicLearningHeaderProps {
  topicTitle: string
  moduleColor: string
  isAlreadyCompleted: boolean
  onBack: () => void
  onGoToQuiz: () => void
}

export default function TopicLearningHeader({
  topicTitle,
  moduleColor,
  isAlreadyCompleted,
  onGoToQuiz,
}: TopicLearningHeaderProps) {
  const { navigateBack } = useNavigationBase()

  const handleQuizClick = () => {
    console.log('TopicLearningHeader: Go to Quiz clicked')
    onGoToQuiz()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3">
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
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg bg-gradient-to-r ${moduleColor}`}>
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white truncate max-w-[180px] sm:max-w-[300px] md:max-w-none">
                  {topicTitle}
                </h1>
                {isAlreadyCompleted && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-xs py-0 mt-0.5">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completado
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full">
              <Clock className="h-4 w-4 text-white/50" />
              <span className="text-sm text-white/70">~5 min</span>
            </div>
            <Button onClick={handleQuizClick} size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:opacity-90">
              <Target className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Ir al</span> Quiz
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}