import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import TrainCard from "@/components/TrainCard";
import { COLORS } from "@/utilities/Colors";
import { IMGS } from "@/utilities/Imgs";
import { fetchTraining } from "@/APIs/fetchDATA";
import Loading from "@/components/Loading";
import { tCARDIODATA } from "@/data/cardioData";

const { width, height } = Dimensions.get("screen");

export default function HomeScreen() {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [trainings, setTrainings] = useState([]);

  const [fontsLoaded] = useFonts({
    rawhide: require("../../assets/fonts/rawhide_raw_2012.ttf"),
    Armwarmer: require("../../assets/fonts/Armwarmer.otf"),
    Stradale: require("../../assets/fonts/Personal License/Stradale.ttf"),
  });

  useEffect(() => {
    const getTrainings = async () => {
      const trainingData = await fetchTraining();
      if (trainingData) {
        setTrainings(trainingData);
      }
    };
    getTrainings();
  }, []);

  useEffect(() => {
    if (trainings && trainings.length > 0) {
      ref.current?.scrollToIndex({ index, animated: true });
    }
  }, [index, trainings]);

  if (!fontsLoaded) {
    return null;
  }

  const renderTrainCard = ({ item }: { item: any }) => (
    <TrainCard
      name={item.name}
      imgSource={item.img}
      color={COLORS.purple}
      exercises={item.trainings.length}
      onPress={() => {
        router.push({
          pathname: "screens/Exercise",
          params: {
            item: JSON.stringify(item),
            color: COLORS.purple,
            exercises: item.trainings.length,
          },
        });
      }}
    />
  );

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "screens/Exercise",
            params: {
              item: JSON.stringify(tCARDIODATA),
              color: COLORS.purple,
              exercises: tCARDIODATA.trainings.length,
            },
          });
        }}
        style={styles.card}
      >
        <Text style={styles.txt}>CARDIO</Text>
        <View style={styles.cardSubTextContainer}>
          <MaterialIcons
            name="local-fire-department"
            size={24}
            color={COLORS.purple}
          />
          <Text style={styles.subtxt}>1000 KAL</Text>
        </View>
        <Image source={IMGS.cardio} style={styles.cardImg} />
      </TouchableOpacity>
      {trainings && trainings.length > 0 ? (
        <FlatList
          ref={ref}
          initialScrollIndex={index}
          scrollEnabled={true}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={trainings}
          renderItem={renderTrainCard}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <Loading color="p" />
      )}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setIndex(index - 1)}
          disabled={index <= 0}
        >
          <Image
            source={index > 0 ? IMGS.pright : IMGS.rightOff}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIndex(index + 1)}
          disabled={index >= (trainings ? trainings.length - 1 : 0)}
        >
          <Image
            source={
              index !== (trainings ? trainings.length - 1 : 0)
                ? IMGS.pleft
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
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  card: {
    width: "80%",
    height: 100,
    backgroundColor: COLORS.blackL,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: width / 3 + 50,
  },
  cardImg: {
    width: 130,
    height: 150,
    position: "absolute",
    bottom: 0,
    right: 10,
  },
  txt: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 20,
    fontFamily: "rawhide",
    marginBottom: 10,
  },
  subtxt: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Armwarmer",
  },
  cardSubTextContainer: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
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
