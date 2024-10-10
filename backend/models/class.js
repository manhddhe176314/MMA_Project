const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classId: String,
  name: String,
  student: [String], // Array of student IDs
  courses: [String], // Array of course codes
});

module.exports = mongoose.model("Class", classSchema);
