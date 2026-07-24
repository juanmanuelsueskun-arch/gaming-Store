import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [rol, setRol] = useState(localStorage.getItem('rol') || '')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    const storedRol = localStorage.getItem('rol')

    if (storedUser && storedToken && storedRol) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
      setRol(storedRol)
    }

    setLoading(false)
  }, [])

  const login = ({ token, rol, usuario }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('rol', rol)
    localStorage.setItem('user', JSON.stringify(usuario))

    setToken(token)
    setRol(rol)
    setUser(usuario)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    localStorage.removeItem('user')

    setToken('')
    setRol('')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, rol, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}