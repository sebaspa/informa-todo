import React, { createContext, useState } from 'react'

interface User {
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProvider component that provides authentication functionality to its children.
 *
 * @param {AuthProviderProps} children - The child components to be wrapped by the AuthProvider
 * @return {ReactElement} The wrapped child components with authentication context
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)

  /**
   * A description of the entire function.
   *
   * @return {void}
   */
  const login = (loggedInUser: User): void => {
    setUser(loggedInUser)
    setisLoggedIn(true)
  }

  /**
   * This function logs the user out by setting isLoggedIn to false.
   *
   * @return {void}
   */
  const logout = (): void => {
    setUser(null)
    setisLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Returns the authentication context.
 *
 * @return {AuthContextType} The authentication context.
 */
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext)
  if (context == null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
