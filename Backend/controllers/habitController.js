


// in this we controll the habit like edit, delete,update and add etc


import habbitModel from "../models/habitModel.js";

const addHabit = async (req, res) => {

    try {

        const userId = req.user?.id

        const { name, description, frequency } = req.body

        if (!name || !description || !frequency) {
            return res.status(401).json({ success: false, message: "All files required" });
        }

        // we can write directly like this for date in short form option-1
        // const currentDate = new Date().toISOString().split("T")[0];
        const currentData = new Date().toISOString();
        const newLogEntry = { date: currentData, completed: false }

        // const logs = { newLogEntry }


        const newHabit = new habbitModel({
            userId,
            name,
            description,
            frequency,
            logs: [newLogEntry]
            // the below code is for option-1
            // logs: [{
            //     date: currentDate,
            //     completed: false
            // }]
        })

        const savedHabit = await newHabit.save()


        res.status(201).json({ success: true, message: "Habit added successfully", data: savedHabit })


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." })

    }
}


const deletedHabit = async (req, res) => {
    try {

        const habitId = req.params.id

        const deletedHabit = await habbitModel.findByIdAndDelete(habitId)

        if (!deletedHabit) {
            return res.status(404).json({ success: false, message: "Habit not found" })
        }

        res.status(200).json({ success: true, message: "Habit deleted successfully" })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." })

    }

}

const getHabbits = async (req, res) => {
    try {
        const userId = req.user?.id


        if (!userId) {
            return res.status(400).json({ success: false, message: "User not found" });

        }

        const habbits = await habbitModel.find({ userId }).exec()

        res.status(200).json({ success: true, data: habbits })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." })

    }
}

const editHabbits = async (req, res) => {
    try {
        const habitId = req.params.id;
        const userId = req.user?.id;

        const { name, description, frequency, logs } = req.body

        const habbit = await habbitModel.findByIdAndUpdate(
            { _id: habitId, userId: userId },
            { name, description, frequency, logs },
            { new: true }
        )

        if (!habbit) {
            return res.status(404).json({
                success: false, message: "Habit Not Found."
            })
        }

        res.status(200).json({ success: true, message: "Habit Updated Successfully", data: habbit })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." })

    }
}

const Markcompleted = async (req, res) => {
    const habitId = req.params.id;
    const todayDt = new Date().toISOString().split('T')[0]


    try {
        const updatedHabit = await habbitModel.findById(habitId);

        if (!updatedHabit) {
            res.status(404).json({success:false, message: "Habit not found" })

        }
        
        
        // check if today log exits
        let todayLog = updatedHabit.logs.find(log => log.date.startsWith(todayDt))

        if(todayLog){
            todayLog.completed = true;
        }
        else{
            updatedHabit.logs.push({date:new Date().toISOString(), completed:true})
        }

        await updatedHabit.save()


        res.status(200).json({ success: true, message: "Habit marked completed", data: updatedHabit })



    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error." })

    }

}




export { addHabit, deletedHabit, getHabbits, editHabbits, Markcompleted }