import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'

function ProtectedHomeRoutes() {
  const { courseSelected } = useCourse()

  if (!courseSelected) return <Navigate to='/' />

  return <Outlet />
}

export default ProtectedHomeRoutes
