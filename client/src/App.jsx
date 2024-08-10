import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import CourseFormPage from './pages/CourseFormPage'
import CourseHomePage from './pages/CourseHomePage'
import { CourseProvider } from './context/CourseContext'

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path='/home'
            element={
              <CourseProvider>
                <HomePage />
              </CourseProvider>
            }
          />
          <Route
            path='/course-home'
            element={
              <CourseProvider>
                <CourseHomePage />
              </CourseProvider>
            }
          />
          <Route path='/create-course' element={<CourseFormPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  )
}
