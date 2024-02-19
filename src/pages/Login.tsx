import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { InputText } from '../components/Form'

import type { LoginUser } from '../types/user'

import bgLogin from '../assets/background-login.jpeg'
import { loginUser } from '../api/users'
import { useAuth } from '../hooks'

const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const { loginSession } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    handleLoginUser({
      email: formData.email,
      password: formData.password
    }).then(() => {
      setTimeout(() => {
        navigate('/')
      }, 300)
    }
    ).catch(console.error)
  }

  const handleLoginUser = async (user: LoginUser): Promise<void> => {
    await loginUser(user)
      .then((data) => {
        if (data.id !== 0) {
          loginSession({
            id: data.id,
            username: data.username,
            email: data.email,
            photo: data.photo
          })
        } else {
          alert('Invalid email or password')
        }
      })
      .catch(console.error)
  }

  const {
    email,
    password
  } = formData

  return (
    <div className="w-full h-screen grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8 relative hidden md:block">
        <div className='w-full h-screen flex absolute justify-center items-center top-0 left-0'>
          <div className='w-[490px]'>
            <h1 className='text-6xl text-white'>Start turning your ideas into reality.</h1>
            <p className='text-white mt-4 text-lg'>Create a free account and get full access to all features.</p>
          </div>
        </div>
        <img src={bgLogin} alt="background-login" className="w-full h-screen object-cover" />
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className='w-full h-screen flex items-center'>
          <div className='px-4 xl:px-16 w-full'>
            <div className='w-20 h-20 bg-purple-400 rounded-xl mb-8'></div>
            <h2 className='text-3xl font-bold mb-10'>Login</h2>
            <form onSubmit={handleSubmit}>
              <InputText
                type="email"
                name="email"
                value={email}
                label="Email"
                handleChange={handleInputChange}
                required={true}
              />
              <InputText
                type="password"
                name="password"
                value={password}
                label="Password"
                handleChange={handleInputChange}
                required={true}
              />
              <button
                type="submit"
                className="bg-purple-500 text-white rounded-lg px-4 py-2 w-full mt-4"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
