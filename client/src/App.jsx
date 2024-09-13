import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import CourseFormPage from './pages/CourseFormPage'
import CourseHomePage from './pages/CourseHomePage'
import EnrollmentRequestsPage from './pages/EnrollmentRequestsPage'
import { CourseProvider } from './context/CourseContext'
import ProtectedHomeRoutes from './components/ProtectedHomeRoutes'
import AuthenticatedRoute from './components/AuthenticatedRoute'

const CourseRoutes = () => (
  <CourseProvider>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/course/create' element={<CourseFormPage />} />
      <Route element={<ProtectedHomeRoutes />}>
        <Route path='/course' element={<CourseHomePage />} />
        <Route
          path='/course/enrollments'
          element={<EnrollmentRequestsPage />}
        />
      </Route>
    </Routes>
  </CourseProvider>
)

export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthenticatedRoute />}>
          <Route path='/*' element={<CourseRoutes />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </AuthProvider>
  )
}
