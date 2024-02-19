import type { LoginUser, User } from '../types/user'

export const createUser = async (user: User): Promise<User> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  const data = await response.json()
  return data
}

export const loginUser = async (user: LoginUser): Promise<User> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users?email=${user.email}&password=${user.password}`)
  const data = await response.json()

  const invalidUser = {
    id: 0,
    username: '',
    email: '',
    password: '',
    photo: ''
  }
  if (data.length === 0) {
    return invalidUser
  } else if (data[0].password === user.password && data[0].email === user.email) {
    return data[0]
  } else {
    return invalidUser
  }
}
