


import { useContext, useState } from 'react'
import { HabitContext } from '../context/HabitContext.jsx'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import logo from '../assets/logo.svg'
import logo1 from "/habit.png"

const Navbar = () => {

  const { token, setToken } = useContext(HabitContext)

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate()




  return (
    <div className='bg-[#ffe8e8] p-4 shadow-2xl ' >

      <div className='flex justify-between items-center'>

        <div className="text-white">

          <img onClick={() => navigate('/')}
            src={logo1} alt="logo"
            className='w-12  cursor-pointer' />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='md:hidden text-white text-2xl'>
            {menuOpen ? "✖" : "☰"}
          </button>
          <h4 className='text-red-600 font-bold'>Habit Tracker</h4>
        </div>

        {/* right side buttons */}
        <div className="hidden md:flex items-center gap-3">
          {
            token ? (
              <button onClick={() => {
                cookie.remove("token");
                setToken(false);
                navigate('/login')
              }}
                className='bg-red-500 cursor-pointer py-2 px-4 rounded-lg text-white font-semibold'>
                Logout
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/login')}
                  className=' py-2 px-4 mx-2 rounded-lg cursor-pointer bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold transition'>
                  Sign In
                </button>
                <button onClick={() => navigate('/register')}
                  className=' py-2 px-4 rounded-lg cursor-pointer bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold'>
                  Sign Up
                </button>
              </>
            )
          }

        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-[#1b1450] p-4 rounded-lg">
          {
            token ? (
              <button
                onClick={() => {
                  cookie.remove("token");
                  setToken(false);
                  navigate('/login')
                  setMenuOpen(false)
                }}
                className='bg-red-500 py-2 px-4 rounded-lg text-white font-semibold'>
                Logout
              </button>
            ) : (
              <>
                <button onClick={() => {
                  navigate('/login')
                  setMenuOpen(false)
                }}
                  className=' py-2 px-4 mx-2 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold transition'>
                  Sign In
                </button>
                <button onClick={() => {
                  navigate('/register')
                  setMenuOpen(false);

                }}
                  className=' py-2 px-4 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold'>
                  Sign Up
                </button>
              </>
            )
          }

        </div>
      )}
    </div>
  )
}

export default Navbar
