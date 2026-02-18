import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App.tsx'

// Suppress ReactQuill warnings - more comprehensive approach
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
      return; // Hide these warnings
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
      return; // Hide these errors too
    }
    originalError.apply(console, args);
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)

// Este archivo es el punto de entrada de la aplicación React.
// Aquí se importa el componente principal de la aplicación y se renderiza en el DOM.
// También se aplica un estilo global desde 'main.css' donde se importa tailwind.