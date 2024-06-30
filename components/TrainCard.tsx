import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IMGS } from "@/utilities/Imgs";
import { useFonts } from "expo-font";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/utilities/Colors";

const { width, height } = Dimensions.get("screen");
const TrainCard = ({
  name,
  imgSource,
  color,
  onPress,
  exercises,
}: {
  name: string;
  imgSource: undefined;
  color: any;
  onPress: () => void;
  exercises: any;
}) => {
  const [fontsLoaded, fontError] = useFonts({
    rawhide: require(".././assets/fonts/rawhide_raw_2012.ttf"),
    Armwarmer: require(".././assets/fonts/Armwarmer.otf"),
    Stradale: require(".././assets/fonts/Personal License/Stradale.ttf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View
      style={{ width: width, justifyContent: "center", alignItems: "center" }}
    >
      <TouchableOpacity style={styles.root} onPress={onPress}>
        <ImageBackground source={{ uri: imgSource }} style={styles.img}>
          <View style={styles.details}>
            <Text style={styles.txt}>{name}</Text>
            <View style={styles.line}>
              <Entypo name="stopwatch" size={24} color={color} />
              <Text style={styles.subtxt}>{exercises * 5} MINS</Text>
            </View>
            <View style={styles.line}>
              <MaterialIcons name="electric-bolt" size={24} color={color} />
              <Text style={styles.subtxt}>{exercises} EXERCISE</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default TrainCard;

const styles = StyleSheet.create({
  root: {},
  img: {
    width: width / 1.3,
    aspectRatio: 1,
    justifyContent: "flex-end",
    padding: 20,
    paddingLeft: 50,
  },
  txt: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "rawhide",
    textTransform: "uppercase",
  },
  details: {
    paddingLeft: 10,
    gap: 5,
  },
  line: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    width,
  },
  subtxt: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Armwarmer",
  },
});
