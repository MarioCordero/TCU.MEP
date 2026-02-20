import { motion } from "framer-motion"
import { Atom, BookOpen, Calculator, Eye, FlaskConical, Play, Sparkles, Target, Trophy, Users, Clock, X } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

type InfoPageProps = {
  onBack: () => void
  onStart: () => void
}

export default function InfoPage({ onBack, onStart }: InfoPageProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-950/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white/70 hover:text-white hover:bg-white/10">
                <X className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl">
                  <Atom className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">ChemMaster</h1>
                  <p className="text-xs text-white/50">Informacion de la App</p>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0">Pro v2.0</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sobre <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">ChemMaster</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            La plataforma educativa mas avanzada para el aprendizaje de quimica en secundaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: FlaskConical, title: "Simuladores 3D", desc: "Modelos interactivos de atomos, moleculas y reacciones quimicas.", color: "from-purple-500 to-purple-600" },
            { icon: Calculator, title: "Calculadoras", desc: "Herramientas de calculo avanzadas para estequiometria y concentraciones.", color: "from-cyan-500 to-blue-600" },
            { icon: Eye, title: "Visualizadores", desc: "Representaciones graficas de estructuras moleculares y orbitales.", color: "from-emerald-500 to-green-600" },
            { icon: BookOpen, title: "Contenido Curricular", desc: "Alineado con los programas oficiales de 10 y 11 grado.", color: "from-orange-500 to-amber-600" },
            { icon: Target, title: "Aprendizaje Adaptativo", desc: "Sistema que se adapta al ritmo de cada estudiante.", color: "from-pink-500 to-rose-600" },
            { icon: Sparkles, title: "Gamificacion", desc: "Elementos de juego, logros y desafios para mantener la motivacion.", color: "from-violet-500 to-purple-600" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-0 bg-white/5 backdrop-blur-sm border border-white/10 h-full">
                <CardHeader className="text-center pb-3">
                  <div className={`p-3 bg-gradient-to-r ${item.color} rounded-xl w-fit mx-auto mb-3`}>
                    <item.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 text-sm text-center">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white p-8 rounded-2xl shadow-lg mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Resultados Comprobados</h2>
            <p className="text-white/80">Miles de estudiantes han mejorado sus calificaciones.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "25,000+", label: "Estudiantes" },
              { icon: Trophy, value: "98%", label: "Aprobacion" },
              { icon: BookOpen, value: "12", label: "Modulos" },
              { icon: Clock, value: "50+", label: "Horas" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Listo para comenzar?</h2>
          <p className="text-white/60 mb-8">Unete a miles de estudiantes que ya estan dominando la quimica.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-xl" onClick={onStart}>
              <Play className="mr-3 h-6 w-6" />
              Comenzar Ahora
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl bg-transparent" onClick={onBack}>
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}