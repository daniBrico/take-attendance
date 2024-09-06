import React from 'react'
import { useNavigate } from 'react-router-dom'

function ListOfCourses({ name, code, numberOfStudents, id }) {
  const navigate = useNavigate()

  function handleClick() {
    const courseInfo = { name, id }
    localStorage.setItem('courseInfo', JSON.stringify(courseInfo))
    navigate('/course-home')
  }

  return (
    <>
      <div
        className='flex flex-col gap-2 rounded-lg bg-slate-800 px-2 py-1 hover:cursor-pointer'
        onClick={handleClick}
      >
        <div className='flex justify-between'>
          <p>{name}</p>
          <p>{code}</p>
        </div>
        <div className='flex justify-between'>
          <p>Alumnos: {numberOfStudents}</p>
        </div>
      </div>
    </>
  )
}

export function Courses({ listOfCourses }) {
  return listOfCourses ? (
    listOfCourses.map((course) => (
      <ListOfCourses
        key={course.id}
        name={course.name}
        code={course.code}
        numberOfStudents={course.numberOfStudents}
        id={course.id}
      />
    ))
  ) : (
    <h2 className='mb-5 text-center'>No hay cursos para cargar</h2>
  )
}
