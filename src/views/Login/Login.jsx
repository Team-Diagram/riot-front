import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // If the user is already authenticated, redirect to the home page
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!email || !password) {
      setError('Veuillez remplir tout les champs.')
      return
    }
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="box-shadow-1 box-model">
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="fields-column">
              <div className="fields-row">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="adresse mail"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="fields-row">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="mot de passe"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="bloc-btn">
              {error && <p className="error">{error}</p>}
              <button type="submit">je me connecte</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login
