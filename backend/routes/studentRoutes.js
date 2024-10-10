const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// Create Student
router.post("/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).send(student);
});

// Read All Students
router.get("/students", async (req, res) => {
  const students = await Student.find();
  res.status(200).send(students);
});

// Update Student
router.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(student);
});

// Delete Student
router.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Student deleted" });
});

module.exports = router;
