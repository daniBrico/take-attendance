import mongoose from 'mongoose'

export const databaseConnection = async () => {
  // No queremos que este tipeada en código. Tenemos que usar variables de entorno.
  const { RTATT_MONGODB_HOST, RTATT_MONGODB_DATABASE } = process.env
  const MONGODB_URI = `mongodb://${RTATT_MONGODB_HOST}/${RTATT_MONGODB_DATABASE}`

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('DB is connected')
  } catch (err) {
    // console.log(err)
    throw err
  }
}
