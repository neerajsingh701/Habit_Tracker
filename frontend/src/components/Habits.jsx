import { createRef, use, useContext, useState } from 'react'
import { HabitContext } from '../context/HabitContext'
import { FaEdit, FaTrash } from "react-icons/fa"
import HabitAnalytics from './HabitAnalytics'
import { toast } from 'react-toastify'
import { data } from 'react-router-dom'

// 2:16

const Habits = () => {

  const { habitData, setHabitData, addHabit, deletehabit, editHabit, markCompleteHabit } = useContext(HabitContext)
  const [showModel, setShowModel] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  const [selectedDate, setSelectedDate] = useState(today)
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    frequency: [],
    logs: []
  })

  // this state for the editing habits 
  const [isEdit, setIsEdit] = useState(false)
  const [editingId, setEditingId] = useState(null);

  const handleEditClick = (habit) => {
    setNewHabit({
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      logs: habit.logs
    })
    setEditingId(habit._id)
    setIsEdit(true)
    setShowModel(true)
  }




  const handleCompleteClick = async (id) => {
    try {

      const updatedData = await markCompleteHabit(id);
      if (updatedData) {
        setHabitData(prevHabits =>
          prevHabits.map(habit =>
            habit._id === id ? updatedData : habit
          )
        )
      }

    } catch (error) {
      console.log("Error completing habit", error)

    }
  }

  // after clicking the edit it updating the date
  const updateHabitHandle = async (e) => {
    e.preventDefault()

    try {
      await editHabit(editingId, newHabit)

      setShowModel(false)
      setIsEdit(false)
      setEditingId(null)


    } catch (error) {
      toast.error("Failed to update habit")

    }
  }



  const addHabitHandle = async (e) => {
    e.preventDefault()
    try {
      const currentDate = new Date().toISOString().split('T')[0]
      await addHabit(newHabit.name, newHabit.description, newHabit.frequency, [
        { date: currentDate, completed: false }
      ])

      // model close 
      setShowModel(false)


    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Failed to load add habit")
      }
      else {
        toast.error("An unexpected error occured");
      }

    }
  }

  const handlerDelete = async (id) => {
    await deletehabit(id)
  }


  return (
    <div className='container mx-auto p-4 space-y-6'>
      <div className="flex justify-between items-center">
        <h1 className='lg:next-3xl text-lg md:text-3xl font-bold text-[#dc2626]'>Habit Tracker</h1>
        <div className="flex flex-col items center">
          <label className='text-xs font-semibold md:text-2xl text-[#dc2626]' htmlFor="date">
            Pick the date</label>
          <input
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            type="date"
            id='date'
            className='border border-[#fca5a5] px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626] cursor-pointer  shadow-2xl'
          />

        </div>
      </div>

      {/* bhai onchange bbutton main nahi aatha>> */}
      {/* onChange={(e) => setSelectedDate(e.target.value)} */}
      <button onClick={() => setShowModel(true)} className='bg-red-500 px-4 py-2 text-white rounded-xl hover:scale-105 transition-all duration-300'>
        Add Habit
      </button>

      {showModel && (
        <div className='fixed inset-0 flex items-center justify-center bg-[#e88188]'>
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg ">
            <h2 className='text-xl flex justify-center font-bold mb-4'>{isEdit ? "Edit Habit" : "Add New Habit"}</h2>
            <form onSubmit={isEdit ? updateHabitHandle : addHabitHandle}>
              <div className='mb-4'>
                <label className='block text-gray-700'>Name</label>
                <input type="text"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  className='w-full border border-[#fca5a5] px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Description</label>
                <textarea
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                  className='w-full border border-[#fca5a5] px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]' required >
                </textarea>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Frequency</label>
                <select
                  onChange={(e) => setNewHabit({ ...newHabit, frequency: Array.from(e.target.selectedOptions, option => option.value) })}
                  value={newHabit.frequency}
                  className='w-full border border-[#fca5a5] px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]' multiple >
                  <option value="Daily">Daily</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button type='button' onClick={() => setShowModel(false)} className='w-20 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white py-2 px-4 rounded-lg transition duration-300'>
                  Cancel
                </button>
                <button type='submit' className='w-20 border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white py-2 px-4 rounded-lg  transition duration-300'>
                  {isEdit ? "Update" : "Add"}
                </button>

              </div>
            </form>

          </div>

        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-gray-100 border border-[#fca5a5] p-4 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Your Habits
          </h2>
          <div className='space-y-4 overflow-y-auto h-96'>
            {habitData.map((habit, index) => {
              return (

                <div key={index} className='flex items-center justify-between p-3 bg-white rounded shadow-sm border'>
                  <div>
                    <h3 className={`font-semibold text-gray-800 ${habit.logs?.find(log => log.date === selectedDate)?.completed ? 'line-through' : ''}`}>{habit.name}</h3>
                    <p className={`font-semibold text-gray-800 ${habit.logs?.find(log => log.date === selectedDate)?.completed ? 'line-through' : ''}`}>{habit.description}</p>

                  </div>
                  <div className='flex gap-2'>

                    {/* ye buttons tab hi dikha jab date uska aajhai thi nichya ka button render kar waooo */}
                    {selectedDate === today &&
                      <>

                        {habit.logs?.find(log => log.date?.split("T")[0] === selectedDate)?.completed ? (
                          <button className='md:px-4 md:py-2 text-sm border border-[#16a34a]  bg-[#16a34a] text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300'>
                            Completed
                          </button>

                        )
                          : (
                            <button onClick={() => handleCompleteClick(habit._id)} className='md:px-4 md:py-2 text-sm border border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white py-2 px-4 rounded-lg hover:scale-105 transition-all duration-300'>
                              Mark as done
                            </button>

                          )}
                        <button onClick={() => handleEditClick(habit)}>
                          {/* ye edit part mujhay hi banana hia??? */}
                          <FaEdit className='text-2xl text-blue-500' />
                        </button>
                        <button onClick={() => handlerDelete(habit._id)}>
                          <FaTrash className='text-2xl text-red-500' />
                        </button>
                      </>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <HabitAnalytics habits={habitData} selectedDate={selectedDate} />
      </div>


    </div>
  )
}

export default Habits
