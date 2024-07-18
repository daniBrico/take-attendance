import React from 'react'
import { useNavigate } from 'react-router-dom'

function ListOfCourses({ name, code, numberOfStudents }) {
  const navigate = useNavigate()

  function handleClick() {
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
          {/* <p>Lun/Miér/Vier</p> */}
        </div>
      </div>
    </>
  )
}

export function Courses({ listOfCourses }) {
  return listOfCourses
    ? listOfCourses.map((course) => (
        <ListOfCourses
          key={course.code}
          name={course.name}
          code={course.code}
          numberOfStudents={course.numberOfStudents}
        />
      ))
    : null
}
