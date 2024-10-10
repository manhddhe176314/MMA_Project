const express = require("express");
const router = express.Router();
const Lecturer = require("../models/lecturer");

// Create Lecturer
router.post("/lecturers", async (req, res) => {
  const lecturer = new Lecturer(req.body);
  await lecturer.save();
  res.status(201).send(lecturer);
});

// Read All Lecturers
router.get("/lecturers", async (req, res) => {
  const lecturers = await Lecturer.find();
  res.status(200).send(lecturers);
});

// Update Lecturer
router.put("/lecturers/:id", async (req, res) => {
  const lecturer = await Lecturer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(lecturer);
});

// Delete Lecturer
router.delete("/lecturers/:id", async (req, res) => {
  await Lecturer.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Lecturer deleted" });
});

module.exports = router;
