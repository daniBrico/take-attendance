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

  const handleClick = () => {
    console.log('Se apreto el botón')
  }

  const handleSelectCareerChange = ({ value }) => {
    setCareerSelected(value)
    // Una vez que se selecciona el valor, habría que poner otro select pero que esta vez muestre el listado de materias basado en esa carrera.
    // Activar el select de materias
    // y mostrar las posibles materias a seleccionar
    // console.log(value)
  }

  const handleSelectSubjectChange = () => {}

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
        <form className='my-4 flex flex-col items-center justify-center gap-2'>
          <Select
            className='w-4/5 text-black'
            options={careerNames}
            onChange={handleSelectCareerChange}
          />

          <Select
            className='w-4/5 text-black'
            options={subjectsNames}
            onChange={handleSelectSubjectChange}
            isDisabled={selectSubjectsIsDisabled}
          />
        </form>
        <div className='mt-4 flex justify-center gap-2'>
          <Link to='/homepage' className='rounded-lg bg-slate-400 px-2 py-1'>
            Cancelar
          </Link>
          <button
            className='rounded-lg bg-slate-400 px-2 py-1'
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
