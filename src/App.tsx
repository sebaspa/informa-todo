import { Routes, Route } from 'react-router-dom'
import { Login } from './pages'

function App (): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} index />
      </Routes>
    </>
  )
}

export default App
