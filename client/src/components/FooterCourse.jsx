import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function FooterCourse() {
  const navigate = useNavigate()

  function handleClickHome() {
    navigate('/course-home')
  }

  return (
    <>
      <footer className='fixed bottom-0 mx-2 w-full'>
        <div className='flex gap-4'>
          <Link className='px-1 py-2' to='/home'>
            Inicio
          </Link>
          <div className='px-1 py-2' onClick={handleClickHome}>
            <p>Curso</p>
          </div>
          <Link className='px-1 py-2' to='/enrollment-requests'>
            Inscripciones
          </Link>
        </div>
      </footer>
    </>
  )
}

export default FooterCourse
