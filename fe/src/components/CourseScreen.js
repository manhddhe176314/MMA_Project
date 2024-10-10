import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

const CourseScreen = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [lectures, setLectures] = useState([]);
  const [department, setDepartment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddOrUpdateCourse = async () => {
    const courseData = { name, code, lectures, department };

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/courses/${selectedCourseId}`,
          courseData
        );
        setSuccessMessage("Course updated successfully!");
      } else {
        await axios.post("http://localhost:5000/courses", courseData);
        setSuccessMessage("Course added successfully!");
      }
      fetchCourses();
      resetForm();
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("Error adding/updating course:", error);
    }
  };

  const handleEditCourse = (course) => {
    setSelectedCourseId(course._id);
    setName(course.name);
    setCode(course.code);
    setLectures(course.lectures);
    setDepartment(course.department);
    setIsEditMode(true);
    setShowModal(true);
  };

  const confirmDelete = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteCourse = async () => {
    try {
      await axios.delete(`http://localhost:5000/courses/${courseToDelete}`);
      fetchCourses();
      setSuccessMessage("Course deleted successfully!");
      setShowSuccessModal(true); // Show success modal
      setShowDeleteConfirmModal(false); // Close delete confirmation modal
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const resetForm = () => {
    setSelectedCourseId("");
    setName("");
    setCode("");
    setLectures([]);
    setDepartment("");
    setShowModal(false);
    setIsEditMode(false);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add Course"
        onPress={() => setShowModal(true)}
        color="#007BFF"
        style={styles.addButton}
      />
      <FlatList
        data={courses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.code}</Text>
            {/* <Text style={styles.cell}>{item.lectures.join(", ")}</Text> */}
            <Text style={styles.cell}>{item.department}</Text>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => handleEditCourse(item)} />
              <Button
                title="Delete"
                onPress={() => confirmDelete(item._id)}
                color="red"
              />
            </View>
          </View>
        )}
      />

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isEditMode ? "Edit Course" : "Add Course"}
          </Text>
          <TextInput
            placeholder="Course Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Course Code"
            value={code}
            onChangeText={setCode}
            style={styles.input}
          />
          <TextInput
            placeholder="Department"
            value={department}
            onChangeText={setDepartment}
            style={styles.input}
          />
          <TextInput
            placeholder="Lectures (comma separated)"
            value={lectures.join(", ")}
            onChangeText={(text) => setLectures(text.split(","))}
            style={styles.input}
          />
          <Button
            title={isEditMode ? "Update Course" : "Add Course"}
            onPress={handleAddOrUpdateCourse}
          />
          <Button title="Cancel" onPress={resetForm} color="gray" />
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{successMessage}</Text>
          <Button title="Close" onPress={() => setShowSuccessModal(false)} />
        </View>
      </Modal>

      {/* Confirmation Modal for Delete */}
      <Modal visible={showDeleteConfirmModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirm Delete</Text>
          <Text>Are you sure you want to delete this course?</Text>
          <View style={styles.confirmButtons}>
            <Button
              title="Cancel"
              onPress={() => setShowDeleteConfirmModal(false)}
            />
            <Button title="Delete" onPress={handleDeleteCourse} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    textAlign: "center",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    width: 100,
    height: 40,
    borderRadius: 5,
  },
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CourseScreen;
