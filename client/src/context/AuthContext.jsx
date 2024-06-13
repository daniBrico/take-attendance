import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState('')

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (err) {
      setErrors(err.response.data.message)
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (err) {
      console.log(err)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()

      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)

        return setUser(null)
      }

      try {
        const res = await verifyTokenRequest(cookies.token)

        if (!res.data) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        const decoded = jwtDecode(cookies.token)

        setUserType(decoded.role)
        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (err) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        logout,
        userType,
        loading,
        user,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
