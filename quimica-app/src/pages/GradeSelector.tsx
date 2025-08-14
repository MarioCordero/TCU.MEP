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
      
      {/* Main content - centered */}
      <div className="flex justify-center p-4" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="text-center p-6 bg-white w-screen max-w-1/2 rounded-lg shadow-lg">

          {/* The Highlight element */}
          <div className="text-left">
            <Highlight 
              title="¡Hola!" 
              subtitle="Explora el fascinante mundo de la quimica"
              icon={<TestTubeDiagonal className="w-6 h-6" />}
              gradient="bg-gradient-to-r from-[#7322B8] to-[#4D296C]"
              iconBg="bg-white/30"
            />
          </div>

          <SearchBar 
          placeholder="Search for chemicals..." 
          onSearch={(query) => console.log('Searching for:', query)} 
          />

          {/* Year selection title */}
          <div className="my-5 text-left">
            <h1 className="text-2xl font-bold">Selecciona tu grado</h1>
          </div>

          {/* ButtonDescripted examples used in grade selection */}
          <div className="flex flex-col gap-4 my-5 text-left">
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
          <div className="my-5 text-left">
            <h1 className="text-2xl font-bold">Temas destacados</h1>
          </div>


          {/* Featured topics placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
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
  )
}