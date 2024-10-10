import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import Home from "./src/components/Home";
import StudentScreen from "./src/components/StudentScreen";
import LecturerScreen from "./src/components/LecturerScreen";
import CourseScreen from "./src/components/CourseScreen";
import ClassScreen from "./src/components/ClassScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Education Management"
            component={Home}
            options={{
              headerTitleAlign: "center", // Center the title
              headerStyle: styles.header,
              headerTintColor: "#fff",
              headerTitleStyle: styles.headerTitle,
            }}
          />
          <Stack.Screen
            name="Student"
            component={StudentScreen}
            options={{
              headerTitleAlign: "center", // Center the title
              headerStyle: styles.header,
              headerTintColor: "#fff",
              headerTitleStyle: styles.headerTitle,
            }}
          />
          <Stack.Screen
            name="Lecturer"
            component={LecturerScreen}
            options={{
              headerTitleAlign: "center", // Center the title
              headerStyle: styles.header,
              headerTintColor: "#fff",
              headerTitleStyle: styles.headerTitle,
            }}
          />
          <Stack.Screen
            name="Course"
            component={CourseScreen}
            options={{
              headerTitleAlign: "center", // Center the title
              headerStyle: styles.header,
              headerTintColor: "#fff",
              headerTitleStyle: styles.headerTitle,
            }}
          />
          <Stack.Screen
            name="Class"
            component={ClassScreen}
            options={{
              headerTitleAlign: "center", // Center the title
              headerStyle: styles.header,
              headerTintColor: "#fff",
              headerTitleStyle: styles.headerTitle,
            }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Soft light gray background
  },
  header: {
    backgroundColor: "#2196F3", // Header background color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default App;
