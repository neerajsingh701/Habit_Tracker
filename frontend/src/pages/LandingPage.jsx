
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {


  const navigate = useNavigate()


  return (
    <div className=' min-h-screen flex flex-col items-center justify-center bg-[#fff1f2]  px-4 sm:px-6 lg:px-8 mt-0'>
      <h1 className='font-bold text-[#7f1d1d] sm:text-4xl lg:text-7xl mt-6 text-center'>
        Take a first step towards <span className='text-red-500'> positive Change</span>
      </h1>
      <p className="mt-6 sm-mt-8 text-[#7f1d1d] text-center text-sm md:text-xl sm-text-base   font-semibold ms:text-lg sm:w-107.5 w-full max-w-md">
        Start Your Journey to a more organized and fulfilling life with our powerful
        Habit Tracker. Stay motivated and on track!
      </p>
      <button onClick={() => navigate('/register')} className=' mt-8 py-2 px-6 sm-px-8 rounded-md cursor-pointer bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-sm sm:text-base'>
        Lets&apos;s get started
      </button>
    </div>
  )
}

export default LandingPage
