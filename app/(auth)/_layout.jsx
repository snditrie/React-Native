import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../../context/AuthContext";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
