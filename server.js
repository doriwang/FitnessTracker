// require dependencies and models
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const Workout = require("./models");

// setting up port and middleware
const PORT = process.env.PORT || 8080;
const app = express();
app.use(logger("dev"));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(express.static("public"));

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// routes
app.get("/api/workouts", (req, res) => {
    Workout.find({}).then(data => {
        res.json(data)
        console.log(data)
    }).catch(err => {
        res.json(err)
    })
})

// app.post("/api/workouts", (req, res) => {
//     Workout.create(req.body).then(data => {
//         res.json(data)
//         console.log(data)
//     }).catch(err => {
//         res.json(err)
//     })
// })

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});