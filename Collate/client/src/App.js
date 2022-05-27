import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Dashboard, Landing, Register, Error } from './pages'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/'>Dashboard«</Link>
        <Link to='/register'>Register</Link>
        <Link to='/landing'>Home</Link>
      </nav>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
