

import { useContext, useState } from 'react'
import { HabitContext } from "../context/HabitContext"
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const { handelRegister } = useContext(HabitContext)

    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    // ye functiion kya kartha hai jab user har ek key press karkay
    // email and password type kartha hai wo state value main save ho jatha hai .....
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }


    const handleRegisterForm = (e) => {
        e.preventDefault()

        handelRegister(userFormData.name, userFormData.email, userFormData.password)


    }




    //  handelRegister,
    //   handelLogin,


    return (
        <div className='flex items-center justify-center min-h-screen bg-[#fff1f2]'>
            <div className='bg-[#fffafa] p-8 rounded-2xl w-full max-w-sm shadow-2xl border border-[#fecaca]'>
                <h2 className="text-2xl font-bold mb-6 text-[#7f1d1d] text-center">
                    Sign Up
                </h2>
                <form onSubmit={handleRegisterForm} className='space-y-4'>
                    {/* this div is for name */}
                    <div>
                        <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>
                            Enter Name
                        </label>
                        <input type="name" id='name'
                            name='name'
                            value={userFormData.name}
                            onChange={handleChange}
                            placeholder='Enter your full name'
                            className='w-full px-4 py-2 border border-[#fca5a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                            required
                        />
                    </div>
                    {/*this div for email  */}
                    <div>
                        <label htmlFor='email' className='block text-gray-700 font-medium mb-2'>
                            Email Address
                        </label>
                        <input type="email" id='email'
                            name='email'
                            value={userFormData.email}
                            onChange={handleChange}
                            placeholder='Enter your email'
                            className='w-full px-4 py-2 border border-[#fca5a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                            required
                        />
                    </div>
                    {/* This div for passwords */}
                    <div>
                        <label htmlFor='password' className='block text-gray-700 font-medium mb-2'>
                            Password
                        </label>
                        <input type="password"
                            id='password'
                            name='password'
                            value={userFormData.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            className='w-full px-4 py-2 border border-[#fca5a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                            required
                        />
                    </div>
                    {/* buttons  */}
                    <button type='submit' className='w-full border cursor-pointer border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white py-2 px-4 rounded-lg  transition duration-300'>
                        Sign Up
                    </button>
                </form>
                <p className='mt-4 text-sm text-center text-gray-600'>
                    Alreday have an account <span onClick={() => navigate('/login')} className='text-blue-400 underline cursor-pointer'>Login here.</span>
                </p>

            </div>

        </div>
    )
}

export default Register





