import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// Import page components
import LandingPage from './pages/LandingPage'
import InfoPage from './pages/InfoPage'
import GradeSelectorPage from './pages/GradeSelectorPage'
import GradePage from './pages/GradePage'

// CMS Component
import ChemMasterCMS from './pages/CMSPage'

function DocumentTitle() {
  const location = useLocation()
  
  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'ChemMaster - HOME',
      '/grade-selector': 'ChemMaster - Selección de Grado',
      '/info': 'ChemMaster - Información',
      '/CMS': 'ChemMaster - CMS'
    }
    let cleanPath = location.pathname;
    if (cleanPath.startsWith('/ChemMaster')) {
      cleanPath = cleanPath.replace('/ChemMaster', '');
    }
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
  const isIntegratedMode = location.pathname.startsWith('/ChemMaster') // It detects if the app is running inside the integrated mode by checking the pathname. If it starts with /ChemMaster, we consider it as integrated mode.
  const homeRoute = isIntegratedMode ? '/ChemMaster' : '/'
  
  const handleCMSClose = () => { navigate(homeRoute) }
  const handleInfoBack = () => { navigate(homeRoute) }
  const handleInfoStart = () => { navigate('/grade-selector') }
  
  return (
    <>
      <DocumentTitle />
      <Routes>

        <Route 
          path="/" element={
            <LandingPage 
              onStart={() => navigate('/grade-selector')} 
              onInfo={() => navigate('/info')}
              onResources={() => navigate('/resources')}
              onCms={() => navigate('/CMS')}
            />
          }
        />
        
        <Route 
          path="/info" element={
            <InfoPage 
              onBack={handleInfoBack}
              onStart={handleInfoStart} 
            />
          }
        />

        <Route 
          path="/CMS" element={
            <ChemMasterCMS 
              onClose={handleCMSClose}
            />
          }
        />

        <Route 
          path="/grade-selector" 
          element={
            <GradeSelectorPage 
              onBack={() => navigate('/')} 
              onSelectGrade={(gradeId) => {
                const id = gradeId.replace('grade-', ''); 
                navigate(`/grade/${id}`); 
              }} 
            />
          } 
        />

        <Route 
          path="/grade/:gradeId" 
          element={<GradePage />} 
        />
        
      </Routes>
    </>
  )
}