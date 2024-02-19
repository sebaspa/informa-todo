import { useEffect, useState } from 'react'
import type { User } from '../types/user'
import { useNavigate } from 'react-router-dom'

interface AuthState {
  user?: User | null
  isLoggedIn: boolean
}

interface AuthFunctions {
  loginSession: (user: User) => void
  logoutSession: () => void
}

interface AuthContextType extends AuthState, AuthFunctions {}

const useAuth = (): AuthContextType => {
  const navigate = useNavigate()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoggedIn: false
  })

  useEffect(() => {
    const userData = sessionStorage.getItem('userData')
    if (userData !== null) {
      setAuthState({
        user: JSON.parse(userData),
        isLoggedIn: true
      })
      navigate('/')
    } else {
      setAuthState({
        user: null,
        isLoggedIn: false
      })
      navigate('/login')
    }
  }, [])

  const loginSession = (user: User): void => {
    sessionStorage.setItem('userData', JSON.stringify(user))
    setAuthState({
      user,
      isLoggedIn: true
    })
  }

  const logoutSession = (): void => {
    sessionStorage.removeItem('userData')
    setAuthState({
      user: null,
      isLoggedIn: false
    })
    navigate('/login')
  }

  return { ...authState, loginSession, logoutSession }
}

export default useAuth
