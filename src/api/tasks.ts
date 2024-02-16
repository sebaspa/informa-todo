import type { Task } from '../types/task'

export const getTasksByUser = async (uid: number | string): Promise<Task[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks?userId=${uid}`)
  const data = await response.json()
  return data
}

export const createTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  const data = await response.json()
  return data
}

export const deleteTask = async (id: number | string): Promise<void> => {
  await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: 'DELETE'
  })
}
