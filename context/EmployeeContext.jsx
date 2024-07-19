import React, { createContext, useState } from "react";

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    {
      id: "1",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      hireDate: "2024-07-17",
      position: "Manager",
      salary: "5000",
      profileImage: require("../assets/profile.jpeg"),
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "9876543210",
      hireDate: "2024-07-18",
      position: "Cashier",
      salary: "3000",
      profileImage: require("../assets/profile.jpeg"),
    },
  ]);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const updateEmployee = (updateEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updateEmployee.id ? updateEmployee : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext, EmployeeProvider };
