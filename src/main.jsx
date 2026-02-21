import { StrictMode } from 'react' // StrictMode enlevé pour éviter d'incrémenter 2 fois
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
    <App />
)
