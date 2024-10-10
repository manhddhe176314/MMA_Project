const express = require("express");
const router = express.Router();
const Class = require("../models/class");

// Create Class
router.post("/classes", async (req, res) => {
  const _class = new Class(req.body);
  await _class.save();
  res.status(201).send(_class);
});

// Read All Classes
router.get("/classes", async (req, res) => {
  const classes = await Class.find();
  res.status(200).send(classes);
});

// Update Class
router.put("/classes/:id", async (req, res) => {
  const _class = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(_class);
});

// Delete Class
router.delete("/classes/:id", async (req, res) => {
  await Class.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Class deleted" });
});

module.exports = router;
