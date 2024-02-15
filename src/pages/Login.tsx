import bgLogin from '../assets/background-login.jpeg'

const Login = (): JSX.Element => {
  return (
    <div className="w-full h-screen grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8 relative">
        <div className='w-full h-screen flex absolute justify-center items-center top-0 left-0'>
          <div className='w-[490px]'>
            <h1 className='text-6xl text-white'>Start turning your ideas into reality.</h1>
            <p className='text-white mt-4 text-lg'>Create a free account and get full access to all features.</p>
          </div>
        </div>
        <img src={bgLogin} alt="background-login" className="w-full h-screen object-cover" />
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className='w-full h-screen flex items-center'>
          <div className='px-20'>
            <div className='w-20 h-20 bg-purple-400 rounded-xl mb-8'></div>
            <h2 className='text-3xl font-bold'>Login</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
