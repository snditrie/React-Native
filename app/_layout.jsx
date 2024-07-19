import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { EmployeeProvider } from "../context/EmployeeContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const RootLayout = () => {
  return (
    // <AuthProvider>
    //   <EmployeeProvider>
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="employee" options={{ headerShown: false }} /> */}
      </Stack>
    </Provider>
    //   </EmployeeProvider>
    // </AuthProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
