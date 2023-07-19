import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Card, Icon, Divider } from '@tremor/react'
import { LogoutIcon } from '@heroicons/react/outline'
import { ModalUser } from 'src/components'
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
  const [firstName, setFirstName] = useState('') 
  const [lastName, setLastName] = useState('')
  const [email,setEmail]=useState('')

  const { logout } = useContext(AuthContext)
  const [isModal, setIsModal] = useState (false)
  const navigate = useNavigate()

  useEffect(() => {
    const sessionStorageItem = sessionStorage.getItem('navbar')
    setSelectedItem(sessionStorageItem || 'accueil')
    
    const token = localStorage.getItem('token')

    if (token) {

      const decodedToken = jwtDecode(token)

      setFirstName(decodedToken.firstName)
      setLastName(decodedToken.lastName)
      setEmail(decodedToken.username)
      handleRoleFiltering(decodedToken)
    }
  }, [])

  const showModal = () =>{
    setIsModal(false)
  }

  const handleRoleFiltering = (decodedToken) => {
    
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

    
    const filteredMenuItems = menuItems.filter((item) => {
      if (item.id === 'users') {
    
        return decodedToken.roles.includes(item.role)
      }
      return true
    })

    setFilteredMenuItems(filteredMenuItems)
  }

  const [filteredMenuItems, setFilteredMenuItems] = useState([])

  const handleItemClick = (item) => {
    setSelectedItem(item)
    sessionStorage.setItem('navbar', item)
  }

  const handleUserModal = () => {
    setIsModal(true);
  }

  const handleLogout = async () => {
    try {
      logout()
      navigate('/login')
    } catch (error) {
    }
  }
  const handlEditUser = (utilisateur)=>{
    const token = localStorage.getItem('token');
    const uuid = jwtDecode(token)['uuid'];
    const requestBody = {};

    for (const [key, value] of Object.entries(utilisateur)) {
      if (key !== 'admin' && value !== '') {
        requestBody[key] = value;
      }
    }
    fetch(`http://localhost:8787/api/user/update/${uuid}`,{
      method:'PUT',
      body:JSON.stringify(requestBody),
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }).then((response) => response.json())
    .then((data) => {
      if(data.token){
          localStorage.setItem('token', data.token);
      }
    }).then(()=>{
            window.location.reload()
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (

    
    <div className="sidebar">
      {isModal && (
        <ModalUser title="Profil" showModal={showModal} buttonText="Sauvegarder les modifications" action="edit-user" handleEditUser={handlEditUser}/>
      )}
      <Card className="h-full flex flex-col justify-between">
        <div className="sidebar-top">
          <div className="sidebar-top__logo">
            <span>RIOT</span>
          </div>

          <div className="sidebar-top__pages">
            <ul>
              {filteredMenuItems.map((item) => (
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
                <p className="size-16">{lastName} {firstName}</p>
              </div>
              <div className="user-container__bottom">
                <p className="size-14">{email}</p>
              </div>
            </button>

            <button type="button" className="user-container__logout" onClick={handleLogout}>
              <Icon icon={LogoutIcon} color="default" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SideBar
