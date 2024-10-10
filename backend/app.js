const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const studentRoutes = require("./routes/studentRoutes");
const lecturerRoutes = require("./routes/lecturerRoutes");
const courseRoutes = require("./routes/courseRoutes");
const classRoutes = require("./routes/classRoutes");

mongoose.connect("mongodb://localhost:27017/MMA", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use(studentRoutes);
app.use(lecturerRoutes);
app.use(courseRoutes);
app.use(classRoutes);
app.use(
  cors({
    origin: "http://localhost:8081",
  })
);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
