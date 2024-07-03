import axios from './axios.js'

export const getCareersNames = () => axios.get('/career/names')

export const getSubjectsNames = (idCareer) =>
  axios.get('/career/subjects-names', {
    params: {
      idCareer
    }
  })
