import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function FooterCourse() {
  const navigate = useNavigate()

  function handleClickCourseHome() {
    navigate('/course')
  }

  return (
    <>
      <footer className='fixed bottom-0 mx-2 w-full'>
        <div className='flex gap-4'>
          <Link className='px-1 py-2' to='/'>
            Inicio
          </Link>
          <div className='px-1 py-2' onClick={handleClickCourseHome}>
            <p>Curso</p>
          </div>
          <Link className='px-1 py-2' to='/course/enrollments'>
            Inscripciones
          </Link>
        </div>
      </footer>
    </>
  )
}

export default FooterCourse
