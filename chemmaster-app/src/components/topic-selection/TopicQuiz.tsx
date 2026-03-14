"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  Target,
  Trophy,
  X,
  RefreshCw,
  Zap,
  Info,
} from "lucide-react"
import {TopicQuizProps} from "../../types/topicSelector"

export default function TopicQuiz({
  topicTitle,
  quiz,
  onBack,
  onComplete,
}: TopicQuizProps) {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState<string | null>(null)

  const passingScore = Math.ceil(quiz.length * 0.6)
  const passed = score >= passingScore

  const handleSubmitQuiz = () => {
    let correctCount = 0
    quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++
      }
    })
    setScore(correctCount)
    setQuizSubmitted(true)
    onComplete(correctCount)
  }

  const handleRetryQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setShowExplanation(null)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Quiz Header */}
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
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-white">Quiz: {topicTitle}</h1>
                  <p className="text-xs text-white/50">
                    {quiz.length} preguntas | {passingScore} para aprobar
                  </p>
                </div>
              </div>
            </div>

            {!quizSubmitted && (
              <Badge className="bg-white/10 text-white/70">
                {Object.keys(quizAnswers).length}/{quiz.length} respondidas
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
          {!quizSubmitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 md:space-y-6">
              {/* Quiz Info Card */}
              <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-violet-500/20">
                    <Info className="h-5 w-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">
                      Responde todas las preguntas y obtiene al menos{" "}
                      <span className="font-bold text-violet-400">{passingScore} correctas</span> para aprobar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions */}
              {quiz.map((question, qIdx) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIdx * 0.1 }}
                  className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
                      {qIdx + 1}
                    </div>
                    <h4 className="text-base md:text-lg font-medium text-white flex-1 pt-1">
                      {question.question}
                    </h4>
                  </div>

                  <div className="space-y-2 md:space-y-3 ml-0 md:ml-12">
                    {question.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => setQuizAnswers({ ...quizAnswers, [question.id]: optIdx })}
                        className={`w-full p-3 md:p-4 rounded-xl text-left transition-all flex items-center gap-3 text-sm md:text-base ${
                          quizAnswers[question.id] === optIdx
                            ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            quizAnswers[question.id] === optIdx
                              ? "border-white bg-white/20"
                              : "border-white/30"
                          }`}
                        >
                          {quizAnswers[question.id] === optIdx && (
                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-white" />
                          )}
                        </div>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Submit Button */}
              <div className="pt-4 pb-8 flex flex-col gap-3">
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < quiz.length}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50 py-6 text-base font-semibold"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Enviar Respuestas
                </Button>

                <Button
                  onClick={onBack}
                  variant="outline"
                  className="w-full border-white/20 text-white/70 hover:bg-white/10 bg-transparent py-5"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a la materia
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Quiz Results */
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              {/* Results Card */}
              <div
                className={`p-6 md:p-8 rounded-3xl border ${
                  passed
                    ? "bg-gradient-to-br from-emerald-500/20 to-green-500/10 border-emerald-500/30"
                    : "bg-gradient-to-br from-red-500/20 to-orange-500/10 border-red-500/30"
                }`}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className={`w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full flex items-center justify-center ${
                      passed ? "bg-emerald-500" : "bg-red-500"
                    }`}
                  >
                    {passed ? (
                      <Trophy className="h-10 w-10 md:h-12 md:w-12 text-white" />
                    ) : (
                      <X className="h-10 w-10 md:h-12 md:w-12 text-white" />
                    )}
                  </motion.div>

                  <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl font-bold text-white">
                    {passed ? "¡Felicitaciones!" : "Sigue intentando"}
                  </h2>

                  <p className="mt-2 text-white/60 text-sm md:text-base">
                    {passed
                      ? "Has completado este tema exitosamente"
                      : "Necesitas más práctica para dominar este tema"}
                  </p>

                  {/* Score Display */}
                  <div className="mt-6 inline-flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 bg-white/10 rounded-2xl">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-black text-white">{score}</div>
                      <div className="text-xs md:text-sm text-white/50">Correctas</div>
                    </div>
                    <div className="w-px h-10 md:h-12 bg-white/20" />
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-black text-white">{quiz.length}</div>
                      <div className="text-xs md:text-sm text-white/50">Total</div>
                    </div>
                    <div className="w-px h-10 md:h-12 bg-white/20" />
                    <div className={`text-3xl md:text-4xl font-black ${passed ? "text-emerald-400" : "text-red-400"}`}>
                      {Math.round((score / quiz.length) * 100)}%
                    </div>
                    <div className="text-xs md:text-sm text-white/50">Puntaje</div>
                  </div>

                  {passed && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium text-sm md:text-base">Tema marcado como completado</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Answer Review */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Revisión de Respuestas
                </h3>

                <div className="space-y-3 md:space-y-4">
                  {quiz.map((question) => {
                    const userAnswer = quizAnswers[question.id]
                    const isCorrect = userAnswer === question.correctAnswer

                    return (
                      <div
                        key={question.id}
                        className={`p-4 rounded-xl border ${
                          isCorrect
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : "bg-red-500/10 border-red-500/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isCorrect ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          >
                            {isCorrect ? (
                              <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-white" />
                            ) : (
                              <X className="h-4 w-4 md:h-5 md:w-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm md:text-base">{question.question}</p>
                            <p className="text-xs md:text-sm mt-1">
                              <span className="text-white/50">Tu respuesta: </span>
                              <span className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                                {question.options[userAnswer]}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-xs md:text-sm">
                                <span className="text-white/50">Respuesta correcta: </span>
                                <span className="text-emerald-400">{question.options[question.correctAnswer]}</span>
                              </p>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                setShowExplanation(showExplanation === question.id ? null : question.id)
                              }
                              className="text-xs md:text-sm text-violet-400 hover:text-violet-300 mt-2 flex items-center gap-1"
                            >
                              <Lightbulb className="h-4 w-4" />
                              {showExplanation === question.id ? "Ocultar" : "Ver"} explicación
                            </button>

                            <AnimatePresence>
                              {showExplanation === question.id && (
                                <motion.p
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-2 text-xs md:text-sm text-white/70 bg-white/5 p-3 rounded-lg"
                                >
                                  {question.explanation}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 pb-8">
                {!passed && (
                  <Button
                    onClick={handleRetryQuiz}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent py-5"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Intentar de nuevo
                  </Button>
                )}

                <Button
                  onClick={onBack}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent py-5"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Repasar contenido
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}