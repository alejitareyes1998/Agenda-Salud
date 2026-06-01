import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 1. Tema de aplicacion
import "primereact/resources/themes/lara-light-blue/theme.css";

// 2. Estilos base de los componentes
import "primereact/resources/primereact.min.css";

// 3.Iconos (para botones y menu)
import "primeicons/primeicons.css";

// 4. PrimeFlex para diseño rapido
import "primeflex/primeflex.css";
//---------------------------------------------------------------------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)