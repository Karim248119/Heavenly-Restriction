import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import TrainCard from "@/components/TrainCard";
import { COLORS } from "@/utilities/Colors";
import { CARDIODATA } from "../../data/cardioData";
import { IMGS } from "@/utilities/Imgs";
import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { fetchWorkouts } from "@/APIs/fetchDATA";
import Loading from "@/components/Loading";

const { width, height } = Dimensions.get("screen");

export default function WorkOut() {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [workouts, setWorkouts] = useState([]);

  const [fontsLoaded] = useFonts({
    rawhide: require("../../assets/fonts/rawhide_raw_2012.ttf"),
    Armwarmer: require("../../assets/fonts/Armwarmer.otf"),
    Stradale: require("../../assets/fonts/Personal License/Stradale.ttf"),
  });

  useEffect(() => {
    const getTrainings = async () => {
      const data = await fetchWorkouts();
      if (data) {
        setWorkouts(data);
      }
    };
    getTrainings();
  }, []);

  useEffect(() => {
    if (workouts && workouts.length > 0) {
      ref.current?.scrollToIndex({ index, animated: true });
    }
  }, [index, workouts]);

  if (!fontsLoaded) {
    return null;
  }

  const renderTrainCard = ({ item }: { item: any }) => (
    <TrainCard
      name={item.name}
      imgSource={item.img}
      color={COLORS.green}
      exercises={item.trainings.length}
      onPress={() => {
        router.push({
          pathname: "screens/Exercise",
          params: {
            item: JSON.stringify(item),
            color: COLORS.green,
            exercises: item.trainings.length,
          },
        });
      }}
    />
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.black,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "screens/Exercise",
            params: {
              item: JSON.stringify(CARDIODATA),
              color: COLORS.green,
              exercises: CARDIODATA.trainings.length,
            },
          });
        }}
        style={{
          width: "80%",
          height: 100,
          backgroundColor: COLORS.blackL,
          borderRadius: 10,
          justifyContent: "center",
          marginTop: width / 3 + 50,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            paddingLeft: 20,
            fontFamily: "rawhide",
            marginBottom: 10,
          }}
        >
          CARDIO
        </Text>
        <View
          style={{
            paddingLeft: 20,
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="local-fire-department"
            size={24}
            color={COLORS.green}
          />
          <Text style={styles.subtxt}>500 KAL</Text>
        </View>
        <Image
          source={IMGS.mcardio}
          style={{
            width: 130,
            height: 150,
            position: "absolute",
            bottom: 0,
            right: 10,
          }}
        />
      </TouchableOpacity>
      {workouts && workouts.length > 0 ? (
        <FlatList
          ref={ref}
          initialScrollIndex={index}
          scrollEnabled={false}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={workouts}
          renderItem={renderTrainCard}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <Loading color="g" />
      )}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setIndex(index - 1)}
          disabled={index <= 0}
        >
          <Image
            source={index > 0 ? IMGS.gright : IMGS.rightOff}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIndex(index + 1)}
          disabled={index >= (workouts ? workouts.length - 1 : 0)}
        >
          <Image
            source={
              index !== (workouts ? workouts.length - 1 : 0)
                ? IMGS.gleft
                : IMGS.leftOff
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  subtxt: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Armwarmer",
  },
  row: {
    width,
    position: "absolute",
    justifyContent: "space-between",
    bottom: 100,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
