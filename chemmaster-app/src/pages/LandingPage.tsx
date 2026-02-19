import { motion } from "framer-motion"
import { Atom, Compass, Info, Play, Settings, Zap, ChevronRight } from "lucide-react"
import { Button } from "../components/ui/button"

type LandingHomeProps = {
  onStart: () => void
  onInfo: () => void
  onResources: () => void
  onCms: () => void
}

export default function LandingHome({ onStart, onInfo, onResources, onCms }: LandingHomeProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl"
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{ left: `${10 + i * 6}%`, top: `${15 + i * 5}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Top Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -top-2 right-0 left-0 flex justify-end gap-2 px-2"
        >
          <button
            type="button"
            onClick={onResources}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors"
          >
            <Compass className="h-4 w-4 mr-2" />
            Explorar
          </button>
          <button
            type="button"
            onClick={onCms}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-violet-500/10 backdrop-blur-sm border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 hover:border-violet-400 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            CMS
          </button>
        </motion.div>

        {/* Logo/Icon */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 md:mb-8 mt-12">
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }} className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-5 md:p-6 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-full w-fit mx-auto mb-6 shadow-2xl shadow-violet-500/30"
            >
              <Atom className="h-12 w-12 md:h-16 md:w-16 text-white" />
            </motion.div>

            {/* Orbiting particles */}
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full absolute -top-1" />
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-pink-400 rounded-full absolute -bottom-2 -right-2" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="text-4xl md:text-6xl font-black text-white mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              ChemMaster
            </span>
          </motion.h1>

          {/* Subtitle with animated badge */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-2 mb-6">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Zap className="h-5 w-5 text-yellow-400" />
            </motion.div>
            <span className="text-lg md:text-xl text-white/70">Quimica Interactiva para Secundaria</span>
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8 md:mb-10 px-4">
          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Aprende quimica de forma divertida con simuladores 3D, laboratorios virtuales y juegos interactivos. Disenado para estudiantes de 10 y 11 grado.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 hover:from-violet-600 hover:via-purple-600 hover:to-cyan-600 text-white px-8 py-5 md:py-6 text-lg font-bold rounded-2xl shadow-xl shadow-violet-500/25 transition-all duration-300"
              onClick={onStart}
            >
              <Play className="mr-3 h-6 w-6" />
              Comenzar Ahora
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 px-8 py-5 md:py-6 text-lg font-semibold rounded-2xl transition-all duration-300 bg-transparent"
              onClick={onInfo}
            >
              <Info className="mr-3 h-6 w-6" />
              Mas Info
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-10 md:mt-14 grid grid-cols-3 gap-3 md:gap-6 max-w-md mx-auto px-4">
          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="text-center p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <motion.div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>
              12
            </motion.div>
            <div className="text-xs md:text-sm text-white/50">Modulos</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="text-center p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <motion.div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
              50+
            </motion.div>
            <div className="text-xs md:text-sm text-white/50">Actividades</div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -5 }} className="text-center p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <motion.div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>
              100%
            </motion.div>
            <div className="text-xs md:text-sm text-white/50">Gratis</div>
          </motion.div>
        </motion.div>

        {/* Explore Resources CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 md:mt-10">
          <motion.button
            onClick={onResources}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Compass className="h-4 w-4" />
            <span className="text-sm">Explora mas recursos externos</span>
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
