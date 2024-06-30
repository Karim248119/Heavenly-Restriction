import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "@/utilities/Colors";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { router } from "expo-router";

const { width, height } = Dimensions.get("screen");

const ExerciseCard = ({
  name,
  img,
  color,
  trainings,
  index,
  sets,
  exercises,
}: {
  name: string;
  img: string;
  color: any;
  trainings?: any;
  index: number;
  sets?: string;
  exercises?: any;
}) => {
  const [fontsLoaded, fontError] = useFonts({
    Espial: require(".././assets/fonts/EspialRegular15-6Y08Y.otf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => {
        router.push({
          pathname: "screens/TrainingDetails",
          params: {
            name: name,
            img: img,
            color: color,
            trainings: JSON.stringify(trainings),
            index: index,
            exercises: exercises,
          },
        });
      }}
    >
      <View style={styles.imgContainer}>
        <Image source={{ uri: img }} style={styles.img} />
      </View>
      <View style={{ gap: 5 }}>
        <Text style={styles.txt}>{name}</Text>
        <Text style={[styles.txt, styles.rounds]}>
          {sets ? sets : "3 x 15"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  root: {
    width,
    height: 100,
    borderRadius: 10,
    backgroundColor: COLORS.black,
    marginHorizontal: 10,
    marginVertical: 20,

    alignItems: "center",
    gap: 3,
    flexDirection: "row",
  },
  imgContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  txt: {
    fontSize: 14,
    color: "#fff",
    fontFamily: "Espial",
    width: width - 150,
    textTransform: "capitalize",
    lineHeight: 20,
  },
  rounds: {
    fontSize: 10,
    color: "gray",
  },
});
