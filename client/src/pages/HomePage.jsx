import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import { Courses } from '../components/Course'
import { useCourse } from '../context/CourseContext.jsx'
import { Home } from '../components/Home.jsx'

function HomePage() {
  const { logout, user, userType, socketRef } = useAuth()
  const { courses, setCourses, courseSelectedId, setCourseSelectedId } =
    useCourse()

  useEffect(() => {
    if (!courseSelectedId) return

    setCourseSelectedId(null)
  }, [])

  useEffect(() => {
    if (userType === 'professor') return

    if (socketRef.current) {
      if (!courses) return

      const coursesId = courses.map((course) => course.id)

      // Sets the rooms. One for each course the student is assigned to.
      socketRef.current.emit('setRooms', {
        userId: user.id,
        coursesId: JSON.stringify(coursesId)
      })
    }
  }, [courses])

  useEffect(() => {
    if (!socketRef) return

    socketRef.current.on('requestUserId', () => {
      socketRef.current.emit('registerUser', user.id)
    })
  }, [user])

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <main className='flex flex-col items-center px-4'>
        <h1 className='my-2 text-center text-xl'>Cursos</h1>
        <article className='grid w-full max-w-3xl grid-cols-1 gap-1 sm:grid-cols-2'>
          <Courses
            listOfCourses={courses}
            setCourseSelectedId={setCourseSelectedId}
          />
        </article>
        <Home userType={userType} setCourses={setCourses} courses={courses} />
      </main>
    </>
  )
}

export default HomePage
