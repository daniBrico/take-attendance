import React from 'react'

function TakeAttendanceButton({ userType, takeAttendance }) {
  if (userType != 'professor') return null

  return (
    <div className='flex'>
      <button
        type='button'
        className='mx-auto rounded-md bg-linear-to-r from-green-400 to-blue-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:from-green-500 hover:to-blue-600'
        onClick={takeAttendance}
      >
        Tomar lista
      </button>
    </div>
  )
}

export default TakeAttendanceButton
