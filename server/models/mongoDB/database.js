import mongoose from 'mongoose'

export function databaseConnection() {
  // No queremos que este tipeada en código. Tenemos que usar variables de entorno.
  const { RTATT_MONGODB_HOST, RTATT_MONGODB_DATABASE } = process.env
  const MONGODB_URI = `mongodb://${RTATT_MONGODB_HOST}/${RTATT_MONGODB_DATABASE}`

  mongoose
    .connect(MONGODB_URI, {})
    .then((db) => console.log('database is connected'))
    .catch((err) => console.log(err))
}
