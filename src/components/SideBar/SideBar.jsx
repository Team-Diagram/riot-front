// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <div className="sidebar">
      <div className="top">
        <span>RIOT</span>
      </div>
      <hr />
      <div className="center">
        <ul>

          <li>
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link to="/equipements">
              <span>Équipements</span>
            </Link>
          </li>
          <li>
            <Link to="/routines">
              <span>Routines</span>
            </Link>
          </li>
          <li>
            <Link to="/plannings">
              <span>Plannings</span>
            </Link>
          </li>
          <li>
            <Link to="/statiques">
              <span>Statistiques</span>
            </Link>
          </li>
          <li>
            <span> Users si Admin</span>
          </li>
          <li>
            <span>Utilisateur</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
