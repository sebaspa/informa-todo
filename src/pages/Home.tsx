import { useEffect, useState } from 'react'
import { useAuth } from '../context'

import type { Task } from '../types/task'

import { createTask, getTasksByUser } from '../api/tasks'

import { InputText } from '../components/Form'

const Home = (): JSX.Element => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [formData, setFormData] = useState<Task>({
    id: 0,
    title: '',
    description: '',
    isDone: false,
    userId: 0
  })

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      if (user === null) return
      try {
        const tasks = await getTasksByUser(user.id)
        setTasks(tasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }

    fetchTasks().catch(console.error)
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    addTask().catch(console.error)
  }

  const addTask = async (): Promise<void> => {
    if (user === null) return
    const newTask = await createTask({
      ...formData,
      id: crypto.randomUUID(),
      userId: user.id
    })
    setTasks([...tasks, newTask])
    setFormData({
      id: 0,
      title: '',
      description: '',
      isDone: false,
      userId: 0
    })
  }

  return (
    <div className='container mx-auto px-4'>
      <h1>{user?.username}</h1>
      <form className='mb-4' onSubmit={handleSubmit}>
        <InputText
          type="text"
          name="title"
          label="Title"
          value={formData.title}
          required={true}
          handleChange={handleInputChange}
        />
        <InputText
          type="text"
          name="description"
          label="Description"
          value={formData.description}
          required={true}
          handleChange={handleInputChange}
        />
        <button className='bg-purple-500 text-white rounded-lg px-4 py-2 w-full mt-4'>Add</button>
      </form>
      <h2 className='text-3xl font-bold mb-4'>Todo List</h2>
      <ul>
        {
          tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home
