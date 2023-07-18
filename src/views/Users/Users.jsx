import React, { useEffect, useState } from 'react'

function Users() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [loading, setLoading] = useState(true)
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    admin: false,
  })
  const [afficherModal, setAfficherModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token')
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
    }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    fetch('http://localhost:8787/api/user/all', { headers })
      .then((response) => response.json())
      .then((data) => {
        // Check if the data is an array and not empty
        if (Array.isArray(data) && data.length > 0) {
          setUtilisateurs(data)
        } else {
          setUtilisateurs([])
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  const handleDeleteUser = (id) => {
    const token = localStorage.getItem('token')
    const apiUrl = `http://localhost:8787/api/user/delete/${id}`

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // After successful deletion, update the state to remove the deleted user
        const nouveauxUtilisateurs = utilisateurs.filter(
          (utilisateur) => utilisateur.id !== id,
        )
        setUtilisateurs(nouveauxUtilisateurs)
      })
      .catch((error) => {
        console.error('Error deleting user:', error)
      })
  }

  const handleAddUser = () => {
    const token = localStorage.getItem('token')
    const apiUrl = 'http://localhost:8787/api/user'

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(nouvelUtilisateur),
    })
      .then((response) => response.json())
      .then((data) => {
        // After successful addition, update the state to include the new user
        const newUser = {
          ...data,
          roles: [nouvelUtilisateur.admin ? 'admin' : 'user'],
          firstName: nouvelUtilisateur.first_name,
          lastName: nouvelUtilisateur.last_name,
        }
        setUtilisateurs([...utilisateurs, newUser])
        setNouvelUtilisateur({
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          admin: false,
        })
        setAfficherModal(false)
        // Reload the page to fetch the updated user list
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error adding user:', error)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNouvelUtilisateur((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div>
      <h1>Gestion Utilisateurs</h1>
      <button type="button" onClick={() => setAfficherModal(true)}>
        Ajouter
      </button>

      {afficherModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              onKeyDown={(e) => {
                if (e.keyCode === 13) setAfficherModal(false)
              }}
              role="button"
              tabIndex={0}
              className="close"
              onClick={() => setAfficherModal(false)}
            >
              &times;
            </span>
            <h2>Ajouter un nouvel utilisateur</h2>
            <div>
              <label htmlFor="firstNameInput">
                Prénom:
                <input
                  type="text"
                  name="first_name"
                  value={nouvelUtilisateur.first_name}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label htmlFor="lastNameInput">
                Nom:
                <input
                  type="text"
                  name="last_name"
                  value={nouvelUtilisateur.last_name}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label htmlFor="emailInput">
                Adresse e-mail:
                <input
                  type="email"
                  name="email"
                  value={nouvelUtilisateur.email}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label htmlFor="passwordInput">
                Mot de passe:
                <input
                  type="password"
                  name="password"
                  value={nouvelUtilisateur.password}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label htmlFor="adminInput">
                Admin:
                <input
                  type="checkbox"
                  name="admin"
                  checked={nouvelUtilisateur.admin}
                  onChange={handleChange}
                />
              </label>
              <br />
              <button type="button" onClick={handleAddUser}>
                Ajouter un utilisateur
              </button>
            </div>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Rôle</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Adresse e-mail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur) => (
            <tr key={utilisateur.email}>
              <td>{utilisateur.roles[0]}</td>
              <td>{utilisateur.firstName}</td>
              <td>{utilisateur.lastName}</td>
              <td>{utilisateur.email}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeleteUser(utilisateur.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
