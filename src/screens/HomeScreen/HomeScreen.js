import React, { useEffect, useState } from "react";
import { Text, Image, View, SafeAreaView, Alert } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Transitioning, Transition } from "react-native-reanimated";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
  gray: "#DCDCDC",
  lightRed: "#ffb3b3",
  lightGreen: "#b3ffb3",
};

const stackSize = 1;
const ANIMATION_DURATION = 200;

const transition = (
  <Transition.Sequence>
    <Transition.Out
      type="slide-bottom"
      durationMs={ANIMATION_DURATION}
      interpolation="easeIn"
    />
    <Transition.Together>
      <Transition.In
        type="fade"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
      />
      <Transition.In
        type="slide-bottom"
        durationMs={ANIMATION_DURATION}
        delayMs={ANIMATION_DURATION / 2}
        interpolation="easeOut"
      />
    </Transition.Together>
  </Transition.Sequence>
);

const swiperRef = React.createRef();
const transitionRef = React.createRef();

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [end, reachedEnd] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [seenUserList, setSeenUsers] = useState([]);
  const [finalUserArray, setFinalUserList] = useState([]);
  //for filtering users by zip-code
  const [zipCode, setZipCode] = useState("");

  const currentUser = firebase.auth().currentUser;
  const users = firebase.firestore().collection("users");
  const chatRooms = firebase.firestore().collection("ChatRooms"); //Access and create chatrooms

  //useEffect hook sets the currentUserName for useState
  useEffect(() => {
    (async () => {
      //query gets logged-in user doc from firestore
      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          return doc.data();
        });
      //selects fullName, seenUsers and location fields from the doc
      console.log("in first useEffect");
      const getCurrentUserName = await userDoc.fullName;
      const getSeenUsers = await userDoc.seenUsers;
      const getZipCode = await userDoc.location;
      setSeenUsers(getSeenUsers);
      setCurrentUserName(getCurrentUserName);
      setZipCode(getZipCode);
    })();
  }, []);

  //Set match=true in both user's liked_by_people collection for the other user
  const onSwipedLeft = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("userDislikes")
      .add({
        fullName: user[index].fullName,
        id: user[index].id,
        match: false,
        merge: false,
      });
  };

  const onSwipedRight = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("userLikes")
      .add({
        fullName: user[index].fullName,
        id: user[index].id,
        match: true,
      });
    createChatRoom();
  };

  async function createChatRoom() {
    const snapshot = await firebase
      .firestore()
      .collection("users")
      .doc(user[index].id)
      .collection("userLikes")
      .where("id", "==", currentUser.uid)
      .get();

    if (snapshot.empty) {
    } else {
      Alert.alert(
        "Congrats! It's a match!",
        "Head to your matches to start chatting!",
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );

      const createChat = firebase.firestore().collection("ChatRooms");
      createChat.add({
        //fields created within Chatroom collection documents
        names: `${user[index].fullName} & ${currentUserName}`,
        Users: [currentUser.uid, user[index].id],
      });
    }
  }

  const onSwiped = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({
        seenUsers: firebase.firestore.FieldValue.arrayUnion(
          `${user[index].id}`
        ),
      });

    if (index === user.length - 1) {
      console.log("in reached end");
      reachedEnd(true);
    } else if (!end) {
      console.log("in else if statement");
      setIndex(index + 1);
      transitionRef.current.animateNextTransition();
    }
  };

  const onTopSwipe = () => {
    // transitionRef.current.animateNextTransition();
    // setIndex((index + 1) % user.length);
  };

  const userInfo = user[index];

  function onTapCard(userInfo) {
    return navigation.navigate("SingleMatch", { userID: userInfo });
  }

  useEffect(() => {
    users.onSnapshot((querySnapshot) => {
      const userList = [];
      querySnapshot.forEach((doc) => {
        const { fullName, userBio, image, location, dogData } = doc.data();
        userList.push({
          id: doc.id,
          fullName,
          userBio,
          image,
          location,
          dogData,
        });
      });
      const finalUserList = userList.filter((user) => {
        //filter users by zipcode and not already seen (of course not the logged user)
        if (
          user.id !== currentUser.uid &&
          !seenUserList.includes(`${user.id}`)
        ) {
          return user;
        }
      });

      if (finalUserList.length <= 0) {
        reachedEnd(true);
        setLoading(false);
      } else {
        setFinalUserList(finalUserList);
      }
    });
  }, [seenUserList]);

  useEffect(() => {
    const zipCodeFinalUserList = finalUserArray.filter((user) => {
      //filter users by zipcode and not already seen (of course not the logged user)
      if (user.location === zipCode) {
        return user;
      }
    });

    if (zipCodeFinalUserList.length <= 0) {
      reachedEnd(true);
      setLoading(false);
    } else {
      if (index === 0) {
        console.log("in useEffect");
        reachedEnd(false);
      }
      setUser(zipCodeFinalUserList);
    }
  }, [finalUserArray]);

  //the above useEffect will only run when seenUserList is updated on state

  //clean up use effect for memory leak
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, [user]);

  const CardDetails = ({ index }) => (
    <View key={user[index].uid} style={styles.cardDetails}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        {user[index].fullName} & {user[index].dogData.dogName}
      </Text>
      <Text style={[styles.text, styles.userBio]}>{user[index].userBio}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.nonmainpage}>
          <Text style={styles.endtexttitle}>Loading</Text>
        </View>
      ) : end ? (
        <View style={styles.screen}>
          <Image
            source={require("../../../assets/endOfMatchesDog.png")}
            style={{
              height: "10%",
              width: "30%",
              resizeMode: "stretch",
              margin: 15,
              alignSelf: "center",
            }}
          />
          <Text style={styles.endtexttitle}>You've reached the end!</Text>
          <Text style={styles.endtext}>
            Check back later for new people to match with!
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.swiperContainer}>
            <Swiper
              ref={swiperRef}
              cards={user}
              cardIndex={index}
              renderCard={(card) => {
                console.log("in renderCard", end);
                return (
                  <View style={styles.card}>
                    <Image
                      source={{ uri: card.image }}
                      style={styles.cardImage}
                    />
                    <Transitioning.View
                      ref={transitionRef}
                      transition={transition}
                      style={styles.bottomContainerMeta}
                    >
                      <CardDetails index={index} />
                    </Transitioning.View>
                  </View>
                );
              }}
              infinite={false}
              backgroundColor={"transparent"}
              onSwiped={onSwiped}
              onSwipedLeft={onSwipedLeft}
              onSwipedRight={onSwipedRight}
              onTapCard={() => {
                onTapCard(userInfo);
              }}
              cardVerticalMargin={50}
              stackSize={stackSize}
              stackScale={10}
              stackSeparation={14}
              animateOverlayLabelsOpacity
              animateCardOpacity
              onTopSwipe={onTopSwipe}
              onSwipedAll={() => {
                reachedEnd(true);
              }}
              disableBottomSwipe
              overlayLabels={{
                left: {
                  title: "NOPE",
                  style: {
                    label: {
                      backgroundColor: colors.lightRed,
                      borderColor: colors.lightRed,
                      color: colors.white,
                      borderWidth: 1,
                      fontSize: 24,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: -20,
                    },
                  },
                },
                right: {
                  title: "LIKE",
                  style: {
                    label: {
                      backgroundColor: colors.lightGreen,
                      borderColor: colors.lightGreen,
                      color: colors.white,
                      borderWidth: 1,
                      fontSize: 24,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: 20,
                    },
                  },
                },
              }}
            />
          </View>
          <View>
            <View style={styles.bottomContainerButtons}>
              <MaterialCommunityIcons.Button
                name="arrow-left"
                size={40}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.3}
                color="tomato"
                onPress={() => swiperRef.current.swipeLeft()}
              />
              <MaterialCommunityIcons.Button
                name="arrow-right"
                size={40}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.3}
                color="tomato"
                onPress={() => swiperRef.current.swipeRight()}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
