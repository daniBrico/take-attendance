import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function HomePage() {
  const { logout, user, userType } = useAuth()

  return (
    <>
      <header className='bg-slate-800'>
        <ul className='flex justify-between p-4'>
          <li>{user.name}</li>
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
      <main className='flex flex-col px-4'>
        <h1 className='my-2 text-center text-xl'>Cursos</h1>
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
      </main>
    </>
  )
}

export default HomePage
