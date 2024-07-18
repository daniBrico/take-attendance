import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { Courses } from '../components/Course'
import { useCourse } from '../context/CourseContext.jsx'

function HomePage() {
  const { logout, user, userType, socketRef } = useAuth()
  const { courses } = useCourse()

  useEffect(() => {
    if (userType === 'professor') return

    if (socketRef.current) {
      if (!courses) return

      const coursesId = courses.map((course) => course.id)

      // Establece las rooms. Una por cada curso al cual este adherido
      socketRef.current.emit('setRooms', {
        userId: user.id,
        coursesId: JSON.stringify(coursesId)
      })
    }
  }, [courses])

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <main className='flex flex-col items-center px-4'>
        <h1 className='my-2 text-center text-xl'>Cursos</h1>
        <article className='grid w-full max-w-3xl grid-cols-1 gap-1 sm:grid-cols-2'>
          <Courses listOfCourses={courses} />
        </article>
        {userType === 'professor' ? (
          <Link
            to='/create-course'
            className='mt-4 rounded-lg bg-slate-400 px-2 py-1'
          >
            Agregar curso
          </Link>
        ) : null}
      </main>
    </>
  )
}

export default HomePage
