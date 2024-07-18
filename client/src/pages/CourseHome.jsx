import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

function CourseHome() {
  const { user, logout, userType } = useAuth()

  function takeAttendance() {
    console.log('Tomar lista')
  }

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <h1 className='m-2 text-center text-xl'>Información sobre el curso</h1>
      <div className='mb-2 flex flex-col px-2'>
        <p>Aquí se podría mostrar información sobre el curso en cuestión</p>
      </div>

      {userType === 'professor' ? (
        <div className='flex'>
          <button
            type='button'
            className='mx-auto rounded-md bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:from-green-500 hover:to-blue-600'
            onClick={takeAttendance}
          >
            Login
          </button>
        </div>
      ) : null}
    </>
  )
}

export default CourseHome
