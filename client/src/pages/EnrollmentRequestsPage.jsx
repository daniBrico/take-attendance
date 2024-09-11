import React, { useEffect, useState } from 'react'
import FooterCourse from '../components/FooterCourse'
import { useAuth } from '../context/AuthContext'
import { useCourse } from '../context/CourseContext'
import Header from '../components/Header'
import { Enrollments } from '../components/Enrollment'
import { getEnrollments } from '../api/courses'

function EnrollmentRequestsPage() {
  const { user, logout, userType } = useAuth()
  const { courseSelected } = useCourse()
  const [enrollments, setEnrollments] = useState([])

  useEffect(() => {
    async function enrollmentsRequests() {
      try {
        const res = await getEnrollments(courseSelected.id)

        if (res.status === 200) {
          const data = res.data
          setEnrollments(data.enrollments)
        }

        if (res.status === 204) setEnrollments(null)
      } catch (err) {
        console.log(
          'Ha ocurrido un error en la carga de las inscripciones: ',
          err
        )
      }
    }

    enrollmentsRequests()
  }, [])

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <h1 className='mt-2 text-center text-lg'>Solicitudes de Ingreso</h1>
      <Enrollments listOfEnrollments={enrollments} />
      <FooterCourse />
    </>
  )
}

export default EnrollmentRequestsPage
