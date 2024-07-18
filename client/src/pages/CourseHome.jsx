import React from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'

function CourseHome() {
  const { user, logout, userType, socketRef } = useAuth()
  const { setTakeAttendance } = useCourse()

  const location = useLocation()
  const { name, id } = location.state

  function takeAttendance() {
    console.log('Tomar lista')

    socketRef.current.emit('takeAttendance', {
      targetRoom: id,
      courseName: name,
      professorName: user.name
    })

    setTakeAttendance(true)
  }

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <h1 className='m-2 text-center text-xl'>{name}</h1>
      <div className='mb-2 flex flex-col px-2'>
        <p>
          Aquí se podría mostrar información sobre el curso en cuestión,
          información relevante y más funcionalidades
        </p>
      </div>

      {userType === 'professor' ? (
        <div className='flex'>
          <button
            type='button'
            className='mx-auto rounded-md bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:from-green-500 hover:to-blue-600'
            onClick={takeAttendance}
          >
            Tomar lista
          </button>
        </div>
      ) : null}
    </>
  )
}

export default CourseHome
