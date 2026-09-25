import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    try {
      const response = await api.me()
      setUser(response.user)
    } catch (error) {
      if (error.status !== 401) {
        console.error('Erro ao verificar sessão:', error)
      }

      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  async function login(email, senha) {
    const response = await api.login(email, senha)

    setUser(response.user)

    return response.user
  }

  async function logout() {
    try {
      await api.logout()
    } finally {
      setUser(null)
    }
  }

  function hasPermission(permission) {
    return user?.permissoes?.includes(permission) ?? false
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      authenticated: Boolean(user),
      login,
      logout,
      loadUser,
      hasPermission,
    }),
    [user, loading, loadUser],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro de AuthProvider.',
    )
  }

  return context
}