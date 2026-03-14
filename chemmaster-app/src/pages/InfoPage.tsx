import { motion } from "framer-motion"
import { 
  BookOpen, CheckCircle2, FlaskConical, Play, 
  Target, Trophy, Users, Smartphone, GraduationCap 
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Header from "../components/common/Header"

type InfoPageProps = {
  onBack: () => void
  onStart: () => void
}

export default function InfoPage({ onBack, onStart }: InfoPageProps) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header onBack={onBack} subtitle="Acerca de la Plataforma" />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sobre <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">ChemMaster</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Una plataforma web progresiva (PWA) diseñada para fortalecer el aprendizaje de la química en colegios de secundaria.
          </p>
        </div>

        {/* Las verdaderas características de tu app */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            { icon: BookOpen, title: "Contenido Estructurado", desc: "Módulos y tópicos alineados con los programas de estudio oficiales.", color: "from-purple-500 to-purple-600" },
            { icon: FlaskConical, title: "Notación Científica", desc: "Soporte nativo para visualizar ecuaciones, fórmulas y reacciones químicas.", color: "from-cyan-500 to-blue-600" },
            { icon: CheckCircle2, title: "Evaluación Dinámica", desc: "Actividades interactivas y quices integrados para validar el conocimiento.", color: "from-emerald-500 to-green-600" },
            { icon: Target, title: "Ruta de Aprendizaje", desc: "Progresión visual por niveles para mantener la motivación del estudiante.", color: "from-orange-500 to-amber-600" },
            { icon: Smartphone, title: "Multiplataforma", desc: "Diseño responsivo que funciona fluidamente en celulares y computadoras.", color: "from-pink-500 to-rose-600" },
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

        {/* Reemplazamos los números falsos por los pilares del proyecto */}
        <div className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white p-8 rounded-2xl shadow-lg mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">El Proyecto</h2>
            <p className="text-white/80">Desarrollado con impacto social para la educación técnica y académica.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: GraduationCap, value: "10° y 11°", label: "Grados Académicos" },
              { icon: Users, value: "100%", label: "Acceso Gratuito" },
              { icon: Trophy, value: "TCU", label: "Proyecto de Impacto" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="p-3 bg-white/20 rounded-full w-fit mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Listo para comenzar?</h2>
          <p className="text-white/60 mb-8">Explora los módulos y pon a prueba tus conocimientos.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white px-8 py-4 text-lg font-semibold rounded-xl" onClick={onStart}>
              <Play className="mr-3 h-6 w-6" />
              Ver Módulos
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