import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { signIn, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/home')
  }, [isAuthenticated])

  const onSubmit = handleSubmit((data) => {
    signIn(data)
  })

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-2 rounded-md p-10'>
      <h1 className='text-2xl font-bold'>Login</h1>

      <form
        onSubmit={onSubmit}
        className='flex h-full w-full max-w-md flex-col gap-2'
      >
        <input
          type='email'
          {...register('email', { required: true })}
          placeholder='Ingrese su email'
          className='w-full rounded-md bg-zinc-700 px-4 py-2 text-white'
        />
        {errors.email && <p className='text-red-500'>Email is required</p>}
        <input
          type='password'
          {...register('password', { required: true })}
          placeholder='Ingrese su contraseña'
          className='w-full rounded-md bg-zinc-700 px-4 py-2 text-white'
        />
        {errors.password && (
          <p className='text-red-500'>Password is required</p>
        )}
        <button
          type='submit'
          className='w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Login
        </button>
      </form>

      <p className='flex justify-between gap-x-2'>
        Don't have an account?
        <Link to='/register' className='text-sky-500'>
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
