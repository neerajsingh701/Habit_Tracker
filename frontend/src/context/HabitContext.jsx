import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cookie from 'js-cookie'
import { toast } from 'react-toastify'
import axios from 'axios'



export const HabitContext = createContext()

const HabitContextProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(cookie.get("token") || null)
    const [habitData, setHabitData] = useState([]);

    const backendURL = import.meta.env.VITE_API_URL;

    const getAuthToken = () => cookie.get("token")

    // fetching the habit from the server
    const fetchHabits = async () => {

        try {
            const { data } = await axios.get(`${backendURL}/api/user/habits`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })
            if (data.success) {
                setHabitData(data.data)
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch habit");

        }
    }


    // creating a functionality for register
    const handelRegister = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/user/register`, { name, email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                })
            if (data.success) {
                cookie.set("token", data.token, { expires: 7 })
                setToken(data.token)
                // setHabitData(data.data)
                toast.success(data.message || "Register Successfully")
                navigate("/Habits")
            }

        } catch (error) {
            console.log(error)
            toast.error("Register Failed")

        }
    }



    // creating a functionality for the login.....
    const handelLogin = async (email, password) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/user/login`, { email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                })
            if (data.success) {
                cookie.set("token", data.token, { expires: 7 })
                setToken(data.token)
                // setHabitData(data.data)
                toast.success(data.message || "Login Successfully")
                navigate("/Habits")
            }


        } catch (error) {
            console.log(error)
            toast.error("Register Failed");

        }
    }



    // now we have to show that add, edit, delete, habits..
    const addHabit = async (name, description, frequency) => {
        try {

            const { data } = await axios.post(`${backendURL}/api/user/add-habits`, { name, description, frequency },
                {
                    headers: {
                        Authorization: `Bearer ${getAuthToken()}`
                    }
                }
            )
            if (data.success) {
                toast.success(data.message || "Habit Added successfully");
                fetchHabits();
            }

        } catch (error) {
            console.log(error);
            toast.error("Faild to add habit");
            fetchHabits();
            navigate('/habits');

        }
    }

    // for delete functon for herer

    const deletehabit = async (id) => {
        try {
            const { data } = await axios.delete(`${backendURL}/api/user/habits/${id}`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })
            if (data.success) {
                toast.success(data.message || "Deleted successfully");
                fetchHabits();
            }

        } catch (error) {
            console.log(error);
            toast.error("Faild to add habit");

        }
    }



    // edit functionality
    const editHabit = async (id, updateData) => {

        try {
            const { data } = await axios.put(`${backendURL}/api/user/habits/${id}`, updateData, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })
            if (data.success) {
                toast.success(data.message || "Habit Edited Successfully");
                fetchHabits();
            }


        }

        catch (error) {
            console.log(error);
            toast.error("Faild to Edit habit");

        }
    };


    // This is for the mismatching functionality...
    const markCompleteHabit = async (id) => {
        try {
            const { data } = await axios.put(`${backendURL}/api/user/habits/completed/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`
                }
            })

            if (data.success) {
                return data.data;
            }
        } catch (error) {
            console.log(error);
            toast.error("Faild to Mismatch habit");

        }
    }

    // userEffect for re-rendering and updating the data and
    // showing the user.. information 

    useEffect(() => {
        if (token) {
            fetchHabits()
        }
    }, [token])




    // we have to the access to this data and 
    // we can use this data anyware.
    const values = {
        fetchHabits,
        backendURL,
        habitData,
        setHabitData,
        handelRegister,
        handelLogin,
        addHabit,
        deletehabit,
        editHabit,
        markCompleteHabit,
        token,
        setToken


    }

    return (
        <HabitContext.Provider value={values}>
            {children}
        </HabitContext.Provider>
    )
}

export default HabitContextProvider