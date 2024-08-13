import axios from './axios.js'

export const getUserCourses = () => axios.get('/course/')

export const createCourse = (subjectId, professorId) =>
  axios.post('/course/', {
    subjectId
  })
