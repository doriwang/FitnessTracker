// link dependencies
const mongoose = require("mongoose")

// defining schema
const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: String,
        trim: true,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number
    }]
})

// exporting schema
const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout