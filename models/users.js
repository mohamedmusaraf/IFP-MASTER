var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema(
  {
    google: {
      id: String,
      token: String,
      email: String,
      name: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
