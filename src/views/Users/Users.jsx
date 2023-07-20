import { Button, Select, SelectItem } from '@tremor/react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { SelectInput, ModalUser } from 'src/components'

function Users() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModal, setIsModal] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/all`, { headers })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setUtilisateurs(data)
        } else {
          setUtilisateurs([])
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleDeleteUser = (id) => {
    const token = localStorage.getItem('token')
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/user/delete/${id}`

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        // After successful deletion, update the state to remove the deleted user
        const nouveauxUtilisateurs = utilisateurs.filter(
          (utilisateur) => utilisateur.id !== id,
        )
        setUtilisateurs(nouveauxUtilisateurs)
      })
  }
  const showModal = () => {
    setIsModal(false)
  }
  const handleAddUser = (utilisateur) => {
    const token = localStorage.getItem('token')
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/user`
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: utilisateur.first_name,
        last_name: utilisateur.last_name,
        email: utilisateur.email,
        password: utilisateur.password,
        admin: utilisateur.admin === 'on',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsModal(false)
        window.location.reload()
      })
  }
  const handleRoleChange = (selectedRole, uuid) => {
    const token = localStorage.getItem('token')
    let isAdmin = false
    let role = ['ROLE_USER']

    if (selectedRole === 'Admin') {
      isAdmin = true
      role = ['ROLE_ADMIN']
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/update/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify({
        roles: role,
        admin: isAdmin,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <div className="head-container">
        <h1>Gestion Utilisateurs</h1>
        <Button variant="primary" className="add-user" iconPosition="right" icon={PlusCircleIcon} onClick={() => setIsModal(true)}>
          Ajouter des utilisateurs
        </Button>
      </div>

      {isModal && (
      // <div className="modal">
      //   <div className="modal-content container-box">
      //     <div className="modal-content__header">
      //       <h2>Ajouter un nouvel utilisateur</h2>
      //       <span
      //         onKeyDown={(e) => {
      //           if (e.keyCode === 13) setAfficherModal(false)
      //         }}
      //         role="button"
      //         tabIndex={0}
      //         className="close"
      //         onClick={() => setAfficherModal(false)}
      //       >
      //         &times;
      //       </span>
      //     </div>
      //     <label htmlFor="firstNameInput">
      //       Prénom:
      //       <input
      //         type="text"
      //         name="first_name"
      //         placeholder="Anthony"
      //         value={nouvelUtilisateur.first_name}
      //         onChange={handleChange}
      //       />
      //     </label>

      //     <label htmlFor="lastNameInput">
      //       Nom:
      //       <input
      //         type="text"
      //         placeholder="Ringressi"
      //         name="last_name"
      //         value={nouvelUtilisateur.last_name}
      //         onChange={handleChange}
      //       />
      //     </label>

      //     <label htmlFor="emailInput">
      //       Adresse e-mail:
      //       <input
      //         type="email"
      //         name="email"
      //         placeholder="exemple@gmail.com"
      //         value={nouvelUtilisateur.email}
      //         onChange={handleChange}
      //       />
      //     </label>

      //     <label htmlFor="passwordInput">
      //       Mot de passe:
      //       <input
      //         type="password"
      //         name="password"
      //         placeholder="••••••••••"
      //         value={nouvelUtilisateur.password}
      //         onChange={handleChange}
      //       />
      //     </label>

      //     <label htmlFor="adminInput" className="adminCheckbox">
      //       Cocher pour rendre admin:
      //       <input
      //         type="checkbox"
      //         name="admin"
      //         checked={nouvelUtilisateur.admin}
      //         onChange={handleChange}
      //       />
      //     </label>

        //     <Button variant="primary" onClick={handleAddUser}>
        //       Ajouter un utilisateur
        //     </Button>
        //   </div>
        // </div>
        <ModalUser title="Ajouter un nouvel utilisateur" showModal={showModal} buttonText="Ajouter un utilisateur" action="add-user" handleAddUser={handleAddUser} />
      )}
      <div className="table-container">
        <table className="table-user">
          <thead>
            <tr>
              <th className="table-user__header-cell">Rôle</th>
              <th className="table-user__header-cell">Prénom</th>
              <th className="table-user__header-cell">Nom</th>
              <th className="table-user__header-cell">Adresse e-mail</th>
              <th className="table-user__header-cell" />
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map((utilisateur) => (
              <tr key={utilisateur.id} className="table-user__row">
                <td className="table-user__cell">
                  <SelectInput
                    onChange={handleRoleChange}
                    uuid={utilisateur.id}
                    placeholder={utilisateur.roles[0] === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                    data={['Admin', 'User']}
                  />
                </td>
                <td className="table-user__cell">{utilisateur.firstName}</td>
                <td className="table-user__cell">{utilisateur.lastName}</td>
                <td className="table-user__cell">{utilisateur.email}</td>
                <td className="table-user__cell">
                  <Button variant="secondary" color="red" onClick={() => handleDeleteUser(utilisateur.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
