
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const HabitAnalytics = ({ habits, selectedDate }) => {

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() - 1)).toISOString().split("T")[0];


  // calculating the today completed tasks..
  const completedToday = habits.filter((habits) =>
    habits.logs?.some((log) => log.date?.split("T")[0] === selectedDate && log.completed)).length

  // calculating the yesterday completed tasks...
  const completedYesterday = habits.filter((habits) =>
    habits.logs.some((log) => log.date?.split("T")[0] === yesterday && log.completed)).length

  const totalHabits = habits.length;

  const progressToday = totalHabits ? (completedToday / totalHabits) * 100 : 0


  // border border-[#fca5a5] px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dc2626]


  return (
    <div className='bg-white p-6 border border-[#fca5a5] h-auto rounded-3xl shadow-2xl'>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Analytics
      </h2>

      {selectedDate === today && (
        <>
          <div className='mb-5'>
            <p className='text-xl font-semibold text-gray-700'>
              Total Habits Added: <span className='ml-2 text-2xl font-bold text-grey-900'>{totalHabits}</span>

            </p>
          </div>
        </>
      )}

      <div className='mb-5'>
        <p className='text-xl font-semibold text-gray-700'>
          Completed Habits {selectedDate === today ? "Today" : `on ${selectedDate}`}:<span>{completedToday}</span>
        </p>
      </div>

      <div className='mb-5 flex items-center justify-center mt-4'>
        <div style={{ width: '200px', height: '200px' }}>
          <CircularProgressbar

            value={progressToday}
            text={`${Math.round(progressToday)}%`}
            styles={buildStyles({
              textColor: "#111827",
              pathColor: "#4f46e5",
              trailColor: "#e5e7eb",
              textSize: '11px',
              pathTransition: 'stroke-dashoffset 0.5s ease 0s'
            })}
          />
        </div>
      </div>

      {/* Here i will show the complteted habit like how much from
      completed habiit from yesterday */}

      <div className='flex flex-row items-center justify-start'>
        <p className='text-xl font-semibold text-gray-700'>
          {completedToday} Habit completed  {selectedDate === today ?
            "Today"
            : selectedDate === yesterday
              ? "Yesterday"
              : `on ${selectedDate}`
          }
        </p>

      </div>



    </div>
  )
}

export default HabitAnalytics
