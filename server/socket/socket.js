import { Server as SocketServer } from 'socket.io'

let io

const userByRoom = []
const connectedUsers = new Map()

const initializeSocket = (server) => {
  // creamos el servidor de socket.io
  io = new SocketServer(server, {
    cors: {
      origin: ['http://localhost:5173'],
    },
  })

  io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`)
    // Con esto obtengo los sockets de los usuarios conectados
    console.log('Connected users: ', Array.from(io.sockets.sockets.keys()))

    // Le pido al usuario recién conectado que envíe su userId
    socket.emit('requestUserId', () => null)
    // Recibo el userId del usuario recién conectado y lo asocio al socket que utilizó para conectarse
    socket.on('registerUser', (userId) => {
      connectedUsers.set(userId, socket.id)
      console.log(`User ${userId} connected with socket ${socket.id}`)
    })

    socket.on('setRooms', (data) => {
      const { userId, coursesId } = data
      const coursesIdParsed = JSON.parse(coursesId)

      socket.join(coursesIdParsed)
      userByRoom[userId] = { socketId: socket.id, rooms: coursesIdParsed }

      console.log('Currently created rooms: ', io.sockets.adapter.rooms)
    })

    socket.on('takeAttendance', (data) => {
      const { targetRoom, courseName, professorName } = data

      io.to(targetRoom).emit('takeAttendance', {
        courseName,
        professorName,
      })
    })

    // socket.on('agreeEnrollment', (userId) => {
    //   const socketId = connectedUsers.get(userId)

    //   if (!socketId) return
    //   // Si está conectado, emito un evento para que, desde el cliente, pueda actualizar su lista de cursos
    //   io.to(socketId).emit('updateCourses', () => null)
    // })

    // socket.on('toBePresent', (data) => {})

    socket.on('disconnecting', () => {
      connectedUsers.forEach((value, key) => {
        if (value === socket.id) {
          connectedUsers.delete(key)
          console.log(`User ${key} disconnected`)
        }
      })
    })

    socket.on('disconnect', () => {
      console.log(connectedUsers)
      // console.log('a user has disconnected')
      // console.log(
      //   "Connected users ID's: ",
      //   Array.from(io.sockets.sockets.keys())
      // ) // Con esto obtengo los ID's de los conectados
      // console.log('Currently created rooms: ', io.sockets.adapter.rooms) // Con esto obtengo las rooms que existen actualmente
    })
  })
}

const getSocketIo = () => io

const getConnectedUsers = () => connectedUsers

const isConnected = (userId) => connectedUsers.get(userId)

export { initializeSocket, getSocketIo, getConnectedUsers, isConnected }
