import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IMGS } from "@/utilities/Imgs";

const { width, height } = Dimensions.get("screen");
const Loading = ({ color }: { color: string }) => {
  const colorPICK = () => {
    if (color == "p") {
      return IMGS.pLoad;
    } else if (color == "g") {
      return IMGS.gLoad;
    } else {
      return IMGS.cLoad;
    }
  };
  return (
    <View style={styles.loadingContainer}>
      <Image
        source={colorPICK()}
        style={{ width: width / 1.5, height: width / 1.5 }}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    width,
    height: width / 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
});
