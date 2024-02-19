import { useEffect, useState } from 'react'

import type { Task } from '../types/task'

import { createTask, deleteTask, getTasksByUser, updateTask } from '../api/tasks'

import { InputText } from '../components/Form'
import { useAuth } from '../hooks'

const Home = (): JSX.Element => {
  const { user, logoutSession } = useAuth()
  console.log('user', user)
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
      console.log('Fetchtasks')
      if (user === undefined || user === null) return
      try {
        const tasks = await getTasksByUser(user.id)
        setTasks(tasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }

    fetchTasks().catch(console.error)
  }, [user])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (formData.id === 0) {
      addTask().catch(console.error)
    } else {
      modifyTask(formData).catch(console.error)
    }
  }

  const addTask = async (): Promise<void> => {
    if (user === null || user === undefined) return
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

  const handleDelete = (id: number | string): void => {
    removeTask(id).catch(console.error)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const removeTask = async (id: number | string): Promise<void> => {
    await deleteTask(id)
  }

  const handleEdit = (task: Task): void => {
    setFormData(task)
  }

  const modifyTask = async (task: Task): Promise<void> => {
    await updateTask(task)
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
    setFormData({
      id: 0,
      title: '',
      description: '',
      isDone: false,
      userId: 0
    })
  }

  const handleLogout = (): void => {
    logoutSession()
  }

  return (
    <div className='container mx-auto px-4'>
      <h1>Hola {user?.username}</h1>
      <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={handleLogout}>Log out</button>
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
              <p>{task.isDone ? 'Completed' : 'Not completed'}</p>
              <button className='bg-purple-500 text-white rounded-lg px-4 py-2 w-full mt-4' onClick={() => { handleEdit(task) } }>Edit</button>
              <button className='bg-red-500 text-white rounded-lg px-4 py-2 w-full mt-4' onClick={() => { handleDelete(task.id) } }>Delete</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home
