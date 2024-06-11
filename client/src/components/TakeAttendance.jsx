import { React, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3000/')

export function TakeAttendance() {
  const handleClick = () => {
    const unMensaje = 'Este es un mensaje'
    socket.emit('message', unMensaje)
  }

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message)
    })
  }, [])

  return (
    <>
      <h1>Prueba de funcionamiento</h1>
      <button onClick={handleClick}>Broadcast</button>
    </>
  )
}
