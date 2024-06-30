import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { COLORS } from "@/utilities/Colors";

const { width, height } = Dimensions.get("screen");
const Header = ({ title }: { title: string }) => {
  const [loaded] = useFonts({
    rawhide: require(".././assets/fonts/rawhide_raw_2012.ttf"),
  });

  return (
    <Text
      style={{
        width,
        backgroundColor: COLORS.black,
        position: "absolute",
        top: -(width / 3) + 120,
        height: 100,
        color: "#fff",
        fontSize: 20,
        fontFamily: "rawhide",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: 100,
        paddingLeft: 20,
      }}
    >
      {title}
    </Text>
  );
};

export default Header;

const styles = StyleSheet.create({});
