import React, { createContext, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavigationContextType {
  basePath: string
  navigateBack: () => void
  navigate: (path: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export const NavigationProvider = ({ 
  children, 
  basePath 
}: { 
  children: React.ReactNode
  basePath: string 
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateBack = () => {
    const currentPath = location.pathname

    // Extract gradeId from the current path
    const gradeMatch = currentPath.match(/\/grade\/(\d+)/)
    const gradeId = gradeMatch ? gradeMatch[1] : null

    // Determine where to go back based on current path
    if (currentPath.includes('/topic/')) {
      // If on /grade/:gradeId/module/:moduleId/topic/:topicId, go to /grade/:gradeId
      if (gradeId) {
        navigate(`${basePath}/grade/${gradeId}`)
      } else {
        navigate(`${basePath}/grade-selector`)
      }
    } else if (currentPath.includes('/module/')) {
      // If on /grade/:gradeId/module/:moduleId, go to /grade/:gradeId
      if (gradeId) {
        navigate(`${basePath}/grade/${gradeId}`)
      } else {
        navigate(`${basePath}/grade-selector`)
      }
    } else if (currentPath.includes('/grade/')) {
      // If on /grade/:id, go to /grade-selector
      navigate(`${basePath}/grade-selector`)
    } else {
      // Default: go to basePath
      navigate(basePath || '/')
    }
  }

  const navFunction = (path: string) => {
    navigate(`${basePath}${path}`)
  }

  return (
    <NavigationContext.Provider value={{ basePath, navigateBack, navigate: navFunction }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigationBase() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigationBase must be used within NavigationProvider')
  }
  return context
}