import { useEffect, useState } from 'react'
import { InputText } from '../Form'
import type { Task } from '../../types/task'
import { createTask, updateTask } from '../../api/tasks'
import { useAuth } from '../../hooks'

const TodoForm: React.FC<{ onModifyTask: (task: Task, type: 'add' | 'modify') => void, taskSelected: Task | null }> = ({ onModifyTask, taskSelected }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState<Task>(taskSelected ?? {
    id: 0,
    title: '',
    description: '',
    isDone: false,
    userId: 0
  })

  useEffect(() => {
    if (taskSelected !== null) {
      setFormData(taskSelected)
    }
  }, [taskSelected])

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
    onModifyTask(newTask, 'add')
    setFormData({
      id: 0,
      title: '',
      description: '',
      isDone: false,
      userId: 0
    })
  }

  const modifyTask = async (task: Task): Promise<void> => {
    await updateTask(task)
    onModifyTask(task, 'modify')
    setFormData({
      id: 0,
      title: '',
      description: '',
      isDone: false,
      userId: 0
    })
  }

  return (
    <>
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
    </>
  )
}

export default TodoForm
