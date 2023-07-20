// App.js
import {
  Routes, Route, BrowserRouter as Router, useNavigate, createBrowserRouter, RouterProvider,
} from 'react-router-dom'
import { useContext, useEffect } from 'react'

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
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
  )
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/equipements',
          element: <Equipments />,
        },
        {
          path: '/equipements/salle/:id',
          element: <Room />,
        },
        {
          path: '/plannings',
          element: <Schedules />,
        },
        {
          path: '/statistiques',
          element: <Statistics />,
        },
        {
          path: '/users',
          element: <Users />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
  ])
  return <RouterProvider router={router} />
}

export default App
