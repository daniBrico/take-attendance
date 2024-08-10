import React from 'react'
import { Link } from 'react-router-dom'

function HomeStudent() {
  return <div>Home Student</div>
}

function HomeProfessor() {
  return (
    <>
      <Link
        to='/create-course'
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
