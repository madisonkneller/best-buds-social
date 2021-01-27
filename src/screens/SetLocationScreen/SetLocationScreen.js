import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { firebase } from "../../firebase/config";

export default function SetLocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [place, setPlace] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      let place = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setPlace(place);

      place.find((place) => {
        setZipCode(place.postalCode);
      });
    })();
	}, []);

	useEffect(() => {
    (async () => {
      //firebase query to add location field
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .set({ location: zipCode }, { merge: true });
    })();
	}, [zipCode]);

  let text = "Loading location info...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>
        <FontAwesome name="map-marker" size={20} color="blue" /> {zipCode}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
