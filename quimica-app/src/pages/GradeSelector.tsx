import { useNavigate } from 'react-router-dom'
import { Highlight } from '../components/ui/highlight'
import { Header } from '../components/ui/header'
import { SearchBar } from '../components/ui/searchbar'
import { ButtonDescripted } from '../components/ui/buttondescripted'

// Import icons
import { 
  TestTubeDiagonal,
} from 'lucide-react'

export default function GradeSelector() {
  const navigate = useNavigate()
  
  const handleGradeSelection = (grade: number) => {
    console.log("User selected grade:", grade)
    console.log("Navigating to grade page...")
    navigate(`../grade-${grade}`, { replace: true })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Header outside the centered container */}
      <Header 
        title="ChemMaster"
      />
      
      {/* Main content - responsive container */}
      <div className="flex justify-center p-2 sm:p-4 lg:p-8" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg">

            {/* The Highlight element */}
            <div className="text-left mb-4 sm:mb-6">
              <Highlight 
                title="¡Hola!" 
                subtitle="Explora el fascinante mundo de la quimica"
                icon={<TestTubeDiagonal className="w-6 h-6" />}
                gradient="bg-gradient-to-r from-[#7322B8] to-[#4D296C]"
                iconBg="bg-white/30"
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <SearchBar 
                placeholder="Search for chemicals..." 
                onSearch={(query) => console.log('Searching for:', query)} 
              />
            </div>

            {/* Year selection title */}
            <div className="mb-4 sm:mb-6 text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Selecciona tu grado</h1>
            </div>

            {/* ButtonDescripted examples used in grade selection */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 text-left">
              {/* Tenth grade button */}
              <ButtonDescripted 
                title="Décimo año" 
                subtitle="Química general" 
                icon="arrow-right"
                gradient="custom"
                customGradient="bg-gradient-to-r from-[#517AF6] to-[#3BE5EB]"
                onClick={() => handleGradeSelection(10)}
              />

              {/* Eleventh grade button */}
              <ButtonDescripted 
                title="Undécimo año" 
                subtitle="Química avanzada" 
                icon= "arrow-right"
                gradient="custom"
                customGradient="bg-gradient-to-r from-[#A756F7] to-[#00CD90]"
                onClick={() => handleGradeSelection(11)}
              />
            </div>

            {/* Highlight themes */}
            <div className="mb-4 sm:mb-6 text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Temas destacados</h1>
            </div>

            {/* Featured topics - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <ButtonDescripted 
                title="Tabla Periódica" 
                subtitle="Elementos y propiedades" 
                icon="star"
                gradient="pink-orange"
                onClick={() => console.log('Tabla Periódica clicked')}
              />

              <ButtonDescripted 
                title="Enlaces Químicos" 
                subtitle="Iónico, covalente y metálico" 
                icon="heart"
                gradient="green-blue"
                onClick={() => console.log('Enlaces Químicos clicked')}
              />

              <ButtonDescripted 
                title="Reacciones Químicas" 
                subtitle="Balanceo y tipos" 
                icon="plus"
                gradient="purple-pink"
                onClick={() => console.log('Reacciones Químicas clicked')}
              />

              <ButtonDescripted 
                title="Estequiometría" 
                subtitle="Cálculos químicos" 
                icon="check"
                gradient="orange-red"
                onClick={() => console.log('Estequiometría clicked')}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}