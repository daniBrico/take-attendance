import React from 'react'

function ListOfEnrollments({ name }) {
  return (
    <>
      <section className='mt-3 px-3'>
        <article className='flex items-center justify-between gap-1 rounded-md'>
          <p>{name}</p>
          <button className='rounded-md bg-slate-800 px-2 py-1'>
            Aceptar solicitud
          </button>
        </article>
      </section>
    </>
  )
}

export function Enrollments({ listOfEnrollments }) {
  return listOfEnrollments ? (
    listOfEnrollments.map((enrollment) => (
      <ListOfEnrollments key={enrollment._id} name={enrollment.name} />
    ))
  ) : (
    <h2 className='mt-4 text-center'>No hay inscripciones para cargar</h2>
  )
}

export default Enrollments
