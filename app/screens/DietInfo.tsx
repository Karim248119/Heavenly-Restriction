import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { COLORS } from "@/utilities/Colors";
import FoodCard from "@/components/FoodCard";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ExternalLink } from "@/components/ExternalLink";
import { IMGS } from "@/utilities/Imgs";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("screen");
const tips = [
  "Minimize your carb consumption",
  "Include coconut oil in your diet",
  "Ramp up your physical activity",
  "Increase your healthy fat intake",
  "Try a short fast or a fat fast",
  "Maintain adequate protein intake",
  "Test ketone levels and adjust your diet as needed",
];

const DietInfo = () => {
  const { item } = useLocalSearchParams<{ item: any }>();
  const parsedItem = JSON.parse(item); // Parse the stringified item back to an object
  const [fontsLoaded, fontError] = useFonts({
    rawhide: require("./../../assets/fonts/rawhide_raw_2012.ttf"),
    Recordtipos: require("./../../assets/fonts/Recordtipos-Regular.ttf.otf"),
    Stradale: require("./../../assets/fonts/Personal License/Stradale.ttf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.blackL }}>
      <StatusBar
        style="light"
        hidden={true}
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.cont}>
        <ImageBackground style={styles.img} source={{ uri: parsedItem.img }}>
          <View style={styles.overlay} />
          <Text style={styles.title}>{parsedItem.name}</Text>
          <TouchableOpacity
            style={{ top: 30, left: 15 }}
            onPress={() => {
              router.back();
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={35}
              color={COLORS.cyan}
            />
          </TouchableOpacity>
          <Image
            source={IMGS.eat}
            style={{
              position: "absolute",
              bottom: 0,
              right: -10,
              width: width / 2,
              height: width / 2,
            }}
          />
        </ImageBackground>
      </View>
      <View style={styles.details}>
        <Text style={styles.describtion}>{parsedItem.info?.description}</Text>
        <View style={styles.row}>
          <MaterialIcons
            name="tips-and-updates"
            size={22}
            color={COLORS.cyan}
          />
          <Text style={styles.subtitle}>Tips</Text>
        </View>
        {parsedItem.tips && parsedItem.tips.length > 0 && (
          <View style={styles.tipsContainer}>
            {parsedItem.tips.map((tip: string, index: number) => (
              <View style={styles.line} key={index}>
                <MaterialCommunityIcons
                  name="checkbox-multiple-blank-circle"
                  size={10}
                  color={COLORS.cyan}
                />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}

        <View>
          <View style={styles.row}>
            <Ionicons name="checkmark-circle" size={22} color={COLORS.cyan} />
            <Text style={styles.subtitle}>What to eat</Text>
          </View>

          <FlatList
            horizontal
            data={parsedItem?.info?.friendly}
            renderItem={({ item }) => (
              <FoodCard name={item.name} icon={item.icon} />
            )}
          />
        </View>
        <View>
          <View style={styles.row}>
            <Ionicons name="warning" size={22} color={COLORS.cyan} />
            <Text style={styles.subtitle}>What to avoid</Text>
          </View>

          <FlatList
            horizontal
            data={parsedItem?.info?.avoid}
            renderItem={({ item }) => (
              <FoodCard name={item.name} icon={item.icon} />
            )}
          />
        </View>
        <TouchableOpacity style={styles.btn}>
          <ExternalLink href={parsedItem.moreInfo}>
            <Text
              style={[styles.subtitle, { color: COLORS.black, fontSize: 25 }]}
            >
              Learn More
            </Text>
          </ExternalLink>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cont: {
    width,
    height: 250,
    borderBottomLeftRadius: 100,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    width: width / 2,
    lineHeight: 30,
    position: "absolute",
    fontSize: 20,
    color: "transparent",
    bottom: 20,
    left: 40,
    fontFamily: "rawhide",
    zIndex: 20,
  },
  describtion: {
    fontSize: 18,
    lineHeight: 30,
    color: "#fff",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 0,
    fontFamily: "Recordtipos",
  },
  details: {},
  tipsContainer: {
    marginLeft: 20,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 10,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 50,
    marginBottom: 10,
    marginLeft: 20,
  },
  tipText: {
    marginLeft: 10,
    color: "#fff",
    margin: 5,
    width: width - 100,
  },
  subtitle: {
    color: "#fff",
    fontSize: 22,
    fontFamily: "Recordtipos",
    marginLeft: 5,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "80%",
    height: 50,
    backgroundColor: COLORS.cyan,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 40,
  },
});

export default DietInfo;
