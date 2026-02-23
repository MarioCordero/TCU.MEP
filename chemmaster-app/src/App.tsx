import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

// Import page components
import LandingPage from './pages/LandingPage'
import InfoPage from './pages/InfoPage'
import GradeSelectorPage from './pages/GradeSelectorPage'
import GradePage from './pages/GradePage'
import TopicPage from './pages/TopicPage'
import ChemMasterCMS from './pages/CMSPage'
import { ProgressProvider } from './context/ProgressContext'

function DocumentTitle() {
  const location = useLocation()
  
  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'ChemMaster - HOME',
      '/grade-selector': 'ChemMaster - Selección de Grado',
      '/info': 'ChemMaster - Información',
      '/CMS': 'ChemMaster - CMS'
    }
    const cleanPath = location.pathname || '/';
    document.title = titles[cleanPath] || 'ChemMaster'
  }, [location.pathname])
  return null
}

// Props, TODO, PUT IN OTHER FILE
interface AppProps {
  isLoaderComplete?: boolean;
  currentPage?: string;
  basePath?: string; 
}

export default function App({ basePath = '' }: AppProps) {
  const navigate = useNavigate()
  const location = useLocation()

  // No necesitamos useMemo complejo, ya el padre nos dice quiénes somos.
  // Pero si queremos ser extra seguros para local dev:
  const effectiveBase = basePath || (location.pathname.startsWith('/ChemMaster') ? '/ChemMaster' : '');

  // Handlers simplificados usando el effectiveBase
  const handleCMSClose = () => navigate(effectiveBase || '/')
  const handleInfoBack = () => navigate(effectiveBase || '/')
  const handleInfoStart = () => navigate(`${effectiveBase}/grade-selector`)

  return (
    <ProgressProvider>
      <DocumentTitle />
      <Routes>
        {/* Usamos rutas RELATIVAS para que no choquen con el prefijo del padre */}
        <Route path="/" element={
          <LandingPage
            onStart={() => navigate(`${effectiveBase}/grade-selector`)}
            onInfo={() => navigate(`${effectiveBase}/info`)}
            onResources={() => navigate(`${effectiveBase}/resources`)}
            onCms={() => navigate(`${effectiveBase}/CMS`)}
          />
        } />

        <Route path="/info" element={<InfoPage onBack={handleInfoBack} onStart={handleInfoStart} />} />
        
        <Route path="/CMS" element={<ChemMasterCMS onClose={handleCMSClose} />} />

        <Route path="/grade-selector" element={
          <GradeSelectorPage
            onBack={() => navigate(effectiveBase || '/')}
            onSelectGrade={(gradeId) => {
              const id = gradeId.replace('grade-', '');
              navigate(`${effectiveBase}/grade/${id}`);
            }}
          />
        } />

        {/* Las rutas dinámicas también respetan el prefijo */}
        <Route path="/grade/:gradeId" element={<GradePage />} />
        <Route path="/grade/:gradeId/module/:moduleId/topic/:topicId" element={<TopicPage />} />
      </Routes>
    </ProgressProvider>
  )
}