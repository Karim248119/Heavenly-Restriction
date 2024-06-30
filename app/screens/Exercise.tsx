import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { IMGS } from "@/utilities/Imgs";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { router, useLocalSearchParams } from "expo-router";
import { COLORS } from "@/utilities/Colors";
import FoodCard from "@/components/FoodCard";
import ExerciseCard from "@/components/ExerciseCard";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const Exercise = () => {
  const { item, color, exercises } = useLocalSearchParams<{
    item?: any;
    color: any;
    exercises: any;
  }>();
  const parsedItem = item && JSON.parse(item);

  const [loaded] = useFonts({
    rawhide: require("../../assets/fonts/rawhide_raw_2012.ttf"),
  });
  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <ScrollView>
      <ImageBackground source={{ uri: parsedItem?.bg }} style={styles.img}>
        <Text style={styles.header}>{parsedItem?.name}</Text>
        <TouchableOpacity
          style={{ top: 30, left: 15 }}
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={35} color={color} />
        </TouchableOpacity>
      </ImageBackground>
      {/* <FlatList
        data={parsedItem?.trainings}
        renderItem={({ item }) => (
          <ExerciseCard name={item.name} img={item.img} />
        )}
      /> */}
      {parsedItem?.trainings && parsedItem?.trainings.length > 0 && (
        <View style={{}}>
          {parsedItem.trainings.map((item: any) => (
            <View key={item.id} style={{}}>
              <ExerciseCard
                key={item.id}
                name={item.name}
                img={item.img}
                color={color}
                trainings={parsedItem?.trainings}
                index={item.id - 1}
                sets={item.sets}
                exercises={exercises}
              />
              <View
                style={{
                  width: "80%",
                  height: 1 / 2,
                  backgroundColor: color,
                  margin: "auto",
                }}
              />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  img: {
    width,
    height: (width * 4) / 5,
  },
  header: {
    position: "absolute",
    fontSize: 24,
    color: "white",
    bottom: 100,
    left: 12,
    fontFamily: "rawhide",
    width,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
