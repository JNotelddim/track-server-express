require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const credentials = require("./db.hide");
const { email, password } = credentials;

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  "mongodb+srv://" +
  email +
  ":" +
  password +
  "@cluster0-apuvb.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", err => {
  console.error("Error connecting to mongo", err);
});

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.listen(3000, () => {
  console.log("listening on p 3000");
});
