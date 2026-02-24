"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  Target,
  Trophy,
  X,
  RefreshCw,
  Brain,
  Zap,
  Clock,
  ChevronRight,
  Info,
  ArrowUp,
} from "lucide-react"
import { useProgressContext } from "../hooks/useProgressContext"
import { Topic } from "../types/cms"
import {BlockNoteBlock} from "../types/topicSelector"
import {QuizQuestion} from "../types/topicSelector"
import {TopicLearningPageProps} from "../types/topicSelector"
import TopicQuiz from "../components/topic-selection/TopicQuiz"

type ViewState = "content" | "quiz"
type ContentType = "blocknote" | "html"

// BlockNote Content Renderer Component
function BlockNoteRenderer({ blocks }: { blocks: BlockNoteBlock[] }) {
  const renderContent = (content: BlockNoteBlock['content']) => {
    return content.map((item, idx) => {
      const styles: React.CSSProperties = {}
      if (item.styles.bold) styles.fontWeight = 'bold'
      if (item.styles.italic) styles.fontStyle = 'italic'
      if (item.styles.underline) styles.textDecoration = 'underline'
      
      return (
        <span key={idx} style={styles}>
          {item.text}
        </span>
      )
    })
  }

  const renderBlock = (block: BlockNoteBlock) => {
    const alignment = block.props.textAlignment || 'left'
    const level = block.props.level || 2
    
    switch (block.type) {
      case 'heading':
        const headingClasses = {
          1: 'text-2xl md:text-3xl font-bold text-white mt-8 mb-4',
          2: 'text-xl md:text-2xl font-bold text-white mt-6 mb-3',
          3: 'text-lg md:text-xl font-bold text-white mt-4 mb-2',
        }[level] || 'text-xl md:text-2xl font-bold text-white mt-6 mb-3'
        
        if (level === 1) {
          return (
            <h1
              key={block.id}
              className={headingClasses}
              style={{ textAlign: alignment as any }}
            >
              {renderContent(block.content)}
            </h1>
          )
        } else if (level === 3) {
          return (
            <h3
              key={block.id}
              className={headingClasses}
              style={{ textAlign: alignment as any }}
            >
              {renderContent(block.content)}
            </h3>
          )
        } else {
          return (
            <h2
              key={block.id}
              className={headingClasses}
              style={{ textAlign: alignment as any }}
            >
              {renderContent(block.content)}
            </h2>
          )
        }
      
      case 'paragraph':
        return (
          <p
            key={block.id}
            className="text-white leading-relaxed mb-4 text-sm md:text-base"
            style={{ textAlign: alignment as any }}
          >
            {renderContent(block.content)}
          </p>
        )
      
      case 'bulletListItem':
        return (
          <li
            key={block.id}
            className="text-white mb-2 ml-6 list-disc"
            style={{ textAlign: alignment as any }}
          >
            {renderContent(block.content)}
          </li>
        )
      
      case 'numberedListItem':
        return (
          <li
            key={block.id}
            className="text-white mb-2 ml-6 list-decimal"
            style={{ textAlign: alignment as any }}
          >
            {renderContent(block.content)}
          </li>
        )
      
      default:
        return (
          <div key={block.id} className="text-white mb-4">
            {renderContent(block.content)}
          </div>
        )
    }
  }

  return (
    <div className="space-y-2">
      {blocks.map((block) => renderBlock(block))}
    </div>
  )
}

