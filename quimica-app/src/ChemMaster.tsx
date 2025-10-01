import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Import page components
import LandingPage from './pages/LandingPage'
import InfoPage from './pages/InfoPage'
import GradeSelector from './pages/GradeSelector'
import GradeTenPage from './pages/grade-10/page'
import GradeElevenPage from './pages/grade-11/page'

// Import screen components
import ClasificacionMateria from './screens/clasificacion-materia'
import TablaPeriodicaScreen from './screens/tabla-periodica'
import EstructuraAtomica from './screens/estructura-atomica'
import ConfiguracionElectronica from './screens/configuracion-electronica'

// NOTION TEST
import ChemMasterCMS from './pages/ChemMasterCMS'

// Component to handle dynamic titles
function DocumentTitle() {
  const location = useLocation()
  
  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/ChemMaster': 'ChemMaster - HOME',
      '/ChemMaster/': 'ChemMaster - HOME',
      '/ChemMaster/grade-selector': 'ChemMaster - Selección de Grado',
      '/ChemMaster/info': 'ChemMaster - Información',
      '/ChemMaster/grade-10': 'ChemMaster - 10° Grado',
      '/ChemMaster/grade-11': 'ChemMaster - 11° Grado',
      '/ChemMaster/clasificacion-materia': 'ChemMaster - Clasificación de Materia',
      '/ChemMaster/tabla-periodica': 'ChemMaster - Tabla Periódica',
      '/ChemMaster/estructura-atomica': 'ChemMaster - Estructura Atómica',
      '/ChemMaster/configuracion-electronica': 'ChemMaster - Configuración Electrónica',
      '/ChemMaster/CMS': 'ChemMaster - CMS',
      // Fallback for standalone mode
      '/': 'ChemMaster - HOME',
      '/grade-selector': 'ChemMaster - Selección de Grado',
      '/info': 'ChemMaster - Información',
      '/grade-10': 'ChemMaster - 10° Grado',
      '/grade-11': 'ChemMaster - 11° Grado',
      '/clasificacion-materia': 'ChemMaster - Clasificación de Materia',
      '/tabla-periodica': 'ChemMaster - Tabla Periódica',
      '/estructura-atomica': 'ChemMaster - Estructura Atómica',
      '/configuracion-electronica': 'ChemMaster - Configuración Electrónica',
      '/CMS': 'ChemMaster - CMS'
    }
    
    document.title = titles[location.pathname] || 'ChemMaster'
  }, [location.pathname])
  
  return null
}

// Props interface for sub-app integration
interface QuimicaAppProps {
  isLoaderComplete?: boolean;
  currentPage?: string;
  basePath?: string; // Add basePath prop to handle parent routing
}

export default function QuimicaApp({ basePath = '' }: QuimicaAppProps) {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Determine if we're in standalone mode or integrated mode
  const isIntegratedMode = location.pathname.startsWith('/ChemMaster')
  const homeRoute = isIntegratedMode ? '/ChemMaster' : '/'
  
  const handleCMSClose = () => {
    navigate(homeRoute) // Navigate to the correct home based on context
  }
  
  return (
    <>
      <DocumentTitle />
      <Routes>
        {/* Main pages - using relative paths since parent route handles the base */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/grade-selector" element={<GradeSelector />} />
        <Route path="/grade-10" element={<GradeTenPage />} />
        <Route path="/grade-11" element={<GradeElevenPage />} />
        
        {/* Screen modules */}
        <Route path="/clasificacion-materia" element={<ClasificacionMateria />} />
        <Route path="/tabla-periodica" element={<TablaPeriodicaScreen />} />
        <Route path="/estructura-atomica" element={<EstructuraAtomica />} />
        <Route path="/configuracion-electronica" element={<ConfiguracionElectronica />} />

        {/* CMS route - now with proper onClose prop */}
        <Route path="/CMS" element={<ChemMasterCMS onClose={handleCMSClose} />} />
      </Routes>
    </>
  )
}

// APLICACIÓN COMO TAL ESTA ES LA QUE VA AL SERVER DE PRODUCCIÓN