import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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

// Component to handle dynamic titles
function DocumentTitle() {
  const location = useLocation()
  
  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'ChemMaster - HOME',
      '/grade-selector': 'ChemMaster - Selección de Grado',
      '/info': 'ChemMaster - Información',
      '/grade-10': 'ChemMaster - 10° Grado',
      '/grade-11': 'ChemMaster - 11° Grado',
      '/clasificacion-materia': 'ChemMaster - Clasificación de Materia',
      '/tabla-periodica': 'ChemMaster - Tabla Periódica',
      '/estructura-atomica': 'ChemMaster - Estructura Atómica',
      '/configuracion-electronica': 'ChemMaster - Configuración Electrónica'
    }
    
    document.title = titles[location.pathname] || 'ChemMaster'
  }, [location.pathname])
  
  return null
}

export default function App() {
  return (
    <Router>
      <DocumentTitle />
      <Routes>
        {/* Main pages */}
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
      </Routes>
    </Router>
  )
}