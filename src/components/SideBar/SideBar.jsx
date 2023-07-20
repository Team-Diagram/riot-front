/* eslint-disable import/no-cycle */
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
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
import { AuthContext } from '../../AuthContext/AuthContext'
import { getUserData } from '../../utils'
import { ModalUser } from '../index'
import { updateUser } from '../../controllers'

function SideBar() {
  const [selectedItem, setSelectedItem] = useState('accueil')
  const [isModal, setIsModal] = useState(false)
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const userData = getUserData()
  const token = localStorage.getItem('token')

  const showModal = () => {
    setIsModal(false)
  }

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
      role: 'ROLE_ADMIN',
    },
  ]

  const handleLogout = async () => {
    try {
      logout()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handlEditUser = (utilisateur) => {
    const requestBody = {}

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(utilisateur)) {
      if (key !== 'admin' && value !== '') {
        requestBody[key] = value
      }
    }

    updateUser(requestBody, token)
  }

  return (
    <div className="sidebar">
      {isModal && (
        <ModalUser
          title="Profil"
          showModal={showModal}
          buttonText="Sauvegarder les modifications"
          action="edit-user"
          handleEditUser={handlEditUser}
        />
      )}
      <div className="container-box h-full flex flex-col justify-between">
        <div className="sidebar-top">
          <div className="sidebar-top__logo">
            <h1>Riot</h1>
          </div>

          <div className="sidebar-top__pages">
            <ul>
              {menuItems.map((item) => (
                item.role && item.role !== userData.roles[0]
                  ? null
                  : (
                    <li key={item.id}>
                      <Link
                        className={selectedItem === item.id ? 'selected' : ''}
                        to={item.link}
                        onClick={() => setSelectedItem(item.id)}
                      >
                        <Icon
                          color="default"
                          icon={selectedItem === item.id ? item.iconSolid : item.iconOutline}
                        />
                        <p className="size-16">{item.text}</p>
                      </Link>
                    </li>
                  )
              ))}
            </ul>
          </div>
        </div>

        <div className="sidebar__bottom">
          <Divider />
          <div className="user-container">
            <button type="button" onClick={() => setIsModal(true)}>
              <div className="user-container__top">
                <Icon icon={UserIconOutline} color="black" />
                <p className="size-18">{userData.lastName}</p>
              </div>
              <div className="user-container__bottom">
                <p className="size-14">{userData.username}</p>
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
