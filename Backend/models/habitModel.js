

import mongoose from 'mongoose'


const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    frequency: [{
        type: String,
        required: true
    }],
    logs: [{
        date: String,
        completed: Boolean
    }]

})

const habbitModel = mongoose.models.Habit || mongoose.model("Habit", habitSchema)

export default habbitModel