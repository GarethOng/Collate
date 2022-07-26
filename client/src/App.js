import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Register, Error, ProtectedRoute } from './pages'
import {
  Home,
  Setting,
  SharedLayout,
  Profile,
  EditContact,
} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path='setting' element={<Setting />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='/edit' element={<EditContact />}></Route>
        </Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
