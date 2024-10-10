import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  Text,
} from "react-native";
import axios from "axios";

const ClassScreen = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    classId: "",
    name: "",
    students: [],
    course: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Delete Confirmation Modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);

  // Fetch classes from API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/classes");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Handle add class
  const handleAddClass = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/classes",
        newClass
      );
      setClasses([...classes, response.data]);
      setSuccessMessage("Class added successfully!");
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  // Handle update class
  const handleUpdateClass = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/classes/${selectedClass._id}`,
        newClass
      );
      setClasses(
        classes.map((classItem) =>
          classItem._id === selectedClass._id ? response.data : classItem
        )
      );
      setSuccessMessage("Class updated successfully!");
      setShowSuccessModal(true);
      resetForm();
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  // Handle delete class
  const confirmDelete = (classId) => {
    setClassToDelete(classId);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteClass = async () => {
    try {
      await axios.delete(`http://localhost:5000/classes/${classToDelete}`);
      setClasses(
        classes.filter((classItem) => classItem._id !== classToDelete)
      );
      setSuccessMessage("Class deleted successfully!");
      setShowSuccessModal(true);
      setShowDeleteConfirmModal(false);
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  // Reset form state
  const resetForm = () => {
    setNewClass({ classId: "", name: "", students: [], course: "" });
    setIsEditMode(false);
    setSelectedClass(null);
    setModalVisible(false);
  };

  // Open modal for editing a class
  const openEditModal = (classItem) => {
    setNewClass(classItem);
    setSelectedClass(classItem);
    setIsEditMode(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Button title="Thêm lớp" onPress={() => setModalVisible(true)} />

      <FlatList
        data={classes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.classId}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.course}</Text>
            <View style={styles.actions}>
              <Button title="Sửa" onPress={() => openEditModal(item)} />
              <Button
                title="Xóa"
                onPress={() => confirmDelete(item._id)}
                color="red"
              />
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isEditMode ? "Sửa lớp" : "Thêm lớp"}
          </Text>
          <TextInput
            placeholder="Mã lớp"
            value={newClass.classId}
            onChangeText={(text) => setNewClass({ ...newClass, classId: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Tên lớp"
            value={newClass.name}
            onChangeText={(text) => setNewClass({ ...newClass, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Khóa học"
            value={newClass.course}
            onChangeText={(text) => setNewClass({ ...newClass, course: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Sinh viên (cách nhau bằng dấu phẩy)"
            value={newClass.students.join(", ")} // Assuming you enter comma-separated student IDs
            onChangeText={(text) =>
              setNewClass({ ...newClass, students: text.split(", ") })
            }
            style={styles.input}
          />
          <Button
            title={isEditMode ? "Cập nhật lớp" : "Thêm lớp"}
            onPress={isEditMode ? handleUpdateClass : handleAddClass}
          />
          <Button title="Hủy" onPress={resetForm} color="gray" />
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{successMessage}</Text>
          <Button title="Đóng" onPress={() => setShowSuccessModal(false)} />
        </View>
      </Modal>

      {/* Confirmation Modal for Delete */}
      <Modal visible={showDeleteConfirmModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Xác nhận xóa</Text>
          <Text>Bạn có chắc chắn muốn xóa lớp này không?</Text>
          <View style={styles.confirmButtons}>
            <Button
              title="Hủy"
              onPress={() => setShowDeleteConfirmModal(false)}
            />
            <Button title="Xóa" onPress={handleDeleteClass} color="red" />
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
    flex: 1,
    textAlign: "center",
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
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ClassScreen;
