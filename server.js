// require dependencies and models
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
            req.params.id, {
                $push: {
                    exercises: req.body,
                },
            }, {
                new: true,
                runValidators: true,
            }
        )
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});