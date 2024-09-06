import io from 'socket.io-client'

let socket
let onNewEnrollmentRequestCallback

export const initSocket = () => {
  // Debería usar variables de entorno
  socket = io('http://localhost:3000')

  socket.on('connect', () => {
    console.log('Conectado al servidor')
  })

  socket.on('newEnrollmentRequest', () => {
    console.log('Notificación! Se recibío una nueva inscripción!')
    if (onNewEnrollmentRequestCallback) onNewEnrollmentRequestCallback
  })

  return socket
}

export const setOnNewEnrollmentRequestCallback = (callback) => {
  onNewEnrollmentRequestCallback = callback
}

export const getSocket = () => socket
