import axios from './axios.js'

export const getCourses = (userType, userId) =>
  axios.get('/course/', {
    params: {
      userType,
      userId
    }
  })
