"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/button"
import {
  Lightbulb, Target, ChevronRight, ArrowUp,
} from "lucide-react"
import { useProgressContext } from "../hooks/useProgressContext"
import { Topic } from "../types/cms"
import TopicQuiz from "../components/topic-selection/TopicQuiz"
import {BlockNoteBlock} from "../types/topicSelector"
import {QuizQuestion} from "../types/topicSelector"
import {TopicLearningPageProps} from "../types/topicSelector"
import TopicLearningHeader from "../components/topic-selection/TopicLearningHeader"
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import TopicActivitiesRenderer from "../components/activities/TopicActivitiesRenderer"

type ViewState = "content" | "quiz"
type ContentType = "blocknote" | "html"

// BlockNote Content Renderer Component
function BlockNoteRenderer({ blocks }: { blocks: BlockNoteBlock[] }) {
  const getBlockUrl = (block: BlockNoteBlock) => {
    const props = (block.props || {}) as Record<string, unknown>
    const candidate = props.url || props.src || props.previewUrl || props.fileUrl
    return typeof candidate === "string" ? candidate : ""
  }

  const renderContent = (content: BlockNoteBlock['content']) => {
    if (!content || !Array.isArray(content)) return null;

    return content.map((item, idx) => {
      const styles: React.CSSProperties = {}
      if (item.styles?.bold) styles.fontWeight = 'bold'
      if (item.styles?.italic) styles.fontStyle = 'italic'
      if (item.styles?.underline) styles.textDecoration = 'underline'
      if (item.styles?.strike) styles.textDecoration = 'line-through'
      if (item.styles?.superscript) {
        styles.verticalAlign = 'super'
        styles.fontSize = '0.75em'
      }
      if (item.styles?.subscript) {
        styles.verticalAlign = 'sub'
        styles.fontSize = '0.75em'
      }
      
      return (
        <span key={idx} style={styles}>
          {item.text}
        </span>
      )
    })
  }

  const renderListGroup = (items: BlockNoteBlock[], ordered: boolean) => {
    const ListTag = ordered ? 'ol' : 'ul'
    const listClass = ordered ? 'list-decimal' : 'list-disc'

    return (
      <ListTag className={`my-3 ml-6 ${listClass} text-white space-y-2`}>
        {items.map((item) => (
          <li key={item.id} style={{ textAlign: (item.props?.textAlignment || 'left') as React.CSSProperties['textAlign'] }}>
            {renderContent(item.content)}
            {item.children && item.children.length > 0 && (
              <div className="ml-4 mt-2 border-l border-white/10 pl-3 space-y-2">
                {renderBlocks(item.children)}
              </div>
            )}
          </li>
        ))}
      </ListTag>
    )
  }

  const renderTable = (block: BlockNoteBlock) => {
    const tableContent = (block as any).content
    const rows = tableContent?.rows

    if (!Array.isArray(rows) || rows.length === 0) return null

    return (
      <div key={block.id} className="my-4 overflow-x-auto">
        <table className="w-full border-collapse border border-white/20 text-white text-sm">
          <tbody>
            {rows.map((row: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {(row.cells || []).map((cell: any, cellIndex: number) => {
                  const cellText = Array.isArray(cell.content)
                    ? cell.content
                        .flatMap((entry: any) => Array.isArray(entry?.content) ? entry.content : [])
                        .map((entry: any) => entry?.text || '')
                        .join('')
                    : ''

                  return (
                    <td key={cellIndex} className="border border-white/20 px-3 py-2 align-top min-h-10">
                      {cellText || <span className="text-white/30">&nbsp;</span>}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderBlock = (block: BlockNoteBlock) => {
    const alignment = block.props?.textAlignment || 'left'
    const level = block.props?.level || 2
    const mathAlignmentClass = alignment === 'center'
      ? 'justify-center'
      : alignment === 'right'
        ? 'justify-end'
        : 'justify-start'
    
    switch (block.type) {
      case 'heading': {
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
              style={{ textAlign: alignment as React.CSSProperties['textAlign'] }}
            >
              {renderContent(block.content)}
            </h1>
          )
        } else if (level === 3) {
          return (
            <h3
              key={block.id}
              className={headingClasses}
              style={{ textAlign: alignment as React.CSSProperties['textAlign'] }}
            >
              {renderContent(block.content)}
            </h3>
          )
        } else {
          return (
            <h2
              key={block.id}
              className={headingClasses}
              style={{ textAlign: alignment as React.CSSProperties['textAlign'] }}
            >
              {renderContent(block.content)}
            </h2>
          )
        }
      }
      
      case 'math':
        return (
          <div
            key={block.id}
            className={`text-white w-full my-4 flex ${mathAlignmentClass} items-center py-2`}
          >
            <InlineMath math={block.props?.equation || ''} />
          </div>
        )

      case 'image':
        const imageUrl = getBlockUrl(block)
        if (!imageUrl) return null
        return (
          <div key={block.id} className={`w-full my-4 flex ${mathAlignmentClass}`}>
            <img
              src={imageUrl}
              alt={block.props?.caption || ''}
              className="max-w-full rounded-lg"
            />
          </div>
        )

      case 'video': {
        const videoUrl = getBlockUrl(block)
        if (!videoUrl) return null
        return (
          <div key={block.id} className={`w-full my-4 flex ${mathAlignmentClass}`}>
            <video
              src={videoUrl}
              controls
              preload="metadata"
              className="w-full max-w-full rounded-lg bg-black"
            />
          </div>
        )
      }

      case 'audio': {
        const audioUrl = getBlockUrl(block)
        if (!audioUrl) return null
        return (
          <div key={block.id} className={`w-full my-4 flex ${mathAlignmentClass}`}>
            <audio
              src={audioUrl}
              controls
              preload="metadata"
              className="w-full"
            />
          </div>
        )
      }

      case 'file':
        const fileUrl = getBlockUrl(block)
        if (!fileUrl) return null
        return (
          <div key={block.id} className="my-4">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 bg-white/5 text-violet-300 hover:bg-white/10 hover:text-violet-200 transition-colors"
            >
              <span>📎</span>
              <span>{block.props?.name || block.props?.caption || 'Archivo adjunto'}</span>
            </a>
          </div>
        )

      case 'quote':
        return (
          <blockquote
            key={block.id}
            className="border-l-4 border-violet-500 pl-4 italic text-white/90 my-4"
          >
            {renderContent(block.content)}
          </blockquote>
        )

      case 'checkListItem': {
        const checked = Boolean((block.props as any)?.checked)
        return (
          <label key={block.id} className="flex items-start gap-2 my-2 text-white">
            <input type="checkbox" checked={checked} readOnly className="mt-1" />
            <span className={checked ? 'line-through text-white/60' : ''}>{renderContent(block.content)}</span>
          </label>
        )
      }

      case 'toggleListItem':
        return (
          <details key={block.id} open className="my-3 text-white/95">
            <summary className="cursor-pointer select-none">{renderContent(block.content) || <span className="text-white/40 italic">Toggle</span>}</summary>
            {block.children && block.children.length > 0 && (
              <div className="ml-4 mt-2 border-l border-white/10 pl-3 space-y-2">
                {renderBlocks(block.children)}
              </div>
            )}
          </details>
        )

      case 'codeBlock': {
        const codeText = (block.content || []).map((entry) => entry.text).join('')
        const language = (block.props as any)?.language || 'text'
        return (
          <div key={block.id} className="my-4">
            <pre className="bg-white/5 border border-white/10 rounded-xl p-4 text-white overflow-x-auto">
              <code className="text-sm" data-language={language}>{codeText}</code>
            </pre>
          </div>
        )
      }

      case 'divider':
        return <hr key={block.id} className="my-6 border-white/20" />

      case 'table':
        return renderTable(block)

      case 'paragraph':
        return (
          <p
            key={block.id}
            className="text-white leading-relaxed mb-4 text-sm md:text-base"
            style={{ textAlign: alignment as React.CSSProperties['textAlign'] }}
          >
            {renderContent(block.content)}
          </p>
        )
      
      default:
        return (
          <div key={block.id} className="text-white mb-4">
            {renderContent(block.content)}
            {block.children && block.children.length > 0 && (
              <div className="ml-4 mt-2 border-l border-white/10 pl-3 space-y-2">
                {renderBlocks(block.children)}
              </div>
            )}
          </div>
        )
    }
  }

  const renderBlocks = (items: BlockNoteBlock[]) => {
    const rendered: React.ReactNode[] = []

    for (let index = 0; index < items.length; index++) {
      const block = items[index]

      if (block.type === 'bulletListItem' || block.type === 'numberedListItem') {
        const ordered = block.type === 'numberedListItem'
        const group: BlockNoteBlock[] = [block]

        while (
          index + 1 < items.length &&
          items[index + 1].type === block.type
        ) {
          group.push(items[index + 1])
          index++
        }

        rendered.push(
          <React.Fragment key={`list-${block.id}`}>
            {renderListGroup(group, ordered)}
          </React.Fragment>
        )
        continue
      }

      rendered.push(renderBlock(block))
    }

    return rendered
  }

  return (
    <div className="space-y-2">
      {renderBlocks(blocks)}
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
  basePath = ""
}: TopicLearningPageProps) {
  const [currentView, setCurrentView] = useState<ViewState>("content")
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const { completeTopic, isTopicCompleted } = useProgressContext()
    const handleActivitiesPassed = (score: { earned: number; total: number }) => {
    completeTopic(gradeId, moduleId, topic.id, score.earned, score.total)
  }

  const detectContentType = (): ContentType => {
    try {
      JSON.parse(topic.content)
      const parsed = JSON.parse(topic.content)
      return Array.isArray(parsed) ? 'blocknote' : 'html'
    } catch {
      return 'html'
    }
  }

  // Debugging logs
  const handleBackClick = () => {
    onBack()
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
      completeTopic(gradeId, moduleId, topic.id, correctCount, quiz.length)
    }
  }

  const handleRetryQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setShowExplanation(null)
  }
  
  const handleQuizComplete = (score: number) => {
    const passingScore = Math.ceil(quiz.length * 0.6)
    if (score >= passingScore) {
      completeTopic(gradeId, moduleId, topic.id, score, quiz.length)
    }
  }

  if (currentView === "quiz") {
    return (
      <TopicActivitiesRenderer
        moduleId={moduleId}
        topicId={topic.id}
        topicTitle={topic.title}
        onBack={goToContent}
        onPassed={handleActivitiesPassed}
      />
    )
  }

  // CONTENT PAGE VIEW (default)
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <TopicLearningHeader
        topicTitle={topic.title}
        moduleColor={moduleColor}
        isAlreadyCompleted={isAlreadyCompleted}
        // onBack={onBack}
        onBack={handleBackClick}
        onGoToQuiz={goToQuiz}
      />

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
            {/* Go to activities Button */}
            <Button
              onClick={goToQuiz}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:opacity-90 py-5 md:py-6"
            >
              <Target className="h-5 w-5 mr-2" />
              Ir a actividades de evaluación
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