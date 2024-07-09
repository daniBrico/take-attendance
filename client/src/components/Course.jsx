import React from 'react'

function ListOfCourses({ name, code, numberOfStudents }) {
  return (
    <>
      <div className='flex flex-col gap-2 rounded-lg bg-slate-800 px-2 py-1'>
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
  return listOfCourses.map((course) => (
    <ListOfCourses
      key={course.code}
      name={course.name}
      code={course.code}
      numberOfStudents={course.numberOfStudents}
    />
  ))
}
