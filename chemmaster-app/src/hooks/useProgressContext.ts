import { useContext } from 'react'
import { ProgressContext } from '../context/ProgressContext'

export function useProgressContext() {
  const context = useContext(ProgressContext)
  
  if (!context) {
    throw new Error(
      'useProgressContext must be used within ProgressProvider. Make sure your app is wrapped with <ProgressProvider>.'
    )
  }
  
  return context
}