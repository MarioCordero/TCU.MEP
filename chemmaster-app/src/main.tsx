import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'

if (import.meta.env.DEV) {
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('findDOMNode is deprecated') ||
      message.includes('ReactQuill') ||
      message.includes('react-quill')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
  
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    if (
      message.includes('findDOMNode is deprecated') ||
      message.includes('ReactQuill') ||
      message.includes('react-quill')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename="/ChemMaster">
      <App />
    </Router>
  </StrictMode>,
)