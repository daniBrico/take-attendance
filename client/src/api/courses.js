import axios from './axios.js'

export const getUserCourses = () => axios.get('/course/')

export const joinCourseByCode = (courseCode) =>
  axios.get(`/course/join?courseCode=${courseCode}`)

export const getEnrollments = (courseId) =>
  axios.get(`/course/enrollments?courseId=${courseId}`)

export const createCourse = (subjectId) =>
  axios.post('/course/', {
    subjectId
  })
