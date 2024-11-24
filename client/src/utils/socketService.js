import io from 'socket.io-client'

let socket
const eventCallbacks = new Map()

let onNewEnrollmentRequestCallback

export const initSocket = () => {
  // Debería usar variables de entorno
  socket = io('http://localhost:3000')

  socket.on('connect', () => {
    console.log('Conectado al servidor')
  })

  socket.on('newEnrollmentRequest', () => {
    console.log('Notificación! Se recibío una nueva inscripción!')
    // llamar al trigger para ejecutar la callback
  })

  socket.on('updateCourses', (updateCourseData) => {
    triggerCallback('updateCourses', updateCourseData)
  })

  // Si el alumno pertenece al curso, eecibo el evento cuando el profesor toma lista
  socket.on('takeAttendance', (data) => {
    // Debería mostrar una notificación en pantalla al alumno para que pueda dar el presente
    console.log(data)
  })

  return socket
}

export const setOnNewEnrollmentRequestCallback = (callback) => {
  onNewEnrollmentRequestCallback = callback
}

export const registerCallback = (event, callback) => {
  // No me estoy asegurando que no exista el evento, aunque no debería existir
  eventCallbacks.set(event, callback)
}

export const unregisterCallback = (event, callback) => {
  eventCallbacks.delete(event)
}

const triggerCallback = (event, data) => {
  const callback = eventCallbacks.get(event)

  if (callback) callback(data)
}

export const getSocket = () => socket
