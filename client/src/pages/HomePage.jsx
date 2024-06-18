import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function HomePage() {
  const { logout, user, userType } = useAuth()

  return (
    <>
      <header className='bg-slate-800'>
        <ul className='mx-auto flex max-w-3xl justify-between p-4'>
          <li>{`${user.name} (${userType === 'professor' ? 'Profesor' : 'Estudiante'})`}</li>
          <li>
            <Link
              to='/login'
              onClick={() => {
                logout()
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </header>
      <main className='flex flex-col items-center px-4'>
        <h1 className='my-2 text-center text-xl'>Cursos</h1>
        <article className='grid w-full max-w-3xl grid-cols-1 gap-1 sm:grid-cols-2'>
          <div className='flex flex-col gap-2 rounded-lg bg-slate-800 px-2 py-1'>
            <div className='flex justify-between'>
              <p>Nombre del curso</p>
              <p>0701</p>
            </div>
            <div className='flex justify-between'>
              <p>Alumnos: 16</p>
              <p>Lun/Miér/Vier</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 rounded-lg bg-slate-800 px-2 py-1'>
            <div className='flex justify-between'>
              <p>Nombre del curso</p>
              <p>0701</p>
            </div>
            <div className='flex justify-between'>
              <p>Alumnos: 16</p>
              <p>Lun/Miér/Vier</p>
            </div>
          </div>
          <div className='flex flex-col gap-2 rounded-lg bg-slate-800 px-2 py-1'>
            <div className='flex justify-between'>
              <p>Nombre del curso</p>
              <p>0701</p>
            </div>
            <div className='flex justify-between'>
              <p>Alumnos: 16</p>
              <p>Lun/Miér/Vier</p>
            </div>
          </div>
        </article>
        {userType === 'professor' ? (
          <div className='my-4 flex w-full items-center justify-center'>
            <div className='cursor-pointer rounded-lg bg-slate-400 px-2 py-1 text-center'>
              <p>Agregar Curso</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </>
  )
}

export default HomePage
