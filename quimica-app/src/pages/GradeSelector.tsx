import { useNavigate } from 'react-router-dom'
import { Highlight } from '@/components/ui/highlight'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import { SearchBar } from '@/components/ui/searchbar'

// Import icons
import { 
  Atom, 
  Play, 
  Info,
  TestTubeDiagonal
} from 'lucide-react'

export default function GradeSelector() {
  const navigate = useNavigate()
  
  const handleGradeSelection = (grade: number) => {
    console.log("User selected grade:", grade)
    console.log("Navigating to grade page...")
    navigate(`/grade-${grade}`)
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

          <div className="my-5 text-left">
            <h1 className="text-2xl font-bold">Selecciona tu grado</h1>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <Button onClick={() => handleGradeSelection(10)}>
              10° Grado
            </Button>
            <Button onClick={() => handleGradeSelection(11)}>
              11° Grado
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}