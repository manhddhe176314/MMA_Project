const mongoose = require("mongoose");

const lecturerSchema = new mongoose.Schema({
  name: String,
  department: String,
  course: [String], // Array of course codes
});

module.exports = mongoose.model("Lectures", lecturerSchema);
