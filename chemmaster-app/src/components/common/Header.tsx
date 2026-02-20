"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Atom, ArrowLeft } from "lucide-react"

interface HeaderProps {
  onBack: () => void
  title?: string
  subtitle?: string
  showBackButton?: boolean
}

export default function Header({ 
  onBack, 
  title = "ChemMaster", 
  subtitle = "Elige tu aventura",
  showBackButton = true 
}: HeaderProps) {
  return (
    <header className="relative z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
                <Atom className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">{title}</h1>
                <p className="text-xs text-white/50">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}