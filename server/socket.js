// Importamos la creación de un servidor con websocket utilizando socket.io
import { Server as SocketServer } from 'socket.io'

const initializeSocket = (server) => {
  // creamos el servidor de socket.io
  const io = new SocketServer(server, {
    cors: {
      origin: ['http://localhost:5173'],
    },
  })

  io.on('connection', (socket) => {
    console.log('a user has connected')

    socket.on('message', (data) => {
      console.log(data)
      socket.broadcast.emit('message', data)
    })

    socket.on('disconnect', () => {
      console.log('a user has disconnected')
    })
  })
}

export { initializeSocket }
