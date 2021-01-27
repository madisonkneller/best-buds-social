import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  ScrollView,
  View,
  SafeAreaView
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableHighlight
} from "react-native-gesture-handler";

export default function SingleMatchProfile({ route, navigation }) {
  const [matchUser, setMatchUser] = useState([]);
  const [dogInfo, setDogInfo] = useState([]);

  const userId = route.params.userID.id;

  useEffect(() => {
    (async () => {
      //query gets loggedin user doc from firestore
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .get()
        .then((doc) => {
          return doc.data();
        });
      setMatchUser(snapshot);
      setDogInfo(snapshot.dogData);
    })();
  }, []);

  function onArrowPress() {
    return navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <TouchableHighlight onPress={() => onArrowPress()}>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="tomato"
            ></Ionicons>
          </TouchableHighlight>
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: matchUser.image }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 28 }]}>
            {matchUser.fullName}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            Best Buds Dog Lover
          </Text>
        </View>
        <View style={styles.userBio}>
          <Text
            style={[
              styles.text,
              {
                fontSize: 18,
                marginTop: 10,
                marginBottom: 5,
                alignSelf: "flex-start",
              },
            ]}
          >
            My Bio
          </Text>
          <Text style={[styles.text, { fontSize: 14, marginBottom: 20 }]}>
            {matchUser.userBio}
          </Text>
        </View>
        <View style={styles.dogData}>
          <Text
            style={[
              styles.text,
              {
                fontSize: 18,
                marginTop: 10,
                marginBottom: 5,
                alignSelf: "flex-start",
              },
            ]}
          >
            My Dog
          </Text>
          <Text style={[styles.text, { fontSize: 14, marginBottom: 10 }]}>
            <Text>
              Dog Name: {dogInfo.dogName}
              {"\n"}Dog Breed: {dogInfo.dogBreed}
              {"\n"}Dog Gender: {dogInfo.dogGender}
              {"\n"}Dog Size: {dogInfo.dogSize}
              {"\n"}Dog Temperament: {dogInfo.dogTemperament}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
