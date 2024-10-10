const express = require("express");
const router = express.Router();
const Course = require("../models/course");

// Create Course
router.post("/courses", async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).send(course);
});

// Read All Courses
router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.status(200).send(courses);
});

// Update Course
router.put("/courses/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(course);
});

// Delete Course
router.delete("/courses/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Course deleted" });
});

module.exports = router;
