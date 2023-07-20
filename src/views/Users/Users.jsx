import { Button } from '@tremor/react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { SelectInput, ModalUser } from 'src/components'
import {
  fetchUsers,
  deleteUser,
  addUser,
  changeRole,
} from 'src/controllers/index'
import { getUserData } from 'src/utils'

function Users() {
  const [users, setUsers] = useState([])
  const [isModal, setIsModal] = useState(false)
  const userData = getUserData()
  const token = localStorage.getItem('token')

  const getUsers = async () => {
    fetchUsers(token)
      .then((jsonData) => {
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          setUsers(jsonData)
        } else {
          setUsers([])
        }
      })
  }

  const handleDeleteUser = async (id) => {
    await deleteUser(id, token)
    await getUsers()
  }

  const handleAddUser = async (user) => {
    await addUser(user, token)
    await getUsers()
    setIsModal(false)
  }

  const handleRoleChange = (selectedRole, uuid) => {
    changeRole(selectedRole, uuid, token)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const showModal = () => {
    setIsModal(false)
  }

  return (
    <div>
      <div className="head-container">
        <h1>Gestion Utilisateurs</h1>
        <Button
          variant="primary"
          className="add-user"
          iconPosition="right"
          icon={PlusCircleIcon}
          onClick={() => setIsModal(true)}
        >
          Ajouter des utilisateurs
        </Button>
      </div>

      <div className="table-container container-box">
        <table className="table-user">
          <thead>
            <tr>
              <th className="table-user__header-cell">Rôle</th>
              <th className="table-user__header-cell">Prénom</th>
              <th className="table-user__header-cell">Nom</th>
              <th className="table-user__header-cell">Adresse e-mail</th>
              <th className="table-user__header-cell"> </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              userData.username !== user.email && (
                <tr key={user.id} className="table-user__row">
                  <td className="table-user__cell">
                    <SelectInput
                      onChange={handleRoleChange}
                      uuid={user.id}
                      placeholder={user.roles[0] === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                      data={['Admin', 'User']}
                    />
                  </td>
                  <td className="table-user__cell">{user.firstName}</td>
                  <td className="table-user__cell">{user.lastName}</td>
                  <td className="table-user__cell">{user.email}</td>
                  <td className="table-user__cell">
                    <Button
                      variant="secondary"
                      color="red"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {isModal && (
        <ModalUser
          title="Ajouter un nouvel utilisateur"
          showModal={showModal}
          buttonText="Ajouter un utilisateur"
          action="add-user"
          handleAddUser={handleAddUser}
        />
      )}
    </div>
  )
}

export default Users
