import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './quimicaApp.tsx'

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