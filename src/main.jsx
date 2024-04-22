import { Toaster } from 'sonner'
// styles
import './css/normalize.css'
import './css/variables.css'

// react
import React from 'react'
import ReactDOM from 'react-dom/client'

// principal component
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster richColors />
    <App />
  </React.StrictMode>,
)
