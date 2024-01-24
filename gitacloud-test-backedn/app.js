const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRoutes = require("./src/routes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://r:20020201045@cluster0.20iex.mongodb.net/gitacloud_test",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

if (db) {
  console.log("db successfully connected");
} else {
  console.log("Error in db connection");
}

app.use("/api", apiRoutes);

// simple route
app.get("/", (req, res) => {
  res.send("successfully working");
});

app.listen(8000, () => {
  console.log("server run on 8000");
});
