// AuthProvider.js
import {
  createContext, useState, useEffect, useMemo,
} from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if the user is authenticated on initial load
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

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
        setIsAuthenticated(true)
        localStorage.setItem('token', authToken) // Store the token in localStorage
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('token') // Remove the token from localStorage
  }

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated],
  )

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
