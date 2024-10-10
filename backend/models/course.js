const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  lecture: [String], // Array of lecturer names or IDs
  department: String,
});

module.exports = mongoose.model("Course", courseSchema);
