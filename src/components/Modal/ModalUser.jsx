import { useState } from 'react'
import { Button } from '@tremor/react'

function ModalUser({ title, buttonText, action, showModal, handleAddUser, handleEditUser }) {
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    admin: false,
  })

  let isShow = true

  if (action === 'edit-user') {
    isShow = false
  }

  const handleSubmit = () => {
    if (handleAddUser) {
      handleAddUser(nouvelUtilisateur)
    } else {
      handleEditUser(nouvelUtilisateur)
    }
  }

  const closeModal = () => {
    showModal()
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setNouvelUtilisateur((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="modal">
      <div className="modal-content container-box">
        <div className="modal-content__header">
          <h2>{title}</h2>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <span
            role="button"
            tabIndex={0}
            className="close"
            onClick={() => closeModal()}
          >
            &times;
          </span>
        </div>
        <label htmlFor="firstNameInput">
          Prénom:
          <input
            type="text"
            name="first_name"
            placeholder="Marc"
            value={nouvelUtilisateur.first_name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="lastNameInput">
          Nom:
          <input
            type="text"
            placeholder="Pybourdin"
            name="last_name"
            value={nouvelUtilisateur.last_name}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="emailInput">
          Adresse e-mail:
          <input
            type="email"
            name="email"
            placeholder="marclebg@gmail.com"
            value={nouvelUtilisateur.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="passwordInput">
          Mot de passe:
          <input
            type="password"
            name="password"
            placeholder="••••••••••"
            value={nouvelUtilisateur.password}
            onChange={handleChange}
          />
        </label>

        {isShow
          && (
          <label htmlFor="adminInput" className="adminCheckbox">
            Cocher pour rendre admin:
            <input
              type="checkbox"
              name="admin"
              checked={nouvelUtilisateur.admin}
              onChange={handleChange}
            />
          </label>
          )}

        <Button variant="primary" onClick={handleSubmit}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default ModalUser
