import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Select from 'react-select'

function CourseForm() {
  const { logout, user, userType } = useAuth()

  const handleClick = () => {
    console.log('Se apreto el botón')
  }

  useEffect(() => {
    // Cuando cargo el componente tengo que consultar en la base de datos por las carreras y ponerlas como ejemplos para elegir
  }, [])

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <main className='w-full'>
        <form>
          <Select />
        </form>
        <div className='mt-4 flex justify-center gap-2'>
          <Link to='/homepage' className='rounded-lg bg-slate-400 px-2 py-1'>
            Cancelar
          </Link>
          <button
            className='rounded-lg bg-slate-400 px-2 py-1'
            onClick={handleClick}
          >
            Agregar
          </button>
        </div>
      </main>
    </>
  )
}

export default CourseForm
