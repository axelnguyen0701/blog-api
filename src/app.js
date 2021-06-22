const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

//Cors:
app.use(cors());
//Routes:
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");

//MONGO STUFF
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", (req, res) => {
  console.log("Mongoose connected");
});

//JSON PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routers:
app.use("/posts", posts);
app.use("/users", users);
app.use("/comments", comments);

//Errors:

app.get("*", function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

  error.statusCode = 301;

  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;

  if (error.statusCode === 301) {
    return res.status(301).json({ error: "Not found" });
  }

  return res.status(error.statusCode).json({ error: error.toString() });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Listening on port" + " " + PORT);
});
