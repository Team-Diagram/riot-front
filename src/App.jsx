// App.js
import {
  Routes, Route, BrowserRouter as Router, useNavigate,
} from 'react-router-dom'
import { useContext, useEffect } from 'react'

import {
  Equipments, Home, Schedules, Statistics, Login, Users,
} from 'src/views'
import { SideBar } from 'src/components'
import { AuthContext } from './AuthContext/AuthContext'
import './index.scss'

function Layout() {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if the user is not authenticated
      navigate('/login')
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return null // Return null, as the layout won't be rendered until the user is authenticated.
  }

  return (
    <div className="app container-page">
      <SideBar />
      <section className="container-page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipements" element={<Equipments />} />
          <Route path="/plannings" element={<Schedules />} />
          <Route path="/statistiques" element={<Statistics />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </section>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  )
}

export default App
