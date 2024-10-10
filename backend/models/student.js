const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  age: Number,
  class: String,
});

module.exports = mongoose.model("Student", studentSchema);
