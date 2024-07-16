import React from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

function CourseHome() {
  const { user, logout, userType } = useAuth()

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <h1 className='m-2 text-center text-xl'>Información sobre el curso</h1>
      <div className='flex flex-col px-2'>
        <p>Aquí se podría mostrar información sobre el curso en cuestión</p>
      </div>
    </>
  )
}

export default CourseHome
