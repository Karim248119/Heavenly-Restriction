import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const AnimatedArrow = () => {
  return (
    <View>
      <Image
        source={require("../assets/images/gifs/system-regular-11-arrow-up.gif")}
      />
    </View>
  );
};

export default AnimatedArrow;

const styles = StyleSheet.create({});
