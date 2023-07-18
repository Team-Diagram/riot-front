import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import { AuthProvider } from './AuthContext/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
