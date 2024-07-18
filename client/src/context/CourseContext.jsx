import { createContext, useContext, useEffect, useState } from 'react'
import { getCourses } from '../api/courses'
import { useAuth } from './AuthContext'

export const CourseContext = createContext()

export const useCourse = () => {
  const context = useContext(CourseContext)

  if (!context)
    throw new Error('useCourse must be used within an CourseProvider')

  return context
}

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(null)
  const [takeAttendance, setTakeAttendance] = useState(false)
  const { userType, user, socketRef } = useAuth()

  useEffect(() => {
    async function axiosCourses() {
      try {
        const res = await getCourses(userType, user.id)

        if (!res.status === 200) throw new Error('Error al cargar el curso')

        const data = res.data

        setCourses(data.courses)
      } catch (err) {
        console.log(err)
      }
    }

    axiosCourses()
  }, [])

  useEffect(() => {
    socketRef.current.on('takeAttendance', (data) => {
      console.log(
        `El profesor ${data.professorName} a cargo del curso de ${data.courseName}, está tomando lista.`
      )
    })

    // Tengo que pensar como hacer que el alumno de el presente y le llegue al profesor

    // socketRef.current.emit('toBePresent', {
    //   studentName: user.name,

    // })
  }, [takeAttendance])

  return (
    <CourseContext.Provider
      value={{
        courses,
        setTakeAttendance
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
