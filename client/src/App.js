import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Landing, Register, Error, ProtectedRoute } from './pages'
import { Home, Setting, SharedLayout, Profile } from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/'>Dashboard«</Link>
        <Link to='/register'>Register</Link>
        <Link to='/landing'>Home</Link>
      </nav>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path='home' element={<Home />} />
          <Route path='setting' element={<Setting />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
