import { useEffect, useState } from 'react'

import type { Task } from '../types/task'

import { getTasksByUser } from '../api/tasks'

import { useAuth } from '../hooks'

import { UserBar } from '../components'
import { TodoForm, TodoList } from '../components/Todo'

const Home = (): JSX.Element => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskSelected, setTaskSelected] = useState<Task | null>(null)

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
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

  const handleModifyTask = (task: Task, type: 'add' | 'modify'): void => {
    (type === 'add') ? setTasks([...tasks, task]) : setTasks(tasks.map((t) => (t.id === task.id ? task : t)))
  }

  const handleEditTask = (task: Task): void => {
    setTaskSelected(task)
  }

  const handleDeleteTask = (id: number | string): void => {
    setTasks(tasks.filter((task) => task.id !== id))
    setTaskSelected({
      id: 0,
      title: '',
      description: '',
      isDone: false,
      userId: 0
    })
  }

  return (
    <>
      <UserBar />
      <div className='container mx-auto px-4 mt-4'>
        <TodoForm onModifyTask={handleModifyTask} taskSelected={taskSelected} />
        <TodoList tasks={tasks} selectTask={handleEditTask} onDeleteTask={handleDeleteTask} />
      </div>
    </>
  )
}

export default Home
