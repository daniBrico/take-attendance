import axios from './axios.js'

const prefix = '/course'

export const getCourses = () => axios.get(`${prefix}/`)

export const joinCourseByCode = (courseCode) =>
  axios.get(`${prefix}/join?courseCode=${courseCode}`)

export const getEnrollments = (courseId) =>
  axios.get(`${prefix}/enrollments?courseId=${courseId}`)

export const createCourse = (subjectId) =>
  axios.post(`${prefix}/`, {
    subjectId
  })

export const agreeEnrollment = (courseId, studentId) =>
  axios.patch(`${prefix}/${courseId}/enrollments/${studentId}`)
