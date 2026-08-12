import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Slick + Fancybox styles (same libraries the original site used)
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

// Ported original stylesheet (verbatim layout, brochure font swap)
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
