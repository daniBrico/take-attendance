import axios from './axios.js'

export const registerRequest = (user) => axios.post(`/register`, user)

export const loginRequest = (user) => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get(`/verify`)

export const loadCoursesRequest = (user) =>
  axios.get(`/courses`, {
    params: { id: user.id }
  })

export const setCoursesRequest = (user) => axios.post('/courses', user)
