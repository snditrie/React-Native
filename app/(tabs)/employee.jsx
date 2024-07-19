import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, fetchEmployees } from "../../redux/feature/employeeSlice";
import COLORS from "../../constants/color";

const Employee = () => {
  const { employees } = useSelector((state) => state.employee);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchEmployees()).then(() => setIsLoading(false));
  }, [dispatch]);

  const handleEditEmployee = (id) => {
    router.push({ pathname: "EmployeeForm", params: { id } });
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <View style={styles.employeeInfo}>
        {item.profileImage && (
          <Image source={item.profileImage} style={styles.employeeImage} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.titleEmployee}>{item.fullName}</Text>
          <Text style={styles.employeeText}>{item.position}</Text>
          <Text style={styles.employeeText}>{item.email}</Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() => handleEditEmployee(item.id)}>
          <Ionicons name="pencil-outline" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteEmployee(item.id)}>
          <Ionicons name="trash" size={24} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Employee List</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.replace("EmployeeForm")}
          >
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={COLORS.white}
            />
            <Text style={styles.addButtonText}>Add Employee</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={employees}
            renderItem={renderEmployeeItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Employee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.black,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 8,
  },
  employeeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  employeeInfo: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  employeeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  titleEmployee: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.black,
  },
  employeeText: {
    fontSize: 16,
    color: COLORS.black,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
