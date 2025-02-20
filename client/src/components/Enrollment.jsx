import React from 'react'
import { agreeEnrollment } from '../api/courses'

function ListOfEnrollments({
  name,
  studentId,
  courseId,
  setEnrollments,
  setCourses,
  socketRef
}) {
  const handleAgreeEnrollment = () => {
    async function axiosAgreeEnrollment() {
      try {
        const res = await agreeEnrollment(courseId, studentId)

        console.log('Ingresar a axiosAgreeEnrollment')

        if (res.status === 200) {
          setEnrollments((prevEnrollments) =>
            prevEnrollments.filter(
              (enrollment) => enrollment.studentId !== studentId
            )
          )

          setCourses((prevCourses) => {
            const updatedCourses = prevCourses.map((course) =>
              courseId === course.courseId
                ? { ...course, numberOfStudents: course.numberOfStudents + 1 }
                : course
            )

            return updatedCourses
          })
        }
      } catch (err) {
        console.log('Ha ocurrido un error al aceptar la inscripción: ', err)
      }
    }

    axiosAgreeEnrollment()
  }

  return (
    <>
      <section className='mt-3 px-3'>
        <article className='flex items-center justify-between gap-1 rounded-md'>
          <p>{name}</p>
          <button
            onClick={handleAgreeEnrollment}
            className='rounded-md bg-slate-800 px-2 py-1'
          >
            Aceptar solicitud
          </button>
        </article>
      </section>
    </>
  )
}

export function Enrollments({
  listOfEnrollments,
  courseId,
  setEnrollments,
  setCourses,
  socketRef
}) {
  return listOfEnrollments.length > 0 ? (
    listOfEnrollments.map((enrollment) => (
      <ListOfEnrollments
        key={enrollment.studentId}
        name={enrollment.name}
        studentId={enrollment.studentId}
        courseId={courseId}
        setEnrollments={setEnrollments}
        setCourses={setCourses}
        socketRef={socketRef}
      />
    ))
  ) : (
    <h2 className='mt-4 text-center'>No hay inscripciones para cargar</h2>
  )
}

export default Enrollments
