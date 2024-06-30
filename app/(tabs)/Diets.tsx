import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { COLORS } from "@/utilities/Colors";
import { router } from "expo-router";
import { fetchDiets } from "@/APIs/fetchDATA";
import { IMGS } from "@/utilities/Imgs";
import Loading from "@/components/Loading";

const { width, height } = Dimensions.get("screen");

type item = {
  id: number;
  name: string;
  icon: any;
  info?:
    | {
        description: string;
        avoid: {
          name: string;
          icon: string;
        }[];
        friendly: {
          name: string;
          icon: string;
        }[];
      }
    | undefined;
};

const Diets = () => {
  const [diets, setDiets] = useState(null);

  useEffect(() => {
    const getDiets = async () => {
      const dietData = await fetchDiets();
      if (dietData) {
        setDiets(dietData);
      }
    };
    getDiets();
  }, []);

  return (
    <View style={{ marginTop: 120 }}>
      {diets ? (
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={diets}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                router.push({
                  pathname: "screens/DietInfo",
                  params: { item: JSON.stringify(item) },
                });
              }}
            >
              <Text style={styles.text}>{item.name}</Text>

              <Image style={styles.icon} source={{ uri: item.icon }} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.center}>
          <Loading color="c" />
        </View>
      )}
    </View>
  );
};

export default Diets;

const styles = StyleSheet.create({
  flatlist: {},
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    backgroundColor: COLORS.blackL,
    margin: 10,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    width: 40,
    height: 40,
  },
  center: {
    width,
    height: height - 200,
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
