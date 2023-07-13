// eslint-disable-next-line import/no-extraneous-dependencies
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.scss'
import {
  Equipements, Home, Plannings, Routines, Statistiques, Login,
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
          element: <Equipements />,
        },
        {
          path: '/routines',
          element: <Routines />,
        },
        {
          path: '/plannings',
          element: <Plannings />,
        },
        {
          path: '/statistiques',
          element: <Statistiques />,
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
