import React from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { useCourse } from '../context/CourseContext'
import TakeAttendanceButton from '../components/TakeAttendanceButton'
import FooterCourse from '../components/FooterCourse'

function CourseHomePage() {
  const { user, logout, userType, socketRef } = useAuth()
  const { setTakeAttendance } = useCourse()

  const courseInfo = JSON.parse(localStorage.getItem('courseInfo'))

  const { id, name } = courseInfo

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
      <FooterCourse />
    </>
  )
}

export default CourseHomePage
