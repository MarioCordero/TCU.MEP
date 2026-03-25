import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CMSLoginPage from './pages/CMSLoginPage';
import CMSPage from './pages/CMSPage';
import { NavigationProvider } from './context/NavigationContext';
import { ProgressProvider } from './context/ProgressContext';
import { AppProps } from './types/app';

function DocumentTitle() {
  const location = useLocation();
  
  useEffect(() => {
    const titles: { [key: string]: string } = {
      '/login': 'ChemMaster - CMS Login',
      '/dashboard': 'ChemMaster - CMS Dashboard',
    };
    const cleanPath = location.pathname || '/login';
    document.title = titles[cleanPath] || 'ChemMaster CMS';
  }, [location.pathname]);
  
  return null;
}

function AppInternal() {
  const navigate = useNavigate();
  
  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };
  
  const handleLoginBack = () => {
    navigate('/login');
  };

  return (
    <>
      <DocumentTitle />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route 
          path="/login" 
          element={
            <CMSLoginPage 
              onBack={() => navigate('/')}
              onSuccess={handleLoginSuccess}
            />
          } 
        />
        <Route 
          path="/dashboard/*" 
          element={<CMSPage onClose={() => navigate('/login')} />} 
        />
      </Routes>
    </>
  );
}

export default function App({ basePath = '' }: AppProps) {
  return (
    <ProgressProvider>
      <NavigationProvider basePath={basePath}>
        <AppInternal />
      </NavigationProvider>
    </ProgressProvider>
  );
}