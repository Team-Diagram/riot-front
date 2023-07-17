import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.scss'
import {
  Equipments, Home, Schedules, Statistics, Login, Users,
} from 'src/views'
import { SideBar } from 'src/components'

function Layout() {
  return (
    <div className="app container-page">
      <SideBar />
      <section className="container-page-content">
        <Outlet />
      </section>
    </div>
  )
}

function App() {
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
