var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./users");

var complaintsSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    bin: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    damaged: {
      type: String,
    },
    overflow: {
      type: String,
    },
    frequency: {
      type: String,
    },
    smell: {
      type: String,
    },
    sensor: {
      type: String,
    },
    days: {
      type: Number,
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    other: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "complaints",
  }
);

var Complaint = mongoose.model("Complaints", complaintsSchema);

module.exports = Complaint;
