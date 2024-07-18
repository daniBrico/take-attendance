// Importamos la creación de un servidor con websocket utilizando socket.io
import { Server as SocketServer } from 'socket.io'

const userByRoom = {}

const initializeSocket = (server) => {
  // creamos el servidor de socket.io
  const io = new SocketServer(server, {
    cors: {
      origin: ['http://localhost:5173'],
    },
  })

  io.on('connection', (socket) => {
    console.log(Array.from(io.sockets.sockets.keys()))

    socket.on('setRooms', (data) => {
      const { userId, coursesId } = data
      const coursesIdParsed = JSON.parse(coursesId)

      socket.join(coursesIdParsed)
      userByRoom[userId] = { socketId: socket.id, rooms: coursesIdParsed }

      console.log(io.sockets.adapter.rooms)
    })

    socket.on('takeAttendance', (data) => {
      const { targetRoom } = data

      io.to(targetRoom).emit('takeAttendance', 'Estoy tomando lista')
    })

    socket.on('disconnect', () => {
      console.log('a user has disconnected')
      console.log(Array.from(io.sockets.sockets.keys())) // Con esto obtengo los ID's de los conectados
      console.log(io.sockets.adapter.rooms) // Con esto obtengo las rooms que existen actualmente
    })
  })
}

export { initializeSocket }
