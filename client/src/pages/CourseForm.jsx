import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { getCareers } from '../api/career'

function CourseForm() {
  const { logout, user, userType } = useAuth()
  const [careerNames, setCareerNames] = useState([])

  const handleClick = () => {
    console.log('Se apreto el botón')
  }

  const handleSelectChange = ({ value }) => {
    console.log(value)
  }

  useEffect(() => {
    const getCareersNames = async () => {
      try {
        const res = await getCareers()
        const data = res.data

        const careersNames = []

        data.forEach((career) => {
          if (career && career.name && career._id) {
            careersNames.push({ label: career.name, value: career._id })
          }
        })

        setCareerNames(careersNames)
      } catch (err) {
        console.log(err)
      }
    }

    getCareersNames()
  }, [])

  return (
    <>
      <Header user={user} logout={logout} userType={userType} />
      <main className='w-full'>
        <form className='my-4 flex justify-center'>
          <Select
            className='w-4/5 text-black'
            options={careerNames}
            onChange={handleSelectChange}
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
