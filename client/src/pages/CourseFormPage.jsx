import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { getCareersNames, getSubjectsNames } from '../api/career'
import { createCourse } from '../api/courses'
import { useCourse } from '../context/CourseContext'
import useUpdateCourses from '../hooks/updateCourses'

function CourseFormPage() {
  const { logout, user, userType } = useAuth()
  const { setCourses } = useCourse()
  const [careerNames, setCareerNames] = useState([])
  const [careerSelected, setCareerSelected] = useState(null)
  const [subjectsNames, setSubjectsNames] = useState([])
  const [selectSubjectsIsDisabled, setSelectSubjectsIsDisabled] = useState(true)
  const [subjectSelectedId, setsubjectSelectedId] = useState(null)
  const updateCoursesCallback = useUpdateCourses(setCourses)

  const navigate = useNavigate()

  const handleCreateCourse = async () => {
    if (!careerSelected) {
      console.log('La carrera no está establecida')
      return
    }

    if (!subjectSelectedId) {
      console.log('La materia no está establecida')
      return
    }

    try {
      const res = await createCourse(subjectSelectedId)

      if (res.status === 201) {
        updateCoursesCallback(res.data.courseInformation)

        navigate('/')
      }
    } catch (err) {
      console.log('Error al crear curso en la base de datos: ', err)
    }
  }

  const handleSelectCareerChange = ({ value }) => setCareerSelected(value)

  const handleSelectSubjectChange = ({ value }) => setsubjectSelectedId(value)

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
        </form>
        <div className='mt-4 flex justify-center gap-2'>
          <Link
            to='/'
            className='rounded-lg bg-slate-700 px-2 py-1 transition hover:bg-slate-500'
          >
            Cancelar
          </Link>
          <button
            className='rounded-lg bg-slate-700 px-2 py-1 transition hover:bg-slate-500'
            onClick={handleCreateCourse}
          >
            Agregar
          </button>
        </div>
      </main>
    </>
  )
}

export default CourseFormPage
