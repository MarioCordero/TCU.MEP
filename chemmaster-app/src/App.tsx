import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

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

// CMS Component
import ChemMasterCMS from './pages/ChemMasterCMS'

/**
 * Componente auxiliar para manejar el título del documento dinámicamente.
 * Detecta si la app está corriendo bajo el prefijo '/ChemMaster' y normaliza la ruta.
 */
function DocumentTitle() {
  const location = useLocation()
  
  useEffect(() => {
    // Definimos los títulos solo una vez, usando las rutas relativas limpias
    const titles: { [key: string]: string } = {
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

    // Lógica de limpieza: Si estamos en producción (/ChemMaster), quitamos el prefijo
    // para buscar en el objeto 'titles'.
    let cleanPath = location.pathname;
    
    if (cleanPath.startsWith('/ChemMaster')) {
      cleanPath = cleanPath.replace('/ChemMaster', '');
    }

    // Si la ruta quedó vacía (ej. venía de /ChemMaster), la normalizamos a '/'
    if (cleanPath === '') {
      cleanPath = '/';
    }
    
    document.title = titles[cleanPath] || 'ChemMaster'
  }, [location.pathname])
  
  return null
}

interface AppProps {
  isLoaderComplete?: boolean;
  currentPage?: string;
  basePath?: string; 
}

export default function App({ basePath = '' }: AppProps) {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Detecta si estamos en modo integrado (producción) o standalone (dev)
  const isIntegratedMode = location.pathname.startsWith('/ChemMaster')
  const homeRoute = isIntegratedMode ? '/ChemMaster' : '/'
  
  const handleCMSClose = () => {
    navigate(homeRoute) 
  }
  
  return (
    <>
      <DocumentTitle />
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/grade-selector" element={<GradeSelector />} />
        <Route path="/grade-10" element={<GradeTenPage />} />
        <Route path="/grade-11" element={<GradeElevenPage />} />
        
        {/* Módulos de estudio (Screens) */}
        <Route path="/clasificacion-materia" element={<ClasificacionMateria />} />
        <Route path="/tabla-periodica" element={<TablaPeriodicaScreen />} />
        <Route path="/estructura-atomica" element={<EstructuraAtomica />} />
        <Route path="/configuracion-electronica" element={<ConfiguracionElectronica />} />

        {/* Ruta del CMS */}
        <Route path="/CMS" element={<ChemMasterCMS onClose={handleCMSClose} />} />
      </Routes>
    </>
  )
}