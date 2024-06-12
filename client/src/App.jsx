import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { TakeAttendance } from './components/TakeAttendance'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<TakeAttendance />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  )
}
