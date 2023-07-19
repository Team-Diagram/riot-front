import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Icon, Divider } from '@tremor/react'
import { LogoutIcon } from '@heroicons/react/outline'
import {
  HomeIconOutline,
  ViewGridAddIconOutline,
  CalendarIconOutline,
  ChartPieIconOutline,
  UsersIconOutline,
  HomeIconSolid,
  ViewGridAddIconSolid,
  CalendarIconSolid,
  ChartPieIconSolid,
  UsersIconSolid,
  UserIconOutline,
} from 'src/assets'

// eslint-disable-next-line import/no-extraneous-dependencies
import jwtDecode from 'jwt-decode'
import { AuthContext } from '../../AuthContext/AuthContext'

function SideBar() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [filteredMenuItems, setFilteredMenuItems] = useState([])
  const [username, setUsername] = useState('') // Define username state
  const [lastName, setLastName] = useState('') // Define lastName state
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const aaaa = [
    {
      id: 'accueil',
      iconSolid: HomeIconSolid,
      iconOutline: HomeIconOutline,
      text: 'Accueil',
      link: '/',
    },
    {
      id: 'equipements',
      iconSolid: ViewGridAddIconSolid,
      iconOutline: ViewGridAddIconOutline,
      text: 'Équipements',
      link: '/equipements',
    },
    {
      id: 'plannings',
      iconSolid: CalendarIconSolid,
      iconOutline: CalendarIconOutline,
      text: 'Plannings',
      link: '/plannings',
    },
    {
      id: 'statistiques',
      iconSolid: ChartPieIconSolid,
      iconOutline: ChartPieIconOutline,
      text: 'Statistiques',
      link: '/statistiques',
    },
    {
      id: 'users',
      iconSolid: UsersIconSolid,
      iconOutline: UsersIconOutline,
      text: 'Utilisateurs',
      link: '/users',
      role: 'ROLE_ADMIN', // Role required to access this menu item
    },
  ]

  const handleRoleFiltering = (decodedToken) => {
    // Define the menu items with IDs and roles required to access them
    const menuItems = [
      {
        id: 'accueil',
        iconSolid: HomeIconSolid,
        iconOutline: HomeIconOutline,
        text: 'Accueil',
        link: '/',
      },
      {
        id: 'equipements',
        iconSolid: ViewGridAddIconSolid,
        iconOutline: ViewGridAddIconOutline,
        text: 'Équipements',
        link: '/equipements',
      },
      {
        id: 'plannings',
        iconSolid: CalendarIconSolid,
        iconOutline: CalendarIconOutline,
        text: 'Plannings',
        link: '/plannings',
      },
      {
        id: 'statistiques',
        iconSolid: ChartPieIconSolid,
        iconOutline: ChartPieIconOutline,
        text: 'Statistiques',
        link: '/statistiques',
      },
      {
        id: 'users',
        iconSolid: UsersIconSolid,
        iconOutline: UsersIconOutline,
        text: 'Utilisateurs',
        link: '/users',
        role: 'ROLE_ADMIN', // Role required to access this menu item
      },
    ]

    // Filter out the "Utilisateurs" menu item if the user is not an admin
    setFilteredMenuItems(menuItems.filter((item) => {
      if (item.id === 'users') {
        // Check if the "users" menu item has the role "ROLE_ADMIN"
        return decodedToken.roles.includes(item.role)
      }
      return true // Keep other menu items
    }))
  }

  useEffect(() => {
    const sessionStorageItem = sessionStorage.getItem('navbar')
    setSelectedItem(sessionStorageItem || 'accueil')

    // Get the token from local storage
    const token = localStorage.getItem('token')

    if (token) {
      // Decode the token to access its payload (user information)
      const decodedToken = jwtDecode(token)

      // Assuming the username is stored in the 'username' field of the token's payload
      setUsername(decodedToken.username) // Update the username state

      setLastName(decodedToken.lastName)

      // Now you can use the username in your UI

      // Save the decodedToken to use it later for role filtering
      handleRoleFiltering(decodedToken)
    }
  }, [])

  const handleItemClick = (item) => {
    setSelectedItem(item)
    sessionStorage.setItem('navbar', item)
  }

  const handleUserModal = () => {
    alert('open modal')
  }

  const handleLogout = async () => {
    try {
      logout()

      navigate('/login')
    } catch (error) {
      // ... (previous error handling code)
    }
  }

  return (
    <div className="sidebar">
      <div className="container-box h-full flex flex-col justify-between">
        <div className="sidebar-top">
          <div className="sidebar-top__logo">
            <span>RIOT</span>
          </div>

          <div className="sidebar-top__pages">
            <ul>
              {aaaa.map((item) => (
                <li key={item.id}>
                  <Link
                    className={selectedItem === item.id ? 'selected' : ''}
                    to={item.link}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <Icon
                      color="default"
                      icon={selectedItem === item.id ? item.iconSolid : item.iconOutline}
                    />
                    <p className="size-18">{item.text}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sidebar__bottom">
          <Divider />
          <div className="user-container">
            <button type="button" onClick={handleUserModal}>
              <div className="user-container__top">
                <Icon icon={UserIconOutline} color="default" />
                <p className="size-18">{lastName}</p>
              </div>
              <div className="user-container__bottom">
                <p className="size-14">{username}</p>
              </div>
            </button>

            <button type="button" className="user-container__logout" onClick={handleLogout}>
              <Icon icon={LogoutIcon} color="default" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
