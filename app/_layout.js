import { Slot, router, useSegments } from "expo-router";
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  const segments = useSegments();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "app";
    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (isAuthenticated === false) {
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider className="flex-1">
      <MainLayout />
    </AuthContextProvider>
  );
}
