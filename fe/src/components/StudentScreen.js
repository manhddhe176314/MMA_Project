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

const StudentScreen = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddOrUpdateStudent = async () => {
    const studentData = { studentId, name, age, class: className };

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/students/${selectedStudentId}`,
          studentData
        );
        setSuccessMessage("Student updated successfully!");
      } else {
        await axios.post("http://localhost:5000/students", studentData);
        setSuccessMessage("Student added successfully!");
      }
      fetchStudents();
      resetForm();
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("Error adding/updating student:", error);
    }
  };

  const handleEditStudent = (student) => {
    setSelectedStudentId(student._id);
    setStudentId(student.studentId);
    setName(student.name);
    setAge(student.age);
    setClassName(student.class);
    setIsEditMode(true);
    setShowModal(true);
  };

  const confirmDelete = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteStudent = async () => {
    try {
      await axios.delete(`http://localhost:5000/students/${studentToDelete}`);
      fetchStudents();
      setSuccessMessage("Student deleted successfully!");
      setShowSuccessModal(true); // Show success modal
      setShowDeleteConfirmModal(false); // Close delete confirmation modal
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const resetForm = () => {
    setSelectedStudentId("");
    setStudentId("");
    setName("");
    setAge("");
    setClassName("");
    setShowModal(false);
    setIsEditMode(false);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add Student"
        onPress={() => setShowModal(true)}
        color="#007BFF"
        style={styles.addButton}
      />
      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.studentId}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.age}</Text>
            <Text style={styles.cell}>{item.class}</Text>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => handleEditStudent(item)} />
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
            {isEditMode ? "Edit Student" : "Add Student"}
          </Text>
          <TextInput
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
            style={styles.input}
          />
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Class"
            value={className}
            onChangeText={setClassName}
            style={styles.input}
          />
          <Button
            title={isEditMode ? "Update Student" : "Add Student"}
            onPress={handleAddOrUpdateStudent}
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
          <Text>Are you sure you want to delete this student?</Text>
          <View style={styles.confirmButtons}>
            <Button
              title="Cancel"
              onPress={() => setShowDeleteConfirmModal(false)}
            />
            <Button title="Delete" onPress={handleDeleteStudent} color="red" />
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

export default StudentScreen;
