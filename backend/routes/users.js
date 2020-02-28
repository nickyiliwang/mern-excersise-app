// importing Router method
const router = require("express").Router();
// requiring mongoose User model
let User = require("../models/user.model");

// localhost:5000/users/
router.route("/").get((req, res) => {
  // Promise to find all users
  User.find()
    // return in json format
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// /users/add post to add user
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  // save to mongoDB and return a success message
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error " + err));
});

module.exports = router;
