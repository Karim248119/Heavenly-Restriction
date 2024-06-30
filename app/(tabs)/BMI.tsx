import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import { COLORS } from "@/utilities/Colors";
import { IMGS } from "@/utilities/Imgs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const { width, height } = Dimensions.get("screen");
const BMI = () => {
  const [fontsLoaded, fontError] = useFonts({
    rawhide: require("./../../assets/fonts/rawhide_raw_2012.ttf"),
    Armwarmer: require("./../../assets/fonts/Armwarmer.otf"),
    Stradale: require("./../../assets/fonts/Personal License/Stradale.ttf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("70");
  const [isMan, setIsman] = useState(true);
  const BMI = Math.round(+weight / (+height / 100) / (+height / 100));

  const calcBMI = () => {
    if (BMI < 18.5) {
      return IMGS.underweight;
    } else if (BMI > 18.5 && BMI < 24.5) {
      return IMGS.normal;
    } else if (BMI > 25 && BMI < 29.9) {
      return IMGS.overweight;
    } else if (BMI > 30 && BMI < 34.9) {
      return IMGS.obese;
    } else {
      return IMGS.exobese;
    }
  };
  return (
    <ScrollView style={styles.root}>
      <View style={styles.card}>
        <Image
          source={isMan ? IMGS.male : IMGS.female}
          style={styles.cardImg}
        />

        <Pressable
          style={styles.gender}
          onPress={() => {
            setIsman(true);
          }}
        >
          <View style={styles.line}>
            <MaterialIcons
              name={isMan ? "radio-button-on" : "radio-button-off"}
              size={24}
              color={COLORS.red}
            />
            <Text style={[styles.txt, styles.txtGender]}>Male</Text>
          </View>
          <Pressable
            style={styles.line}
            onPress={() => {
              setIsman(false);
            }}
          >
            <MaterialIcons
              name={!isMan ? "radio-button-on" : "radio-button-off"}
              size={24}
              color={COLORS.red}
            />
            <Text style={[styles.txt, styles.txtGender]}>Female</Text>
          </Pressable>
        </Pressable>
      </View>
      <View style={[styles.card, styles.sizes]}>
        <View style={{ marginVertical: 30 }}>
          <Text
            style={[
              styles.txt,
              { fontSize: 20, lineHeight: 20, textAlign: "center" },
            ]}
          >
            {height} cm
          </Text>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="human-male-height"
              size={24}
              color={COLORS.red}
              style={{ marginRight: -10 }}
            />
            <Slider
              style={{ width: "90%", height: 50 }}
              minimumValue={50}
              maximumValue={230}
              step={1}
              minimumTrackTintColor={COLORS.red}
              maximumTrackTintColor="#fff"
              thumbImage={IMGS.indicator}
              value={+height}
              onValueChange={(value: any) => setHeight(value)}
            />
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.txt,
              { fontSize: 20, lineHeight: 20, textAlign: "center" },
            ]}
          >
            {weight} kg
          </Text>
          <View style={styles.row}>
            <FontAwesome5 name="weight" size={24} color={COLORS.red} />
            <Slider
              style={{ width: "90%", height: 50 }}
              minimumValue={20}
              maximumValue={200}
              step={1}
              minimumTrackTintColor={COLORS.red}
              maximumTrackTintColor="#fff"
              thumbImage={IMGS.indicator}
              value={+weight}
              onValueChange={(value: any) => setWeight(value)}
            />
          </View>
        </View>
        <View style={styles.circle} />
      </View>

      <ImageBackground source={calcBMI()} style={styles.bmi}>
        <Text style={[styles.txt, { fontSize: 32, lineHeight: 32 }]}>
          {isNaN(BMI) ? "" : BMI}
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};

export default BMI;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  card: {
    width: "85%",
    height: 120,
    backgroundColor: COLORS.blackL,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: width / 3 + 50,
    marginHorizontal: "auto",
  },

  cardImg: {
    width: 135,
    height: 190,
    position: "absolute",
    bottom: 0,
    right: -10,
  },
  gender: {
    flex: 2,
    width: "65%",
    paddingHorizontal: 10,
    height: "100%",
    justifyContent: "center",
    gap: 20,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  txtGender: {
    fontFamily: "rawhide",
    width: "100%",
    fontSize: 16,
    lineHeight: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  txt: {
    fontSize: 10,
    lineHeight: 10,
    fontFamily: "Armwarmer",
    color: "#fff",
  },
  sizes: {
    marginTop: 25,
    height: 350,
    padding: 10,
    justifyContent: "flex-start",
  },
  circle: {
    width: width - 100,
    height: width - 100,
    borderRadius: (width - 100) / 2,
    backgroundColor: COLORS.black,
    position: "absolute",
    bottom: -(width - 100) / 2,
    alignSelf: "center",
  },
  bmi: {
    width: width - 120,
    height: width - 120,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    top: -(width - 120) / 2,
    marginBottom: -(width - 150) / 2,
  },
});
