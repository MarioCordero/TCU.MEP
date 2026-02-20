"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Star, RotateCcw } from "lucide-react"
import { CompletionModalProps } from "../../types/gradeSelector"

export function CompletionModal({ gradeTitle, onClose, onReset }: CompletionModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          className="mb-8"
        >
          <Star className="h-32 w-32 text-yellow-400 fill-yellow-400 mx-auto drop-shadow-2xl" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black text-white mb-4"
        >
          Felicitaciones!
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-white/70 mb-8"
        >
          Has completado todos los modulos de {gradeTitle}
        </motion.p>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-4 justify-center">
          <Button onClick={onClose} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-6 text-lg font-bold rounded-2xl">
            Continuar
          </Button>
          <Button
            onClick={onReset}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-bold rounded-2xl bg-transparent"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reiniciar
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
