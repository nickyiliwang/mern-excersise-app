const router = require("express").Router();

let Exercise = require("../models/exercise.model");

// all exercises
router.route("/").get((res, req) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error " + err));
});

router.route("/add").post((res, req) => {
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

module.exports = router;
