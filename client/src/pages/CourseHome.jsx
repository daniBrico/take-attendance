import React from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import { useCourse } from '../context/CourseContext'
import TakeAttendanceButton from '../components/TakeAttendanceButton'

function CourseHome() {
  const { user, logout, userType, socketRef } = useAuth()
  const { setTakeAttendance } = useCourse()

  const location = useLocation()
  const { name, id } = location.state

  function takeAttendance() {
    console.log('Tomar lista')

    // This event allows taking attendance
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
      <TakeAttendanceButton
        userType={userType}
        takeAttendance={takeAttendance}
      ></TakeAttendanceButton>
    </>
  )
}

export default CourseHome
