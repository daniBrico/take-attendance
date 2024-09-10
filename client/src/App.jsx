import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import CourseFormPage from './pages/CourseFormPage'
import CourseHomePage from './pages/CourseHomePage'
import EnrollmentRequestsPage from './pages/EnrollmentRequestsPage'
import { CourseProvider } from './context/CourseContext'

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthenticatedRoute />}>
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
          <Route
            path='/enrollments'
            element={
              <CourseProvider>
                <EnrollmentRequestsPage />
              </CourseProvider>
            }
          />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  )
}
