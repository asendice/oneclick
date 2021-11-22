const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const headerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    altNames: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "headers",
  }
);

module.exports = mongoose.model("Header", headerSchema);