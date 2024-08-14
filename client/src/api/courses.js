import axios from './axios.js'

export const getUserCourses = () => axios.get('/course/')

export const createCourse = (subjectId) =>
  axios.post('/course/', {
    subjectId
  })

export const joinCourseByCode = (courseCode) =>
  axios.get(`/course/join-course?courseCode=${courseCode}`)
