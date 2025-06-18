# quimica-app

Este proyecto fue creado utilizando [Vite](https://vitejs.dev/) con la plantilla de React en JavaScript.

## ¿Cómo se creó este repositorio?

1. Ejecuta el comando para crear un nuevo proyecto con Vite:

   ```sh
   npm create vite@latest
   ```

2. Responde a las preguntas del asistente:

   - **Project name:** `quimica-app`
   - **Select a framework:** `React`
   - **Select a variant:** `JavaScript`

3. Ingresa al directorio del proyecto:

   ```sh
   cd quimica-app
   ```

4. Instala las dependencias:

   ```sh
   npm install
   ```

5. Inicia el servidor de desarrollo:

   ```sh
   npm run dev
   ```

## Estructura del proyecto

- `src/`: Código fuente de la aplicación React.
- `public/`: Archivos estáticos.
- `index.html`: Archivo HTML principal.
- `package.json`: Dependencias y scripts del proyecto.

---

Este README documenta el proceso de creación inicial del repositorio.

ahora para instalar tailwind

npm install tailwindcss @tailwindcss/vite

agregamos tailwind modificando el vite conf

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})


