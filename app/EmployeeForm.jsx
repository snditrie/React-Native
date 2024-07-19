import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import COLORS from "../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, updateEmployee } from "../redux/feature/employeeSlice";
import { launchImageLibrary } from "react-native-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

const EmployeeForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    hireDate: new Date(),
    position: "",
    salary: "",
    profileImage: null,
  });

  const positionEmployee = [
    { label: "Cashier", value: "1" },
    { label: "Manager", value: "2" },
  ];

  const { employees } = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const { id } = useLocalSearchParams();
  const isEditMode = Boolean(id);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const employee = employees.find((emp) => emp.id === id);
      if (employee) {
        setFormValues({
          fullName: employee.fullName,
          email: employee.email,
          phone: employee.phone,
          hireDate: new Date(employee.hireDate),
          position: employee.position,
          salary: employee.salary,
          profileImage: employee.profileImage,
        });
        setValue(employee.position); // Set position value
      }
    }
  }, [isEditMode, id, employees]);

  const handleAddOrUpdateEmployee = () => {
    const { fullName, email, phone ,salary } = formValues;
    if (!fullName || !email || !phone  ||!salary) {
      Alert.alert("Error", "All fields must be filled out.");
      return;
    }

    const employeeData = {
      ...formValues,
      hireDate: formValues.hireDate.toISOString().split("T")[0],
      position: value, // Set the position value
    };

    if (isEditMode) {
      dispatch(updateEmployee({ id, ...employeeData }))
        .then(() => {
          Alert.alert("Success", "Employee updated successfully.");
          router.push("employee");
        })
        .catch((error) => {
          Alert.alert("Error", error.message || "Failed to update employee.");
        });
    } else {
      dispatch(createEmployee(employeeData))
        .then(() => {
          Alert.alert("Success", "Employee added successfully.");
          router.push("employee");
        })
        .catch((error) => {
          Alert.alert("Error", error.message || "Failed to add employee.");
        });
    }
    // Clear form after submission
    setFormValues({
      fullName: "",
      email: "",
      phone: "",
      hireDate: new Date(),
      position: "",
      salary: "",
      profileImage: null,
    });
    setValue(null);
    router.push("employee");
  };

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel || response.error) {
        console.log("User cancelled image picker or an error occurred");
      } else {
        setFormValues({ ...formValues, profileImage: response.assets[0] });
      }
    });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formValues.hireDate;
    setShowDatePicker(false);
    setFormValues({ ...formValues, hireDate: currentDate });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isEditMode ? "Edit Employee" : "Add Employee"}
        </Text>
        <ScrollView style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={formValues.fullName}
            onChangeText={(text) =>
              setFormValues({ ...formValues, fullName: text })
            }
            placeholder="Enter full name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formValues.email}
            onChangeText={(text) =>
              setFormValues({ ...formValues, email: text })
            }
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formValues.phone}
            onChangeText={(text) =>
              setFormValues({ ...formValues, phone: text })
            }
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Hire Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              {formValues.hireDate.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formValues.hireDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <Text style={styles.label}>Position</Text>
          <Dropdown
            style={styles.input}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={positionEmployee}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
          />

          <Text style={styles.label}>Salary</Text>
          <TextInput
            style={styles.input}
            value={formValues.salary}
            onChangeText={(text) =>
              setFormValues({ ...formValues, salary: text })
            }
            placeholder="Enter salary"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Profile Image</Text>
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={handleImagePicker}
            >
              <Text style={styles.imagePickerButtonText}>
                Choose Profile Image
              </Text>
            </TouchableOpacity>
            <Text style={styles.supportedFormats}>.jpg/.png</Text>
          </View>
          {formValues.profileImage && (
            <Image
              source={{ uri: formValues.profileImage.uri }}
              style={styles.profileImagePreview}
            />
          )}

          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.buttonAction}
              onPress={handleAddOrUpdateEmployee}
            >
              <Text style={styles.buttonText}>
                {isEditMode ? "Update Employee" : "Add Employee"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonAction}
              onPress={() => router.push("employee")}
            >
              <Text style={styles.buttonText}>
                {isEditMode ? "Cancel" : "Show All Employee"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.black,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: COLORS.black,
  },
  input: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  buttonAction: {
    backgroundColor: COLORS.blue,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 10,
  },
  imagePickerButtonText: {
    fontSize: 18,
    color: COLORS.white,
  },
  imagePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: COLORS.darkgrey,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  supportedFormats: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  profileImagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 16,
  },
  dateButton: {
    height: 40,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    color: COLORS.black,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
