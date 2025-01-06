import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Components/App/App.jsx'
import ButtonMain from './ContextPRovider/ButtonMain.jsx'
import Apppps from './Apppps.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Apppps></Apppps>
  </StrictMode>,
)
