import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { getCareersNames, getSubjectsNames } from '../api/career'

function CourseForm() {
  const { logout, user, userType } = useAuth()
  const [careerNames, setCareerNames] = useState([])
  const [careerSelected, setCareerSelected] = useState(null)
  const [subjectsNames, setSubjectsNames] = useState([])
  const [selectSubjectsIsDisabled, setSelectSubjectsIsDisabled] = useState(true)
  const [subjectSelected, setSubjectSelected] = useState(null)

  const handleClick = () => {
    if (!careerSelected) {
      console.log('La carrera no está establecida')
      return
    }

    if (!subjectSelected) {
      console.log('La materia no está establecida')
      return
    }

    // Puedo crear el curso
  }

  const handleSelectCareerChange = ({ value }) => setCareerSelected(value)

  const handleSelectSubjectChange = ({ value }) => setSubjectSelected(value)

  useEffect(() => {
    const initializeCareersNames = async () => {
      try {
        const res = await getCareersNames()
        const data = res.data

        const careersNames = []

        data.forEach((el) => {
          if (el && el.name && el._id) {
            careersNames.push({ label: el.name, value: el._id })
          }
        })

        setCareerNames(careersNames)
      } catch (err) {
        console.log(err)
      }
    }

    initializeCareersNames()
  }, [])

  useEffect(() => {
    const initializeSubjectsNames = async () => {
      const res = await getSubjectsNames(careerSelected)
      const data = res.data
      let subjectsNames = []

      data.forEach((el) => {
        subjectsNames.push({ label: el.name, value: el._id })
      })

      setSubjectsNames(subjectsNames)
    }

    if (careerSelected === null) return

    initializeSubjectsNames()
    setSelectSubjectsIsDisabled(false)
  }, [careerSelected])

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <main className='w-full'>
        <form className='my-4 flex gap-2'>
          <div className='w-full px-4'>
            <h2 className='mb-2'>Selector de carrera</h2>
            <Select
              className='text-black'
              options={careerNames}
              onChange={handleSelectCareerChange}
            />
            <h2 className='mb-2 mt-4'>Selector de materia</h2>
            <Select
              className='text-black'
              options={subjectsNames}
              onChange={handleSelectSubjectChange}
              isDisabled={selectSubjectsIsDisabled}
            />
          </div>
          {/* <h2>Fecha y horario</h2>
          <div className='mt-2 w-full px-2'>
            <ul className='grid grid-cols-3 items-center justify-center gap-4'>
              <li className='flex justify-center'>
                <input
                  className='peer hidden opacity-0'
                  type='checkbox'
                  name='lunes'
                  id='lunes'
                />
                <label
                  className='cursor-pointer rounded-lg border border-solid bg-slate-700 px-2 py-1 transition hover:bg-slate-500 peer-checked:border-slate-700 peer-checked:bg-slate-500'
                  htmlFor='lunes'
                >
                  Lunes
                </label>
              </li>
              <li className='flex justify-center'>
                <input
                  className='peer hidden opacity-0'
                  type='checkbox'
                  name='martes'
                  id='martes'
                />
                <label
                  className='cursor-pointer rounded-lg border border-solid bg-slate-700 px-2 py-1 transition hover:bg-slate-500 peer-checked:border-slate-500 peer-checked:bg-slate-500'
                  htmlFor='martes'
                >
                  Martes
                </label>
              </li>
              <li className='flex justify-center'>
                <input
                  className='peer hidden opacity-0'
                  type='checkbox'
                  name='miercoles'
                  id='miercoles'
                />
                <label
                  className='cursor-pointer rounded-lg border border-solid bg-slate-700 px-2 py-1 transition hover:bg-slate-500 peer-checked:border-slate-500 peer-checked:bg-slate-500'
                  htmlFor='miercoles'
                >
                  Miércoles
                </label>
              </li>
              <li className='flex justify-center'>
                <input
                  className='peer hidden opacity-0'
                  type='checkbox'
                  name='jueves'
                  id='jueves'
                />
                <label
                  className='cursor-pointer rounded-lg border border-solid bg-slate-700 px-2 py-1 transition hover:bg-slate-500 peer-checked:border-slate-500 peer-checked:bg-slate-500'
                  htmlFor='jueves'
                >
                  Jueves
                </label>
              </li>
              <li className='flex justify-center'>
                <input
                  className='peer hidden opacity-0'
                  type='checkbox'
                  name='viernes'
                  id='viernes'
                />
                <label
                  className='cursor-pointer rounded-lg border border-solid bg-slate-700 px-2 py-1 transition hover:bg-slate-500 peer-checked:border-slate-500 peer-checked:bg-slate-500'
                  htmlFor='viernes'
                >
                  Viernes
                </label>
              </li>
              <li className='flex justify-center'>
                <input
                  className='peer hidden opacity-0'
                  type='checkbox'
                  name='sabado'
                  id='sabado'
                />
                <label
                  className='cursor-pointer rounded-lg border border-solid bg-slate-700 px-2 py-1 transition hover:bg-slate-500 peer-checked:border-slate-500 peer-checked:bg-slate-500'
                  htmlFor='sabado'
                >
                  Sábado
                </label>
              </li>
            </ul>
          </div> */}
        </form>
        <div className='mt-4 flex justify-center gap-2'>
          <Link
            to='/homepage'
            className='rounded-lg bg-slate-700 px-2 py-1 transition hover:bg-slate-500'
          >
            Cancelar
          </Link>
          <button
            className='rounded-lg bg-slate-700 px-2 py-1 transition hover:bg-slate-500'
            onClick={handleClick}
          >
            Agregar
          </button>
        </div>
      </main>
    </>
  )
}

export default CourseForm
