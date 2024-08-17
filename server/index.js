import { createServer } from 'node:http'
import { app } from './app.js'
import { initializeSocket } from './socket/socket.js'
import { config } from 'dotenv'
import { openDatabaseConnection } from './models/mongoDB/database.js'

const port = process.env.PORT ?? 3000

// Creación del servidor http
const server = createServer(app)

// Inicializar el servidor de socket.io
initializeSocket(server)

server.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`)
})

config()
openDatabaseConnection()
