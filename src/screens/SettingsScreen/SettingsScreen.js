import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { firebase } from "../../firebase/config";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";

export default function SettingsScreen({ navigation }) {
  const user = firebase.auth().currentUser;
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onSetLocationPress = () => {
    navigation.navigate("SetLocation");
  };

  const onUpdateEmailPress = () => {
    //only updates to firebase auth
    user
      .updateEmail(newEmail)
      .then(() => {
        Alert.alert("Your email has been changed.");
      })
      .catch((error) => {
        alert(error);
      });

    //also updates to the firestore
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({ email: newEmail });
  };

  const onUpdatePasswordPress = () => {
    user
      .updatePassword(newPassword)
      .then(() => {
        Alert.alert("Your password has been changed.");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onSignOutPress = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        alert(error);
      });
  };

  const SettingsData = [
    {
      title: "My Location",
    },
    {
      title: "Account Settings",
    },
    {
      title: "Log Out",
    },
  ];

  const Item = ({ title }) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d8ecf3",
      }}
    >
      <FontAwesome
        name="map-marker"
        size={20}
        color="#0b2f64"
        onPress={() => onSetLocationPress()}
        style={{ marginBottom: 50, marginTop: 30 }}
      >
        {" "}
        Set Location
      </FontAwesome>

      <TextInput
        style={styles.input}
        placeholder={user.email}
        clearTextOnFocus={true}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setNewEmail(text)}
        value={newEmail}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        textContentType={"oneTimeCode"}
      />
      <FontAwesome
        name="envelope"
        size={20}
        color="#0b2f64"
        onPress={() => onUpdateEmailPress()}
        style={{ marginBottom: 20 }}
      >
        {" "}
        Update Email{" "}
      </FontAwesome>

      <TextInput
        style={styles.input}
        placeholder="new password"
        clearTextOnFocus={true}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        textContentType={"oneTimeCode"}
      />
      <FontAwesome
        name="lock"
        size={20}
        color="#0b2f64"
        onPress={() => onUpdatePasswordPress()}
      >
        {" "}
        Update Password
      </FontAwesome>

      <TouchableOpacity onPress={() => onSignOutPress()}>
        <Text
          style={{
            color: "#0b2f64",
            marginTop: 100,
            marginBottom: 1,
            fontSize: 22,
          }}
        >
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
