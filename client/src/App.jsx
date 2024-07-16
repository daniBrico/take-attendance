import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import CourseForm from './pages/CourseForm'
import CourseHome from './pages/CourseHome'

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/create-course' element={<CourseForm />} />
          <Route path='/course-home' element={<CourseHome />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  )
}
