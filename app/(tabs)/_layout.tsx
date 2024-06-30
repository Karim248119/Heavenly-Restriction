import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { COLORS } from "@/utilities/Colors";
import { DefaultTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    rawhide: require("../../assets/fonts/rawhide_raw_2012.ttf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const { width, height } = Dimensions.get("screen");
  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: { fontFamily: "rawhide", width },
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: "white",
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.black,
        },
        tabBarStyle: {
          position: "absolute",
          height: width / 3,
          top: 60,
          backgroundColor: COLORS.black,
          borderColor: "transparent",
          elevation: 0,
          width: "100%",
        },
        tabBarIconStyle: {
          height: "100%",
          aspectRatio: 1,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Gym",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="dumbbell"
              size={40}
              color={focused ? COLORS.purple : "#fff"}
              style={[
                styles.icon,
                { borderColor: focused ? COLORS.purple : "#fff" },
              ]}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Workouts"
        options={{
          title: "WorkOut",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="home"
              size={40}
              color={color}
              style={[
                styles.icon,
                { borderColor: focused ? COLORS.green : "#fff" },
              ]}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Diets"
        options={{
          title: "Diets",
          tabBarIcon: ({ color, focused }) => (
            <>
              <FontAwesome6
                name="bowl-food"
                size={40}
                color={focused ? COLORS.cyan : "#fff"}
                style={[
                  styles.icon,
                  { borderColor: focused ? COLORS.cyan : "#fff" },
                ]}
              />
            </>
          ),
        }}
      />

      <Tabs.Screen
        name="BMI"
        options={{
          title: "BMI",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="body"
              size={40}
              color={focused ? COLORS.red : "#fff"}
              style={[
                styles.icon,
                { borderColor: focused ? COLORS.red : "#fff" },
              ]}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 15,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  header: {
    fontFamily: "rawhide",
  },
});
