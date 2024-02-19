import { useAuth } from '../hooks'

const UserBar = (): JSX.Element => {
  const { user, logoutSession } = useAuth()
  return (
    <div className="w-full py-4 bg-purple-800 flex items-center justify-between px-4">
      <div className="">
        <p className="text-white font-bold">ToDo App</p>
      </div>
        <div className='flex items-center gap-4 text-xs'>
          <img src={user?.photo} alt="user" className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-white font-bold">{user?.username}</p>
            <p className="text-white font-bold">{user?.email}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs py-1 px-2 rounded mt-2"
              onClick={logoutSession}
            >
              Log out
            </button>
          </div>
        </div>
    </div>
  )
}

export default UserBar
