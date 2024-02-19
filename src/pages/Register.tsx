import { createUser } from '../api/users'

const Register = (): JSX.Element => {
  const addUser = async (): Promise<void> => {
    await createUser({
      id: crypto.randomUUID(),
      username: 'John Doe',
      email: 'pHkQZ@example.com',
      password: 'password',
      photo: 'https://i.pravatar.cc/150?u=johndoe'
    })
  }

  const handleCreateUser = (): void => {
    addUser().catch(console.error)
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleCreateUser} type='button'>Register</button>
    </div>
  )
}

export default Register
