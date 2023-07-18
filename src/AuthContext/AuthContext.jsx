import { createContext, useState, useMemo } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8787/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const { token: authToken } = await response.json()
      if (authToken) {
        setToken(authToken)
        localStorage.setItem('token', authToken)
        setIsAuthenticated(true)
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setToken(null)
    localStorage.removeItem('token')
  }

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      token,
    }),
    [isAuthenticated, login, logout, token],
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}
