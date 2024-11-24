import { createContext, useContext, useEffect, useState } from 'react'
import { getCourses } from '../api/courses'
import { useAuth } from './AuthContext'
import { registerCallback, unregisterCallback } from '../utils/socketService'
import useUpdateCourses from '../hooks/updateCourses'

export const CourseContext = createContext()

export const useCourse = () => {
  const context = useContext(CourseContext)

  if (!context)
    throw new Error('useCourse must be used within an CourseProvider')

  return context
}

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([])
  const [courseSelected, setCourseSelected] = useState(null)

  const { socketRef } = useAuth()

  const updateCoursesCallback = useUpdateCourses(setCourses)

  useEffect(() => {
    async function axiosSetCourses() {
      try {
        const res = await getCourses()

        if (res.status === 200) {
          const data = res.data
          setCourses(data.courses)
        }
      } catch (err) {
        console.log('Ha ocurrido un error en la carga de los cursos: ', err)
      }
    }

    axiosSetCourses()

    if (!socketRef) return

    registerCallback('updateCourses', updateCoursesCallback)

    return () => {
      unregisterCallback('updateCourses')
    }
  }, [updateCoursesCallback])

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        courseSelected,
        setCourseSelected
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
