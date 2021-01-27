import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import "firebase/storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userBio, setUserBio] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogTemperament, setDogTemperament] = useState("");
  const [image, setImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    //It creates a new account that will show up in Firebase Console -> Authentication table.

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
          userBio,
          image,
          location: "11214",
          seenUsers: [],
          dogData: {
            dogName,
            dogSize: dogSize.value,
            dogGender: dogGender.value,
            dogBreed,
            dogTemperament: dogTemperament.value,
          },
        };

        //If the account registration was successful, we also store the user data in Firebase Firestore. This is necessary for storing extra user information, such as full name, profile photo URL, and so on, which cannot be stored in the Authentication table.
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Login");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };
      // this helps us get a blob
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);

      xhr.send(null);
    });
  };

  uploadToFirebase = (blob) => {
    return new Promise((resolve, reject) => {
      var storageRef = firebase.storage().ref();
      storageRef
        .child(`uploads/${email}.jpg`)
        .put(blob, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          blob.close();
          resolve(snapshot);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const pickImage = () => {
    if (email === "") {
      alert("Please complete email field before uploading image");
      return;
    }
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((result) => {
        if (!result.cancelled) {
          const { height, width, type, uri } = result;
          setLocalImage(uri);
          return uriToBlob(uri);
        }
      })
      .then((blob) => {
        return uploadToFirebase(blob);
      })
      .then(() => {
        firebase
          .storage()
          .ref()
          .child(`uploads/${email}.jpg`)
          .getDownloadURL()
          .then((url) => setImage(url));
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="always"
        >
          <Image
            style={styles.logo}
            source={require("../../../assets/BestBudsSocialLogo.png")}
          />
          <View style={{ alignItems: "center" }}>
            {image && (
              <Image
                source={{ uri: localImage }}
                style={{ width: 200, height: 200, borderRadius: 5, margin: 20 }}
              />
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            textContentType={"oneTimeCode"}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            textContentType={"oneTimeCode"}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            textContentType={"oneTimeCode"}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            textContentType={"oneTimeCode"}
          />
          <TouchableOpacity onPress={pickImage}>
            <View
              onPress={pickImage}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#5271FF",
                height: 24,
                marginLeft: 45,
                marginRight: 45,
                borderRadius: 5,
              }}
            >
              <Text style={styles.buttonTitle}>
                Choose an image of you & your dog!
              </Text>
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.largeinput}
            placeholder="Tell us about you & your dog here...you can include your favorite places to walk and/or anything special about your best bud :)"
            placeholderTextColor="#aaaaaa"
            multiline={true}
            onChangeText={(text) => setUserBio(text)}
            value={userBio}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            textContentType={"oneTimeCode"}
          />
          <TextInput
            style={styles.input}
            placeholder="Dog Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setDogName(text)}
            value={dogName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            textContentType={"oneTimeCode"}
          />
          <TextInput
            style={styles.input}
            placeholder="Dog Breed"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setDogBreed(text)}
            value={dogBreed}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            textContentType={"oneTimeCode"}
          />

          <DropDownPicker
            placeholder="Choose Dog Gender"
            items={[
              { label: "Female", value: "Female" },
              { label: "Male", value: "Male" },
            ]}
            style={styles.dropdown}
            onChangeItem={(value) => setDogGender(value)}
            zIndex={5000}
          />
          <DropDownPicker
            placeholder="Choose Dog Size"
            items={[
              { label: "Extra Small", value: "Extra Small" },
              { label: "Small", value: "Small" },
              { label: "Medium", value: "Medium" },
              { label: "Large", value: "Large" },
              { label: "Extra Large", value: "Extra Large" },
            ]}
            style={styles.dropdown}
            onChangeItem={(value) => setDogSize(value)}
            zIndex={4000}
          />
          <DropDownPicker
            placeholder="Choose Dog Temperament"
            items={[
              { label: "Calm", value: "Calm" },
              { label: "Energetic", value: "Energetic" },
              { label: "Feisty", value: "Feisty" },
            ]}
            style={styles.dropdown}
            onChangeItem={(value) => setDogTemperament(value)}
            zIndex={3000}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}
          >
            <Text style={styles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Already have an account?
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Log in
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}
