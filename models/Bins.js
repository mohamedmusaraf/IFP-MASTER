var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GeoSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

var MockSchema = new Schema(
  {
    Bin: {
      type: String,
      required: true,
      unique: true,
    },
    Type: {
      type: String,
      required: true,
    },
    serviced: {
      type: String,
      required: true,
    },
    geometry: GeoSchema,
  },
  {
    timestamps: true,
  },
  { collection: "mocks" }
);

var Mock = mongoose.model("Mocks", MockSchema);

module.exports = Mock;
