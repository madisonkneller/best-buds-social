import React, { useEffect, useState } from "react";
import { Text, Image, ScrollView, View, SafeAreaView } from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function CurrentUserScreen() {
  const [currentUser, setCurrentUser] = useState([]);
  const [dogInfo, setDogInfo] = useState([]);

  const currentPerson = firebase.auth().currentUser.uid;

  const onChatPress = () => {
    console.log("being clicked", onChatPress);
  };

  useEffect(() => {
    (async () => {
      //query gets logged-in user doc from firestore
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(currentPerson)
        .get()
        .then((doc) => {
          return doc.data();
        });

      setCurrentUser(snapshot);
      setDogInfo(snapshot.dogData);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{ uri: currentUser.image }}
              style={styles.image}
              resizeMode="cover"
            ></Image>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 28 }]}>
            {currentUser.fullName}
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
                marginTop: 15,
                marginBottom: 5,
                alignSelf: "flex-start",
              },
            ]}
          >
            My Bio
          </Text>
          <Text style={[styles.text, { fontSize: 14, marginBottom: 20 }]}>
            {currentUser.userBio}
          </Text>
        </View>
        <View style={styles.dogData}>
          <Text
            style={[
              styles.text,
              { fontSize: 18, marginBottom: 5, alignSelf: "flex-start" },
            ]}
          />
          <Text
            style={[
              styles.text,
              {
                fontSize: 18,
                alignSelf: "flex-start",
                marginTop: 10,
                marginBottom: 5,
              },
            ]}
          >
            My Dog
          </Text>
          <View style={[styles.text, { fontSize: 14 }]}>
            <Text style={styles.text}>
              Dog Name: {dogInfo.dogName}
              {"\n"}Dog Breed: {dogInfo.dogBreed}
              {"\n"}Dog Gender: {dogInfo.dogGender}
              {"\n"}Dog Size: {dogInfo.dogSize}
              {"\n"}Dog Temperament: {dogInfo.dogTemperament}
            </Text>
            <Text
              style={[styles.text, { fontSize: 14, marginBottom: 16 }]}
            ></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
