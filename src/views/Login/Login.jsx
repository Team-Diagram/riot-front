import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@tremor/react'
import { AuthContext } from 'src/AuthContext/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
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
    <div className="container-page">
      <div className="login-container">
        <h1 className="text-left login-title">RioT</h1>
        <form className="container-box login-content">
          <h2>Se connecter</h2>
          <label htmlFor="username">
            Adresse mail
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="exemple@gmail.com"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Mot de passe
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Button variant="primary" onClick={(event) => handleSubmit(event)}>
            Se connecter
          </Button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>

  )
}

export default Login
