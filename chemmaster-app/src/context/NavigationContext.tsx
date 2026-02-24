import React, { createContext, useContext } from 'react'

const NavigationContext = createContext<{ basePath: string }>({ basePath: '' })

export const NavigationProvider = ({ children, basePath }: { children: React.ReactNode, basePath: string }) => (
  <NavigationContext.Provider value={{ basePath }}>
    {children}
  </NavigationContext.Provider>
)

export const useNavigationBase = () => useContext(NavigationContext)