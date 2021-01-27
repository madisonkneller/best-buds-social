import { StyleSheet } from "react-native";

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8ecf3",
    alignContent: "center",
  },

  text: {
    fontFamily: "System",
    color: "#0b2f64",
  },

  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },

  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 50,
    shadowRadius: 25,
    shadowColor: colors.gray,
    shadowOpacity: 0.08,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: colors.black,
  },

  chat: {
    backgroundColor: colors.white,
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  active: {
    backgroundColor: colors.red,
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },

  add: {
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },

  userBio: {
    alignSelf: "center",
    alignItems: "flex-start",
    marginTop: 16,
    marginRight: 42,
    marginLeft: 42,
    marginBottom: 16,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 8,
    shadowRadius: 25,
    color: "#0b2f64",
    backgroundColor: colors.white,
  },

  dogData: {
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 50,
    paddingRight: 50,
    color: "#0b2f64",
    borderRadius: 8,
    shadowRadius: 25,
    backgroundColor: colors.white,
  },

  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  }
});
