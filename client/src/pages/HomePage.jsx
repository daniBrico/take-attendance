import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { Courses } from '../components/Course'
import { getCourses } from '../api/courses.js'

function HomePage() {
  const { logout, user, userType } = useAuth()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function axiosCourses() {
      try {
        const res = await getCourses(userType, user.id)

        if (!res.status === 200) {
          throw new Error('Error al cargar el curso')
        }

        const data = res.data

        setCourses(data.courses)
      } catch (err) {
        console.log(err)
      }
    }

    axiosCourses()
  }, [])

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
        ) : (
          ''
        )}
      </main>
    </>
  )
}

export default HomePage
