import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card, Icon, Divider } from '@tremor/react'
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

function SideBar() {
  const [selectedItem, setSelectedItem] = useState(null)

  const handleItemClick = (item) => {
    setSelectedItem(item)
    sessionStorage.setItem('navbar', item)
  }

  const handleUserModal = () => {
    alert('open modal')
  }

  const handleLogout = () => {
    alert('logout')
    localStorage.remove('token')
  }

  useEffect(() => {
    const sessionStorageItem = sessionStorage.getItem('navbar')
    setSelectedItem(sessionStorageItem || 'accueil')
  }, [])

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
    },
  ]

  return (
    <div className="sidebar">
      <Card className="h-full flex flex-col justify-between">
        <div className="sidebar-top">
          <div className="sidebar-top__logo">
            <span>RIOT</span>
          </div>

          <div className="sidebar-top__pages">
            <ul>
              {menuItems.map((item) => (
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
                <p className="size-18">user.name</p>
              </div>
              <div className="user-container__bottom">
                <p className="size-14">user.mail</p>
              </div>
            </button>

            <button type="button" className="user-container__logout" onClick={handleLogout}>
              <Icon
                icon={LogoutIcon}
                color="default"
              />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SideBar
