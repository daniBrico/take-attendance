import axios from './axios.js'

export const getCareers = () => axios.get('/career/get-careers-names')
