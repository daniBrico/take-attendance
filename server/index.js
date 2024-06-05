import express from 'express'
import logger from 'morgan'

// Importamos la creación de un servidor con websocket utilizando socket.io
import { Server as SocketServer } from 'socket.io'
// Importamos la posibilidad de crear un servidor http de node.
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000

const app = express()
// Creación del servidor http
const server = createServer(app)
// creamos el servidor de socket.io
const io = new SocketServer(server, {
  cors: {
    origin: ['http://localhost:5173']
  }
})

io.on('connection', (socket) => {
  console.log('a user has connected')

  socket.on('disconnect', () => {
    console.log('a user has disconnected')
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

// Estamos escuchando el servidor, no la aplicación
server.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`)
})
