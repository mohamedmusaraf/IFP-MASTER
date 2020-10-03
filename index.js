const express = require("express");
const app = express();
var mongoose = require("mongoose");
var config = require("./config");
var adminComplain = require("./routes/adminComplains");
var adminBin = require("./routes/binRoute");

var url = config.mongoUrl;
var connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect
  .then(() => {
    console.log("Connected to Queries");
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./public"));

// Set EJS as templating engine
app.set("view engine", "ejs");

//rendering admin page
app.use("/", adminComplain);

//rendering bin route
app.use("/", adminBin);

app.listen(3001, () => console.log(`Example app listening on port ${3001}!`));
