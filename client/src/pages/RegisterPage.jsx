import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/homepage')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signUp(values)
  })

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-1 rounded-md p-10'>
      {registerErrors.map((error, i) => (
        <div key={i} className='w-full bg-red-500 p-2 text-center'>
          {error}
        </div>
      ))}
      <h1 className='text-2xl font-bold'>Login</h1>
      <form
        onSubmit={onSubmit}
        className='flex h-full w-full max-w-md flex-col gap-2'
      >
        <input
          type='text'
          {...register('name', { required: true })}
          placeholder='Ingrese su nombre'
          className='w-full rounded-md bg-zinc-700 px-4 py-2 text-white'
        />
        {errors.name && <p className='text-red-500'>Name is required</p>}
        <input
          type='text'
          {...register('lastName', { required: true })}
          placeholder='Ingrese su apellido'
          className='w-full rounded-md bg-zinc-700 px-4 py-2 text-white'
        />
        {errors.lastName && (
          <p className='text-red-500'>Last name is required</p>
        )}
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
          Register
        </button>
      </form>
      <p className='flex justify-between gap-x-2'>
        Already have an account?
        <Link to='/login' className='text-sky-500'>
          Login
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
