import React from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function HomePage() {
  const { logout, user, userType } = useAuth()

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <main className='flex flex-col items-center px-4'>
        <h1 className='my-2 text-center text-xl'>Cursos</h1>
        <article className='grid w-full max-w-3xl grid-cols-1 gap-1 sm:grid-cols-2'>
          {/* <div className='flex flex-col gap-2 rounded-lg bg-slate-800 px-2 py-1'>
            <div className='flex justify-between'>
              <p>Nombre del curso</p>
              <p>0701</p>
            </div>
            <div className='flex justify-between'>
              <p>Alumnos: 16</p>
              <p>Lun/Miér/Vier</p>
            </div>
          </div> */}
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
