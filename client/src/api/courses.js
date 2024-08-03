import axios from './axios.js'

export const getUserCourses = (userType, userId) =>
  axios.get('/course/', {
    params: {
      userType,
      userId
    }
  })

export const createCourse = (subjectId, professorId) =>
  axios.post('/course/', {
    subjectId,
    professorId
  })
