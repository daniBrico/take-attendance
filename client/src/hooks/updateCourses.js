import { useCallback } from 'react'

const useUpdateCourses = (setCourses) => {
  return useCallback(
    (updateCourseData) => {
      setCourses((prevCourses) => [...prevCourses, updateCourseData])
    },
    [setCourses]
  )
}

export default useUpdateCourses
