import { StyleSheet, Dimensions } from "react-native";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
};

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8ecf3",
  },

  swiperContainer: {
    flex: 0.99,
    alignContent: "center",
    alignItems: "center",
  },

  bottomContainerMeta: {
    alignItems: "center",
    alignContent: "flex-end",
    margin: 25,
  },

  bottomContainerButtons: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    /* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
    flex: 0.85,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#d8ecf3",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    flex: 0.85,
  },

  cardImage: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 3,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },

  cardDetails: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexDirection: "column",
  },

  text: {
    textAlign: "center",
    fontSize: 20,
    color: colors.white,
    fontFamily: "Avenir",
    textShadowColor: colors.black,
    textShadowRadius: 10,
  },

  done: {
    textAlign: "center",
    fontSize: 30,
    color: colors.white,
    backgroundColor: "transparent",
  },

  screen:{
    height: height,
    width: width,
    position: "absolute",
    justifyContent: "center",
  },

  endtexttitle: {
    fontFamily: "System",
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },

  endtext: {
    fontFamily: "System",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },

  text: {
    fontFamily: "System"
  },

  heading: {
    fontSize: 20,
    color: "#0b2f64",
    marginLeft: 5,
    marginRight: 5,
    alignSelf: "flex-start",
  },

  userBio: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 1,
    color: "#0b2f64",
    marginLeft: 5,
    marginRight: 5
  },

  price: {
    color: colors.blue,
    fontSize: 32,
    fontWeight: "500"
  },
});
