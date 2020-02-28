const express = require("express");
const cors = require("cors");
// mongoose
const mongoose = require("mongoose");
// env
require("dotenv").config();

// using express
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB db connect established!");
});

// routes
const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/user", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
