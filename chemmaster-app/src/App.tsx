import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// Import page components
import LandingPage from './pages/LandingPage'
import InfoPage from './pages/InfoPage'
import GradeSelectorPage from './pages/GradeSelectorPage'
import GradePage from './pages/GradePage'
import TopicPage from './pages/TopicPage'
import ChemMasterCMS from './pages/CMSPage'
import CMSLoginPage from './pages/CMSLoginPage'
import ResourcesPage from './pages/Resources'
import { ProgressProvider } from './context/ProgressContext'
import { NavigationProvider } from './context/NavigationContext'
import { AppProps } from './types/app'

function DocumentTitle() {
  const location = useLocation()
  
  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/': 'ChemMaster - HOME',
      '/grade-selector': 'ChemMaster - Selección de Grado',
      '/info': 'ChemMaster - Información',
      '/CMS': 'ChemMaster - CMS',
      '/login': 'ChemMaster - Login',
    }
    const cleanPath = location.pathname || '/';
    document.title = titles[cleanPath] || 'ChemMaster'
  }, [location.pathname])
  return null
}

export default function App({ basePath = '' }: AppProps) {
  const navigate = useNavigate()
  const effectiveBase = basePath.trim()
  
  const handleCMSClose = () => navigate(effectiveBase || '/')
  const handleInfoBack = () => navigate(effectiveBase || '/')
  const handleInfoStart = () => navigate(`${effectiveBase}/grade-selector`)

  return (
    <ProgressProvider>
      <NavigationProvider basePath={effectiveBase}>
        <DocumentTitle />
        <Routes>
          <Route path="/" element={
            <LandingPage
              onStart={() => navigate(`${effectiveBase}/grade-selector`)}
              onInfo={() => navigate(`${effectiveBase}/info`)}
              onResources={() => navigate(`${effectiveBase}/resources`)}
              onCms={() => navigate(`${effectiveBase}/login`)}
            />
          } />

          <Route path="/info" element={<InfoPage onBack={handleInfoBack} onStart={handleInfoStart} />} />

          <Route path="/resources" element={<ResourcesPage />} />

          <Route path="/CMS" element={<ChemMasterCMS onClose={handleCMSClose} />} />

          <Route path="/login" element={
            <CMSLoginPage 
              onBack={() => navigate(effectiveBase || '/')} 
              onSuccess={() => navigate(`${effectiveBase}/CMS`)}
            />
          } />

          <Route path="/grade-selector" element={
            <GradeSelectorPage
              onBack={() => navigate(effectiveBase || '/')}
              onSelectGrade={(gradeId) => {
                const id = gradeId.replace('grade-', '');
                navigate(`${effectiveBase}/grade/${id}`);
              }}
            />
          } />
          
          <Route path="/grade/:gradeId" element={<GradePage />} />
          <Route path="/grade/:gradeId/module/:moduleId/topic/:topicId" element={<TopicPage />} />
        </Routes>
      </NavigationProvider>
    </ProgressProvider>
  )
}