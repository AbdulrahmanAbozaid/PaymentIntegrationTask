const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  name: String,
  description: String,
  price: { type: Number, required: true },
  image: String,
});

module.exports = mongoose.model("Items", itemSchema);
