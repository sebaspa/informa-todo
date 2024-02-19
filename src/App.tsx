import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAuth } from './hooks'

import { Home, Login } from './pages'
import { useEffect } from 'react'

function App (): JSX.Element {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
