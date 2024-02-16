import users from '../mocks/users.json'
import type { User } from '../types/user'

export const validateUser = (email: string, password: string): User => {
  const user = users.find((user) => user.email === email && user.password === password)
  if (user !== null && user !== undefined) {
    return user
  } else {
    return {
      id: 0,
      username: '',
      email: '',
      password: ''
    }
  }
}