// HTML Content Renderer Component
function HTMLRenderer({ html }: { html: string }) {
  return (
    <div className="text-white">
      <div
        className="prose prose-invert max-w-none
          prose-headings:text-white prose-headings:font-bold
          prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-6 prose-h2:mb-3
          prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-4 prose-h3:mb-2
          prose-p:text-white prose-p:leading-relaxed prose-p:mb-4 prose-p:text-sm prose-p:md:text-base
          prose-strong:text-white prose-strong:font-semibold
          prose-em:text-white prose-em:italic
          prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc
          prose-ol:my-4 prose-ol:pl-6 prose-ol:list-decimal
          prose-li:text-white prose-li:mb-2 prose-li:marker:text-white
          prose-a:text-violet-400 prose-a:hover:text-violet-300 prose-a:underline
          prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white
          prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-violet-300 prose-code:text-white
          prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-4 prose-pre:text-white
          [&_*]:text-white [&_p]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white [&_em]:text-white"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default function TopicLearningPage({
  topic,
  moduleId,
  moduleColor,
  gradeId,
  totalTopicsInModule,
  onBack,
}: TopicLearningPageProps) {
  const [currentView, setCurrentView] = useState<ViewState>("content")
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { completeTopic, isTopicCompleted } = useProgressContext()

  const detectContentType = (): ContentType => {
    try {
      JSON.parse(topic.content)
      const parsed = JSON.parse(topic.content)
      return Array.isArray(parsed) ? 'blocknote' : 'html'
    } catch {
      return 'html'
    }
  }

  const contentType = detectContentType()
  const parseTopicContent = (): BlockNoteBlock[] | string => {
    if (contentType === 'html') {
      return topic.content
    }
    try {
      const parsed = JSON.parse(topic.content)
      return Array.isArray(parsed) ? parsed : []
    } catch (error) {
      return []
    }
  }

  const content = parseTopicContent()
  const isAlreadyCompleted = isTopicCompleted(gradeId, moduleId, topic.id)

  // Default quiz if none provided
  const defaultQuiz: QuizQuestion[] = [
    {
      id: "q1",
      question: `¿Has comprendido los conceptos básicos de "${topic.title}"?`,
      options: ["Sí, completamente", "Necesito repasar un poco", "Me gustaría profundizar más", "Tengo dudas"],
      correctAnswer: 0,
      explanation: "Excelente. Si tienes dudas, no dudes en volver a revisar el contenido.",
    },
  ]

  const quiz = defaultQuiz
  const passingScore = Math.ceil(quiz.length * 0.6)
  const passed = score >= passingScore

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setShowScrollTop(target.scrollTop > 400)
  }

  const goToQuiz = () => {
    setCurrentView("quiz")
  }

  const goToContent = () => {
    setCurrentView("content")
  }

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmitQuiz = () => {
    let correctCount = 0
    quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++
      }
    })
    setScore(correctCount)
    setQuizSubmitted(true)

    if (correctCount >= passingScore) {
      completeTopic(gradeId, moduleId, topic.id, totalTopicsInModule)
    }
  }

  const handleRetryQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setShowExplanation(null)
  }

  const handleMarkComplete = () => {
    completeTopic(gradeId, moduleId, topic.id, totalTopicsInModule)
    onBack()
  }
  
  const handleQuizComplete = (score: number) => {
    const passingScore = Math.ceil(quiz.length * 0.6)
    if (score >= passingScore) {
      completeTopic(gradeId, moduleId, topic.id, totalTopicsInModule)
    }
  }

  // QUIZ PAGE VIEW
  if (currentView === "quiz") {
    return (
      <TopicQuiz
        topicTitle={topic.title}
        quiz={quiz}
        onBack={goToContent}
        onComplete={handleQuizComplete}
      />
    )
  }

  // CONTENT PAGE VIEW (default)
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/95 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
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
                    {topic.title}
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
              <Button onClick={goToQuiz} size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:opacity-90">
                <Target className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Ir al</span> Quiz
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <div ref={contentRef} onScroll={handleScroll} className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-3xl">
          {/* Topic Description */}
          {topic.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${moduleColor} shrink-0`}>
                  <Lightbulb className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white mb-2">Introducción</h2>
                  <p className="text-white/70 leading-relaxed text-sm md:text-base">{topic.description}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content Rendering - BlockNote or HTML */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            {contentType === 'blocknote' && Array.isArray(content) ? (
              content.length > 0 ? (
                <BlockNoteRenderer blocks={content} />
              ) : (
                <p className="text-white/60 text-center py-8">No hay contenido disponible</p>
              )
            ) : (
              <HTMLRenderer html={content as string} />
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            {!isAlreadyCompleted && (
              <Button onClick={handleMarkComplete} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 md:py-6">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Marcar como completado
              </Button>
            )}
            <Button
              onClick={goToQuiz}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:opacity-90 py-5 md:py-6"
            >
              <Target className="h-5 w-5 mr-2" />
              Tomar el Quiz
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>

          {/* Bottom Padding */}
          <div className="h-24" />
        </div>
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}