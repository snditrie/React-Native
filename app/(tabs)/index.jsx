import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import COLORS from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


// Define screen width for the chart
const screenWidth = Dimensions.get("window").width;

const EmployeeDashboard = ({ navigation }) => {
  // Sample data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Example months
    datasets: [
      {
        data: [30, 45, 28, 80, 99, 43, 60], // Example employee count data
        color: (opacity = 1) => COLORS.primary, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header Bar */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Employee Dashboard</Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="person-circle-outline" color={COLORS.white} size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {/* Employee Statistics */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Employees:</Text>
              <Text style={styles.statValue}>30</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Active Employees:</Text>
              <Text style={styles.statValue}>30</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Departments:</Text>
              <Text style={styles.statValue}>2</Text>
            </View>
          </View>

          {/* Employee Statistics Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.sectionTitle}>Employee Trends</Text>
            <LineChart
              data={data}
              width={screenWidth - 40} // Adjust chart width
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0, // Optional
                color: (opacity = 1) => COLORS.primary,
                labelColor: (opacity = 1) => COLORS.primary,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: COLORS.primary,
                },
              }}
              bezier
              style={styles.chart}
            />
          </View>

          {/* Employee List */}
          <View style={styles.employeeList}>
            <Text style={styles.sectionTitle}>Employees</Text>
            {/* Example employee items */}
            <TouchableOpacity style={styles.employeeItem}>
              <View style={styles.employeeInfo}>
                <Image
                  source={{ uri: "https://randomuser.me/api/portraits/men/75.jpg" }}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={styles.employeeName}>Alex Johnson</Text>
                  <Text style={styles.employeePosition}>Manajer</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.employeeItem}>
              <View style={styles.employeeInfo}>
                <Image
                  source={{ uri: "https://randomuser.me/api/portraits/women/65.jpg" }}
                  style={styles.profileImage}
                />
                <View>
                  <Text style={styles.employeeName}>Emma Smith</Text>
                  <Text style={styles.employeePosition}>Cashier</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => navigation.navigate('EmployeeForm')}
          >
            <Text style={styles.addButtonText}>Add Employee</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
    elevation: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.white,
  },
  profileButton: {
    padding: 10,
  },
  statsContainer: {
    margin: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  statItem: {
    marginBottom: 20,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  chartContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.primary,
  },
  chart: {
    borderRadius: 16,
  },
  employeeList: {
    marginHorizontal: 20,
  },
  employeeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  employeeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  employeePosition: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    elevation: 3,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
