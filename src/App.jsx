import './index.scss'
import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from 'react-router-dom'
import {
  Equipments,
  Home,
  Schedules,
  Statistics,
  Login,
  Users,
  Room,
} from 'src/views'
import { SideBar } from 'src/components'
import { useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext/AuthContext'

function Layout() {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="app container-page">
      <SideBar />
      <section className="container-page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipements" element={<Equipments />} />
          <Route path="/equipements/salle/:id" element={<Room />} />
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
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
