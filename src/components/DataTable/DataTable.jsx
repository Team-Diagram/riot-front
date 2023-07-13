import { useState } from 'react'
import users from '../../Data'

function DataTable() {
  const [utilisateurs, setUtilisateurs] = useState(users)
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
    prenom: '',
    nom: '',
    email: '',
    motDePasse: '',
  })
  const [afficherModal, setAfficherModal] = useState(false)

  const supprimerUtilisateur = (email) => {
    const nouveauxUtilisateurs = utilisateurs.filter(
      (utilisateur) => utilisateur.email !== email,
    )
    setUtilisateurs(nouveauxUtilisateurs)
  }

  const ajouterUtilisateur = () => {
    setUtilisateurs([...utilisateurs, nouvelUtilisateur])
    setNouvelUtilisateur({
      prenom: '',
      nom: '',
      email: '',
      motDePasse: '',
    })
    setAfficherModal(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target 
    setNouvelUtilisateur((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setAfficherModal(false)
    }
  }
  return (
    <div>
      <h1>Gestion Utilisateurs</h1>
      <button type="submit" onClick={() => setAfficherModal(true)}>Ajouter</button>

      {afficherModal && (
      <div className="modal">
        <div className="modal-content">
          <span
            onKeyDown={handleKeyPress}
            role="button"
            tabIndex={0}
            className="close"
            onClick={() => setAfficherModal(false)}
          >
            &times;
          </span>
          <h2>Ajouter un nouvel utilisateur</h2>
          <div>
            <label htmlFor="prenomInput">
              Prénom:
              <input
                type="text"
                name="prenom"
                value={nouvelUtilisateur.prenom}
                onChange={handleChange}
              />
            </label>
            <br />
            <label htmlFor="nomInput">
              Nom:
              <input
                type="text"
                name="nom"
                value={nouvelUtilisateur.nom}
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
            <label htmlFor="motDePasseInput">
              Mot de passe:
              <input
                type="password"
                name="motDePasse"
                value={nouvelUtilisateur.motDePasse}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit" onClick={ajouterUtilisateur}>Ajouter un utilisateur</button>
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
              <td>{utilisateur.role}</td>
              <td>{utilisateur.prenom}</td>
              <td>{utilisateur.nom}</td>
              <td>{utilisateur.email}</td>
              <td>
                <button
                  type="submit"
                  onClick={() => supprimerUtilisateur(utilisateur.email)}
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

export default DataTable
