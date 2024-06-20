import React from 'react'
import { Link } from 'react-router-dom'

function Header({ user, logout, userType }) {
  return (
    <header className='bg-slate-800'>
      <ul className='mx-auto flex max-w-3xl justify-between p-4'>
        <li>{`${user.name} ${user.lastName} (${userType === 'professor' ? 'Profesor' : 'Estudiante'})`}</li>
        <li>
          <Link
            to='/login'
            onClick={() => {
              logout()
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
