import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Image,
  TextInput,
  ScrollView,
  View,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
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

export default function HomeScreen() {
  const [user, setUser] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [end, reachedEnd] = useState(false);
  const currentUser = firebase.auth().currentUser;
  const users = firebase.firestore().collection("users");
  const chatRooms = firebase.firestore().collection("ChatRooms"); //Access and create chatrooms

  // Need to add to users: "usersILike" and "usersWhoLikeMe"

  //Set match=true in both user's liked_by_people collection for the other user
  const onSwipedLeft = () => {
    console.log("inside swipedleft");
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
    console.log("in swiped right");
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
      console.log("false");
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
        name: user[index].fullName,
        Chats: [],
        Users: [currentUser.uid, user[index].id],
      });

      console.log("true");
    }
  }

  const onSwiped = () => {
    transitionRef.current.animateNextTransition();
    setIndex((index + 1) % user.length);
  };

  const onTopSwipe = () => {
    transitionRef.current.animateNextTransition();
    setIndex(index + (1 % user.length));
  };

  useEffect(() => {
    return users.onSnapshot((querySnapshot) => {
      const userList = [];
      querySnapshot.forEach((doc) => {
        const {
          fullName,
          userBio,
          image,
          // dogData
        } = doc.data();
        userList.push({
          id: doc.id,
          fullName,
          userBio,
          image,
          // dogData,
        });
      });
      console.log("userList", userList);
      setUser(userList);
      setLoading(false);
    });
  }, []);

  const CardDetails = ({ index }) => (
    <View key={user[index].uid} style={{ alignItems: "center" }}>
      <Text style={[styles.text, styles.heading]} numberOfLines={2}>
        {user[index].fullName}
      </Text>
      <Text style={[styles.text, styles.userBio]}>{user[index].userBio}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.titlecontainer}>
        <Text style={styles.apptext}>Best Buds Social</Text>
      </View> */}

      {loading ? (
        <View style={styles.nonmainpage}>
          <Text style={styles.endtexttitle}>Loading</Text>
        </View>
      ) : end ? (
        <View style={styles.nonmainpage}>
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
                    {/* <Text
                      style={[styles.text, styles.heading]}
                      numberOfLines={2}
                    >
                      {user[index].fullName}
                    </Text> */}
                  </View>
                );
              }}
              infinite={false}
              backgroundColor={"transparent"}
              onSwiped={onSwiped}
              onSwipedLeft={onSwipedLeft}
              onSwipedRight={onSwipedRight}
              cardVerticalMargin={50}
              stackSize={stackSize}
              stackScale={10}
              stackSeparation={14}
              animateOverlayLabelsOpacity
              animateCardOpacity
              onTopSwipe={onTopSwipe}
              onSwipedAll={() => {
                console.log("in onSwipedAll");
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
            {/* <Transitioning.View
              ref={transitionRef}
              transition={transition}
              style={styles.bottomContainerMeta}
            >
              <CardDetails index={index} />
            </Transitioning.View> */}
            <View style={styles.bottomContainerButtons}>
              <MaterialCommunityIcons.Button
                name="arrow-left"
                size={94}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.3}
                color={colors.white}
                onPress={() => swiperRef.current.swipeLeft()}
              />
              <MaterialCommunityIcons.Button
                name="arrow-right"
                size={94}
                backgroundColor="transparent"
                underlayColor="transparent"
                activeOpacity={0.3}
                color={colors.white}
                onPress={() => swiperRef.current.swipeRight()}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
