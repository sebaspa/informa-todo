import { deleteTask } from '../../api/tasks'
import { type Task } from '../../types/task'

const TodoList = ({ tasks, selectTask, onDeleteTask }: { tasks: Task[], selectTask: (task: Task) => void, onDeleteTask: (id: number | string) => void }): JSX.Element => {
  const handleDelete = (id: number | string): void => {
    removeTask(id).then(() => {
      onDeleteTask(id)
    }).catch(console.error)
  }

  const removeTask = async (id: number | string): Promise<void> => {
    await deleteTask(id)
  }

  const handleEdit = (task: Task): void => {
    selectTask(task)
  }
  return (
    <>
      <h2 className='text-3xl font-bold mb-4'>Todo List</h2>
        <ul className='grid grid-cols-12 gap-4'>
          {
            tasks.map((task) => (
              <li key={task.id} className='col-span-12 md:col-span-4'>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.isDone ? 'Completed' : 'Not completed'}</p>
                <div className='flex items-center gap-4'>
                  <button className='bg-purple-500 text-white rounded-lg px-4 py-2 w-full mt-4' onClick={() => { handleEdit(task) } }>Edit</button>
                  <button className='bg-red-500 text-white rounded-lg px-4 py-2 w-full mt-4' onClick={() => { handleDelete(task.id) } }>Delete</button>
                </div>
              </li>
            ))
          }
        </ul>
    </>
  )
}

export default TodoList
