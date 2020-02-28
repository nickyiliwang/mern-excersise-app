const router = require("express").Router();

let Exercise = require("../models/exercise.model");

// all exercises
router.route("/").get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error " + err));
});

// create
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  //   converting to a Date datatype
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("New Exercise Added !"))
    .catch(err => res.status(400).json("Error: ", err));
});

// retrieve/get
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error ", err));
});

// update
router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id).then(exercise => {
    const { username, description, duration, date } = req.body;

    exercise.username = username;
    exercise.description = description;
    exercise.duration = Number(duration);
    exercise.date = Date.parse(date);
  });

  exercise
    .save()
    .then(() => res.json("Exercise Updated!"))
    .catch(err => res.status(400).json("Error " + err));
});

// delete
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json("Exercise Deleted"))
    .catch(err => res.status(400).json("Error ", err));
});

module.exports = router;
