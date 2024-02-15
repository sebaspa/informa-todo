import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAuth } from './context'

import { Home, Login } from './pages'

function App (): JSX.Element {
  const { isLoggedIn } = useAuth()
  const naviate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      naviate('/login')
    }
  }, [isLoggedIn])

  return (
    <>
        <Routes>
      {
        isLoggedIn
          ? (
          <Route path="/" element={<Home />} index />
            )
          : (
            <Route path="/login" element={<Login />} />
            )
          }
          </Routes>
    </>
  )
}

export default App
