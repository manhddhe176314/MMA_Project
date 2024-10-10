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

const LecturerScreen = () => {
  const [lecturers, setLecturers] = useState([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [lecturerToDelete, setLecturerToDelete] = useState(null);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lecturers");
      setLecturers(response.data);
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  const handleAddOrUpdateLecturer = async () => {
    const lecturerData = { name, department, course };

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/lecturers/${selectedLecturerId}`,
          lecturerData
        );
        setSuccessMessage("Lecturer updated successfully!");
      } else {
        await axios.post("http://localhost:5000/lecturers", lecturerData);
        setSuccessMessage("Lecturer added successfully!");
      }
      fetchLecturers();
      resetForm();
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("Error adding/updating lecturer:", error);
    }
  };

  const handleEditLecturer = (lecturer) => {
    setSelectedLecturerId(lecturer._id);
    setName(lecturer.name);
    setDepartment(lecturer.department);
    setCourse(lecturer.course);
    setIsEditMode(true);
    setShowModal(true);
  };

  const confirmDelete = (lecturerId) => {
    setLecturerToDelete(lecturerId);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteLecturer = async () => {
    try {
      await axios.delete(`http://localhost:5000/lecturers/${lecturerToDelete}`);
      fetchLecturers();
      setSuccessMessage("Lecturer deleted successfully!");
      setShowSuccessModal(true); // Show success modal
      setShowDeleteConfirmModal(false); // Close delete confirmation modal
    } catch (error) {
      console.error("Error deleting lecturer:", error);
    }
  };

  const resetForm = () => {
    setSelectedLecturerId("");
    setName("");
    setDepartment("");
    setCourse("");
    setShowModal(false);
    setIsEditMode(false);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add Lecturer"
        onPress={() => setShowModal(true)}
        color="#007BFF"
        style={styles.addButton}
      />
      <FlatList
        data={lecturers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.department}</Text>
            <Text style={styles.cell}>{item.course}</Text>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => handleEditLecturer(item)} />
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
            {isEditMode ? "Edit Lecturer" : "Add Lecturer"}
          </Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Department"
            value={department}
            onChangeText={setDepartment}
            style={styles.input}
          />
          <TextInput
            placeholder="Course"
            value={course}
            onChangeText={setCourse}
            style={styles.input}
          />
          <Button
            title={isEditMode ? "Update Lecturer" : "Add Lecturer"}
            onPress={handleAddOrUpdateLecturer}
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
          <Text>Are you sure you want to delete this lecturer?</Text>
          <View style={styles.confirmButtons}>
            <Button
              title="Cancel"
              onPress={() => setShowDeleteConfirmModal(false)}
            />
            <Button title="Delete" onPress={handleDeleteLecturer} color="red" />
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

export default LecturerScreen;
