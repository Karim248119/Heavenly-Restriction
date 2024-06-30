import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/utilities/Colors";
import AnimatedArrow from "@/components/AnimatedArrow";
import Arrow from "@/components/AnimatedArrow";
import { IMGS } from "@/utilities/Imgs";

const { width, height } = Dimensions.get("screen");

const TrainingDetails = () => {
  const [fontsLoaded, fontError] = useFonts({
    Espial: require("../../assets/fonts/EspialRegular15-6Y08Y.otf"),
    rawhide: require("../../assets/fonts/rawhide_raw_2012.ttf"),
    Armwarmer: require("../../assets/fonts/Armwarmer.otf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const { exercises, color, trainings, index } = useLocalSearchParams<{
    name: string;
    img: string;
    color: any;
    trainings: any;
    index: any;
    exercises?: any;
  }>();
  const tData = JSON.parse(trainings);

  const ref = useRef<FlatList>(null);
  const [Index, setIndex] = useState<number>(+index);

  useEffect(() => {
    ref.current?.scrollToIndex({ index: Index, animated: true });
  }, [Index]);

  const getItemLayout = (data: any, index: any) => ({
    length: width,
    offset: width * index,
    index,
  });

  const onScrollToIndexFailed = (info: any) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      ref.current?.scrollToIndex({ index: info.index, animated: true });
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width,
          paddingHorizontal: 20,
          position: "absolute",
          top: 30,
          zIndex: 100,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back-circle-outline" size={35} color={color} />
        </TouchableOpacity>
        <Text
          style={{
            color,
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          {Index + 1} / {exercises}
        </Text>
      </View>

      <FlatList
        ref={ref}
        initialScrollIndex={Index}
        scrollEnabled={false}
        style={StyleSheet.absoluteFillObject}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={tData}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <View style={styles.imgContainer}>
              <Image source={{ uri: item.img }} style={styles.img} />
            </View>
            <View style={styles.info}>
              <View style={styles.title}>
                <Text style={[styles.name]}>{item.name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={[styles.rounds, { color: color }]}>
                  {item.sets || "3 x 15"}
                </Text>
              </View>
            </View>
          </View>
        )}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />

      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => setIndex(Index - 1)}
          disabled={Index <= 0}
        >
          <Image
            source={
              Index > 0
                ? color === COLORS.purple
                  ? IMGS.pright
                  : IMGS.gright
                : IMGS.rightOff
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIndex(Index + 1)}
          disabled={Index >= tData.length - 1}
        >
          <Image
            source={
              Index !== tData.length - 1
                ? color === COLORS.purple
                  ? IMGS.pleft
                  : IMGS.gleft
                : IMGS.leftOff
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrainingDetails;

const styles = StyleSheet.create({
  imgContainer: {
    width,
    height: height * 0.6,
    overflow: "hidden",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "70%",
    aspectRatio: 1,
    top: 10,
  },

  info: {
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    height: "30%",
    justifyContent: "center",
  },
  name: {
    height: "150%",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "800",
    lineHeight: 40,
    width: width - 100,
    color: "#fff",
    fontFamily: "rawhide",
  },
  row: {
    height: "50%",
    width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    bottom: 5,
  },
  rounds: {
    fontSize: 25,
    color: "gray",
    fontFamily: "Armwarmer",
  },
  icon: { width: 60, height: 60 },
  nav: {
    width,
    height: 100,
    position: "absolute",
    bottom: height / 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width / 50,
  },
});
