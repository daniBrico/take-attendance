import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { joinCourseByCode } from '../api/courses'

function HomeStudent() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit(async (values) => {
    try {
      const res = await joinCourseByCode(values.courseCode)

      if (res.status === 200) {
        // Mostrar mensaje de que la solicitud de ingreso fue enviada correctamente
      }
    } catch (err) {
      console.log(
        'Ha ocurrido un error al intentar inscribirte al curso: ',
        err
      )
    }
  })

  return (
    <>
      <form className='mt-4 flex flex-col gap-2' onSubmit={onSubmit}>
        <input
          type='text'
          className='text-black'
          placeholder='Ingrese el código del curso'
          {...register('courseCode', {
            required: 'El código del curso es requerido'
          })}
        />
        {errors.courseCode && <p>{errors.courseCode.message}</p>}
        <button
          type='submit'
          className='rounded-lg bg-slate-700 px-2 py-1 transition hover:bg-slate-500'
        >
          Unirse a un curso
        </button>
      </form>
    </>
  )
}

function HomeProfessor() {
  return (
    <>
      <Link
        to='/course/create'
        className='mt-4 rounded-lg bg-slate-400 px-2 py-1'
      >
        Agregar curso
      </Link>
    </>
  )
}

export function Home({ userType }) {
  return userType === 'student' ? <HomeStudent /> : <HomeProfessor />
}
