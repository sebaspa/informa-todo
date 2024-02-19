export interface User {
  id: number | string
  username: string
  email: string
  photo: string
  password?: string
}

export interface LoginUser {
  email: string
  password: string
}
