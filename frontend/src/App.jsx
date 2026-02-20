
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useContext } from 'react'
import { HabitContext } from './context/HabitContext.jsx'
import { Route, Routes } from 'react-router-dom'
import Habits from './components/Habits.jsx'
import LandingPage from './pages/LandingPage.jsx'
import SigninPage from './pages/SigninPage.jsx'
import Register from './pages/Register.jsx'
import { Navigate } from 'react-router-dom'

const App = () => {



  const { token } = useContext(HabitContext)




  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        {token ? (
          <Route path='/habits' element={<Habits />} />
        ) : (
          <>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<SigninPage />} />
            <Route path='/register' element={<Register />} />
          </>
        )}

        <Route path='*' element={<Navigate to={token ? '/habits' : '/'} />} />
      </Routes >
      <Footer/>





    </>
  )
}

export default App
