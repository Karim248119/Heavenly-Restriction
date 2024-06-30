import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/utilities/Colors";
import { useFonts } from "expo-font";

const FoodCard = ({ name, icon }: { name: string; icon: string }) => {
  const [fontsLoaded, fontError] = useFonts({
    Espial: require(".././assets/fonts/EspialRegular15-6Y08Y.otf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.root}>
      <Image source={{ uri: icon }} style={styles.icon} />
      <Text style={styles.txt}>{name}</Text>
    </View>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: COLORS.black,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  icon: {
    width: 50,
    height: 50,
  },
  txt: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Espial",
  },
});
